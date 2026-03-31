import React from 'react';
import { CalculatorButtonProps, CalculatorTheme } from '../lib/types';
import { defaultCalculatorTheme } from '../lib/theme';

export const CalculatorButton: React.FC<CalculatorButtonProps & { theme?: CalculatorTheme }> = ({
  value,
  onClick,
  className = '',
  variant = 'number',
  theme,
}) => {
  const currentTheme = { ...defaultCalculatorTheme, ...theme };
  const variantClass = currentTheme[`${variant}Button` as keyof CalculatorTheme] || '';
  
  const baseClasses = 'w-full rounded-2xl px-3 py-3 text-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 active:scale-[0.98] sm:px-4 sm:py-4 sm:text-xl';
  
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
