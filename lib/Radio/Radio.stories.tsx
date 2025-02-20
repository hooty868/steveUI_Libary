// Radio.stories.ts
import type { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Radio } from './Radio';

// 1) 設定 Story Meta
const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  // 透過 argTypes 控制面板 (Controls) 調整參數
  argTypes: {
    color: {
      // 程式中 color 的可選值：'default' | 'primary' | 'danger'
      options: ['default', 'primary', 'danger'],
      control: { type: 'select' },
      description: 'Radio 文字與樣式顏色',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '是否禁用 Radio',
    },
    checked: {
      control: { type: 'boolean' },
      description: '是否勾選 (受控)',
    },
    defaultChecked: {
      control: { type: 'boolean' },
      description: '預設是否勾選 (非受控)',
    },
    onChange: {
      action: 'changed',
      description: '勾選狀態變更時的回調',
    },
    children: {
      control: { type: 'text' },
      description: 'Radio 顯示的文字或任意 React 節點',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

/* -----------------------------------------------------
   以下為各種情境的範例 Story
----------------------------------------------------- */

// 基本 Radio
export const DefaultRadio: Story = {
  args: {
    children: 'Radio Label',
    color: 'primary',
  },
};

// 禁用狀態
export const DisabledRadio: Story = {
  args: {
    children: 'Disabled Radio',
    disabled: true,
  },
};

// 不同顏色
export const Colors: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Radio
        {...args}
        color="default"
      >
        Default
      </Radio>
      <Radio
        {...args}
        color="primary"
      >
        Primary
      </Radio>
      <Radio
        {...args}
        color="danger"
      >
        Danger
      </Radio>
    </div>
  ),
  args: {
    children: 'Color Radio',
    disabled: false,
  },
};

// 預設勾選狀態
export const CheckedRadio: Story = {
  args: {
    children: 'Checked by default',
    defaultChecked: true,
  },
};
