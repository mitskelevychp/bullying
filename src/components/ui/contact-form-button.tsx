'use client';

import { Button } from './button';
import { useContactForm } from './use-contact-form';

export function ContactFormButton() {
  const { openModal } = useContactForm();

  return (
    <Button onClick={openModal}>
      Запит
    </Button>
  );
}
