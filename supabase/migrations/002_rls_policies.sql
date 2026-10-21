-- ============================================
-- House Of Wear - Row Level Security Policies
-- ============================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE collection_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE returns ENABLE ROW LEVEL SECURITY;
ALTER TABLE return_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE back_in_stock_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE pincodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;

-- ============================================
-- HELPER FUNCTION: Check if user is admin
-- ============================================

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$;

-- ============================================
-- HELPER FUNCTION: Get current user's cart ID
-- ============================================

CREATE OR REPLACE FUNCTION get_user_cart_id()
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  cart_id UUID;
BEGIN
  SELECT id INTO cart_id FROM public.carts
  WHERE user_id = auth.uid()
  LIMIT 1;
  RETURN cart_id;
END;
$$;

-- ============================================
-- PROFILES
-- ============================================

-- Users can read their own profile
CREATE POLICY "Users can view own profile"
ON profiles FOR SELECT
USING (auth.uid() = id OR is_admin());

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Admins can read/update all profiles
CREATE POLICY "Admins can manage all profiles"
ON profiles FOR ALL
USING (is_admin())
WITH CHECK (is_admin());

-- ============================================
-- ADDRESSES
-- ============================================

CREATE POLICY "Users can manage own addresses"
ON addresses FOR ALL
USING (auth.uid() = user_id OR is_admin())
WITH CHECK (auth.uid() = user_id OR is_admin());

-- ============================================
-- SECTIONS (public read, admin write)
-- ============================================

CREATE POLICY "Anyone can read active sections"
ON sections FOR SELECT
USING (is_active = true OR is_admin());

CREATE POLICY "Admins can manage sections"
ON sections FOR ALL
USING (is_admin())
WITH CHECK (is_admin());

-- ============================================
-- CATEGORIES (public read, admin write)
-- ============================================

CREATE POLICY "Anyone can read active categories"
ON categories FOR SELECT
USING (is_active = true OR is_admin());

CREATE POLICY "Admins can manage categories"
ON categories FOR ALL
USING (is_admin())
WITH CHECK (is_admin());

-- ============================================
-- COLLECTIONS (public read, admin write)
-- ============================================

CREATE POLICY "Anyone can read active collections"
ON collections FOR SELECT
USING (is_active = true OR is_admin());

CREATE POLICY "Admins can manage collections"
ON collections FOR ALL
USING (is_admin())
WITH CHECK (is_admin());

-- ============================================
-- PRODUCTS (public read active, admin write)
-- ============================================

CREATE POLICY "Anyone can read active products"
ON products FOR SELECT
USING (is_active = true OR is_admin());

CREATE POLICY "Admins can manage products"
ON products FOR ALL
USING (is_admin())
WITH CHECK (is_admin());

-- ============================================
-- COLLECTION_PRODUCTS (public read, admin write)
-- ============================================

CREATE POLICY "Anyone can read collection products"
ON collection_products FOR SELECT
USING (true);

CREATE POLICY "Admins can manage collection products"
ON collection_products FOR ALL
USING (is_admin())
WITH CHECK (is_admin());

-- ============================================
-- PRODUCT VARIANTS (public read active, admin write)
-- ============================================

CREATE POLICY "Anyone can read active variants"
ON product_variants FOR SELECT
USING (is_active = true OR is_admin());

CREATE POLICY "Admins can manage variants"
ON product_variants FOR ALL
USING (is_admin())
WITH CHECK (is_admin());

-- ============================================
-- PRODUCT IMAGES (public read, admin write)
-- ============================================

CREATE POLICY "Anyone can read product images"
ON product_images FOR SELECT
USING (true);

CREATE POLICY "Admins can manage product images"
ON product_images FOR ALL
USING (is_admin())
WITH CHECK (is_admin());

-- ============================================
-- INVENTORY MOVEMENTS (admin only)
-- ============================================

CREATE POLICY "Admins can manage inventory"
ON inventory_movements FOR ALL
USING (is_admin())
WITH CHECK (is_admin());

