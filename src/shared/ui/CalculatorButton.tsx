import React from 'react';
import { CalculatorButtonProps, CalculatorTheme } from '../lib/types';

const defaultTheme: Required<CalculatorTheme> = {
  numberButton: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  operationButton: 'bg-orange-500 hover:bg-orange-600 text-white',
  functionButton: 'bg-gray-500 hover:bg-gray-600 text-white',
  display: 'bg-gray-900 text-white',
  container: 'bg-gray-100',
};

export const CalculatorButton: React.FC<CalculatorButtonProps & { theme?: CalculatorTheme }> = ({
  value,
  onClick,
  className = '',
  variant = 'number',
  theme,
}) => {
  const currentTheme = { ...defaultTheme, ...theme };
  const variantClass = currentTheme[`${variant}Button` as keyof CalculatorTheme] || '';
  
  const baseClasses = 'w-full h-12 sm:h-16 text-lg sm:text-xl font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500';
  
  return (
    <button
      className={`${baseClasses} ${variantClass} ${className}`}
      onClick={() => onClick(value)}
      type="button"
    >
      {value}
    </button>
  );
};
