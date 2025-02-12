// Button.stories.ts
import type { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Button } from './Button';

// 1) 設定 Story Meta
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  // 透過 argTypes 控制面板 (Controls) 調整參數
  argTypes: {
    color: {
      // 你實際程式中 color 的可選值：'default' | 'primary' | 'danger' | 'pink' | 'purple' | 'cyan'
      options: ['default', 'primary', 'danger', 'pink', 'purple', 'cyan'],
      control: { type: 'select' },
    },
    size: {
      // 你有 'small' | 'middle' | 'large' | 'default'
      options: ['small', 'middle', 'large', 'default'],
      control: { type: 'select' },
    },
    type: {
      // 你定義為 'primary' | 'dashed' | 'link' | 'text' | 'default'
      options: ['primary', 'dashed', 'link', 'text', 'default'],
      control: { type: 'select' },
    },
    variant: {
      // 'outlined' | 'dashed' | 'solid' | 'filled' | 'text' | 'link'
      options: ['outlined', 'dashed', 'solid', 'filled', 'text', 'link'],
      control: { type: 'select' },
    },
    shape: {
      // 'default' | 'circle' | 'round'
      options: ['default', 'circle', 'round'],
      control: { type: 'select' },
    },
    iconPosition: {
      options: ['start', 'end'],
      control: { type: 'radio' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/* -----------------------------------------------------
   以下為各種情境的範例 Story
----------------------------------------------------- */

// 基本按鈕
export const DefaultButton: Story = {
  args: {
    color: 'primary',
    size: 'middle',
    children: 'Click Me',
  },
};

// 禁用狀態
export const DisabledButton: Story = {
  args: {
    ...DefaultButton.args,
    disabled: true,
    children: 'Disabled',
  },
};

// 錨點按鈕（連結）
export const AnchorButton: Story = {
  args: {
    href: 'https://example.com',
    children: 'Go to Example',
  },
};

// 不同顏色
export const Colors: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button
        {...args}
        color="default"
      >
        Default
      </Button>
      <Button
        {...args}
        color="primary"
      >
        Primary
      </Button>
      <Button
        {...args}
        color="danger"
      >
        Danger
      </Button>
      <Button
        {...args}
        color="pink"
      >
        Pink
      </Button>
      <Button
        {...args}
        color="purple"
      >
        Purple
      </Button>
      <Button
        {...args}
        color="cyan"
      >
        Cyan
      </Button>
    </div>
  ),
  args: {
    children: 'Color Button',
  },
};

// 不同尺寸 options: ['small', 'middle', 'large', 'default'],
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button
        {...args}
        size="small"
      >
        Small
      </Button>
      <Button
        {...args}
        size="middle"
      >
        Middle
      </Button>
      <Button
        {...args}
        size="large"
      >
        Large
      </Button>
      <Button
        {...args}
        size="default"
      >
        Default
      </Button>
    </div>
  ),
  args: {
    color: 'primary',
    children: 'Size Button',
  },
};

// 不同 variant 樣式
export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button
        {...args}
        variant="outlined"
      >
        Outlined
      </Button>
      <Button
        {...args}
        variant="dashed"
      >
        Dashed
      </Button>
      <Button
        {...args}
        variant="solid"
      >
        Solid
      </Button>
      <Button
        {...args}
        variant="filled"
      >
        Filled
      </Button>
      <Button
        {...args}
        variant="text"
      >
        Text
      </Button>
      <Button
        {...args}
        variant="link"
      >
        Link
      </Button>
    </div>
  ),
  args: {
    children: 'Variant Button',
    size: 'middle',
  },
};

// 不同形狀
export const Shapes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button
        {...args}
        shape="default"
      >
        Default
      </Button>
      <Button
        {...args}
        shape="circle"
      >
        C
      </Button>
      <Button
        {...args}
        shape="round"
      >
        Round
      </Button>
    </div>
  ),
  args: {
    color: 'primary',
    children: 'Shape Button',
  },
};

// Loading 狀態
export const LoadingButton: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
};

// 區塊顯示樣式
export const BlockButton: Story = {
  render: (args) => (
    <div style={{ width: 400 }}>
      <Button
        {...args}
        block
      />
    </div>
  ),
  args: {
    block: true,
    children: 'Block Button',
  },
};

// Ghost 樣式
export const GhostButton: Story = {
  args: {
    ghost: true,
    children: 'Ghost Button',
  },
};

// 帶 Icon 的按鈕，並示範 icon 在左邊或右邊的位置
export const IconButton: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button
        {...args}
        iconPosition="start"
        icon={
          <span
            role="img"
            aria-label="icon"
          >
            ⭐
          </span>
        }
      >
        Icon Start
      </Button>
      <Button
        {...args}
        iconPosition="end"
        icon={
          <span
            role="img"
            aria-label="icon"
          >
            ⭐
          </span>
        }
      >
        Icon End
      </Button>
    </div>
  ),
  args: {
    color: 'primary',
    children: 'Icon Button',
  },
};