-- ============================================
-- WISHLISTS (user's own)
-- ============================================

CREATE POLICY "Users can manage own wishlist"
ON wishlists FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- ============================================
-- CARTS (user's own or by session)
-- ============================================

CREATE POLICY "Users can manage own cart"
ON carts FOR ALL
USING (auth.uid() = user_id OR is_admin())
WITH CHECK (auth.uid() = user_id OR is_admin());

-- Guest can create/update cart by session_id
CREATE POLICY "Guests can manage session cart"
ON carts FOR INSERT
WITH CHECK (user_id IS NULL AND session_id IS NOT NULL);

-- ============================================
-- CART ITEMS (through cart ownership)
-- ============================================

CREATE POLICY "Users can manage own cart items"
ON cart_items FOR ALL
USING (
  cart_id IN (SELECT id FROM carts WHERE user_id = auth.uid())
  OR is_admin()
)
WITH CHECK (
  cart_id IN (SELECT id FROM carts WHERE user_id = auth.uid())
  OR is_admin()
);

-- ============================================
-- COUPONS (public read active, admin write)
-- ============================================

CREATE POLICY "Anyone can read active coupons"
ON coupons FOR SELECT
USING (is_active = true AND valid_from <= NOW() AND (valid_until IS NULL OR valid_until > NOW()));

CREATE POLICY "Admins can manage coupons"
ON coupons FOR ALL
USING (is_admin())
WITH CHECK (is_admin());

-- ============================================
-- ORDERS (user's own, admin all)
-- ============================================

CREATE POLICY "Users can view own orders"
ON orders FOR SELECT
USING (auth.uid() = user_id OR is_admin());

CREATE POLICY "Users can create orders"
ON orders FOR INSERT
WITH CHECK (auth.uid() = user_id OR (user_id IS NULL AND session_id IS NOT NULL));

CREATE POLICY "Admins can update orders"
ON orders FOR UPDATE
USING (is_admin())
WITH CHECK (is_admin());

-- ============================================
-- ORDER ITEMS (through order ownership)
-- ============================================

CREATE POLICY "Users can view own order items"
ON order_items FOR SELECT
USING (
  order_id IN (SELECT id FROM orders WHERE user_id = auth.uid())
  OR is_admin()
);

CREATE POLICY "System can create order items"
ON order_items FOR INSERT
WITH CHECK (true); -- Created by place_order function

-- ============================================
-- RETURNS (user's own)
-- ============================================

CREATE POLICY "Users can manage own returns"
ON returns FOR ALL
USING (auth.uid() = user_id OR is_admin())
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update returns"
ON returns FOR UPDATE
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Users can view own return items"
ON return_items FOR SELECT
USING (
  return_id IN (SELECT id FROM returns WHERE user_id = auth.uid())
  OR is_admin()
);

-- ============================================
-- REVIEWS
-- ============================================

CREATE POLICY "Anyone can read approved reviews"
ON reviews FOR SELECT
USING (is_approved = true OR auth.uid() = user_id OR is_admin());

CREATE POLICY "Users can create reviews"
ON reviews FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews"
ON reviews FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id AND is_approved = false);

CREATE POLICY "Admins can manage reviews"
ON reviews FOR ALL
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Anyone can read review images"
ON review_images FOR SELECT
USING (true);

-- ============================================
-- BACK IN STOCK REQUESTS
-- ============================================

CREATE POLICY "Users can manage own requests"
ON back_in_stock_requests FOR ALL
USING (auth.uid() = user_id OR (user_id IS NULL AND email IS NOT NULL))
WITH CHECK (auth.uid() = user_id OR (user_id IS NULL AND email IS NOT NULL));

CREATE POLICY "Admins can manage all requests"
ON back_in_stock_requests FOR UPDATE
USING (is_admin())
WITH CHECK (is_admin());

-- ============================================
-- PINCODES (public read, admin write)
-- ============================================

CREATE POLICY "Anyone can read pincodes"
ON pincodes FOR SELECT
USING (true);

CREATE POLICY "Admins can manage pincodes"
ON pincodes FOR ALL
USING (is_admin())
WITH CHECK (is_admin());

-- ============================================
-- LOYALTY TRANSACTIONS (user's own)
-- ============================================

CREATE POLICY "Users can view own loyalty transactions"
ON loyalty_transactions FOR SELECT
USING (auth.uid() = user_id OR is_admin());

-- Created by system functions only
CREATE POLICY "System can create loyalty transactions"
ON loyalty_transactions FOR INSERT
WITH CHECK (true);

-- ============================================
-- GIFT CARDS
-- ============================================

CREATE POLICY "Anyone can read gift card by code"
ON gift_cards FOR SELECT
USING (true); -- Lookup by code at redemption

CREATE POLICY "Users can create gift cards"
ON gift_cards FOR INSERT
WITH CHECK (true); -- Created during purchase

CREATE POLICY "Admins can manage gift cards"
ON gift_cards FOR ALL
USING (is_admin())
WITH CHECK (is_admin());

-- ============================================
-- STORE LOCATIONS (public read, admin write)
-- ============================================

CREATE POLICY "Anyone can read store locations"
ON store_locations FOR SELECT
USING (is_active = true OR is_admin());

CREATE POLICY "Admins can manage store locations"
ON store_locations FOR ALL
USING (is_admin())
WITH CHECK (is_admin());

-- ============================================
-- NEWSLETTER (public subscribe, admin manage)
-- ============================================

CREATE POLICY "Anyone can subscribe"
ON newsletter_subscribers FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can unsubscribe"
ON newsletter_subscribers FOR UPDATE
USING (email = auth.jwt() ->> 'email' OR true)
WITH CHECK (true);

CREATE POLICY "Admins can manage subscribers"
ON newsletter_subscribers FOR ALL
USING (is_admin())
WITH CHECK (is_admin());

-- ============================================
-- BANNERS (public read active, admin write)
-- ============================================

CREATE POLICY "Anyone can read active banners"
ON banners FOR SELECT
USING (is_active = true OR is_admin());

CREATE POLICY "Admins can manage banners"
ON banners FOR ALL
USING (is_admin())
WITH CHECK (is_admin());
