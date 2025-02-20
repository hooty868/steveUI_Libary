import React, { forwardRef, type InputHTMLAttributes, useCallback, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { cva, type VariantProps } from 'class-variance-authority';
import RippleWrapper from '../utils/wrapper/RippleWrapper';

export interface BaseRadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否被勾選（受控模式） */
  checked?: boolean;
  /** 預設是否勾選（非受控模式） */
  defaultChecked?: boolean;
  /** 變更時的 callback */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** 顯示的文字或任意 node */
  children?: React.ReactNode;
}

const radioStyles = cva('inline-flex items-center cursor-pointer select-none relative', {
  variants: {
    color: {
      default: '',
      primary: '',
      danger: '',
    },
    size: {
      small: '',
      middle: '',
      large: '',
    },
    disabled: {
      true: 'cursor-not-allowed opacity-60',
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
      class: 'text-[#1677ff]',
    },
    {
      color: 'danger',
      checked: true,
      class: 'text-[#ff4d4f]',
    },
  ],
  defaultVariants: {
    color: 'default',
    size: 'middle',
    disabled: false,
    checked: false,
  },
});

/**
 * - 除了直接 forwardRef 到 <input type="radio" />
 * - 可以由外部決定受控 or 非受控
 */
export const Radio = forwardRef<
  HTMLInputElement,
  BaseRadioProps & VariantProps<typeof radioStyles>
>((props, ref) => {
  const {
    color,
    size,
    disabled = false,
    checked,
    defaultChecked,
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

  // 生成最終 label className
  const labelClassName = twMerge(
    radioStyles({
      color,
      size,
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
          onChange={handleChange}
          className="mr-2 h-4 w-4 cursor-pointer accent-current"
          // TODO: 可以用 accent-color / appearance-none 做更進階自訂
          {...rest}
        />
      </RippleWrapper>
      <span>{children}</span>
    </label>
  );
});

Radio.displayName = 'Radio';
