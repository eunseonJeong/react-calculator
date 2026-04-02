export type CalculatorOperation = '+' | '-' | '*' | '/' | '=' | 'C' | 'CE';
export type CalculatorButtonVariant = 'number' | 'operation' | 'function';
export type CalculatorOrientation = 'portrait' | 'landscape';
export type CalculatorButtonValue = string;
export type CalculatorButtonLayout = CalculatorButtonValue[][];

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
  variant?: CalculatorButtonVariant;
}

export interface CalculatorTheme {
  numberButton?: string;
  operationButton?: string;
  functionButton?: string;
  display?: string;
  container?: string;
}

export interface CalculatorHistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: Date;
}

export interface CalculatorProps {
  className?: string;
  orientation?: CalculatorOrientation;
  theme?: CalculatorTheme;
  enableKeyboard?: boolean;
  enableHistory?: boolean;
  onChange?: (value: string) => void;
  minWidth?: number | string;
}

export interface UseCalculatorOptions {
  enableKeyboard?: boolean;
  enableHistory?: boolean;
}

export interface UseCalculatorReturn {
  display: string;
  currentExpression: string;
  history: CalculatorHistoryItem[];
  handleInput: (input: string) => void;
  reset: () => void;
  clearHistory: () => void;
  removeFromHistory: (id: string) => void;
  useHistoryValue: (value: string) => void;
  copyToClipboard: (text: string) => Promise<void>;
  actions: {
    input: (value: string) => void;
    reset: () => void;
    clearHistory: () => void;
    removeHistoryItem: (id: string) => void;
    useHistoryValue: (value: string) => void;
    copyToClipboard: (text: string) => Promise<void>;
  };
}
