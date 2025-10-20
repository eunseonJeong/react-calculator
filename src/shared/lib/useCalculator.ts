'use client'
import { useState, useCallback, useEffect } from 'react';
import { CalculatorState, CalculatorOperation, CalculatorHistoryItem } from '../lib/types';
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

export const useCalculator = (enableKeyboard: boolean = true, enableHistory: boolean = true) => {
  const [state, setState] = useState<CalculatorState>(initialState);
  const [history, setHistory] = useState<CalculatorHistoryItem[]>([]);
  const [currentExpression, setCurrentExpression] = useState<string>('');

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
      setCurrentExpression(prevState.previousValue + ' ' + prevState.operation + ' ' + input);
      return {
        ...prevState,
        display: input,
        waitingForOperand: false,
      };
    }
    
    const newDisplay = prevState.display === '0' ? input : prevState.display + input;
    setCurrentExpression(newDisplay);
    
    return {
      ...prevState,
      display: newDisplay,
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

  const addToHistory = useCallback((expression: string, result: string) => {
    if (!enableHistory) return;
    
    const historyItem: CalculatorHistoryItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
      expression,
      result,
      timestamp: new Date(),
    };
    
    setHistory(prev => [historyItem, ...prev].slice(0, 50)); // 최대 50개까지만 저장
  }, [enableHistory]);

  const handleOperationInput = (prevState: CalculatorState, operation: CalculatorOperation): CalculatorState => {
    if (operation === 'C') {
      setCurrentExpression('');
      return initialState;
    }
    
    if (operation === 'CE') {
      const currentDisplay = prevState.display;
      if (currentDisplay.length <= 1) {
        return {
          ...prevState,
          display: '0',
        };
      }
      
      return {
        ...prevState,
        display: currentDisplay.slice(0, -1),
      };
    }
    
    const inputValue = parseFloat(prevState.display);
    
    if (prevState.previousValue === null) {
      setCurrentExpression(prevState.display + ' ' + operation);
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
        const formattedResult = formatDisplay(result);
        
        // 히스토리에 추가
        const expression = `${prevState.previousValue} ${prevState.operation} ${inputValue} =`;
        addToHistory(expression, formattedResult);
        
        setCurrentExpression(formattedResult);
        
        return {
          display: formattedResult,
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
    
    setCurrentExpression(prevState.display + ' ' + operation);
    return {
      ...prevState,
      operation,
      waitingForOperand: true,
    };
  };

  const reset = useCallback(() => {
    setState(initialState);
    setCurrentExpression('');
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const removeFromHistory = useCallback((id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  }, []);

  const useHistoryValue = useCallback((value: string) => {
    setState(prevState => ({
      ...prevState,
      display: value,
      waitingForOperand: false,
    }));
  }, []);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      // 클립보드 API가 지원되지 않는 경우 폴백
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
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
    history,
    clearHistory,
    removeFromHistory,
    useHistoryValue,
    copyToClipboard,
    currentExpression,
  };
};
