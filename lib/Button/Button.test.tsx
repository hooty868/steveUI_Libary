// Button.test.tsx
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Button } from './Button';

describe('Button 元件', () => {
  // it('在不提供 href 時，應渲染一個 <button> 元素', () => {
  //   render(<Button>Click Me!</Button>);
  //   const buttonElement = screen.getByRole('button', { name: /click me!/i });
  //   expect(buttonElement).toBeInTheDocument();
  //   expect(buttonElement.tagName).toBe('BUTTON');
  // });

  it('提供 href 時，應渲染一個 <a> 元素，且具有正確的 href 屬性', () => {
    const testHref = 'https://example.com';
    render(<Button href={testHref}>Link Button</Button>);
    const linkElement = screen.getByRole('link', { name: /link button/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', testHref);
    expect(linkElement.tagName).toBe('A');
  });

  // it('點擊時應呼叫 onClick 事件', async () => {
  //   const onClick = vi.fn();
  //   render(<Button onClick={onClick}>Click Me!</Button>);
  //   const buttonElement = screen.getByRole('button', { name: /click me!/i });
  //   await userEvent.click(buttonElement);
  //   expect(onClick).toHaveBeenCalledTimes(1);
  // });

  // it('disabled 時點擊不會觸發 onClick', async () => {
  //   const onClick = vi.fn();
  //   render(
  //     <Button
  //       onClick={onClick}
  //       disabled
  //     >
  //       Disabled Button
  //     </Button>,
  //   );
  //   const buttonElement = screen.getByRole('button', { name: /disabled button/i });
  //   await userEvent.click(buttonElement);
  //   expect(onClick).not.toHaveBeenCalled();
  //   expect(buttonElement).toBeDisabled();
  // });
});
