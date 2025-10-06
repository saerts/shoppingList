import type { Category } from '../../types';
import { Badge } from './CategoryBadge.styles';

interface CategoryBadgeProps {
  category: Category;
  size?: 'small' | 'medium';
  onClick?: () => void;
}

export function CategoryBadge({ category, size = 'small', onClick }: CategoryBadgeProps) {
  return (
    <Badge
      color={category.color}
      size={size}
      onClick={onClick}
      $clickable={!!onClick}
    >
      <span className="icon">{category.icon}</span>
      <span className="name">{category.name}</span>
    </Badge>
  );
}
