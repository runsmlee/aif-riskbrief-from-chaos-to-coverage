import { describe, it, expect, vi } from 'vitest';
import { createElement, type ReactElement } from 'react';
import { renderToString } from 'react-dom/server';
import { ToastProvider, useToast } from './Toast';

describe('Toast', () => {
  describe('ToastProvider', () => {
    it('renders children inside the provider', () => {
      const html = renderToString(
        createElement(ToastProvider, null,
          createElement('div', null, 'Child content')
        )
      );
      expect(html).toContain('Child content');
    });

    it('renders toast container with aria-live for accessibility', () => {
      const html = renderToString(
        createElement(ToastProvider, null,
          createElement('div', null, 'Content')
        )
      );
      expect(html).toContain('aria-live="polite"');
      expect(html).toContain('toast-container');
    });
  });

  describe('useToast', () => {
    it('returns a no-op addToast when used outside provider (SSR fallback)', () => {
      // Create a test component that uses useToast outside the provider
      function TestConsumer(): ReactElement {
        const { addToast } = useToast();
        // Should not throw when called outside provider
        addToast('test', 'success');
        return createElement('span', null, 'consumed');
      }

      // This should not throw - the hook has a safe fallback
      expect(() => {
        renderToString(createElement(TestConsumer));
      }).not.toThrow();
    });
  });
});
