-- ============================================
-- House Of Wear - Seed Data
-- 40+ sample products across Men/Women/Kids/Shoes
-- ============================================

-- ============================================
-- SECTIONS
-- ============================================

INSERT INTO sections (name, display_name, slug, description, sort_order) VALUES
('men', 'Men', 'men', 'Contemporary menswear for the modern gentleman', 1),
('women', 'Women', 'women', 'Effortless elegance for every occasion', 2),
('kids', 'Kids', 'kids', 'Playful styles for little trendsetters', 3),
('shoes', 'Shoes', 'shoes', 'Step out in style', 4);

-- ============================================
-- CATEGORIES
-- ============================================

-- MEN categories
INSERT INTO categories (section_id, name, slug, sort_order) VALUES
((SELECT id FROM sections WHERE name = 'men'), 'Shirts', 'shirts', 1),
((SELECT id FROM sections WHERE name = 'men'), 'T-Shirts', 't-shirts', 2),
((SELECT id FROM sections WHERE name = 'men'), 'Trousers', 'trousers', 3),
((SELECT id FROM sections WHERE name = 'men'), 'Jeans', 'jeans', 4),
((SELECT id FROM sections WHERE name = 'men'), 'Jackets', 'jackets', 5),
((SELECT id FROM sections WHERE name = 'men'), 'Formal Shirts', 'formal-shirts', 6),
((SELECT id FROM sections WHERE name = 'men'), 'Polo', 'polos', 7),
((SELECT id FROM sections WHERE name = 'men'), 'Hoodies', 'hoodies', 8),
((SELECT id FROM sections WHERE name = 'men'), 'Blazers', 'blazers', 9),
((SELECT id FROM sections WHERE name = 'men'), 'Shorts', 'shorts', 10);

-- WOMEN categories
INSERT INTO categories (section_id, name, slug, sort_order) VALUES
((SELECT id FROM sections WHERE name = 'women'), 'Dresses', 'dresses', 1),
((SELECT id FROM sections WHERE name = 'women'), 'Tops', 'tops', 2),
((SELECT id FROM sections WHERE name = 'women'), 'T-Shirts', 't-shirts', 3),
((SELECT id FROM sections WHERE name = 'women'), 'Trousers', 'trousers', 4),
((SELECT id FROM sections WHERE name = 'women'), 'Jeans', 'jeans', 5),
((SELECT id FROM sections WHERE name = 'women'), 'Skirts', 'skirts', 6),
((SELECT id FROM sections WHERE name = 'women'), 'Blazers', 'blazers', 7),
((SELECT id FROM sections WHERE name = 'women'), 'Co-ords', 'co-ords', 8),
((SELECT id FROM sections WHERE name = 'women'), 'Jackets', 'jackets', 9),
((SELECT id FROM sections WHERE name = 'women'), 'Sweaters', 'sweaters', 10);

-- KIDS categories
INSERT INTO categories (section_id, name, slug, sort_order) VALUES
((SELECT id FROM sections WHERE name = 'kids'), 'T-Shirts', 't-shirts', 1),
((SELECT id FROM sections WHERE name = 'kids'), 'Shirts', 'shirts', 2),
((SELECT id FROM sections WHERE name = 'kids'), 'Jeans', 'jeans', 3),
((SELECT id FROM sections WHERE name = 'kids'), 'Dresses', 'dresses', 4),
((SELECT id FROM sections WHERE name = 'kids'), 'Shorts', 'shorts', 5),
((SELECT id FROM sections WHERE name = 'kids'), 'Jackets', 'jackets', 6);

-- SHOES categories (using parent_id for men/women subcats)
INSERT INTO categories (section_id, name, slug, sort_order) VALUES
((SELECT id FROM sections WHERE name = 'shoes'), 'Men''s Shoes', 'mens-shoes', 1),
((SELECT id FROM sections WHERE name = 'shoes'), 'Women''s Shoes', 'womens-shoes', 2);

-- ============================================
-- COLLECTIONS
-- ============================================

INSERT INTO collections (name, slug, description, section_id, sort_order) VALUES
('New Arrivals', 'new-arrivals', 'Fresh drops every week', NULL, 1),
('Bestsellers', 'bestsellers', 'Our most loved pieces', NULL, 2),
('Summer Edit', 'summer-edit', 'Light layers for warm days', NULL, 3),
('Work Essentials', 'work-essentials', 'Office-ready staples', NULL, 4),
('Weekend Casual', 'weekend-casual', 'Relaxed fits for days off', NULL, 5),
('Festive Collection', 'festive-collection', 'Celebrate in style', NULL, 6);

-- ============================================
-- PRODUCTS - MEN (12 products)
-- ============================================

INSERT INTO products (name, slug, description, fabric_care, section_id, category_id, base_price, mrp, tags, is_bestseller, is_new_arrival, gender, fit, occasion) VALUES
-- Shirts
('Oxford Classic White Shirt', 'oxford-classic-white-shirt', 'A timeless white oxford shirt crafted from premium cotton. Perfect for both formal and casual occasions.', '100% Cotton. Machine wash cold. Iron on medium heat.', 
(SELECT id FROM sections WHERE name = 'men'), (SELECT id FROM categories WHERE slug = 'shirts' AND section_id = (SELECT id FROM sections WHERE name = 'men')),
2499, 3499, ARRAY['formal', 'classic', 'cotton'], true, false, 'men', 'Regular', 'Formal'),

('Linen Camp Collar Shirt', 'linen-camp-collar-shirt', 'Relaxed-fit camp collar shirt in breathable linen. Ideal for summer weekends.', '100% Linen. Hand wash recommended. Do not tumble dry.',
(SELECT id FROM sections WHERE name = 'men'), (SELECT id FROM categories WHERE slug = 'shirts' AND section_id = (SELECT id FROM sections WHERE name = 'men')),
2199, 2999, ARRAY['casual', 'summer', 'linen'], false, true, 'men', 'Relaxed', 'Casual'),

-- T-Shirts
('Essential Crew Neck Tee', 'essential-crew-neck-tee', 'The perfect everyday tee in soft Supima cotton. A wardrobe essential.', '100% Supima Cotton. Machine wash cold inside out.',
(SELECT id FROM sections WHERE name = 'men'), (SELECT id FROM categories WHERE slug = 't-shirts' AND section_id = (SELECT id FROM sections WHERE name = 'men')),
999, 1499, ARRAY['essential', 'cotton', 'basic'], true, false, 'men', 'Regular', 'Casual'),

