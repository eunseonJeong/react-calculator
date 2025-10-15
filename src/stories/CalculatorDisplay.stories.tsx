import type { Meta, StoryObj } from '@storybook/react';
import { CalculatorDisplay } from '../shared/ui/CalculatorDisplay';

const meta: Meta<typeof CalculatorDisplay> = {
  title: 'Calculator/CalculatorDisplay',
  component: CalculatorDisplay,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Display value',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '0',
  },
};

export const WithNumber: Story = {
  args: {
    value: '123.45',
  },
};

export const WithLongNumber: Story = {
  args: {
    value: '999999999.999999999',
  },
};

export const Error: Story = {
  args: {
    value: 'Error',
  },
};
