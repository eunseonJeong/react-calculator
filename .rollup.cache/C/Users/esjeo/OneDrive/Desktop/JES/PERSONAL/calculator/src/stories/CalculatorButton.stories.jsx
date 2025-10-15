import { CalculatorButton } from '../shared/ui/CalculatorButton';
const meta = {
    title: 'Calculator/CalculatorButton',
    component: CalculatorButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        value: {
            control: 'text',
            description: 'Button text/value',
        },
        variant: {
            control: 'select',
            options: ['number', 'operation', 'function'],
            description: 'Button variant style',
        },
        className: {
            control: 'text',
            description: 'Additional CSS classes',
        },
        onClick: {
            action: 'clicked',
            description: 'Click handler',
        },
    },
};
export default meta;
export const NumberButton = {
    args: {
        value: '5',
        variant: 'number',
    },
};
export const OperationButton = {
    args: {
        value: '+',
        variant: 'operation',
    },
};
export const FunctionButton = {
    args: {
        value: 'C',
        variant: 'function',
    },
};
//# sourceMappingURL=CalculatorButton.stories.jsx.map