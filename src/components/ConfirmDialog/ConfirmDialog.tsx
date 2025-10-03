import React, { useEffect } from 'react';
import {
  Overlay,
  Dialog,
  Title,
  Message,
  ButtonGroup,
  CancelButton,
  ConfirmButton,
} from './ConfirmDialog.styles';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'danger' | 'primary';
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'primary',
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <Overlay onClick={onCancel}>
      <Dialog onClick={(e) => e.stopPropagation()} role="alertdialog" aria-labelledby="dialog-title" aria-describedby="dialog-message">
        <Title id="dialog-title">{title}</Title>
        <Message id="dialog-message">{message}</Message>
        <ButtonGroup>
          <CancelButton onClick={onCancel} autoFocus>
            {cancelText}
          </CancelButton>
          <ConfirmButton onClick={onConfirm} $variant={confirmVariant}>
            {confirmText}
          </ConfirmButton>
        </ButtonGroup>
      </Dialog>
    </Overlay>
  );
};