('Graphic Print Oversized Tee', 'graphic-print-oversized-tee', 'Statement graphic tee with oversized silhouette. Premium cotton with vintage wash.', '100% Cotton. Machine wash cold. Print inside out.',
(SELECT id FROM sections WHERE name = 'men'), (SELECT id FROM categories WHERE slug = 't-shirts' AND section_id = (SELECT id FROM sections WHERE name = 'men')),
1299, 1999, ARRAY['graphic', 'oversized', 'streetwear'], false, true, 'men', 'Oversized', 'Casual'),

-- Trousers
('Tailored Chino Trousers', 'tailored-chino-trousers', 'Slim-fit chinos in stretch cotton twill. Versatile enough for office or evening.', '98% Cotton, 2% Elastane. Machine wash cold.',
(SELECT id FROM sections WHERE name = 'men'), (SELECT id FROM categories WHERE slug = 'trousers' AND section_id = (SELECT id FROM sections WHERE name = 'men')),
2799, 3999, ARRAY['formal', 'chino', 'versatile'], true, false, 'men', 'Slim', 'Smart Casual'),

-- Jeans
('Selvedge Slim Jeans', 'selvedge-slim-jjeans', 'Japanese selvedge denim in a modern slim fit. Raw indigo that develops unique fades.', '100% Cotton Selvedge Denim. Wash sparingly to develop character.',
(SELECT id FROM sections WHERE name = 'men'), (SELECT id FROM categories WHERE slug = 'jeans' AND section_id = (SELECT id FROM sections WHERE name = 'men')),
3999, 5499, ARRAY['denim', 'selvedge', 'premium'], false, true, 'men', 'Slim', 'Casual'),

-- Jackets
('Bomber Jacket - Navy', 'bomber-jacket-navy', 'Classic bomber jacket in premium nylon with ribbed cuffs and hem. Lightly insulated.', 'Outer: 100% Nylon. Lining: 100% Polyester. Dry clean only.',
(SELECT id FROM sections WHERE name = 'men'), (SELECT id FROM categories WHERE slug = 'jackets' AND section_id = (SELECT id FROM sections WHERE name = 'men')),
4999, 6999, ARRAY['jacket', 'bomber', 'outerwear'], true, false, 'men', 'Regular', 'Casual'),

-- Formal Shirts
('Micro Check Formal Shirt', 'micro-check-formal-shirt', 'Refined micro-check pattern on premium poplin. Wrinkle-resistant finish for all-day sharpness.', '100% Cotton Poplin. Machine wash. Wrinkle-resistant.',
(SELECT id FROM sections WHERE name = 'men'), (SELECT id FROM categories WHERE slug = 'formal-shirts' AND section_id = (SELECT id FROM sections WHERE name = 'men')),
2299, 3299, ARRAY['formal', 'office', 'check'], false, false, 'men', 'Slim', 'Formal'),

-- Polos
('Pique Polo - Classic', 'pique-polo-classic', 'Premium pique cotton polo with a modern fit. The perfect smart-casual layer.', '100% Pique Cotton. Machine wash cold.',
(SELECT id FROM sections WHERE name = 'men'), (SELECT id FROM categories WHERE slug = 'polos' AND section_id = (SELECT id FROM sections WHERE name = 'men')),
1799, 2499, ARRAY['polo', 'classic', 'smart-casual'], true, false, 'men', 'Regular', 'Smart Casual'),

-- Hoodies
('Heavyweight Hoodie', 'heavyweight-hoodie', '450 GSM heavyweight French terry hoodie. Brushed interior for ultimate comfort.', '100% Cotton French Terry. Machine wash cold.',
(SELECT id FROM sections WHERE name = 'men'), (SELECT id FROM categories WHERE slug = 'hoodies' AND section_id = (SELECT id FROM sections WHERE name = 'men')),
2999, 3999, ARRAY['hoodie', 'heavyweight', 'comfort'], false, true, 'men', 'Regular', 'Casual'),

-- Blazers
('Unstructured Blazer - Charcoal', 'unstructured-blazer-charcoal', 'Soft-shouldered unstructured blazer in Italian wool blend. Effortless sophistication.', '70% Wool, 30% Polyester. Dry clean only.',
(SELECT id FROM sections WHERE name = 'men'), (SELECT id FROM categories WHERE slug = 'blazers' AND section_id = (SELECT id FROM sections WHERE name = 'men')),
6999, 9999, ARRAY['blazer', 'formal', 'wool'], false, false, 'men', 'Slim', 'Formal'),

-- Shorts
('Stretch Chino Shorts', 'stretch-chino-shorts', 'Comfortable stretch chino shorts with a clean finish. Above-knee length.', '97% Cotton, 3% Elastane. Machine wash cold.',
(SELECT id FROM sections WHERE name = 'men'), (SELECT id FROM categories WHERE slug = 'shorts' AND section_id = (SELECT id FROM sections WHERE name = 'men')),
1999, 2799, ARRAY['shorts', 'chino', 'summer'], false, true, 'men', 'Regular', 'Casual');

-- ============================================
-- PRODUCTS - WOMEN (12 products)
-- ============================================

INSERT INTO products (name, slug, description, fabric_care, section_id, category_id, base_price, mrp, tags, is_bestseller, is_new_arrival, gender, fit, occasion) VALUES
-- Dresses
('Midi Wrap Dress - Floral', 'midi-wrap-dress-floral', 'Elegant wrap midi dress in exclusive floral print. Viscose fabric with beautiful drape.', '100% Viscose. Hand wash cold. Line dry in shade.',
(SELECT id FROM sections WHERE name = 'women'), (SELECT id FROM categories WHERE slug = 'dresses' AND section_id = (SELECT id FROM sections WHERE name = 'women')),
3499, 4999, ARRAY['dress', 'midi', 'floral'], true, false, 'women', 'Regular', 'Party'),

('Slip Dress - Satin', 'slip-dress-satin', 'Minimalist satin slip dress with adjustable straps. Perfect for layering or wearing alone.', '100% Polyester Satin. Hand wash cold. Do not wring.',
(SELECT id FROM sections WHERE name = 'women'), (SELECT id FROM categories WHERE slug = 'dresses' AND section_id = (SELECT id FROM sections WHERE name = 'women')),
2999, 4499, ARRAY['dress', 'satin', 'evening'], false, true, 'women', 'Regular', 'Evening'),

