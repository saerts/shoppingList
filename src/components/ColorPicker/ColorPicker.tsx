import React from 'react';
import { Container, ColorOption, Label } from './ColorPicker.styles';

const PRESET_COLORS = [
  { name: 'Yellow', value: '#FFD600' },
  { name: 'Blue', value: '#4A90E2' },
  { name: 'Green', value: '#50C878' },
  { name: 'Red', value: '#FF6B6B' },
  { name: 'Purple', value: '#9B59B6' },
  { name: 'Orange', value: '#FF8C42' },
];

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange, label }) => {
  return (
    <div>
      {label && <Label>{label}</Label>}
      <Container>
        {PRESET_COLORS.map((color) => (
          <ColorOption
            key={color.value}
            $color={color.value}
            $selected={value.toLowerCase() === color.value.toLowerCase()}
            onClick={() => onChange(color.value)}
            aria-label={`Select ${color.name} color`}
            role="radio"
            aria-checked={value.toLowerCase() === color.value.toLowerCase()}
          />
        ))}
      </Container>
    </div>
  );
};
