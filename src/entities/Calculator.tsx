'use client'
import { CalculatorDisplay, CalculatorButton, CalculatorHistory, useCalculator } from '@/shared';
import React, { useEffect, useRef, useState } from 'react';
import { CalculatorProps } from '@/shared/lib/types';
import { defaultCalculatorTheme } from '@/shared/lib/theme';
import {
  getCalculatorButtonClassName,
  getCalculatorButtonVariant,
  getCalculatorLayout,
} from '@/shared/lib/layout';

export const Calculator: React.FC<CalculatorProps> = ({ 
  className = '', 
  orientation = 'portrait',
  theme,
  enableKeyboard = true,
  enableHistory = true,
  onChange,
  minWidth,
}) => {
  const {
    display,
    history,
    actions: {
      input: handleInput,
      clearHistory,
      removeHistoryItem: removeFromHistory,
      useHistoryValue,
      copyToClipboard,
    },
  } = useCalculator({ enableKeyboard, enableHistory });
  
  const [showHistory, setShowHistory] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!onChange) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    onChange(display);
  }, [display, onChange]);

  const handleCopyResult = () => {
    copyToClipboard(display);
  };

  const buttonLayout = getCalculatorLayout(orientation);
  const isLandscape = orientation === 'landscape';
  const currentTheme = { ...defaultCalculatorTheme, ...theme };
  const containerClass = currentTheme.container || defaultCalculatorTheme.container;
  const resolvedMinWidth =
    minWidth ?? (isLandscape ? '28rem' : '20rem');
  const minWidthStyle = {
    minWidth: typeof resolvedMinWidth === 'number' ? `${resolvedMinWidth}px` : resolvedMinWidth,
  };

  return (
    <div className={`react-calcboard-container relative z-10 ${showHistory && enableHistory ? 'flex flex-col gap-4 lg:flex-row' : ''} ${isLandscape ? 'max-w-5xl' : 'max-w-sm'} mx-auto ${className}`}>
      {/* 메인 계산기 */}
      <div 
        className={`react-calcboard-main rounded-[2rem] border p-4 shadow-2xl shadow-stone-300/60 sm:p-6 ${showHistory && enableHistory ? (isLandscape ? 'flex-1' : 'w-full') : 'w-full'} ${containerClass}`}
        style={minWidthStyle}
      >
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <div className="flex-1 min-w-0">
              <CalculatorDisplay value={display} theme={theme} />
            </div>
            <div className="flex gap-2 ml-2 flex-shrink-0">
            <button
              onClick={handleCopyResult}
              className="rounded-xl border border-stone-200 bg-white/80 p-2 text-stone-600 transition-colors hover:bg-white hover:text-slate-800"
              title="결과 복사"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            
            {enableHistory && (
              <button
                onClick={() => setShowHistory(!showHistory)}
                className={`rounded-xl border p-2 transition-colors ${
                  showHistory 
                    ? 'border-amber-300 bg-amber-100 text-amber-800' 
                    : 'border-stone-200 bg-white/80 text-stone-600 hover:bg-white hover:text-slate-800'
                }`}
                title="계산 기록"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            )}
            </div>
          </div>
        </div>
        
        <div className={`grid gap-2 sm:gap-3 ${isLandscape ? 'grid-cols-5' : 'grid-cols-4'}`}>
          {buttonLayout.map((row, rowIndex) => 
            row.map((button, colIndex) => (
              <CalculatorButton
                key={`${rowIndex}-${colIndex}`}
                value={button}
                onClick={handleInput}
                variant={getCalculatorButtonVariant(button)}
                className={getCalculatorButtonClassName(
                  button,
                  rowIndex,
                  buttonLayout,
                  orientation
                )}
                theme={theme}
              />
            ))
          )}
        </div>
      </div>

      {/* 히스토리 패널 */}
      {enableHistory && showHistory && (
        <div className={`${isLandscape ? 'w-96 lg:w-96' : 'w-full lg:w-96'} ${isLandscape ? '' : 'max-w-md mx-auto lg:mx-0'}`}>
          <CalculatorHistory
            history={history}
            onUseValue={useHistoryValue}
            onRemoveItem={removeFromHistory}
            onClearHistory={clearHistory}
            onCopyToClipboard={copyToClipboard}
            className="h-full"
          />
        </div>
      )}
    </div>
  );
};