-- Tops
('Silk Blouse - Ivory', 'silk-blouse-ivory', 'Luxurious silk blouse with mother-of-pearl buttons. Relaxed fit with subtle sheen.', '100% Silk. Dry clean only.',
(SELECT id FROM sections WHERE name = 'women'), (SELECT id FROM categories WHERE slug = 'tops' AND section_id = (SELECT id FROM sections WHERE name = 'women')),
3999, 5999, ARRAY['silk', 'blouse', 'luxury'], true, false, 'women', 'Relaxed', 'Formal'),

('Ribbed Tank Top', 'ribbed-tank-top', 'Essential ribbed tank in soft modal blend. Perfect base layer.', '70% Modal, 30% Cotton. Machine wash cold.',
(SELECT id FROM sections WHERE name = 'women'), (SELECT id FROM categories WHERE slug = 'tops' AND section_id = (SELECT id FROM sections WHERE name = 'women')),
899, 1299, ARRAY['tank', 'basic', 'essential'], false, false, 'women', 'Fitted', 'Casual'),

-- T-Shirts
('Boyfriend Fit Tee', 'boyfriend-fit-tee', 'Relaxed boyfriend-fit tee in organic cotton. Slightly dropped shoulders.', '100% Organic Cotton. Machine wash cold.',
(SELECT id FROM sections WHERE name = 'women'), (SELECT id FROM categories WHERE slug = 't-shirts' AND section_id = (SELECT id FROM sections WHERE name = 'women')),
1199, 1699, ARRAY['tee', 'organic', 'relaxed'], false, true, 'women', 'Relaxed', 'Casual'),

-- Trousers
('Wide Leg Palazzo Pants', 'wide-leg-palazzo-pants', 'Flowing wide-leg trousers in crepe fabric. High-waisted with side zip.', '100% Polyester Crepe. Machine wash gentle.',
(SELECT id FROM sections WHERE name = 'women'), (SELECT id FROM categories WHERE slug = 'trousers' AND section_id = (SELECT id FROM sections WHERE name = 'women')),
2499, 3499, ARRAY['trousers', 'wide-leg', 'elegant'], true, false, 'women', 'Wide Leg', 'Smart Casual'),

-- Jeans
('High-Rise Skinny Jeans', 'high-rise-skinny-jeans', 'Classic high-rise skinny jeans in premium stretch denim. Dark indigo wash.', '92% Cotton, 7% Polyester, 1% Elastane. Machine wash cold.',
(SELECT id FROM sections WHERE name = 'women'), (SELECT id FROM categories WHERE slug = 'jeans' AND section_id = (SELECT id FROM sections WHERE name = 'women')),
2799, 3999, ARRAY['jeans', 'skinny', 'classic'], true, false, 'women', 'Skinny', 'Casual'),

-- Skirts
('Pleated Midi Skirt', 'pleated-midi-skirt', 'Elegant pleated midi skirt with elastic waistband. Moves beautifully.', '100% Polyester. Machine wash gentle. Low iron.',
(SELECT id FROM sections WHERE name = 'women'), (SELECT id FROM categories WHERE slug = 'skirts' AND section_id = (SELECT id FROM sections WHERE name = 'women')),
2299, 3299, ARRAY['skirt', 'midi', 'pleated'], false, true, 'women', 'Regular', 'Smart Casual'),

-- Blazers
('Oversized Blazer - Black', 'oversized-blazer-black', 'Power dressing meets comfort in this oversized blazer. Structured shoulders with relaxed body.', '65% Polyester, 35% Viscose. Dry clean recommended.',
(SELECT id FROM sections WHERE name = 'women'), (SELECT id FROM categories WHERE slug = 'blazers' AND section_id = (SELECT id FROM sections WHERE name = 'women')),
4999, 6999, ARRAY['blazer', 'oversized', 'power'], false, false, 'women', 'Oversized', 'Formal'),

-- Co-ords
('Linen Co-ord Set - Beige', 'linen-coord-set-beige', 'Matching linen shirt and trouser set. Effortless coordinated style.', '100% Linen. Hand wash recommended.',
(SELECT id FROM sections WHERE name = 'women'), (SELECT id FROM categories WHERE slug = 'co-ords' AND section_id = (SELECT id FROM sections WHERE name = 'women')),
4499, 5999, ARRAY['co-ord', 'linen', 'set'], false, true, 'women', 'Regular', 'Smart Casual'),

-- Jackets
('Cropped Denim Jacket', 'cropped-denim-jacket', 'Classic cropped denim jacket with vintage wash. Button-front closure.', '100% Cotton Denim. Machine wash cold.',
(SELECT id FROM sections WHERE name = 'women'), (SELECT id FROM categories WHERE slug = 'jackets' AND section_id = (SELECT id FROM sections WHERE name = 'women')),
2999, 4299, ARRAY['jacket', 'denim', 'cropped'], true, false, 'women', 'Regular', 'Casual'),

-- Sweaters
('Cashmere Blend Pullover', 'cashmere-blend-pullover', 'Luxuriously soft cashmere blend pullover. Round neck with ribbed trim.', '60% Wool, 40% Cashmere. Hand wash cold or dry clean.',
(SELECT id FROM sections WHERE name = 'women'), (SELECT id FROM categories WHERE slug = 'sweaters' AND section_id = (SELECT id FROM sections WHERE name = 'women')),
4999, 7499, ARRAY['sweater', 'cashmere', 'luxury'], false, true, 'women', 'Regular', 'Smart Casual');

-- ============================================
-- PRODUCTS - KIDS (8 products)
-- ============================================

INSERT INTO products (name, slug, description, fabric_care, section_id, category_id, base_price, mrp, tags, is_bestseller, is_new_arrival, gender, fit, occasion) VALUES
-- T-Shirts
('Dino Print Tee - Kids', 'dino-print-tee-kids', 'Fun dinosaur print tee in soft organic cotton. Playful design kids love.', '100% Organic Cotton. Machine wash cold.',
(SELECT id FROM sections WHERE name = 'kids'), (SELECT id FROM categories WHERE slug = 't-shirts' AND section_id = (SELECT id FROM sections WHERE name = 'kids')),
699, 999, ARRAY['kids', 'dinosaur', 'fun'], true, false, 'kids', 'Regular', 'Casual'),

