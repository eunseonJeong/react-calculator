import { CalculatorOperation } from './types';
export declare const calculate: (firstValue: number, secondValue: number, operation: CalculatorOperation) => number;
export declare const formatDisplay: (value: number) => string;
export declare const isOperation: (value: string) => value is CalculatorOperation;
export declare const isNumber: (value: string) => boolean;
export declare const isDecimalPoint: (value: string) => boolean;
