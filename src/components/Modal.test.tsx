import { describe, it, expect } from 'vitest';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { Modal } from './Modal';

describe('Modal', () => {
  it('renders nothing when closed', () => {
    const html = renderToString(
      createElement(Modal, {
        isOpen: false,
        onClose: () => {},
        title: 'Test Modal',
        children: createElement('p', null, 'Modal content'),
      })
    );
    expect(html).toBe('');
  });

  it('renders content when open', () => {
    const html = renderToString(
      createElement(Modal, {
        isOpen: true,
        onClose: () => {},
        title: 'Test Modal',
        children: createElement('p', null, 'Modal content'),
      })
    );
    expect(html).toContain('Test Modal');
    expect(html).toContain('Modal content');
  });

  it('has proper dialog semantics', () => {
    const html = renderToString(
      createElement(Modal, {
        isOpen: true,
        onClose: () => {},
        title: 'Test Modal',
        children: createElement('p', null, 'Content'),
      })
    );
    expect(html).toContain('role="dialog"');
    expect(html).toContain('aria-modal="true"');
    expect(html).toContain('aria-labelledby="modal-title"');
  });

  it('renders close button with aria-label', () => {
    const html = renderToString(
      createElement(Modal, {
        isOpen: true,
        onClose: () => {},
        title: 'Test Modal',
        children: createElement('p', null, 'Content'),
      })
    );
    expect(html).toContain('aria-label="Close dialog"');
  });

  it('renders backdrop overlay', () => {
    const html = renderToString(
      createElement(Modal, {
        isOpen: true,
        onClose: () => {},
        title: 'Test Modal',
        children: createElement('p', null, 'Content'),
      })
    );
    expect(html).toContain('bg-black/50');
  });
});
