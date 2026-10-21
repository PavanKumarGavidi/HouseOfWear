import { ProductGrid, ProductCard } from '../ui/ProductCard';
import type { ProductWithDetails } from '../../types/database';

interface RecommendationsProps {
  title: string;
  products: ProductWithDetails[];
}

export function Recommendations({ title, products }: RecommendationsProps) {
  if (products.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>
      <ProductGrid columns={4}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductGrid>
    </section>
  );
}
