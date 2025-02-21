import type { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Radio } from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color: {
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

export const DefaultRadio: Story = {
  args: {
    children: 'Radio',
    color: 'primary',
  },
};

export const DisabledRadio: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Radio
        {...args}
        checked={false}
      >
        unchecked
      </Radio>
      <Radio
        {...args}
        checked
      >
        checked
      </Radio>
    </div>
  ),
  args: {
    children: 'Disabled Radio',
    disabled: true,
    color: 'primary',
  },
};

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

export const CheckedRadio: Story = {
  args: {
    children: 'Checked by default',
    defaultChecked: true,
  },
};
