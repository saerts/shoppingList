import { useState } from 'react';
import { useShoppingList } from '../../context/ShoppingListContext';
import { PREDEFINED_CATEGORIES } from '../../types';
import {
  Overlay,
  Modal,
  Header,
  Title,
  CloseButton,
  Content,
  CategoryList,
  CategoryItem,
  CategoryInfo,
  CategoryIcon,
  CategoryName,
  DeleteButton,
  AddForm,
  FormRow,
  Input,
  EmojiInput,
  ColorInput,
  AddButton,
} from './CategoryManager.styles';

interface CategoryManagerProps {
  onClose: () => void;
}

export function CategoryManager({ onClose }: CategoryManagerProps) {
  const { categories, addCategory, deleteCategory } = useShoppingList();
  const [newName, setNewName] = useState('');
  const [newIcon, setNewIcon] = useState('');
  const [newColor, setNewColor] = useState('#9E9E9E');

  const predefinedIds = PREDEFINED_CATEGORIES.map(c => c.id);
  const customCategories = categories.filter(c => !predefinedIds.includes(c.id));

  const handleAdd = () => {
    if (newName.trim() && newIcon.trim()) {
      addCategory(newName.trim(), newIcon.trim(), newColor);
      setNewName('');
      setNewIcon('');
      setNewColor('#9E9E9E');
    }
  };

  const handleDelete = (id: string) => {
    deleteCategory(id);
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>Manage Categories</Title>
          <CloseButton onClick={onClose}>×</CloseButton>
        </Header>

        <Content>
          <h3 style={{ marginTop: 0, color: '#fff', fontSize: '0.875rem' }}>Custom Categories</h3>

          {customCategories.length === 0 ? (
            <p style={{ color: '#888', fontSize: '0.875rem' }}>No custom categories yet</p>
          ) : (
            <CategoryList>
              {customCategories.map(category => (
                <CategoryItem key={category.id}>
                  <CategoryInfo>
                    <CategoryIcon>{category.icon}</CategoryIcon>
                    <CategoryName>{category.name}</CategoryName>
                  </CategoryInfo>
                  <DeleteButton onClick={() => handleDelete(category.id)}>
                    Delete
                  </DeleteButton>
                </CategoryItem>
              ))}
            </CategoryList>
          )}

          <h3 style={{ marginTop: '1.5rem', color: '#fff', fontSize: '0.875rem' }}>Add New Category</h3>
          <AddForm>
            <FormRow>
              <EmojiInput
                type="text"
                value={newIcon}
                onChange={(e) => setNewIcon(e.target.value)}
                placeholder="Emoji"
                maxLength={2}
              />
              <Input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Category name"
              />
              <ColorInput
                type="color"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
              />
            </FormRow>
            <AddButton
              onClick={handleAdd}
              disabled={!newName.trim() || !newIcon.trim()}
            >
              Add Category
            </AddButton>
          </AddForm>
        </Content>
      </Modal>
    </Overlay>
  );
}