('Rainbow Stripe Tee', 'rainbow-stripe-tee', 'Cheerful rainbow stripe tee. Soft cotton with reinforced seams for active play.', '100% Cotton. Machine wash cold.',
(SELECT id FROM sections WHERE name = 'kids'), (SELECT id FROM categories WHERE slug = 't-shirts' AND section_id = (SELECT id FROM sections WHERE name = 'kids')),
599, 899, ARRAY['kids', 'rainbow', 'colorful'], false, true, 'kids', 'Regular', 'Casual'),

-- Shirts
('Check Button-Down Shirt', 'check-button-down-shirt-kids', 'Smart check shirt for little gentlemen. Soft cotton with easy button closure.', '100% Cotton. Machine wash cold.',
(SELECT id FROM sections WHERE name = 'kids'), (SELECT id FROM categories WHERE slug = 'shirts' AND section_id = (SELECT id FROM sections WHERE name = 'kids')),
999, 1499, ARRAY['kids', 'check', 'smart'], false, false, 'kids', 'Regular', 'Smart Casual'),

-- Jeans
('Stretch Skinny Jeans - Kids', 'stretch-skinny-jeans-kids', 'Comfortable stretch jeans with adjustable waistband. Durable for active kids.', '95% Cotton, 5% Elastane. Machine wash cold.',
(SELECT id FROM sections WHERE name = 'kids'), (SELECT id FROM categories WHERE slug = 'jeans' AND section_id = (SELECT id FROM sections WHERE name = 'kids')),
1299, 1799, ARRAY['kids', 'jeans', 'stretch'], true, false, 'kids', 'Slim', 'Casual'),

-- Dresses
('Floral Party Dress', 'floral-party-dress-kids', 'Beautiful floral dress for special occasions. Twirl-worthy skirt with tulle overlay.', 'Outer: 100% Polyester. Lining: 100% Cotton. Gentle machine wash.',
(SELECT id FROM sections WHERE name = 'kids'), (SELECT id FROM categories WHERE slug = 'dresses' AND section_id = (SELECT id FROM sections WHERE name = 'kids')),
1799, 2499, ARRAY['kids', 'dress', 'party'], false, true, 'kids', 'Regular', 'Party'),

-- Shorts
('Cargo Shorts - Khaki', 'cargo-shorts-khaki-kids', 'Durable cargo shorts with multiple pockets. Perfect for outdoor adventures.', '100% Cotton Twill. Machine wash cold.',
(SELECT id FROM sections WHERE name = 'kids'), (SELECT id FROM categories WHERE slug = 'shorts' AND section_id = (SELECT id FROM sections WHERE name = 'kids')),
899, 1299, ARRAY['kids', 'cargo', 'outdoor'], false, false, 'kids', 'Regular', 'Casual'),

-- Jackets
('Puffer Vest - Kids', 'puffer-vest-kids', 'Lightweight puffer vest with water-resistant shell. Warm without bulk.', 'Outer: 100% Polyester. Fill: Recycled Polyester. Machine wash gentle.',
(SELECT id FROM sections WHERE name = 'kids'), (SELECT id FROM categories WHERE slug = 'jackets' AND section_id = (SELECT id FROM sections WHERE name = 'kids')),
1499, 2199, ARRAY['kids', 'puffer', 'vest'], false, true, 'kids', 'Regular', 'Casual'),

('Windbreaker Jacket', 'windbreaker-jacket-kids', 'Colorful windbreaker with packable hood. Lightweight and water-resistant.', '100% Nylon. Machine wash cold. Tumble dry low.',
(SELECT id FROM sections WHERE name = 'kids'), (SELECT id FROM categories WHERE slug = 'jackets' AND section_id = (SELECT id FROM sections WHERE name = 'kids')),
1299, 1899, ARRAY['kids', 'windbreaker', 'outdoor'], true, false, 'kids', 'Regular', 'Casual');

-- ============================================
-- PRODUCTS - SHOES (8 products)
-- ============================================

INSERT INTO products (name, slug, description, fabric_care, section_id, category_id, base_price, mrp, tags, is_bestseller, is_new_arrival, gender, fit, occasion) VALUES
-- Men's Shoes
('Minimal Leather Sneakers', 'minimal-leather-sneakers', 'Clean-line leather sneakers with cushioned insole. Premium full-grain leather upper.', 'Genuine Leather. Wipe clean with damp cloth. Use leather conditioner.',
(SELECT id FROM sections WHERE name = 'shoes'), (SELECT id FROM categories WHERE slug = 'mens-shoes' AND section_id = (SELECT id FROM sections WHERE name = 'shoes')),
4999, 6999, ARRAY['sneakers', 'leather', 'minimal'], true, false, 'men', 'Regular', 'Casual'),

('Suede Chelsea Boots', 'suede-chelsea-boots', 'Classic Chelsea boots in premium suede. Elastic side panels with pull tab.', 'Suede Upper. Use suede brush and protector spray. Keep dry.',
(SELECT id FROM sections WHERE name = 'shoes'), (SELECT id FROM categories WHERE slug = 'mens-shoes' AND section_id = (SELECT id FROM sections WHERE name = 'shoes')),
5999, 8499, ARRAY['boots', 'chelsea', 'suede'], false, true, 'men', 'Regular', 'Smart Casual'),

('Canvas Slip-On', 'canvas-slip-on', 'Easy-going canvas slip-on with vulcanized rubber sole. Breathable and lightweight.', 'Canvas Upper, Rubber Sole. Spot clean or gentle machine wash.',
(SELECT id FROM sections WHERE name = 'shoes'), (SELECT id FROM categories WHERE slug = 'mens-shoes' AND section_id = (SELECT id FROM sections WHERE name = 'shoes')),
1999, 2799, ARRAY['slip-on', 'canvas', 'casual'], true, false, 'men', 'Regular', 'Casual'),

('Oxford Formal Shoes', 'oxford-formal-shoes', 'Hand-finished Oxford shoes in polished calfskin. Goodyear welted construction.', 'Calfskin Leather. Polish regularly. Use shoe trees.',
(SELECT id FROM sections WHERE name = 'shoes'), (SELECT id FROM categories WHERE slug = 'mens-shoes' AND section_id = (SELECT id FROM sections WHERE name = 'shoes')),
6999, 9999, ARRAY['formal', 'oxford', 'leather'], false, false, 'men', 'Regular', 'Formal'),

