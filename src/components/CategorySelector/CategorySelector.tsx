import type { Category } from '../../types';
import {
  Container,
  CategoryGrid,
  CategoryCard,
  CategoryIcon,
  CategoryName,
} from './CategorySelector.styles';

interface CategorySelectorProps {
  categories: Category[];
  selectedCategoryId?: string;
  onSelect: (categoryId: string) => void;
}

export function CategorySelector({
  categories,
  selectedCategoryId,
  onSelect,
}: CategorySelectorProps) {
  return (
    <Container>
      <CategoryGrid>
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            color={category.color}
            $selected={selectedCategoryId === category.id}
            onClick={() => onSelect(category.id)}
          >
            <CategoryIcon>{category.icon}</CategoryIcon>
            <CategoryName>{category.name}</CategoryName>
          </CategoryCard>
        ))}
      </CategoryGrid>
    </Container>
  );
}
