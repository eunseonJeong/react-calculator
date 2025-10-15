import React from 'react';
import { CalculatorTheme } from '../lib/types';
interface CalculatorDisplayProps {
    value: string;
    className?: string;
    theme?: CalculatorTheme;
}
export declare const CalculatorDisplay: React.FC<CalculatorDisplayProps>;
export {};
