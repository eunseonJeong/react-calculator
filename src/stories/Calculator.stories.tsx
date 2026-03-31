import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
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
    onChange: {
      action: 'changed',
      description: 'Called whenever the display value changes',
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

export const WithOnChange: Story = {
  args: {},
  render: (args) => {
    const [value, setValue] = useState('0');

    return (
      <div className="flex flex-col items-center gap-4">
        <Calculator
          {...args}
          onChange={(nextValue) => {
            setValue(nextValue);
            args.onChange?.(nextValue);
          }}
        />
        <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 shadow-sm">
          Current display value: <span className="font-semibold">{value}</span>
        </div>
      </div>
    );
  },
};

export const DropdownTrigger: Story = {
  args: {
    enableHistory: false,
    minWidth: '20rem',
  },
  parameters: {
    layout: 'padded',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState('0');

    return (
      <div className="min-h-[34rem] w-full max-w-2xl bg-gradient-to-br from-stone-50 via-orange-50 to-amber-100 p-10">
        <div className="relative mx-auto max-w-md">
          <div className="rounded-[2rem] border border-stone-200 bg-white/80 p-5 shadow-xl shadow-stone-200/60 backdrop-blur-sm">
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">
                Dropdown Example
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                Quick amount picker
              </h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                Trigger a calculator from a button, then read the live value back into the parent UI.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              className="flex w-full items-center justify-between rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-left shadow-sm transition-colors hover:bg-white"
            >
              <div>
                <div className="text-xs uppercase tracking-[0.24em] text-stone-500">
                  Amount
                </div>
                <div className="mt-1 text-lg font-semibold text-slate-900">
                  {value}
                </div>
              </div>
              <div className="rounded-full bg-amber-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-900">
                {isOpen ? 'Close' : 'Open'}
              </div>
            </button>

            {isOpen && (
              <div className="absolute left-0 right-0 top-[calc(100%+1rem)] z-20 rounded-[2rem] border border-stone-200 bg-white/60 p-3 shadow-2xl shadow-stone-300/50 backdrop-blur-md">
                <Calculator
                  {...args}
                  className="!max-w-none"
                  onChange={(nextValue) => {
                    setValue(nextValue);
                    args.onChange?.(nextValue);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
};
