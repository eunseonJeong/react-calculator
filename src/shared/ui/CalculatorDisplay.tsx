import React from 'react';
import { CalculatorTheme } from '../lib/types';

interface CalculatorDisplayProps {
  value: string;
  className?: string;
  theme?: CalculatorTheme;
}

const defaultTheme: Required<CalculatorTheme> = {
  numberButton: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  operationButton: 'bg-orange-500 hover:bg-orange-600 text-white',
  functionButton: 'bg-gray-500 hover:bg-gray-600 text-white',
  display: 'bg-gray-900 text-white',
  container: 'bg-gray-100',
};

export const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({
  value,
  className = '',
  theme,
}) => {
  const currentTheme = { ...defaultTheme, ...theme };
  const displayClass = currentTheme.display || 'bg-gray-900 text-white';

  return (
    <div className={`text-right p-3 sm:p-4 rounded-lg mb-3 sm:mb-4 ${displayClass} ${className}`}>
      <div className="text-2xl sm:text-3xl font-mono min-h-[1.5rem] sm:min-h-[2rem] flex items-center justify-end overflow-hidden">
        {value || '0'}
      </div>
    </div>
  );
};
