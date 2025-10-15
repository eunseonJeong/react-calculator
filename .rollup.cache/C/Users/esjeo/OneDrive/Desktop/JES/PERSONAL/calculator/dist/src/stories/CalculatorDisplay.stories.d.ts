import type { Meta, StoryObj } from '@storybook/react';
import { CalculatorDisplay } from '../shared/ui/CalculatorDisplay';
declare const meta: Meta<typeof CalculatorDisplay>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithNumber: Story;
export declare const WithLongNumber: Story;
export declare const Error: Story;
