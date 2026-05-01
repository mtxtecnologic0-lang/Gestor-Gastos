import { Category } from '../../types/expense';
import { CATEGORY_COLORS } from '../../lib/formatters';

interface CategoryBadgeProps {
  category: Category;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const color = CATEGORY_COLORS[category];
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
      style={{ backgroundColor: `${color}18`, color }}
    >
      {category}
    </span>
  );
}