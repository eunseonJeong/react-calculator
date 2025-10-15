'use client'
import { useState, useCallback, useEffect } from 'react';
import { CalculatorState, CalculatorOperation } from '../lib/types';
import { calculate, formatDisplay, isOperation, isNumber, isDecimalPoint } from '../lib/calculator';

const initialState: CalculatorState = {
  display: '0',
  previousValue: null,
  operation: null,
  waitingForOperand: false,
};

// 키보드 매핑
const keyMapping: Record<string, string> = {
  '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
  '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
  '+': '+', '-': '-', '*': '*', '/': '/',
  '=': '=', 'Enter': '=', 'Escape': 'C',
  '.': '.', ',': '.',
  'c': 'C', 'C': 'C',
  'Backspace': 'CE',
};

export const useCalculator = (enableKeyboard: boolean = true) => {
  const [state, setState] = useState<CalculatorState>(initialState);

  const handleInput = useCallback((input: string) => {
    setState(prevState => {
      if (isNumber(input)) {
        return handleNumberInput(prevState, input);
      }
      
      if (isDecimalPoint(input)) {
        return handleDecimalPointInput(prevState);
      }
      
      if (isOperation(input)) {
        return handleOperationInput(prevState, input as CalculatorOperation);
      }
      
      return prevState;
    });
  }, []);

  const handleNumberInput = (prevState: CalculatorState, input: string): CalculatorState => {
    if (prevState.waitingForOperand) {
      return {
        ...prevState,
        display: input,
        waitingForOperand: false,
      };
    }
    
    return {
      ...prevState,
      display: prevState.display === '0' ? input : prevState.display + input,
    };
  };

  const handleDecimalPointInput = (prevState: CalculatorState): CalculatorState => {
    if (prevState.waitingForOperand) {
      return {
        ...prevState,
        display: '0.',
        waitingForOperand: false,
      };
    }
    
    if (prevState.display.indexOf('.') === -1) {
      return {
        ...prevState,
        display: prevState.display + '.',
      };
    }
    
    return prevState;
  };

  const handleOperationInput = (prevState: CalculatorState, operation: CalculatorOperation): CalculatorState => {
    if (operation === 'C') {
      return initialState;
    }
    
    if (operation === 'CE') {
      return {
        ...prevState,
        display: '0',
      };
    }
    
    const inputValue = parseFloat(prevState.display);
    
    if (prevState.previousValue === null) {
      return {
        ...prevState,
        previousValue: inputValue,
        operation,
        waitingForOperand: true,
      };
    }
    
    if (prevState.operation && !prevState.waitingForOperand) {
      try {
        const result = calculate(prevState.previousValue, inputValue, prevState.operation);
        return {
          display: formatDisplay(result),
          previousValue: operation === '=' ? null : result,
          operation: operation === '=' ? null : operation,
          waitingForOperand: operation === '=' ? false : true,
        };
      } catch (error) {
        return {
          ...initialState,
          display: 'Error',
        };
      }
    }
    
    return {
      ...prevState,
      operation,
      waitingForOperand: true,
    };
  };

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  // 키보드 이벤트 핸들러
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enableKeyboard) return;
    
    const key = event.key;
    const mappedKey = keyMapping[key];
    
    if (mappedKey) {
      event.preventDefault();
      handleInput(mappedKey);
    }
  }, [handleInput, enableKeyboard]);

  // 키보드 이벤트 리스너 등록
  useEffect(() => {
    if (enableKeyboard) {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [handleKeyDown, enableKeyboard]);

  return {
    display: state.display,
    handleInput,
    reset,
  };
};
