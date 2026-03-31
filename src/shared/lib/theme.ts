import { CalculatorTheme } from './types';

export const defaultCalculatorTheme: Required<CalculatorTheme> = {
  numberButton:
    'border border-stone-200 bg-white/90 text-slate-800 shadow-sm hover:bg-stone-100 hover:border-stone-300',
  operationButton:
    'bg-amber-400 text-slate-900 shadow-sm hover:bg-amber-300',
  functionButton:
    'bg-slate-700 text-stone-50 shadow-sm hover:bg-slate-600',
  display:
    'border border-slate-700/80 bg-slate-900 text-amber-100 shadow-inner',
  container:
    'border border-stone-200 bg-gradient-to-br from-stone-50 via-orange-50 to-amber-100',
};
