import { CalculatorDisplay } from '../shared/ui/CalculatorDisplay';
const meta = {
    title: 'Calculator/CalculatorDisplay',
    component: CalculatorDisplay,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        value: {
            control: 'text',
            description: 'Display value',
        },
        className: {
            control: 'text',
            description: 'Additional CSS classes',
        },
    },
};
export default meta;
export const Default = {
    args: {
        value: '0',
    },
};
export const WithNumber = {
    args: {
        value: '123.45',
    },
};
export const WithLongNumber = {
    args: {
        value: '999999999.999999999',
    },
};
export const Error = {
    args: {
        value: 'Error',
    },
};
//# sourceMappingURL=CalculatorDisplay.stories.jsx.map