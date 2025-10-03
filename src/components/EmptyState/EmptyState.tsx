import React from 'react';
import { Container, Icon, Message } from './EmptyState.styles';

interface EmptyStateProps {
  message: string;
  icon?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message, icon }) => {
  return (
    <Container>
      {icon && <Icon>{icon}</Icon>}
      <Message>{message}</Message>
    </Container>
  );
};
