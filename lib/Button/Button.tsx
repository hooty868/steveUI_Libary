import React, {
  useEffect,
  useState,
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
} from 'react';
import { twMerge } from 'tailwind-merge';
import { cva, type VariantProps } from 'class-variance-authority';
import type { BaseButtonProps } from './Button.type';

/* --------------------------------------
 * 建立 cva 样式
 * ------------------------------------ */
const buttonStyles = cva(
  // 基底樣式 (含 disabled 樣式、focus 樣式)
  'relative overflow-hidden inline-flex items-center justify-center font-medium \
   focus:outline-none rounded-md transition-colors duration-200 \
   disabled:opacity-50 disabled:pointer-events-none \
   focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500',
  {
    variants: {
      /**
       * 先定義 color（與 antd color 對應）
       */
      color: {
        default: '',
        primary: '',
        danger: '',
        pink: '',
        purple: '',
        cyan: '',
      },
      /**
       * variant：outlined | dashed | solid | filled | text | link
       */
      variant: {
        outlined: 'border bg-transparent',
        dashed: 'border border-dashed bg-transparent',
        solid: '',
        filled: '',
        text: 'bg-transparent',
        link: 'bg-transparent',
      },
      /**
       * 是否充滿父寬度
       */
      block: {
        true: 'w-full',
        false: '',
      },
      /**
       * 按鈕形狀
       */
      shape: {
        default: '',
        circle: 'rounded-full p-0',
        round: 'rounded-full',
      },
      /**
       * 按鈕大小
       * - middle & default: 皆視為「中等大小」
       * - small: 同樣字體，但更小的左右 padding
       * - large: 文字、padding 都更大
       */
      size: {
        small: '',
        default: '',
        middle: '',
        large: '',
      },
      /**
       * ghost 模式：背景透明
       * 若需要更多細節（例如字體顏色反轉），可在 compoundVariants 補充
       */
      ghost: {
        true: 'bg-transparent',
        false: '',
      },
    },
    compoundVariants: [
      // ===================== [ default色 ] =====================
      {
        color: 'default',
        variant: 'solid',
        class: 'bg-[#000000] text-white border-transparent hover:bg-opacity-90',
      },
      {
        color: 'default',
        variant: 'outlined',
        class: 'border-[#000000] text-[#000000] hover:bg-gray-100',
      },
      {
        color: 'default',
        variant: 'dashed',
        class: 'border-[#000000] border-dashed text-[#000000] hover:bg-gray-100',
      },
      {
        color: 'default',
        variant: 'filled',
        class: 'bg-[#000000] text-white border-transparent hover:bg-opacity-90',
      },
      {
        color: 'default',
        variant: 'text',
        class: 'text-[#000000] hover:bg-gray-100',
      },
      {
        color: 'default',
        variant: 'link',
        class: 'text-[#000000] hover:underline',
      },

      // ===================== [ primary色 ] =====================
      {
        color: 'primary',
        variant: 'solid',
        class: 'bg-[#1677ff] text-white border-transparent hover:bg-[#4096ff]',
      },
      {
        color: 'primary',
        variant: 'outlined',
        class: 'border-[#1677ff] text-[#1677ff] hover:bg-[#e6f4ff]',
      },
      {
        color: 'primary',
        variant: 'dashed',
        class: 'border-dashed border-[#1677ff] text-[#1677ff] hover:bg-[#e6f4ff]',
      },
      {
        color: 'primary',
        variant: 'filled',
        class: 'bg-[#1677ff] text-white border-transparent hover:bg-[#4096ff]',
      },
      {
        color: 'primary',
        variant: 'text',
        class: 'text-[#1677ff] hover:bg-[#e6f4ff]',
      },
      {
        color: 'primary',
        variant: 'link',
        class: 'text-[#1677ff] hover:underline',
      },

      // ===================== [ danger色 ] =====================
      {
        color: 'danger',
        variant: 'solid',
        class: 'bg-[#ff4d4f] text-white border-transparent hover:bg-[#ff7779]',
      },
      {
        color: 'danger',
        variant: 'outlined',
        class: 'border-[#ff4d4f] text-[#ff4d4f] hover:bg-[#fff1f0]',
      },
      {
        color: 'danger',
        variant: 'dashed',
        class: 'border-dashed border-[#ff4d4f] text-[#ff4d4f] hover:bg-[#fff1f0]',
      },
      {
        color: 'danger',
        variant: 'filled',
        class: 'bg-[#ff4d4f] text-white border-transparent hover:bg-[#ff7779]',
      },
      {
        color: 'danger',
        variant: 'text',
        class: 'text-[#ff4d4f] hover:bg-[#fff1f0]',
      },
      {
        color: 'danger',
        variant: 'link',
        class: 'text-[#ff4d4f] hover:underline',
      },

      // ===================== [ pink色 ] =====================
      {
        color: 'pink',
        variant: 'solid',
        class: 'bg-[#eb2f96] text-white border-transparent hover:bg-[#fa3faf]',
      },
      {
        color: 'pink',
        variant: 'outlined',
        class: 'border-[#eb2f96] text-[#eb2f96] hover:bg-[#fff0f6]',
      },
      {
        color: 'pink',
        variant: 'dashed',
        class: 'border-dashed border-[#eb2f96] text-[#eb2f96] hover:bg-[#fff0f6]',
      },
      {
        color: 'pink',
        variant: 'filled',
        class: 'bg-[#eb2f96] text-white border-transparent hover:bg-[#fa3faf]',
      },
      {
        color: 'pink',
        variant: 'text',
        class: 'text-[#eb2f96] hover:bg-[#fff0f6]',
      },
      {
        color: 'pink',
        variant: 'link',
        class: 'text-[#eb2f96] hover:underline',
      },

      // ===================== [ purple色 ] =====================
      {
        color: 'purple',
        variant: 'solid',
        class: 'bg-[#722ed1] text-white border-transparent hover:bg-[#9254de]',
      },
      {
        color: 'purple',
        variant: 'outlined',
        class: 'border-[#722ed1] text-[#722ed1] hover:bg-[#f9f0ff]',
      },
      {
        color: 'purple',
        variant: 'dashed',
        class: 'border-dashed border-[#722ed1] text-[#722ed1] hover:bg-[#f9f0ff]',
      },
      {
        color: 'purple',
        variant: 'filled',
        class: 'bg-[#722ed1] text-white border-transparent hover:bg-[#9254de]',
      },
      {
        color: 'purple',
        variant: 'text',
        class: 'text-[#722ed1] hover:bg-[#f9f0ff]',
      },
      {
        color: 'purple',
        variant: 'link',
        class: 'text-[#722ed1] hover:underline',
      },

      // ===================== [ cyan色 ] =====================
      {
        color: 'cyan',
        variant: 'solid',
        class: 'bg-[#e3c2c2] text-white border-transparent hover:bg-[#f0dada]',
      },
      {
        color: 'cyan',
        variant: 'outlined',
        class: 'border-[#e3c2c2] text-[#e3c2c2] hover:bg-[#fef6f6]',
      },
      {
        color: 'cyan',
        variant: 'dashed',
        class: 'border-dashed border-[#e3c2c2] text-[#e3c2c2] hover:bg-[#fef6f6]',
      },
      {
        color: 'cyan',
        variant: 'filled',
        class: 'bg-[#e3c2c2] text-white border-transparent hover:bg-[#f0dada]',
      },
      {
        color: 'cyan',
        variant: 'text',
        class: 'text-[#e3c2c2] hover:bg-[#fef6f6]',
      },
      {
        color: 'cyan',
        variant: 'link',
        class: 'text-[#e3c2c2] hover:underline',
      },

      // ===================== [ size ] =====================
      {
        size: 'small',
        class: 'px-[10px] text-sm leading-[1.5rem]',
      },
      {
        size: 'default',
        class: 'px-[15px] text-sm leading-[2rem]',
      },
      {
        size: 'middle',
        class: 'px-[15px] text-sm leading-[2rem]',
      },
      {
        size: 'large',
        class: 'px-[20px] text-base leading-[2.25rem]',
      },
    ],
    defaultVariants: {
      color: 'default',
      variant: 'solid',
      block: false,
      shape: 'default',
      size: 'middle',
      ghost: false,
    },
  },
);

