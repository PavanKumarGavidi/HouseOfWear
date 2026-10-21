import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center flex-wrap gap-1 text-xs">
        <li>
          <Link to="/" className="text-brand-500 hover:text-brand-900 dark:hover:text-white transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            <ChevronRight className="w-3 h-3 text-brand-400" />
            {item.href ? (
              <Link to={item.href} className="text-brand-500 hover:text-brand-900 dark:hover:text-white transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-brand-900 dark:text-white font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
