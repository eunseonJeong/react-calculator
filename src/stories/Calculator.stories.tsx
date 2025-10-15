import type { Meta, StoryObj } from '@storybook/react';
import { Calculator } from '../entities/Calculator';

const meta: Meta<typeof Calculator> = {
  title: 'Calculator/Calculator',
  component: Calculator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    orientation: {
      control: 'select',
      options: ['portrait', 'landscape'],
      description: 'Calculator orientation',
    },
    enableKeyboard: {
      control: 'boolean',
      description: 'Enable keyboard input',
    },
    theme: {
      control: 'object',
      description: 'Custom theme with className strings',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Landscape: Story = {
  args: {
    orientation: 'landscape',
  },
};

export const WithoutKeyboard: Story = {
  args: {
    enableKeyboard: false,
  },
};

export const CustomTheme: Story = {
  args: {
    theme: {
      numberButton: 'bg-blue-200 hover:bg-blue-300 text-blue-800',
      operationButton: 'bg-green-500 hover:bg-green-600 text-white',
      functionButton: 'bg-red-500 hover:bg-red-600 text-white',
      display: 'bg-purple-900 text-purple-100',
      container: 'bg-yellow-100',
    },
  },
};

export const DarkTheme: Story = {
  args: {
    theme: {
      numberButton: 'bg-gray-700 hover:bg-gray-600 text-white',
      operationButton: 'bg-orange-600 hover:bg-orange-700 text-white',
      functionButton: 'bg-gray-800 hover:bg-gray-700 text-white',
      display: 'bg-black text-green-400',
      container: 'bg-gray-900',
    },
  },
};