type CVAButtonVariants = VariantProps<typeof buttonStyles>;

/* --------------------------------------
 * Button 主體
 * ------------------------------------ */
export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  BaseButtonProps & CVAButtonVariants
>(
  // refactor ref for component
  (props, ref) => {
    const {
      // antd-like API
      autoInsertSpace = true,
      block = false,
      classNames,
      color,
      danger = false,
      disabled = false,
      ghost = false,
      href,
      htmlType = 'button',
      icon,
      iconPosition = 'start',
      loading = false,
      shape = 'default',
      size = 'middle', // antd 默認為 'middle'
      styles,
      target,
      type = 'default', // antd 默認 'default'
      variant,
      children,
      onClick,
      ...rest
    } = props;

    const [isLoading, setIsLoading] = useState(!!loading);

    /* ------------- 整理 type 與 variant, color 的關係 ------------- */

    // 依照 antd 習慣: type => 自動推導 variant / color
    // 如果使用者手動指定了 variant / color，則沿用使用者的
    let finalVariant = variant;
    let finalColor = color;

    switch (type) {
      case 'primary':
        if (!finalVariant) finalVariant = 'solid';
        if (!finalColor) finalColor = 'primary';
        break;
      case 'dashed':
        if (!finalVariant) finalVariant = 'dashed';
        if (!finalColor) finalColor = 'default';
        break;
      case 'link':
        if (!finalVariant) finalVariant = 'link';
        if (!finalColor) finalColor = 'primary';
        break;
      case 'text':
        if (!finalVariant) finalVariant = 'text';
        if (!finalColor) finalColor = 'default';
        break;
      case 'default':
      default:
        if (!finalVariant) finalVariant = 'solid';
        if (!finalColor) finalColor = 'default';
        break;
    }

    // 若 danger=true，但 color 仍是 default => 強制 color=danger
    if (danger && finalColor === 'default') {
      finalColor = 'danger';
    }

    /* ----------------- 處理 loading 狀態 (delay) ----------------- */
    useEffect(() => {
      let timer: number | undefined;
      if (typeof loading === 'object' && loading.delay) {
        timer = window.setTimeout(() => {
          setIsLoading(true);
        }, loading.delay);
      } else {
        setIsLoading(!!loading);
      }

      return () => {
        if (timer !== undefined) {
          clearTimeout(timer);
        }
      };
    }, [loading]);

    /* ----- 處理中文自動插入空格：若為連續兩個中文就中間插空格 ----- */
    const renderChildren = () => {
      if (
        autoInsertSpace &&
        typeof children === 'string' &&
        /^[\u4e00-\u9fa5]{2}$/.test(children)
      ) {
        return children.split('').join(' ');
      }
      return children;
    };

    /* ------------------- loading icon: 純 Tailwind ------------------- */
    const defaultLoadingIcon = (
      <div
        className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent align-[-0.125em]"
        role="status"
      />
    );

    /* ------------------ 組合最終內容 (icon + children) ----------------- */
    // abstract loading icon
    const content = (
      <>
        {isLoading && (
          <span className="mr-2">
            {typeof loading === 'object' && loading.icon ? loading.icon : defaultLoadingIcon}
          </span>
        )}
        {icon && iconPosition === 'start' && !isLoading && <span className="mr-2">{icon}</span>}
        {renderChildren()}
        {icon && iconPosition === 'end' && !isLoading && <span className="ml-2">{icon}</span>}
      </>
    );

    /* ------------------ 最終合併 className ------------------ */
    const computedClassName = twMerge(
      buttonStyles({
        color: finalColor,
        variant: finalVariant,
        block,
        shape,
        size: size === 'default' ? 'default' : size, // 把 'default' 與 'middle' 都帶給 cva
        ghost,
      }),
      'button-with-ripple',
      classNames?.button,
    );

    /* ------------------ 最終渲染 <a> or <button> ------------------ */
    if (href) {
      // <a> link button 請參考antd 原始button props type
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          className={computedClassName}
          style={styles?.button}
          onClick={onClick}
          {...(rest as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'type' | 'onClick'>)}
        >
          {content}
        </a>
      );
    }

    // <button> native button
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={htmlType}
        disabled={disabled || isLoading}
        onClick={onClick}
        className={computedClassName}
        style={styles?.button}
        {...(rest as Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'>)}
      >
        {content}
      </button>
    );
  },
);

Button.displayName = 'Button';