-- Women's Shoes
('Block Heel Mules', 'block-heel-mules', 'Elegant block heel mules in soft leather. Comfortable 2.5 inch heel for all-day wear.', 'Leather Upper & Lining. Wipe clean. Store with shoe bags.',
(SELECT id FROM sections WHERE name = 'shoes'), (SELECT id FROM categories WHERE slug = 'womens-shoes' AND section_id = (SELECT id FROM sections WHERE name = 'shoes')),
3499, 4999, ARRAY['heels', 'mules', 'leather'], true, false, 'women', 'Regular', 'Smart Casual'),

('White Leather Sneakers - Women', 'white-leather-sneakers-women', 'Clean white leather sneakers with platform sole. Versatile everyday shoe.', 'Leather Upper, Rubber Sole. Wipe clean with damp cloth.',
(SELECT id FROM sections WHERE name = 'shoes'), (SELECT id FROM categories WHERE slug = 'womens-shoes' AND section_id = (SELECT id FROM sections WHERE name = 'shoes')),
3999, 5499, ARRAY['sneakers', 'white', 'platform'], false, true, 'women', 'Regular', 'Casual'),

('Ballet Flats - Nude', 'ballet-flats-nude', 'Classic ballet flats in buttery soft leather. Memory foam insole for comfort.', 'Leather Upper & Lining. Wipe clean.',
(SELECT id FROM sections WHERE name = 'shoes'), (SELECT id FROM categories WHERE slug = 'womens-shoes' AND section_id = (SELECT id FROM sections WHERE name = 'shoes')),
2499, 3499, ARRAY['flats', 'ballet', 'classic'], true, false, 'women', 'Regular', 'Casual'),

('Strappy Sandals - Tan', 'strappy-sandals-tan', 'Minimalist strappy sandals in tan leather. Adjustable ankle strap.', 'Leather Upper. Wipe clean. Keep away from water.',
(SELECT id FROM sections WHERE name = 'shoes'), (SELECT id FROM categories WHERE slug = 'womens-shoes' AND section_id = (SELECT id FROM sections WHERE name = 'shoes')),
2999, 4299, ARRAY['sandals', 'strappy', 'summer'], false, true, 'women', 'Regular', 'Casual');

-- ============================================
-- PRODUCT VARIANTS
-- ============================================

-- MEN Shirts variants
INSERT INTO product_variants (product_id, sku, size, color, color_hex, stock, price_override) VALUES
((SELECT id FROM products WHERE slug = 'oxford-classic-white-shirt'), 'HOW-OWS-WHT-S', 'S', 'White', '#FFFFFF', 25, NULL),
((SELECT id FROM products WHERE slug = 'oxford-classic-white-shirt'), 'HOW-OWS-WHT-M', 'M', 'White', '#FFFFFF', 40, NULL),
((SELECT id FROM products WHERE slug = 'oxford-classic-white-shirt'), 'HOW-OWS-WHT-L', 'L', 'White', '#FFFFFF', 35, NULL),
((SELECT id FROM products WHERE slug = 'oxford-classic-white-shirt'), 'HOW-OWS-WHT-XL', 'XL', 'White', '#FFFFFF', 20, NULL),
((SELECT id FROM products WHERE slug = 'oxford-classic-white-shirt'), 'HOW-OWS-BLU-M', 'M', 'Blue', '#4A90D9', 30, NULL),
((SELECT id FROM products WHERE slug = 'oxford-classic-white-shirt'), 'HOW-OWS-BLU-L', 'L', 'Blue', '#4A90D9', 25, NULL);

-- MEN T-Shirts variants
INSERT INTO product_variants (product_id, sku, size, color, color_hex, stock, price_override) VALUES
((SELECT id FROM products WHERE slug = 'essential-crew-neck-tee'), 'HOW-ECT-BLK-S', 'S', 'Black', '#000000', 50, NULL),
((SELECT id FROM products WHERE slug = 'essential-crew-neck-tee'), 'HOW-ECT-BLK-M', 'M', 'Black', '#000000', 80, NULL),
((SELECT id FROM products WHERE slug = 'essential-crew-neck-tee'), 'HOW-ECT-BLK-L', 'L', 'Black', '#000000', 60, NULL),
((SELECT id FROM products WHERE slug = 'essential-crew-neck-tee'), 'HOW-ECT-BLK-XL', 'XL', 'Black', '#000000', 40, NULL),
((SELECT id FROM products WHERE slug = 'essential-crew-neck-tee'), 'HOW-ECT-WHT-M', 'M', 'White', '#FFFFFF', 50, NULL),
((SELECT id FROM products WHERE slug = 'essential-crew-neck-tee'), 'HOW-ECT-WHT-L', 'L', 'White', '#FFFFFF', 45, NULL),
((SELECT id FROM products WHERE slug = 'essential-crew-neck-tee'), 'HOW-ECT-NVY-M', 'M', 'Navy', '#1B2838', 35, NULL),
((SELECT id FROM products WHERE slug = 'essential-crew-neck-tee'), 'HOW-ECT-NVY-L', 'L', 'Navy', '#1B2838', 30, NULL);

-- MEN Trousers variants
INSERT INTO product_variants (product_id, sku, size, color, color_hex, stock, price_override) VALUES
((SELECT id FROM products WHERE slug = 'tailored-chino-trousers'), 'HOW-TCT-KHK-30', '30', 'Khaki', '#C3B091', 20, NULL),
((SELECT id FROM products WHERE slug = 'tailored-chino-trousers'), 'HOW-TCT-KHK-32', '32', 'Khaki', '#C3B091', 30, NULL),
((SELECT id FROM products WHERE slug = 'tailored-chino-trousers'), 'HOW-TCT-KHK-34', '34', 'Khaki', '#C3B091', 25, NULL),
((SELECT id FROM products WHERE slug = 'tailored-chino-trousers'), 'HOW-TCT-NVY-32', '32', 'Navy', '#1B2838', 20, NULL),
((SELECT id FROM products WHERE slug = 'tailored-chino-trousers'), 'HOW-TCT-NVY-34', '34', 'Navy', '#1B2838', 25, NULL);

