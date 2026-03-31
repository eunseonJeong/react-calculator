import React from 'react';
import { CalculatorTheme } from '../lib/types';
import { defaultCalculatorTheme } from '../lib/theme';

interface CalculatorDisplayProps {
  value: string;
  className?: string;
  theme?: CalculatorTheme;
}

export const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({
  value,
  className = '',
  theme,
}) => {
  const currentTheme = { ...defaultCalculatorTheme, ...theme };
  const displayClass = currentTheme.display || 'bg-slate-900 text-amber-100';

  return (
    <div className={`mb-3 rounded-2xl p-4 text-right sm:mb-4 sm:p-5 ${displayClass} ${className}`}>
      <div className="flex min-h-[1.75rem] items-center justify-end overflow-hidden font-mono text-3xl sm:min-h-[2.25rem] sm:text-4xl">
        {value || '0'}
      </div>
    </div>
  );
};
