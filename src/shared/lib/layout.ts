import {
  CalculatorButtonLayout,
  CalculatorButtonVariant,
  CalculatorOrientation,
} from './types';

export const portraitCalculatorLayout: CalculatorButtonLayout = [
  ['C', 'CE', '/', '*'],
  ['7', '8', '9', '-'],
  ['4', '5', '6', '+'],
  ['1', '2', '3', '='],
  ['0', '.'],
];

export const landscapeCalculatorLayout: CalculatorButtonLayout = [
  ['C', 'CE', '/', '*', '='],
  ['7', '8', '9', '-', '0'],
  ['4', '5', '6', '+', '.'],
  ['1', '2', '3'],
];

export const getCalculatorLayout = (
  orientation: CalculatorOrientation = 'portrait'
): CalculatorButtonLayout =>
  orientation === 'landscape' ? landscapeCalculatorLayout : portraitCalculatorLayout;

export const getCalculatorButtonVariant = (
  value: string
): CalculatorButtonVariant => {
  if (['+', '-', '*', '/', '='].includes(value)) {
    return 'operation';
  }

  if (['C', 'CE'].includes(value)) {
    return 'function';
  }

  return 'number';
};

export const getCalculatorButtonClassName = (
  value: string,
  rowIndex: number,
  layout: CalculatorButtonLayout,
  orientation: CalculatorOrientation = 'portrait'
): string => {
  if (orientation === 'landscape') {
    return '';
  }

  const isLastRow = rowIndex === layout.length - 1;

  if (value === '0') {
    return 'col-span-2';
  }

  if (value === '.' && isLastRow) {
    return 'col-start-3';
  }

  return '';
};
