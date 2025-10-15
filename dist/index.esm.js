import React, { useState, useCallback, useEffect } from 'react';

const defaultTheme$1 = {
  numberButton: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  operationButton: 'bg-orange-500 hover:bg-orange-600 text-white',
  functionButton: 'bg-gray-500 hover:bg-gray-600 text-white',
  display: 'bg-gray-900 text-white',
  container: 'bg-gray-100'
};
const CalculatorDisplay = ({
  value,
  className = '',
  theme
}) => {
  const currentTheme = Object.assign(Object.assign({}, defaultTheme$1), theme);
  const displayClass = currentTheme.display || 'bg-gray-900 text-white';
  return /*#__PURE__*/React.createElement("div", {
    className: `text-right p-3 sm:p-4 rounded-lg mb-3 sm:mb-4 ${displayClass} ${className}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-2xl sm:text-3xl font-mono min-h-[1.5rem] sm:min-h-[2rem] flex items-center justify-end overflow-hidden"
  }, value || '0'));
};

const defaultTheme = {
  numberButton: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  operationButton: 'bg-orange-500 hover:bg-orange-600 text-white',
  functionButton: 'bg-gray-500 hover:bg-gray-600 text-white',
  display: 'bg-gray-900 text-white',
  container: 'bg-gray-100'
};
const CalculatorButton = ({
  value,
  onClick,
  className = '',
  variant = 'number',
  theme
}) => {
  const currentTheme = Object.assign(Object.assign({}, defaultTheme), theme);
  const variantClass = currentTheme[`${variant}Button`] || '';
  const baseClasses = 'w-full h-12 sm:h-16 text-lg sm:text-xl font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500';
  return /*#__PURE__*/React.createElement("button", {
    className: `${baseClasses} ${variantClass} ${className}`,
    onClick: () => onClick(value),
    type: "button"
  }, value);
};

const calculate = (firstValue, secondValue, operation) => {
  switch (operation) {
    case '+':
      return firstValue + secondValue;
    case '-':
      return firstValue - secondValue;
    case '*':
      return firstValue * secondValue;
    case '/':
      if (secondValue === 0) {
        throw new Error('Division by zero');
      }
      return firstValue / secondValue;
    default:
      throw new Error('Unknown operation');
  }
};
const formatDisplay = value => {
  if (Number.isNaN(value) || !Number.isFinite(value)) {
    return 'Error';
  }
  // 소수점 이하 10자리까지 표시하되, 불필요한 0은 제거
  const formatted = value.toFixed(10);
  return parseFloat(formatted).toString();
};
const isOperation = value => {
  return ['+', '-', '*', '/', '=', 'C', 'CE'].includes(value);
};
const isNumber = value => {
  return /^\d+$/.test(value);
};
const isDecimalPoint = value => {
  return value === '.';
};

const initialState = {
  display: '0',
  previousValue: null,
  operation: null,
  waitingForOperand: false
};
// 키보드 매핑
const keyMapping = {
  '0': '0',
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  '+': '+',
  '-': '-',
  '*': '*',
  '/': '/',
  '=': '=',
  'Enter': '=',
  'Escape': 'C',
  '.': '.',
  ',': '.',
  'c': 'C',
  'C': 'C',
  'Backspace': 'CE'
};
const useCalculator = (enableKeyboard = true) => {
  const [state, setState] = useState(initialState);
  const handleInput = useCallback(input => {
    setState(prevState => {
      if (isNumber(input)) {
        return handleNumberInput(prevState, input);
      }
      if (isDecimalPoint(input)) {
        return handleDecimalPointInput(prevState);
      }
      if (isOperation(input)) {
        return handleOperationInput(prevState, input);
      }
      return prevState;
    });
  }, []);
  const handleNumberInput = (prevState, input) => {
    if (prevState.waitingForOperand) {
      return Object.assign(Object.assign({}, prevState), {
        display: input,
        waitingForOperand: false
      });
    }
    return Object.assign(Object.assign({}, prevState), {
      display: prevState.display === '0' ? input : prevState.display + input
    });
  };
  const handleDecimalPointInput = prevState => {
    if (prevState.waitingForOperand) {
      return Object.assign(Object.assign({}, prevState), {
        display: '0.',
        waitingForOperand: false
      });
    }
    if (prevState.display.indexOf('.') === -1) {
      return Object.assign(Object.assign({}, prevState), {
        display: prevState.display + '.'
      });
    }
    return prevState;
  };
  const handleOperationInput = (prevState, operation) => {
    if (operation === 'C') {
      return initialState;
    }
    if (operation === 'CE') {
      return Object.assign(Object.assign({}, prevState), {
        display: '0'
      });
    }
    const inputValue = parseFloat(prevState.display);
    if (prevState.previousValue === null) {
      return Object.assign(Object.assign({}, prevState), {
        previousValue: inputValue,
        operation,
        waitingForOperand: true
      });
    }
    if (prevState.operation && !prevState.waitingForOperand) {
      try {
        const result = calculate(prevState.previousValue, inputValue, prevState.operation);
        return {
          display: formatDisplay(result),
          previousValue: operation === '=' ? null : result,
          operation: operation === '=' ? null : operation,
          waitingForOperand: operation === '=' ? false : true
        };
      } catch (error) {
        return Object.assign(Object.assign({}, initialState), {
          display: 'Error'
        });
      }
    }
    return Object.assign(Object.assign({}, prevState), {
      operation,
      waitingForOperand: true
    });
  };
  const reset = useCallback(() => {
    setState(initialState);
  }, []);
  // 키보드 이벤트 핸들러
  const handleKeyDown = useCallback(event => {
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
    reset
  };
};

const Calculator = ({
  className = '',
  orientation = 'portrait',
  theme,
  enableKeyboard = true
}) => {
  const {
    display,
    handleInput
  } = useCalculator(enableKeyboard);
  // 세로 레이아웃
  const portraitLayout = [['C', 'CE', '/', '*'], ['7', '8', '9', '-'], ['4', '5', '6', '+'], ['1', '2', '3', '='], ['0', '.']];
  // 가로 레이아웃 (더 넓은 형태)
  const landscapeLayout = [['C', 'CE', '/', '*', '='], ['7', '8', '9', '-', '0'], ['4', '5', '6', '+', '.'], ['1', '2', '3']];
  const buttonLayout = orientation === 'landscape' ? landscapeLayout : portraitLayout;
  const isLandscape = orientation === 'landscape';
  const defaultTheme = {
    container: 'bg-gray-100'
  };
  const currentTheme = Object.assign(Object.assign({}, defaultTheme), theme);
  const containerClass = currentTheme.container || 'bg-gray-100';
  return /*#__PURE__*/React.createElement("div", {
    className: `p-4 sm:p-6 rounded-xl shadow-lg mx-auto ${isLandscape ? 'max-w-2xl' : 'max-w-sm'} ${containerClass} ${className}`
  }, /*#__PURE__*/React.createElement(CalculatorDisplay, {
    value: display,
    theme: theme
  }), /*#__PURE__*/React.createElement("div", {
    className: `grid gap-2 sm:gap-3 ${isLandscape ? 'grid-cols-5' : 'grid-cols-4'}`
  }, buttonLayout.map((row, rowIndex) => row.map((button, colIndex) => {
    const isLastRow = rowIndex === buttonLayout.length - 1;
    const isZeroButton = button === '0';
    const isDecimalButton = button === '.';
    let buttonClass = '';
    let variant = 'number';
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
    return /*#__PURE__*/React.createElement(CalculatorButton, {
      key: `${rowIndex}-${colIndex}`,
      value: button,
      onClick: handleInput,
      variant: variant,
      className: buttonClass,
      theme: theme
    });
  }))));
};

export { Calculator, CalculatorButton, CalculatorDisplay, calculate, formatDisplay, isDecimalPoint, isNumber, isOperation, useCalculator };
//# sourceMappingURL=index.esm.js.map
