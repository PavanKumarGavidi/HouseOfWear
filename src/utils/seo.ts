// SEO utility functions for meta tags and structured data

export interface SEOData {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'product' | 'article';
  price?: number;
  currency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
}

/**
 * Update page meta tags for SEO
 */
export function updateMetaTags(data: SEOData) {
  if (typeof document === 'undefined') return;

  // Update title
  document.title = data.title;

  // Update or create meta description
  updateMetaTag('description', data.description);

  // Open Graph tags
  updateMetaTag('og:title', data.title, 'property');
  updateMetaTag('og:description', data.description, 'property');
  updateMetaTag('og:type', data.type || 'website', 'property');
  
  if (data.image) {
    updateMetaTag('og:image', data.image, 'property');
  }
  
  if (data.url) {
    updateMetaTag('og:url', data.url, 'property');
  }

  // Twitter Card tags
  updateMetaTag('twitter:card', 'summary_large_image');
  updateMetaTag('twitter:title', data.title);
  updateMetaTag('twitter:description', data.description);
  
  if (data.image) {
    updateMetaTag('twitter:image', data.image);
  }

  // Product-specific tags
  if (data.type === 'product' && data.price) {
    updateMetaTag('product:price:amount', data.price.toString(), 'property');
    updateMetaTag('product:price:currency', data.currency || 'INR', 'property');
  }
}

/**
 * Helper function to update or create meta tags
 */
function updateMetaTag(name: string, content: string, attribute: 'name' | 'property' = 'name') {
  let meta = document.querySelector(`meta[${attribute}="${name}"]`);
  
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, name);
    document.head.appendChild(meta);
  }
  
  meta.setAttribute('content', content);
}

/**
 * Generate JSON-LD structured data for a product
 */
export function generateProductSchema(product: {
  name: string;
  description: string;
  image: string;
  price: number;
  originalPrice?: number;
  currency?: string;
  availability: 'InStock' | 'OutOfStock' | 'PreOrder';
  sku?: string;
  brand?: string;
  rating?: number;
  reviewCount?: number;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.sku || '',
    brand: {
      '@type': 'Brand',
      name: product.brand || 'House of Wear',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: product.currency || 'INR',
      price: product.price,
      availability: `https://schema.org/${product.availability}`,
      url: typeof window !== 'undefined' ? window.location.href : '',
    },
  };

  if (product.originalPrice && product.originalPrice > product.price) {
    (schema.offers as any).priceValidUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];
  }

  if (product.rating && product.reviewCount) {
    (schema as any).aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    };
  }

  return schema;
}

/**
 * Generate JSON-LD structured data for a collection/category
 */
export function generateCollectionSchema(collection: {
  name: string;
  description: string;
  url: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: collection.name,
    description: collection.description,
    url: collection.url,
    ...(collection.image && { image: collection.image }),
  };
}

/**
 * Generate JSON-LD structured data for the website
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'House of Wear',
    url: typeof window !== 'undefined' ? window.location.origin : '',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: typeof window !== 'undefined' 
          ? `${window.location.origin}/#/search?q={search_term_string}`
          : '',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Inject JSON-LD script into the page
 */
export function injectSchema(schema: any) {
  if (typeof document === 'undefined') return;

  // Remove existing JSON-LD scripts
  const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
  existingScripts.forEach(script => script.remove());

  // Create and inject new script
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(schema);
  document.head.appendChild(script);
}

/**
 * Generate canonical URL
 */
export function setCanonicalUrl(url: string) {
  if (typeof document === 'undefined') return;

  let link = document.querySelector('link[rel="canonical"]');
  
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  
  link.setAttribute('href', url);
}

/**
 * Preload critical images
 */
export function preloadImage(url: string) {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = url;
  document.head.appendChild(link);
}

/**
 * Generate sitemap.xml content
 */
export function generateSitemap(routes: string[], baseUrl: string): string {
  const urls = routes.map(route => {
    return `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
}

/**
 * Generate robots.txt content
 */
export function generateRobots(baseUrl: string): string {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Disallow admin and private routes
Disallow: /admin
Disallow: /account
Disallow: /checkout
Disallow: /cart

# Allow product and collection pages
Allow: /collections
Allow: /products
Allow: /gift-cards
`;
}
