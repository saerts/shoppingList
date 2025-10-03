import { FilterContainer, FilterPill } from './FilterPills.styles';

export type FilterType = 'all' | 'completed' | 'uncompleted';

interface FilterPillsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const filters: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'completed', label: 'Completed' },
  { value: 'uncompleted', label: 'Uncompleted' },
];

export const FilterPills = ({ activeFilter, onFilterChange }: FilterPillsProps) => {
  return (
    <FilterContainer role="group" aria-label="Filter items">
      {filters.map(filter => (
        <FilterPill
          key={filter.value}
          $isActive={activeFilter === filter.value}
          onClick={() => onFilterChange(filter.value)}
          role="radio"
          aria-checked={activeFilter === filter.value}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onFilterChange(filter.value);
            }
          }}
        >
          {filter.label}
        </FilterPill>
      ))}
    </FilterContainer>
  );
};
