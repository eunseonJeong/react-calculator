'use client'
import { CalculatorDisplay, CalculatorButton, CalculatorHistory, useCalculator } from '@/shared';
import React, { useState } from 'react';
import { CalculatorProps } from '@/shared/lib/types';

export const Calculator: React.FC<CalculatorProps> = ({ 
  className = '', 
  orientation = 'portrait',
  theme,
  enableKeyboard = true,
  enableHistory = true 
}) => {
  const { 
    display, 
    handleInput, 
    history, 
    clearHistory, 
    removeFromHistory, 
    useHistoryValue, 
    copyToClipboard 
  } = useCalculator(enableKeyboard, enableHistory);
  
  const [showHistory, setShowHistory] = useState(false);

  // 세로 레이아웃
  const portraitLayout = [
    ['C', 'CE', '/', '*'],
    ['7', '8', '9', '-'],
    ['4', '5', '6', '+'],
    ['1', '2', '3', '='],
    ['0', '.'],
  ];

  // 가로 레이아웃 (더 넓은 형태)
  const landscapeLayout = [
    ['C', 'CE', '/', '*', '='],
    ['7', '8', '9', '-', '0'],
    ['4', '5', '6', '+', '.'],
    ['1', '2', '3'],
  ];

  const handleCopyResult = () => {
    copyToClipboard(display);
  };

  const buttonLayout = orientation === 'landscape' ? landscapeLayout : portraitLayout;
  const isLandscape = orientation === 'landscape';

  const defaultTheme = {
    container: 'bg-gray-100',
  };

  const currentTheme = { ...defaultTheme, ...theme };
  const containerClass = currentTheme.container || 'bg-gray-100';

  return (
    <div className={`react-calcboard-container relative z-10 ${showHistory && enableHistory ? 'flex flex-col lg:flex-row gap-4' : ''} ${isLandscape ? 'max-w-8xl' : 'max-w-sm'} mx-auto ${className}`}>
      {/* 메인 계산기 */}
      <div 
        className={`react-calcboard-main p-4 sm:p-6 rounded-xl shadow-lg ${showHistory && enableHistory ? (isLandscape ? 'flex-1' : 'w-full') : 'w-full'} ${containerClass}`}
      >
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <div className="flex-1 min-w-0">
              <CalculatorDisplay value={display} theme={theme} />
            </div>
            <div className="flex gap-2 ml-2 flex-shrink-0">
            <button
              onClick={handleCopyResult}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
              title="결과 복사"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            
            {enableHistory && (
              <button
                onClick={() => setShowHistory(!showHistory)}
                className={`p-2 rounded transition-colors ${
                  showHistory 
                    ? 'text-blue-600 bg-blue-100' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
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
            row.map((button, colIndex) => {
              const isLastRow = rowIndex === buttonLayout.length - 1;
              const isZeroButton = button === '0';
              const isDecimalButton = button === '.';
              
              let buttonClass = '';
              let variant: 'number' | 'operation' | 'function' = 'number';
              
              if (['+', '-', '*', '/', '='].includes(button)) {
                variant = 'operation';
              } else if (['C', 'CE'].includes(button)) {
                variant = 'function';
              }
              
              // 세로 레이아웃에서의 특별한 배치
              if (!isLandscape) {
                if (isZeroButton) {
                  buttonClass = 'col-span-2';
                } else if (isDecimalButton && isLastRow) {
                  buttonClass = 'col-start-3';
                }
              }
              
              return (
                <CalculatorButton
                  key={`${rowIndex}-${colIndex}`}
                  value={button}
                  onClick={handleInput}
                  variant={variant}
                  className={buttonClass}
                  theme={theme}
                />
              );
            })
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