-- WOMEN Dresses variants
INSERT INTO product_variants (product_id, sku, size, color, color_hex, stock, price_override) VALUES
((SELECT id FROM products WHERE slug = 'midi-wrap-dress-floral'), 'HOW-MWD-FLR-XS', 'XS', 'Floral', '#E8B4B8', 15, NULL),
((SELECT id FROM products WHERE slug = 'midi-wrap-dress-floral'), 'HOW-MWD-FLR-S', 'S', 'Floral', '#E8B4B8', 25, NULL),
((SELECT id FROM products WHERE slug = 'midi-wrap-dress-floral'), 'HOW-MWD-FLR-M', 'M', 'Floral', '#E8B4B8', 30, NULL),
((SELECT id FROM products WHERE slug = 'midi-wrap-dress-floral'), 'HOW-MWD-FLR-L', 'L', 'Floral', '#E8B4B8', 20, NULL),
((SELECT id FROM products WHERE slug = 'midi-wrap-dress-floral'), 'HOW-MWD-FLR-XL', 'XL', 'Floral', '#E8B4B8', 10, NULL);

-- WOMEN Jeans variants
INSERT INTO product_variants (product_id, sku, size, color, color_hex, stock, price_override) VALUES
((SELECT id FROM products WHERE slug = 'high-rise-skinny-jeans'), 'HOW-HRS-DNK-26', '26', 'Dark Indigo', '#1A1A4E', 20, NULL),
((SELECT id FROM products WHERE slug = 'high-rise-skinny-jeans'), 'HOW-HRS-DNK-28', '28', 'Dark Indigo', '#1A1A4E', 30, NULL),
((SELECT id FROM products WHERE slug = 'high-rise-skinny-jeans'), 'HOW-HRS-DNK-30', '30', 'Dark Indigo', '#1A1A4E', 25, NULL),
((SELECT id FROM products WHERE slug = 'high-rise-skinny-jeans'), 'HOW-HRS-DNK-32', '32', 'Dark Indigo', '#1A1A4E', 20, NULL),
((SELECT id FROM products WHERE slug = 'high-rise-skinny-jeans'), 'HOW-HRS-BLK-28', '28', 'Black', '#000000', 25, NULL),
((SELECT id FROM products WHERE slug = 'high-rise-skinny-jeans'), 'HOW-HRS-BLK-30', '30', 'Black', '#000000', 20, NULL);

-- SHOES variants
INSERT INTO product_variants (product_id, sku, size, color, color_hex, stock, price_override) VALUES
((SELECT id FROM products WHERE slug = 'minimal-leather-sneakers'), 'HOW-MLS-WHT-8', '8', 'White', '#FFFFFF', 15, NULL),
((SELECT id FROM products WHERE slug = 'minimal-leather-sneakers'), 'HOW-MLS-WHT-9', '9', 'White', '#FFFFFF', 20, NULL),
((SELECT id FROM products WHERE slug = 'minimal-leather-sneakers'), 'HOW-MLS-WHT-10', '10', 'White', '#FFFFFF', 25, NULL),
((SELECT id FROM products WHERE slug = 'minimal-leather-sneakers'), 'HOW-MLS-WHT-11', '11', 'White', '#FFFFFF', 15, NULL),
((SELECT id FROM products WHERE slug = 'minimal-leather-sneakers'), 'HOW-MLS-BLK-9', '9', 'Black', '#000000', 15, NULL),
((SELECT id FROM products WHERE slug = 'minimal-leather-sneakers'), 'HOW-MLS-BLK-10', '10', 'Black', '#000000', 20, NULL),
((SELECT id FROM products WHERE slug = 'block-heel-mules'), 'HOW-BHM-BLK-5', '5', 'Black', '#000000', 10, NULL),
((SELECT id FROM products WHERE slug = 'block-heel-mules'), 'HOW-BHM-BLK-6', '6', 'Black', '#000000', 15, NULL),
((SELECT id FROM products WHERE slug = 'block-heel-mules'), 'HOW-BHM-BLK-7', '7', 'Black', '#000000', 15, NULL),
((SELECT id FROM products WHERE slug = 'block-heel-mules'), 'HOW-BHM-BLK-8', '8', 'Black', '#000000', 10, NULL),
((SELECT id FROM products WHERE slug = 'block-heel-mules'), 'HOW-BHM-NDE-6', '6', 'Nude', '#E8C4A0', 10, NULL),
((SELECT id FROM products WHERE slug = 'block-heel-mules'), 'HOW-BHM-NDE-7', '7', 'Nude', '#E8C4A0', 12, NULL);

-- KIDS variants
INSERT INTO product_variants (product_id, sku, size, color, color_hex, stock, price_override) VALUES
((SELECT id FROM products WHERE slug = 'dino-print-tee-kids'), 'HOW-DPT-GRN-4-5', '4-5Y', 'Green', '#4CAF50', 30, NULL),
((SELECT id FROM products WHERE slug = 'dino-print-tee-kids'), 'HOW-DPT-GRN-6-7', '6-7Y', 'Green', '#4CAF50', 35, NULL),
((SELECT id FROM products WHERE slug = 'dino-print-tee-kids'), 'HOW-DPT-GRN-8-9', '8-9Y', 'Green', '#4CAF50', 25, NULL),
((SELECT id FROM products WHERE slug = 'dino-print-tee-kids'), 'HOW-DPT-BLU-6-7', '6-7Y', 'Blue', '#2196F3', 20, NULL),
((SELECT id FROM products WHERE slug = 'dino-print-tee-kids'), 'HOW-DPT-BLU-8-9', '8-9Y', 'Blue', '#2196F3', 20, NULL),
((SELECT id FROM products WHERE slug = 'floral-party-dress-kids'), 'HOW-FPD-PNK-4-5', '4-5Y', 'Pink', '#FF69B4', 15, NULL),
((SELECT id FROM products WHERE slug = 'floral-party-dress-kids'), 'HOW-FPD-PNK-6-7', '6-7Y', 'Pink', '#FF69B4', 20, NULL),
((SELECT id FROM products WHERE slug = 'floral-party-dress-kids'), 'HOW-FPD-PNK-8-9', '8-9Y', 'Pink', '#FF69B4', 15, NULL);

-- ============================================
-- PRODUCT IMAGES (using placeholder URLs)
-- ============================================

