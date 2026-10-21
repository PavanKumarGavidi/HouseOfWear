-- ============================================
-- House Of Wear - Functions, Triggers & Indexes
-- ============================================

-- ============================================
-- TRIGGER: Auto-create profile on signup
-- ============================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, phone, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'phone', ''),
    'customer'
  );
  
  -- Create an empty cart for the user
  INSERT INTO public.carts (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- TRIGGER: Update updated_at timestamp
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Apply to all tables with updated_at
CREATE TRIGGER set_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON addresses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON sections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON collections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON product_variants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON carts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON cart_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON coupons
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON returns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON pincodes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON store_locations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON banners
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- TRIGGER: Auto-generate search vector for products
-- ============================================

CREATE OR REPLACE FUNCTION update_product_search_vector()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.search_vector := 
    setweight(to_tsvector('english', COALESCE(NEW.name, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.description, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(array_to_string(NEW.tags, ' '), '')), 'C');
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_search_vector
  BEFORE INSERT OR UPDATE OF name, description, tags ON products
  FOR EACH ROW EXECUTE FUNCTION update_product_search_vector();

-- ============================================
-- TRIGGER: Auto-calculate discount_percent
-- ============================================

CREATE OR REPLACE FUNCTION calculate_discount_percent()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.mrp > 0 AND NEW.base_price < NEW.mrp THEN
    NEW.discount_percent := ROUND(((NEW.mrp - NEW.base_price) / NEW.mrp) * 100)::INTEGER;
  ELSE
    NEW.discount_percent := 0;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_discount_percent
  BEFORE INSERT OR UPDATE OF base_price, mrp ON products
  FOR EACH ROW EXECUTE FUNCTION calculate_discount_percent();

-- ============================================
-- FUNCTION: Generate order number
-- ============================================

CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  order_num TEXT;
BEGIN
  order_num := 'HOW' || TO_CHAR(NOW(), 'YYMMDD') || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
  RETURN order_num;
END;
$$;

-- ============================================
-- FUNCTION: Validate and apply coupon
-- ============================================

CREATE OR REPLACE FUNCTION validate_coupon(
  p_coupon_code TEXT,
  p_cart_value NUMERIC,
  p_user_id UUID,
  p_is_prepaid BOOLEAN DEFAULT false
)
RETURNS TABLE (
  is_valid BOOLEAN,
  discount_amount NUMERIC,
  error_message TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_coupon RECORD;
  v_discount NUMERIC;
  v_user_usage INTEGER;
BEGIN
  -- Find the coupon
  SELECT * INTO v_coupon FROM public.coupons
  WHERE code = UPPER(p_coupon_code)
    AND is_active = true
    AND valid_from <= NOW()
    AND (valid_until IS NULL OR valid_until > NOW());

  IF v_coupon.id IS NULL THEN
    RETURN QUERY SELECT false, 0::NUMERIC, 'Invalid or expired coupon code'::TEXT;
    RETURN;
  END IF;

  -- Check minimum cart value
  IF p_cart_value < v_coupon.min_cart_value THEN
    RETURN QUERY SELECT false, 0::NUMERIC, 
      ('Minimum cart value of ₹' || v_coupon.min_cart_value || ' required')::TEXT;
    RETURN;
  END IF;

  -- Check prepaid only
  IF v_coupon.is_preonly AND NOT p_is_prepaid THEN
    RETURN QUERY SELECT false, 0::NUMERIC, 'This coupon is valid for prepaid orders only'::TEXT;
    RETURN;
  END IF;

  -- Check global usage limit
  IF v_coupon.usage_limit IS NOT NULL AND v_coupon.usage_count >= v_coupon.usage_limit THEN
    RETURN QUERY SELECT false, 0::NUMERIC, 'This coupon has reached its usage limit'::TEXT;
    RETURN;
  END IF;

  -- Check per-user limit
  IF p_user_id IS NOT NULL AND v_coupon.per_user_limit IS NOT NULL THEN
    SELECT COUNT(*)::INTEGER INTO v_user_usage FROM public.orders
    WHERE user_id = p_user_id AND coupon_id = v_coupon.id;
    
    IF v_user_usage >= v_coupon.per_user_limit THEN
      RETURN QUERY SELECT false, 0::NUMERIC, 'You have already used this coupon the maximum number of times'::TEXT;
      RETURN;
    END IF;
  END IF;

  -- Calculate discount
  IF v_coupon.type = 'percentage' THEN
    v_discount := (p_cart_value * v_coupon.value) / 100;
    IF v_coupon.max_discount IS NOT NULL THEN
      v_discount := LEAST(v_discount, v_coupon.max_discount);
    END IF;
  ELSE
    v_discount := v_coupon.value;
  END IF;

  -- Cap discount at cart value
  v_discount := LEAST(v_discount, p_cart_value);

  RETURN QUERY SELECT true, v_discount, NULL::TEXT;
END;
$$;

-- ============================================
-- FUNCTION: Place order atomically
-- ============================================

CREATE OR REPLACE FUNCTION place_order(
  p_user_id UUID,
  p_session_id TEXT,
  p_address_snapshot JSONB,
  p_payment_method payment_method,
  p_coupon_code TEXT DEFAULT NULL,
  p_loyalty_points_redeem INTEGER DEFAULT 0,
  p_email TEXT DEFAULT NULL,
  p_phone TEXT DEFAULT NULL
)
RETURNS TABLE (
  success BOOLEAN,
  order_id UUID,
  order_number TEXT,
  total_amount NUMERIC,
  error_message TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_cart_id UUID;
  v_cart_items RECORD;
  v_subtotal NUMERIC := 0;
  v_discount NUMERIC := 0;
  v_shipping NUMERIC := 0;
  v_tax NUMERIC := 0;
  v_total NUMERIC := 0;
  v_order_id UUID;
  v_order_number TEXT;
  v_coupon_id UUID;
  v_loyalty_discount NUMERIC := 0;
  v_points_to_earn INTEGER;
  v_item RECORD;
  v_variant RECORD;
  v_free_shipping_threshold NUMERIC := 999;
BEGIN
  -- Get the cart
  IF p_user_id IS NOT NULL THEN
    SELECT id INTO v_cart_id FROM public.carts WHERE user_id = p_user_id LIMIT 1;
  ELSE
    SELECT id INTO v_cart_id FROM public.carts WHERE session_id = p_session_id LIMIT 1;
  END IF;

  IF v_cart_id IS NULL THEN
    RETURN QUERY SELECT false, NULL::UUID, NULL::TEXT, 0::NUMERIC, 'Cart not found'::TEXT;
    RETURN;
  END IF;

  -- Validate stock for all items
  FOR v_item IN 
    SELECT ci.*, pv.stock, pv.price_override, pv.sku, pv.size, pv.color,
           p.name as product_name, p.mrp, p.base_price,
           (SELECT url FROM public.product_images WHERE product_id = p.id AND is_primary = true LIMIT 1) as image_url
    FROM public.cart_items ci
    JOIN public.product_variants pv ON pv.id = ci.variant_id
    JOIN public.products p ON p.id = pv.product_id
    WHERE ci.cart_id = v_cart_id
  LOOP
    IF v_item.stock < v_item.quantity THEN
      RETURN QUERY SELECT false, NULL::UUID, NULL::TEXT, 0::NUMERIC, 
        ('Insufficient stock for ' || v_item.product_name || ' (' || v_item.size || ', ' || v_item.color || ')')::TEXT;
      RETURN;
    END IF;
  END LOOP;

  -- Calculate subtotal
  FOR v_item IN 
    SELECT ci.quantity, 
           COALESCE(pv.price_override, p.base_price) as item_price,
           p.mrp
    FROM public.cart_items ci
    JOIN public.product_variants pv ON pv.id = ci.variant_id
    JOIN public.products p ON p.id = pv.product_id
    WHERE ci.cart_id = v_cart_id
  LOOP
    v_subtotal := v_subtotal + (v_item.item_price * v_item.quantity);
  END LOOP;

  -- Apply coupon if provided
  IF p_coupon_code IS NOT NULL THEN
    SELECT * INTO v_coupon_id, v_discount FROM validate_coupon(
      p_coupon_code, v_subtotal, p_user_id, (p_payment_method = 'razorpay')
    );
    
    -- If coupon validation failed, v_discount will be 0
    IF v_discount = 0 AND p_coupon_code IS NOT NULL THEN
      -- Check if coupon is actually invalid vs just giving 0 discount
      SELECT id INTO v_coupon_id FROM public.coupons 
      WHERE code = UPPER(p_coupon_code) AND is_active = true;
      
      IF v_coupon_id IS NULL THEN
        RETURN QUERY SELECT false, NULL::UUID, NULL::TEXT, 0::NUMERIC, 'Invalid coupon code'::TEXT;
        RETURN;
      END IF;
    END IF;
  END IF;

  -- Apply loyalty points (1 point = ₹1)
  IF p_loyalty_points_redeem > 0 AND p_user_id IS NOT NULL THEN
    SELECT loyalty_points INTO v_item FROM public.profiles WHERE id = p_user_id;
    v_loyalty_discount := LEAST(p_loyalty_points_redeem::NUMERIC, v_subtotal - v_discount);
    v_loyalty_discount := LEAST(v_loyalty_discount, v_item::NUMERIC); -- Can't redeem more than available
  END IF;

  v_discount := v_discount + v_loyalty_discount;

  -- Calculate shipping
  IF v_subtotal >= v_free_shipping_threshold THEN
    v_shipping := 0;
  ELSE
    v_shipping := 79; -- Flat shipping charge
  END IF;

  -- Calculate tax (GST 18% on shipping only if product prices are inclusive)
  v_tax := 0; -- Assuming product prices are inclusive of GST

  v_total := v_subtotal - v_discount + v_shipping + v_tax;

  -- Generate order number
  v_order_number := generate_order_number();

  -- Create order
  INSERT INTO public.orders (
    order_number, user_id, session_id, email, phone,
    subtotal, discount, shipping, tax, total,
    payment_method, payment_status, coupon_id, coupon_code,
    loyalty_points_used, address_snapshot
  ) VALUES (
    v_order_number, p_user_id, p_session_id, p_email, p_phone,
    v_subtotal, v_discount, v_shipping, v_tax, v_total,
    p_payment_method, 
    CASE WHEN p_payment_method = 'cod' THEN 'pending' ELSE 'pending' END,
    v_coupon_id, p_coupon_code,
    p_loyalty_points_redeem, p_address_snapshot
  ) RETURNING id INTO v_order_id;

  -- Create order items
  FOR v_item IN 
    SELECT ci.quantity, ci.variant_id,
           COALESCE(pv.price_override, p.base_price) as item_price,
           pv.sku, pv.size, pv.color,
           p.id as product_id, p.name as product_name, p.mrp,
           (SELECT url FROM public.product_images WHERE product_id = p.id AND is_primary = true LIMIT 1) as image_url
    FROM public.cart_items ci
    JOIN public.product_variants pv ON pv.id = ci.variant_id
    JOIN public.products p ON p.id = pv.product_id
    WHERE ci.cart_id = v_cart_id
  LOOP
    INSERT INTO public.order_items (
      order_id, product_id, variant_id, name, sku, size, color,
      quantity, price, mrp, image_url
    ) VALUES (
      v_order_id, v_item.product_id, v_item.variant_id, v_item.product_name,
      v_item.sku, v_item.size, v_item.color,
      v_item.quantity, v_item.item_price, v_item.mrp, v_item.image_url
    );

    -- Decrement stock
    UPDATE public.product_variants
    SET stock = stock - v_item.quantity
    WHERE id = v_item.variant_id;

    -- Record inventory movement
    INSERT INTO public.inventory_movements (variant_id, quantity, movement_type, reference_id)
    VALUES (v_item.variant_id, -v_item.quantity, 'sale', v_order_id);
  END LOOP;

  -- Update coupon usage
  IF v_coupon_id IS NOT NULL THEN
    UPDATE public.coupons SET usage_count = usage_count + 1 WHERE id = v_coupon_id;
  END IF;

  -- Deduct loyalty points
  IF p_loyalty_points_redeem > 0 AND p_user_id IS NOT NULL THEN
    UPDATE public.profiles 
    SET loyalty_points = loyalty_points - p_loyalty_points_redeem
    WHERE id = p_user_id;

    INSERT INTO public.loyalty_transactions (user_id, order_id, points, type, description, balance_after)
    SELECT p_user_id, v_order_id, -p_loyalty_points_redeem, 'redeem', 
           'Redeemed at checkout', loyalty_points
    FROM public.profiles WHERE id = p_user_id;
  END IF;

  -- Calculate loyalty points to earn (1 point per ₹100 spent)
  v_points_to_earn := FLOOR(v_total / 100)::INTEGER;
  IF v_points_to_earn > 0 AND p_user_id IS NOT NULL THEN
    UPDATE public.profiles 
    SET loyalty_points = loyalty_points + v_points_to_earn
    WHERE id = p_user_id;

    UPDATE public.orders SET loyalty_points_earned = v_points_to_earn WHERE id = v_order_id;

    INSERT INTO public.loyalty_transactions (user_id, order_id, points, type, description, balance_after)
    SELECT p_user_id, v_order_id, v_points_to_earn, 'earn',
           'Earned on order ' || v_order_number, loyalty_points
    FROM public.profiles WHERE id = p_user_id;
  END IF;

  -- Clear cart
  DELETE FROM public.cart_items WHERE cart_id = v_cart_id;

  -- Return success
  RETURN QUERY SELECT true, v_order_id, v_order_number, v_total, NULL::TEXT;
END;
$$;

-- ============================================
-- FUNCTION: Merge guest cart into user cart on login
-- ============================================

CREATE OR REPLACE FUNCTION merge_guest_cart(
  p_session_id TEXT,
  p_user_id UUID
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_guest_cart_id UUID;
  v_user_cart_id UUID;
BEGIN
  -- Find guest cart
  SELECT id INTO v_guest_cart_id FROM public.carts WHERE session_id = p_session_id LIMIT 1;
  IF v_guest_cart_id IS NULL THEN RETURN; END IF;

  -- Find or create user cart
  SELECT id INTO v_user_cart_id FROM public.carts WHERE user_id = p_user_id LIMIT 1;
  IF v_user_cart_id IS NULL THEN
    INSERT INTO public.carts (user_id) VALUES (p_user_id) RETURNING id INTO v_user_cart_id;
  END IF;

  -- Merge items (if variant already exists, add quantity)
  INSERT INTO public.cart_items (cart_id, variant_id, quantity)
  SELECT v_user_cart_id, variant_id, quantity
  FROM public.cart_items WHERE cart_id = v_guest_cart_id
  ON CONFLICT (cart_id, variant_id) 
  DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity;

  -- Delete guest cart
  DELETE FROM public.carts WHERE id = v_guest_cart_id;
END;
$$;

-- ============================================
-- FUNCTION: Get best applicable coupon for cart
-- ============================================

CREATE OR REPLACE FUNCTION get_best_coupon(
  p_cart_value NUMERIC,
  p_user_id UUID DEFAULT NULL,
  p_is_prepaid BOOLEAN DEFAULT false
)
RETURNS TABLE (
  coupon_code TEXT,
  discount_amount NUMERIC,
  description TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  RETURN QUERY
  SELECT c.code, 
    CASE 
      WHEN c.type = 'percentage' THEN LEAST((p_cart_value * c.value) / 100, COALESCE(c.max_discount, p_cart_value))
      ELSE LEAST(c.value, p_cart_value)
    END as discount_amount,
    c.description
  FROM public.coupons c
  WHERE c.is_active = true
    AND c.valid_from <= NOW()
    AND (c.valid_until IS NULL OR c.valid_until > NOW())
    AND p_cart_value >= c.min_cart_value
    AND (NOT c.is_preonly OR p_is_prepaid)
    AND (c.usage_limit IS NULL OR c.usage_count < c.usage_limit)
  ORDER BY discount_amount DESC
  LIMIT 1;
END;
$$;

-- ============================================
-- FUNCTION: Check pincode serviceability
-- ============================================

CREATE OR REPLACE FUNCTION check_pincode(p_pincode TEXT)
RETURNS TABLE (
  serviceable BOOLEAN,
  cod_available BOOLEAN,
  eta_min INTEGER,
  eta_max INTEGER,
  city TEXT,
  state TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  RETURN QUERY
  SELECT p.serviceable, p.cod_available, p.eta_days_min, p.eta_days_max, p.city, p.state
  FROM public.pincodes p
  WHERE p.pincode = p_pincode;
  
  IF NOT FOUND THEN
    RETURN QUERY SELECT false, false, 0, 0, NULL::TEXT, NULL::TEXT;
  END IF;
END;
$$;

-- ============================================
-- FUNCTION: Notify back-in-stock requests
-- ============================================

CREATE OR REPLACE FUNCTION notify_back_in_stock(p_variant_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_count INTEGER;
BEGIN
  UPDATE public.back_in_stock_requests
  SET notified = true, notified_at = NOW()
  WHERE variant_id = p_variant_id AND notified = false;
  
  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count;
END;
$$;

-- ============================================
-- TRIGGER: Notify back-in-stock when stock becomes available
-- ============================================

CREATE OR REPLACE FUNCTION trigger_back_in_stock_notification()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Only trigger when stock goes from 0 to > 0
  IF OLD.stock = 0 AND NEW.stock > 0 THEN
    PERFORM notify_back_in_stock(NEW.id);
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_stock_restored
  AFTER UPDATE OF stock ON product_variants
  FOR EACH ROW EXECUTE FUNCTION trigger_back_in_stock_notification();

-- ============================================
-- VIEW: Product with aggregated data (for listing)
-- ============================================

CREATE OR REPLACE VIEW products_with_details AS
SELECT 
  p.*,
  s.name as section_name,
  s.display_name as section_display_name,
  c.name as category_name,
  c.slug as category_slug,
  (SELECT url FROM product_images WHERE product_id = p.id AND is_primary = true LIMIT 1) as primary_image,
  (SELECT url FROM product_images WHERE product_id = p.id AND is_primary = false ORDER BY sort_order LIMIT 1) as hover_image,
  (SELECT ARRAY_AGG(DISTINCT color) FROM product_variants WHERE product_id = p.id AND is_active = true) as available_colors,
  (SELECT ARRAY_AGG(DISTINCT size ORDER BY size) FROM product_variants WHERE product_id = p.id AND is_active = true AND stock > 0) as in_stock_sizes,
  (SELECT SUM(stock) FROM product_variants WHERE product_id = p.id AND is_active = true) as total_stock,
  (SELECT COALESCE(AVG(rating), 0) FROM reviews WHERE product_id = p.id AND is_approved = true) as avg_rating,
  (SELECT COUNT(*) FROM reviews WHERE product_id = p.id AND is_approved = true) as review_count
FROM products p
LEFT JOIN sections s ON s.id = p.section_id
LEFT JOIN categories c ON c.id = p.category_id;
