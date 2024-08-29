// useModal.js
import { useState, useCallback } from 'react';

export function useModal() {
  const [visible, setVisible] = useState(false);

  const show = useCallback(() => setVisible(true), []);
  const hide = useCallback(() => setVisible(false), []);

  return {
    visible,
    show,
    hide,
  };
}