-- We'll use picsum.photos for placeholder images
-- In production, these would be Supabase Storage URLs

INSERT INTO product_images (product_id, url, alt_text, sort_order, is_primary) VALUES
-- Oxford Shirt
((SELECT id FROM products WHERE slug = 'oxford-classic-white-shirt'), 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=800&fit=crop', 'Oxford Classic White Shirt - Front', 1, true),
((SELECT id FROM products WHERE slug = 'oxford-classic-white-shirt'), 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop', 'Oxford Classic White Shirt - Back', 2, false),
-- Essential Tee
((SELECT id FROM products WHERE slug = 'essential-crew-neck-tee'), 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop', 'Essential Crew Neck Tee - Front', 1, true),
((SELECT id FROM products WHERE slug = 'essential-crew-neck-tee'), 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=800&fit=crop', 'Essential Crew Neck Tee - Detail', 2, false),
-- Chino Trousers
((SELECT id FROM products WHERE slug = 'tailored-chino-trousers'), 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=800&fit=crop', 'Tailored Chino Trousers - Front', 1, true),
-- Bomber Jacket
((SELECT id FROM products WHERE slug = 'bomber-jacket-navy'), 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop', 'Bomber Jacket Navy - Front', 1, true),
((SELECT id FROM products WHERE slug = 'bomber-jacket-navy'), 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop', 'Bomber Jacket Navy - Side', 2, false),
-- Midi Wrap Dress
((SELECT id FROM products WHERE slug = 'midi-wrap-dress-floral'), 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=800&fit=crop', 'Midi Wrap Dress Floral - Front', 1, true),
((SELECT id FROM products WHERE slug = 'midi-wrap-dress-floral'), 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop', 'Midi Wrap Dress Floral - Back', 2, false),
-- Silk Blouse
((SELECT id FROM products WHERE slug = 'silk-blouse-ivory'), 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&h=800&fit=crop', 'Silk Blouse Ivory - Front', 1, true),
-- High Rise Jeans
((SELECT id FROM products WHERE slug = 'high-rise-skinny-jeans'), 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=800&fit=crop', 'High Rise Skinny Jeans - Front', 1, true),
((SELECT id FROM products WHERE slug = 'high-rise-skinny-jeans'), 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=800&fit=crop', 'High Rise Skinny Jeans - Back', 2, false),
-- Sneakers
((SELECT id FROM products WHERE slug = 'minimal-leather-sneakers'), 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop', 'Minimal Leather Sneakers - Side', 1, true),
((SELECT id FROM products WHERE slug = 'minimal-leather-sneakers'), 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&h=800&fit=crop', 'Minimal Leather Sneakers - Top', 2, false),
-- Block Heel Mules
((SELECT id FROM products WHERE slug = 'block-heel-mules'), 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=800&fit=crop', 'Block Heel Mules - Side', 1, true),
-- Dino Tee Kids
((SELECT id FROM products WHERE slug = 'dino-print-tee-kids'), 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&h=800&fit=crop', 'Dino Print Tee - Front', 1, true),
-- Floral Party Dress Kids
((SELECT id FROM products WHERE slug = 'floral-party-dress-kids'), 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&h=800&fit=crop', 'Floral Party Dress - Front', 1, true),
-- Heavyweight Hoodie
((SELECT id FROM products WHERE slug = 'heavyweight-hoodie'), 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop', 'Heavyweight Hoodie - Front', 1, true),
-- Linen Camp Collar
((SELECT id FROM products WHERE slug = 'linen-camp-collar-shirt'), 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop', 'Linen Camp Collar Shirt - Front', 1, true),
-- Oversized Blazer Women
((SELECT id FROM products WHERE slug = 'oversized-blazer-black'), 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=600&h=800&fit=crop', 'Oversized Blazer Black - Front', 1, true),
-- Chelsea Boots
((SELECT id FROM products WHERE slug = 'suede-chelsea-boots'), 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&h=800&fit=crop', 'Suede Chelsea Boots - Side', 1, true),
-- Ballet Flats
((SELECT id FROM products WHERE slug = 'ballet-flats-nude'), 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=600&h=800&fit=crop', 'Ballet Flats Nude - Top', 1, true),
-- Puffer Vest Kids
((SELECT id FROM products WHERE slug = 'puffer-vest-kids'), 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&h=800&fit=crop', 'Puffer Vest Kids - Front', 1, true),
-- Slip Dress
((SELECT id FROM products WHERE slug = 'slip-dress-satin'), 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop', 'Slip Dress Satin - Front', 1, true),
-- Linen Co-ord
((SELECT id FROM products WHERE slug = 'linen-coord-set-beige'), 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop', 'Linen Co-ord Set - Full Look', 1, true),
-- White Sneakers Women
((SELECT id FROM products WHERE slug = 'white-leather-sneakers-women'), 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=800&fit=crop', 'White Leather Sneakers Women - Side', 1, true),
-- Graphic Print Tee
((SELECT id FROM products WHERE slug = 'graphic-print-oversized-tee'), 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop', 'Graphic Print Oversized Tee - Front', 1, true),
-- Selvedge Jeans
((SELECT id FROM products WHERE slug = 'selvedge-slim-jjeans'), 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=800&fit=crop', 'Selvedge Slim Jeans - Front', 1, true),
-- Pique Polo
((SELECT id FROM products WHERE slug = 'pique-polo-classic'), 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&h=800&fit=crop', 'Pique Polo Classic - Front', 1, true),
-- Cropped Denim Jacket
((SELECT id FROM products WHERE slug = 'cropped-denim-jacket'), 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&h=800&fit=crop', 'Cropped Denim Jacket - Front', 1, true),
-- Oxford Formal Shoes
((SELECT id FROM products WHERE slug = 'oxford-formal-shoes'), 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&h=800&fit=crop', 'Oxford Formal Shoes - Side', 1, true),
-- Strappy Sandals
((SELECT id FROM products WHERE slug = 'strappy-sandals-tan'), 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&h=800&fit=crop', 'Strappy Sandals Tan - Side', 1, true);

-- ============================================
-- COUPONS
-- ============================================

INSERT INTO coupons (code, type, value, min_cart_value, max_discount, usage_limit, per_user_limit, is_active, is_preonly, valid_from, valid_until, description, auto_apply, priority) VALUES
('WELCOME10', 'percentage', 10, 1999, 500, 10000, 1, true, false, NOW(), NOW() + INTERVAL '90 days', '10% off on first order above ₹1,999', true, 1),
('SUMMER14', 'percentage', 14, 10000, 2000, 5000, 2, true, true, NOW(), NOW() + INTERVAL '60 days', '14% off on ₹10,000+ prepaid orders', false, 2),
('FLAT500', 'flat', 500, 3000, NULL, 2000, 1, true, false, NOW(), NOW() + INTERVAL '30 days', 'Flat ₹500 off on orders above ₹3,000', false, 3),
('VIP20', 'percentage', 20, 5000, 1500, 500, 3, true, true, NOW(), NOW() + INTERVAL '180 days', 'Exclusive 20% off for VIP members', false, 5),
('FREESHIP', 'flat', 79, 0, 79, NULL, NULL, true, false, NOW(), NULL, 'Free shipping on all orders', true, 0);

-- ============================================
-- PINCODES (sample)
-- ============================================

INSERT INTO pincodes (pincode, city, state, serviceable, cod_available, eta_days_min, eta_days_max, shipping_charge) VALUES
('110001', 'New Delhi', 'Delhi', true, true, 2, 4, 0),
('110002', 'New Delhi', 'Delhi', true, true, 2, 4, 0),
('110003', 'New Delhi', 'Delhi', true, true, 2, 4, 0),
('400001', 'Mumbai', 'Maharashtra', true, true, 2, 4, 0),
('400002', 'Mumbai', 'Maharashtra', true, true, 2, 4, 0),
('400003', 'Mumbai', 'Maharashtra', true, true, 2, 4, 0),
('560001', 'Bangalore', 'Karnataka', true, true, 3, 5, 0),
('560002', 'Bangalore', 'Karnataka', true, true, 3, 5, 0),
('600001', 'Chennai', 'Tamil Nadu', true, true, 3, 5, 0),
('600002', 'Chennai', 'Tamil Nadu', true, true, 3, 5, 0),
('500001', 'Hyderabad', 'Telangana', true, true, 3, 5, 0),
('500002', 'Hyderabad', 'Telangana', true, true, 3, 5, 0),
('700001', 'Kolkata', 'West Bengal', true, true, 4, 6, 49),
('411001', 'Pune', 'Maharashtra', true, true, 3, 5, 0),
('380001', 'Ahmedabad', 'Gujarat', true, true, 3, 5, 0),
('302001', 'Jaipur', 'Rajasthan', true, true, 4, 6, 49),
('226001', 'Lucknow', 'Uttar Pradesh', true, true, 4, 6, 49),
('144001', 'Jalandhar', 'Punjab', true, false, 5, 7, 79),
('695001', 'Thiruvananthapuram', 'Kerala', true, true, 4, 7, 49),
('000000', 'Remote Area', 'Other', false, false, 0, 0, 0);

-- ============================================
-- STORE LOCATIONS
-- ============================================

INSERT INTO store_locations (name, slug, address, city, state, pincode, phone, latitude, longitude, timings) VALUES
('House Of Wear - Mumbai', 'mumbai', 'Linking Road, Bandra West', 'Mumbai', 'Maharashtra', '400050', '+91-22-26480001', 19.0544, 72.8248, 'Mon-Sun: 11AM - 9PM'),
('House Of Wear - Delhi', 'delhi', 'Select Citywalk, Saket', 'New Delhi', 'Delhi', '110017', '+91-11-46080001', 28.5244, 77.2066, 'Mon-Sun: 10:30AM - 9:30PM'),
('House Of Wear - Bangalore', 'bangalore', 'UB City, Vittal Mallya Road', 'Bangalore', 'Karnataka', '560001', '+91-80-46080001', 12.9716, 77.5946, 'Mon-Sun: 11AM - 9PM');

-- ============================================
-- BANNERS
-- ============================================

INSERT INTO banners (title, subtitle, image_url, link_url, link_text, position, section_id, is_active, sort_order) VALUES
('New Season Arrivals', 'Discover the latest collection', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=800&fit=crop', '/collections/new-arrivals', 'Shop Now', 'hero', NULL, true, 1),
('Summer Essentials', 'Light layers for warm days ahead', 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&h=800&fit=crop', '/collections/summer-edit', 'Explore', 'hero', NULL, true, 2),
('The Mens Edit', 'Refined essentials for the modern man', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=960&h=600&fit=crop', '/collections/men', 'Shop Men', 'category', (SELECT id FROM sections WHERE name = 'men'), true, 1),
('The Womens Edit', 'Effortless elegance', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=960&h=600&fit=crop', '/collections/women', 'Shop Women', 'category', (SELECT id FROM sections WHERE name = 'women'), true, 1),
('Kids Collection', 'Playful styles for little ones', 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=960&h=600&fit=crop', '/collections/kids', 'Shop Kids', 'category', (SELECT id FROM sections WHERE name = 'kids'), true, 1),
('Step Into Style', 'Footwear for every occasion', 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=960&h=600&fit=crop', '/collections/shoes', 'Shop Shoes', 'category', (SELECT id FROM sections WHERE name = 'shoes'), true, 1);

-- ============================================
-- COLLECTION_PRODUCTS (assign products to collections)
-- ============================================

-- New Arrivals
INSERT INTO collection_products (collection_id, product_id, sort_order)
SELECT (SELECT id FROM collections WHERE slug = 'new-arrivals'), p.id, ROW_NUMBER() OVER ()
FROM products p WHERE p.is_new_arrival = true;

-- Bestsellers
INSERT INTO collection_products (collection_id, product_id, sort_order)
SELECT (SELECT id FROM collections WHERE slug = 'bestsellers'), p.id, ROW_NUMBER() OVER ()
FROM products p WHERE p.is_bestseller = true;

-- Summer Edit
INSERT INTO collection_products (collection_id, product_id, sort_order)
SELECT (SELECT id FROM collections WHERE slug = 'summer-edit'), p.id, ROW_NUMBER() OVER ()
FROM products p WHERE 'summer' = ANY(p.tags);

-- Work Essentials
INSERT INTO collection_products (collection_id, product_id, sort_order)
SELECT (SELECT id FROM collections WHERE slug = 'work-essentials'), p.id, ROW_NUMBER() OVER ()
FROM products p WHERE p.occasion = 'Formal' OR p.occasion = 'Smart Casual';
