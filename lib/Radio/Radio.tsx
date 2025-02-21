import React, { forwardRef, type InputHTMLAttributes, useCallback, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { cva, type VariantProps } from 'class-variance-authority';
import RippleWrapper from '../utils/wrapper/RippleWrapper';

export interface BaseRadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Get focus when component mounted */
  autoFocus?: boolean;
  /** Whether the radio is selected */
  checked?: boolean;
  /** Initial selected state */
  defaultChecked?: boolean;
  /** Disable radio */
  disabled?: boolean;
  /** Value for comparison to determine selection */
  value?: string | number;
  /** Change callback */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Display text or any node */
  children?: React.ReactNode;
}

const radioStyles = cva('inline-flex items-center cursor-pointer select-none relative', {
  variants: {
    color: {
      default: '',
      primary: '',
      danger: '',
    },
    disabled: {
      true: 'cursor-not-allowed opacity-40',
      false: '',
    },
    checked: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    {
      color: 'primary',
      checked: true,
      class: '[&>div>input]:border-[#1677ff] [&>div>input]:checked:bg-[#1677ff]',
    },
    {
      color: 'danger',
      checked: true,
      class: '[&>div>input]:border-[#ff4d4f] [&>div>input]:checked:bg-[#ff4d4f]',
    },
    {
      disabled: true,
      checked: false,
      class: '[&>div>input]:bg-[rgba(0,0,0,0.05)]',
    },
    {
      disabled: true,
      checked: true,
      class:
        '[&>div>input]:checked:border-gray-300 [&>div>input]:checked:bg-[rgba(0,0,0,0.05)] [&>div>input]:after:bg-black',
    },
  ],
  defaultVariants: {
    color: 'default',
    disabled: false,
    checked: false,
  },
});

export const Radio = forwardRef<
  HTMLInputElement,
  BaseRadioProps & VariantProps<typeof radioStyles>
>((props, ref) => {
  const {
    color,
    autoFocus,
    disabled = false,
    checked,
    defaultChecked,
    value,
    onChange,
    children,
    className,
    ...rest
  } = props;

  const [innerChecked, setInnerChecked] = useState<boolean>(!!defaultChecked);

  const isControlled = checked !== undefined;
  const finalChecked = isControlled ? checked : innerChecked;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInnerChecked(e.target.checked);
      }
      onChange?.(e);
    },
    [isControlled, onChange],
  );

  const labelClassName = twMerge(
    radioStyles({
      color,
      disabled,
      checked: finalChecked,
    }),
    className,
  );

  return (
    <label className={labelClassName}>
      <RippleWrapper disabled={disabled}>
        <input
          ref={ref}
          type="radio"
          disabled={disabled}
          checked={finalChecked}
          value={value}
          autoFocus={autoFocus}
          onChange={handleChange}
          className="relative h-4 w-4 cursor-pointer appearance-none rounded-full border-1 border-gray-300 checked:border-transparent checked:bg-current after:absolute after:left-1/2 after:top-1/2 after:h-[50%] after:w-[50%] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-white after:opacity-0 checked:after:opacity-100"
          {...rest}
        />
      </RippleWrapper>
      <span className="ml-2">{children}</span>
    </label>
  );
});

Radio.displayName = 'Radio';
