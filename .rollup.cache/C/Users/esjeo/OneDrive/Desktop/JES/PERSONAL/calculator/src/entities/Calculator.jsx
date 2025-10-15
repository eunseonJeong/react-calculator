'use client';
import { CalculatorDisplay, CalculatorButton, useCalculator } from '@/shared';
import React from 'react';
export const Calculator = ({ className = '', orientation = 'portrait', theme, enableKeyboard = true }) => {
    const { display, handleInput } = useCalculator(enableKeyboard);
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
    const buttonLayout = orientation === 'landscape' ? landscapeLayout : portraitLayout;
    const isLandscape = orientation === 'landscape';
    const defaultTheme = {
        container: 'bg-gray-100',
    };
    const currentTheme = Object.assign(Object.assign({}, defaultTheme), theme);
    const containerClass = currentTheme.container || 'bg-gray-100';
    return (<div className={`p-4 sm:p-6 rounded-xl shadow-lg mx-auto ${isLandscape ? 'max-w-2xl' : 'max-w-sm'} ${containerClass} ${className}`}>
      <CalculatorDisplay value={display} theme={theme}/>
      
      <div className={`grid gap-2 sm:gap-3 ${isLandscape ? 'grid-cols-5' : 'grid-cols-4'}`}>
        {buttonLayout.map((row, rowIndex) => row.map((button, colIndex) => {
            const isLastRow = rowIndex === buttonLayout.length - 1;
            const isZeroButton = button === '0';
            const isDecimalButton = button === '.';
            let buttonClass = '';
            let variant = 'number';
            if (['+', '-', '*', '/', '='].includes(button)) {
                variant = 'operation';
            }
            else if (['C', 'CE'].includes(button)) {
                variant = 'function';
            }
            // 세로 레이아웃에서의 특별한 배치
            if (!isLandscape) {
                if (isZeroButton) {
                    buttonClass = 'col-span-2';
                }
                else if (isDecimalButton && isLastRow) {
                    buttonClass = 'col-start-3';
                }
            }
            return (<CalculatorButton key={`${rowIndex}-${colIndex}`} value={button} onClick={handleInput} variant={variant} className={buttonClass} theme={theme}/>);
        }))}
      </div>
    </div>);
};
//# sourceMappingURL=Calculator.jsx.map