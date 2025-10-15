export const calculate = (firstValue, secondValue, operation) => {
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
export const formatDisplay = (value) => {
    if (Number.isNaN(value) || !Number.isFinite(value)) {
        return 'Error';
    }
    // 소수점 이하 10자리까지 표시하되, 불필요한 0은 제거
    const formatted = value.toFixed(10);
    return parseFloat(formatted).toString();
};
export const isOperation = (value) => {
    return ['+', '-', '*', '/', '=', 'C', 'CE'].includes(value);
};
export const isNumber = (value) => {
    return /^\d+$/.test(value);
};
export const isDecimalPoint = (value) => {
    return value === '.';
};
//# sourceMappingURL=calculator.js.map