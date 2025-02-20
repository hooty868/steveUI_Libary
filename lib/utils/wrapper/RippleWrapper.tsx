import { useRef, useState, type MouseEvent, type ReactNode } from 'react';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

interface RippleProps {
  children: ReactNode;
  className?: string;
  withScaleOnActive?: boolean;
  color?: string;
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  [key: string]: unknown; // for restProps
}

type Ripple = {
  id: number;
  x: number;
  y: number;
  borderRadius?: string;
  backgroundColor?: string;
};

/**
 * RippleWrapper
 * @param {React.ReactNode} children - 你要包裹的任何子元素
 * @param {string} className - 加在外層的額外的 Tailwind class
 * @param {boolean} [withScaleOnActive=false] - 是否在點擊時有縮放效果
 * @param {string} color - Ripple 顏色(可自定), 預設黑色
 * @param {function} onClick - 若要外部接收點擊事件
 */
const RippleWrapper = ({
  children,
  className,
  withScaleOnActive = false,
  color,
  disabled = false,
  onClick,
  ...restProps
}: RippleProps) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    onClick?.(e);

    const rect = wrapperRef.current?.getBoundingClientRect();
    const childrenElement = wrapperRef.current?.childNodes?.[0];

    if (!rect || !childrenElement) return;
    const { borderTopLeftRadius: borderRadius, backgroundColor } = childrenElement
      ? window.getComputedStyle(childrenElement as Element)
      : {};

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple: Ripple = {
      id: Date.now(),
      x,
      y,
      borderRadius,
      backgroundColor,
    };
    setRipples((prev) => [...prev, newRipple]);
  };

  const handleAnimationEnd = (id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className={twMerge(
        classNames('relative flex', { 'active:scale-95': withScaleOnActive }, className),
      )}
      onClick={handleClick}
      {...restProps}
    >
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="animate-ripple-effect pointer-events-none absolute -z-1 rounded-full"
          style={
            {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              borderRadius: ripple.borderRadius,
              '--ripple-color': color ?? ripple.backgroundColor,
            } as React.CSSProperties
          }
          onAnimationEnd={() => handleAnimationEnd(ripple.id)}
        />
      ))}
    </div>
  );
};

export default RippleWrapper;
