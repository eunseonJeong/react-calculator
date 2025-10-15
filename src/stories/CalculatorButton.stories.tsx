import type { Meta, StoryObj } from '@storybook/react';
import { CalculatorButton } from '../shared/ui/CalculatorButton';

const meta: Meta<typeof CalculatorButton> = {
  title: 'Calculator/CalculatorButton',
  component: CalculatorButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Button text/value',
    },
    variant: {
      control: 'select',
      options: ['number', 'operation', 'function'],
      description: 'Button variant style',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NumberButton: Story = {
  args: {
    value: '5',
    variant: 'number',
  },
};

export const OperationButton: Story = {
  args: {
    value: '+',
    variant: 'operation',
  },
};

export const FunctionButton: Story = {
  args: {
    value: 'C',
    variant: 'function',
  },
};
