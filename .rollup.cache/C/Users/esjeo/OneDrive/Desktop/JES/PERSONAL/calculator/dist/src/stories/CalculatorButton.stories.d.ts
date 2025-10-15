import type { Meta, StoryObj } from '@storybook/react';
import { CalculatorButton } from '../shared/ui/CalculatorButton';
declare const meta: Meta<typeof CalculatorButton>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const NumberButton: Story;
export declare const OperationButton: Story;
export declare const FunctionButton: Story;
