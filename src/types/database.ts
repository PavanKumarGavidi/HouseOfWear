// ============================================
// House Of Wear - Database TypeScript Types
// Auto-generated from Supabase schema
// ============================================

export type UserRole = 'customer' | 'admin';
export type SectionName = 'men' | 'women' | 'kids' | 'shoes';
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned' | 'refunded';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type PaymentMethod = 'razorpay' | 'cod';
export type CouponType = 'percentage' | 'flat';
export type ReturnStatus = 'requested' | 'approved' | 'rejected' | 'picked_up' | 'refunded';
export type GenderType = 'men' | 'women' | 'unisex' | 'kids';

// ============================================
// TABLE TYPES
// ============================================

export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  email: string | null;
  avatar_url: string | null;
  role: UserRole;
  loyalty_points: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Address {
  id: string;
  user_id: string;
  label: string;
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  pincode: string;
  country: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface Section {
  id: string;
  name: SectionName;
  display_name: string;
  slug: string;
  description: string | null;
  banner_image: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  section_id: string;
  parent_id: string | null;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  section_id: string | null;
  is_active: boolean;
  starts_at: string | null;
  ends_at: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  fabric_care?: string | null;
  section_id: string;
  category_id?: string | null;
  base_price: number;
  mrp: number;
  discount_percent: number;
  tags: string[];
  is_active: boolean;
  is_bestseller: boolean;
  is_new_arrival: boolean;
  gender?: GenderType;
  fit?: string | null;
  occasion?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductVariant {
  id: string;
  product_id?: string;
  sku?: string;
  size: string;
  color: string;
  color_hex: string | null;
  stock: number;
  price_override?: number | null;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ProductImage {
  id: string;
  product_id?: string;
  variant_id?: string | null;
  url: string;
  alt_text?: string | null;
  alt?: string;
  sort_order?: number;
  is_primary: boolean;
  media_type?: 'image' | 'video';
  created_at?: string;
}

export interface Cart {
  id: string;
  user_id: string | null;
  session_id: string | null;
  coupon_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: string;
  cart_id: string;
  variant_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: CouponType;
  value: number;
  min_cart_value: number;
  max_discount: number | null;
  usage_limit: number | null;
  usage_count: number;
  per_user_limit: number | null;
  is_active: boolean;
  is_preonly: boolean;
  valid_from: string;
  valid_until: string | null;
  description: string | null;
  auto_apply: boolean;
  priority: number;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  user_id?: string | null;
  session_id?: string | null;
  email?: string | null;
  phone?: string | null;
  status: OrderStatus;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  razorpay_order_id?: string | null;
  razorpay_payment_id?: string | null;
  coupon_id?: string | null;
  coupon_code?: string | null;
  loyalty_points_used?: number;
  loyalty_points_earned?: number;
  address_snapshot: AddressSnapshot;
  notes?: string | null;
  tracking_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  variant_id: string;
  name: string;
  sku: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  mrp: number;
  image_url: string | null;
  created_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  order_id: string | null;
  rating: number;
  title: string | null;
  body: string | null;
  is_approved: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Return {
  id: string;
  order_id: string;
  user_id: string;
  status: ReturnStatus;
  reason: string;
  description: string | null;
  refund_amount: number | null;
  pickup_date: string | null;
  refund_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface Pincode {
  id: string;
  pincode: string;
  city: string | null;
  state: string | null;
  serviceable: boolean;
  cod_available: boolean;
  eta_days_min: number;
  eta_days_max: number;
  shipping_charge: number;
  created_at: string;
  updated_at: string;
}

export interface LoyaltyTransaction {
  id: string;
  user_id: string;
  order_id: string | null;
  points: number;
  type: 'earn' | 'redeem' | 'adjust' | 'expire';
  description: string | null;
  balance_after: number;
  created_at: string;
}

export interface GiftCard {
  id: string;
  code: string;
  amount: number;
  balance: number;
  buyer_name: string;
  buyer_email: string;
  recipient_name: string | null;
  recipient_email: string | null;
  message: string | null;
  is_redeemed: boolean;
  redeemed_by: string | null;
  redeemed_at: string | null;
  valid_from: string;
  valid_until: string;
  created_at: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string;
  mobile_image_url: string | null;
  link_url: string | null;
  link_text: string | null;
  position: 'hero' | 'mid_page' | 'category' | 'footer';
  section_id: string | null;
  is_active: boolean;
  starts_at: string | null;
  ends_at: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface StoreLocation {
  id: string;
  name: string;
  slug: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string | null;
  email: string | null;
  latitude: number | null;
  longitude: number | null;
  timings: string | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================
// COMPOSITE / VIEW TYPES
// ============================================

export interface AddressSnapshot {
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface ProductWithDetails extends Product {
  section_name?: SectionName;
  section_display_name?: string;
  category_name?: string;
  category_slug?: string;
  primary_image?: string;
  hover_image?: string;
  available_colors?: string[];
  in_stock_sizes?: string[];
  total_stock?: number;
  avg_rating?: number;
  review_count?: number;
  images?: ProductImage[];
  variants?: ProductVariant[];
}

export interface CartItemWithDetails extends CartItem {
  variant?: ProductVariant & {
    product?: Product;
    images?: ProductImage[];
  };
}

export interface OrderWithItems extends Order {
  items?: OrderItem[];
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface CouponValidationResult {
  is_valid: boolean;
  discount_amount: number;
  error_message: string | null;
}

export interface PincodeCheckResult {
  serviceable: boolean;
  cod_available: boolean;
  eta_min: number;
  eta_max: number;
  city: string | null;
  state: string | null;
}

export interface PlaceOrderResult {
  success: boolean;
  order_id: string | null;
  order_number: string | null;
  total_amount: number;
  error_message: string | null;
}

// ============================================
// FILTER / QUERY TYPES
// ============================================

export interface ProductFilters {
  section?: SectionName;
  category?: string;
  collection?: string;
  sizes?: string[];
  colors?: string[];
  price_min?: number;
  price_max?: number;
  fit?: string;
  occasion?: string;
  discount?: number;
  in_stock?: boolean;
  search?: string;
  sort?: 'newest' | 'price_low' | 'price_high' | 'bestseller' | 'discount';
  page?: number;
  per_page?: number;
}

export interface CartSummary {
  items: CartItemWithDetails[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  total_savings: number;
  item_count: number;
  free_shipping_remaining: number;
}
