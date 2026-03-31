import { CalculatorState, CalculatorOperation } from './types';

export const stripDisplayFormatting = (value: string): string => value.replace(/,/g, '');

export const formatInputDisplay = (value: string): string => {
  const normalizedValue = stripDisplayFormatting(value);

  if (normalizedValue === '' || normalizedValue === '-') {
    return normalizedValue;
  }

  const hasTrailingDecimal = normalizedValue.endsWith('.');
  const [integerPart, decimalPart] = normalizedValue.split('.');
  const sign = integerPart.startsWith('-') ? '-' : '';
  const unsignedInteger = sign ? integerPart.slice(1) : integerPart;
  const formattedInteger =
    unsignedInteger === ''
      ? '0'
      : Number(unsignedInteger).toLocaleString('en-US');

  if (hasTrailingDecimal) {
    return `${sign}${formattedInteger}.`;
  }

  if (decimalPart !== undefined) {
    return `${sign}${formattedInteger}.${decimalPart}`;
  }

  return `${sign}${formattedInteger}`;
};

export const calculate = (
  firstValue: number,
  secondValue: number,
  operation: CalculatorOperation
): number => {
  switch (operation) {
    case '+':
      return firstValue + secondValue;
    case '-':
      return firstValue - secondValue;
    case '*':
      return firstValue * secondValue;
    case '/':
      if (secondValue === 0) {
        throw new Error('Division by zero');
      }
      return firstValue / secondValue;
    default:
      throw new Error('Unknown operation');
  }
};

export const formatDisplay = (value: number): string => {
  if (Number.isNaN(value) || !Number.isFinite(value)) {
    return 'Error';
  }
  
  // 소수점 이하 10자리까지 표시하되, 불필요한 0은 제거
  const formatted = value.toFixed(10);
  return formatInputDisplay(parseFloat(formatted).toString());
};

export const isOperation = (value: string): value is CalculatorOperation => {
  return ['+', '-', '*', '/', '=', 'C', 'CE'].includes(value);
};

export const isNumber = (value: string): boolean => {
  return /^\d+$/.test(value);
};

export const isDecimalPoint = (value: string): boolean => {
  return value === '.';
};
