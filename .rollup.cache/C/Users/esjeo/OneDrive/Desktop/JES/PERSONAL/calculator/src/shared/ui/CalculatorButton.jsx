import React from 'react';
const defaultTheme = {
    numberButton: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    operationButton: 'bg-orange-500 hover:bg-orange-600 text-white',
    functionButton: 'bg-gray-500 hover:bg-gray-600 text-white',
    display: 'bg-gray-900 text-white',
    container: 'bg-gray-100',
};
export const CalculatorButton = ({ value, onClick, className = '', variant = 'number', theme, }) => {
    const currentTheme = Object.assign(Object.assign({}, defaultTheme), theme);
    const variantClass = currentTheme[`${variant}Button`] || '';
    const baseClasses = 'w-full h-12 sm:h-16 text-lg sm:text-xl font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500';
    return (<button className={`${baseClasses} ${variantClass} ${className}`} onClick={() => onClick(value)} type="button">
      {value}
    </button>);
};
//# sourceMappingURL=CalculatorButton.jsx.map