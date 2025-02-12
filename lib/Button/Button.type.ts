import type {
  MouseEvent,
  CSSProperties,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
} from 'react';

// antd-like PresetColors
export type PresetColor = 'default' | 'primary' | 'danger' | 'pink' | 'purple' | 'cyan';

/**
 * 定義 props 中可用的 Semantic DOM key
 * 可以隨需求增加，如 'icon', 'text'...
 */
export type SemanticDOM = 'button';

/**
 * 可以讓使用者透過 classNames.button 或 styles.button 做局部覆蓋
 */
export type SemanticClassNames = Record<SemanticDOM, string>;
export type SemanticStyles = Record<SemanticDOM, CSSProperties>;

/**
 * 官方 antd-like 屬性：順序為 type -> shape -> size -> loading -> disabled
 */
export interface BaseButtonProps {
  /**
   * We add a space between two Chinese characters by default
   */
  autoInsertSpace?: boolean;
  /**
   * Option to fit button width to its parent width
   */
  block?: boolean;
  /**
   * Semantic DOM class
   */
  classNames?: SemanticClassNames;
  /**
   * Set button color
   */
  color?: PresetColor;
  /**
   * Syntactic sugar. Set the danger status of button. will follow color if provided
   */
  danger?: boolean;
  /**
   * Disabled state of button
   */
  disabled?: boolean;
  /**
   * Make background transparent and invert text and border colors
   */
  ghost?: boolean;
  /**
   * Redirect url of link button
   */
  href?: string;
  /**
   * Set the original html type of button
   */
  htmlType?: 'submit' | 'reset' | 'button';
  /**
   * Set the icon component of button
   */
  icon?: React.ReactNode;
  /**
   * Set the icon position of button
   */
  iconPosition?: 'start' | 'end';
  /**
   * Set the loading status of button
   */
  loading?: boolean | { delay: number; icon?: React.ReactNode };
  /**
   * Can be used to set button shape
   */
  shape?: 'default' | 'circle' | 'round';
  /**
   * Set the size of button
   */
  size?: 'large' | 'middle' | 'small' | 'default';
  /**
   * Semantic DOM style
   */
  styles?: SemanticStyles;
  /**
   * Same as target attribute of a, works when href is specified
   */
  target?: string;
  /**
   * Syntactic sugar. Set button type. Will follow variant & color if provided
   */
  type?: 'primary' | 'dashed' | 'link' | 'text' | 'default';
  /**
   * Set button variant
   */
  variant?: 'outlined' | 'dashed' | 'solid' | 'filled' | 'text' | 'link';
  /**
   * 按鈕文字
   */
  children?: React.ReactNode;
  /**
   * onClick
   */
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

type MergedHTMLAttributes = Omit<
  HTMLAttributes<HTMLElement> &
    ButtonHTMLAttributes<HTMLElement> &
    AnchorHTMLAttributes<HTMLElement>,
  'type' | 'color' | 'target'
>;

export interface ButtonProps extends BaseButtonProps, MergedHTMLAttributes {
  /** 當 href 存在時使用，將渲染成 <a> 標籤 */
  href?: string;
  /** 設定原生 button 的 type 屬性，例如 'submit' | 'reset' | 'button' */
  htmlType?: 'submit' | 'reset' | 'button';
}
