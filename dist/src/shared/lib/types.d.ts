export type CalculatorOperation = '+' | '-' | '*' | '/' | '=' | 'C' | 'CE';
export interface CalculatorState {
    display: string;
    previousValue: number | null;
    operation: CalculatorOperation | null;
    waitingForOperand: boolean;
}
export interface CalculatorButtonProps {
    value: string;
    onClick: (value: string) => void;
    className?: string;
    variant?: 'number' | 'operation' | 'function';
}
export interface CalculatorTheme {
    numberButton?: string;
    operationButton?: string;
    functionButton?: string;
    display?: string;
    container?: string;
}
export interface CalculatorProps {
    className?: string;
    orientation?: 'portrait' | 'landscape';
    theme?: CalculatorTheme;
    enableKeyboard?: boolean;
}
