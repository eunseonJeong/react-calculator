# React Calculator Library

A modern, accessible React calculator component library built with TypeScript and Tailwind CSS.

## Features

- 🧮 Full calculator functionality (addition, subtraction, multiplication, division)
- ⌨️ Keyboard input support (numbers, operators, Enter, Escape, Backspace)
- 📱 Responsive design for mobile and desktop
- 🔄 Portrait and landscape orientations
- 🎨 Customizable themes with Tailwind CSS classes
- ♿ Accessible components with focus management
- 📚 Storybook documentation
- 🔧 TypeScript support
- 🏗️ Built with Feature-Sliced Design (FSD) architecture

## Installation

```bash
npm install react-calcboard
```

## Usage

### Basic Usage

```tsx
import { Calculator } from 'react-calcboard';

function App() {
  return (
    <div>
      <Calculator />
    </div>
  );
}
```

### With Custom Orientation

```tsx
import { Calculator } from 'react-calcboard';

function App() {
  return (
    <div>
      {/* Portrait (default) */}
      <Calculator orientation="portrait" />
      
      {/* Landscape */}
      <Calculator orientation="landscape" />
    </div>
  );
}
```

### With Custom Theme

```tsx
import { Calculator } from 'react-calcboard';

function App() {
  const customTheme = {
    numberButton: 'bg-blue-200 hover:bg-blue-300 text-blue-800',
    operationButton: 'bg-green-500 hover:bg-green-600 text-white',
    functionButton: 'bg-red-500 hover:bg-red-600 text-white',
    display: 'bg-purple-900 text-purple-100',
    container: 'bg-yellow-100',
  };

  return (
    <div>
      <Calculator theme={customTheme} />
    </div>
  );
}
```

### Without Keyboard Support

```tsx
import { Calculator } from 'react-calcboard';

function App() {
  return (
    <div>
      <Calculator enableKeyboard={false} />
    </div>
  );
}
```

### Using Individual Components

```tsx
import { CalculatorButton, CalculatorDisplay, useCalculator } from 'react-calcboard';

function CustomCalculator() {
  const { display, handleInput } = useCalculator();
  
  return (
    <div>
      <CalculatorDisplay value={display} />
      <CalculatorButton value="1" onClick={handleInput} />
    </div>
  );
}
```

## Components

### Calculator

The main calculator component with full functionality.

**Props:**
- `className?: string` - Additional CSS classes
- `orientation?: 'portrait' | 'landscape'` - Calculator layout orientation (default: 'portrait')
- `theme?: CalculatorTheme` - Custom theme object with Tailwind CSS classes
- `enableKeyboard?: boolean` - Enable keyboard input support (default: true)

### CalculatorButton

A customizable button component for the calculator.

**Props:**
- `value: string` - Button text/value
- `onClick: (value: string) => void` - Click handler
- `className?: string` - Additional CSS classes
- `variant?: 'number' | 'operation' | 'function'` - Button style variant
- `theme?: CalculatorTheme` - Custom theme object

### CalculatorDisplay

A display component for showing calculator values.

**Props:**
- `value: string` - Display value
- `className?: string` - Additional CSS classes
- `theme?: CalculatorTheme` - Custom theme object

## Theme System

The calculator supports custom theming through Tailwind CSS classes:

```tsx
interface CalculatorTheme {
  numberButton?: string;    // Tailwind classes for number buttons
  operationButton?: string; // Tailwind classes for operation buttons
  functionButton?: string;  // Tailwind classes for function buttons (C, CE)
  display?: string;         // Tailwind classes for display
  container?: string;       // Tailwind classes for container
}
```

### Example Themes

**Default Theme:**
```tsx
{
  numberButton: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  operationButton: 'bg-orange-500 hover:bg-orange-600 text-white',
  functionButton: 'bg-gray-500 hover:bg-gray-600 text-white',
  display: 'bg-gray-900 text-white',
  container: 'bg-gray-100',
}
```

**Dark Theme:**
```tsx
{
  numberButton: 'bg-gray-700 hover:bg-gray-600 text-white',
  operationButton: 'bg-orange-600 hover:bg-orange-700 text-white',
  functionButton: 'bg-gray-800 hover:bg-gray-700 text-white',
  display: 'bg-black text-green-400',
  container: 'bg-gray-900',
}
```

## Keyboard Support

The calculator supports keyboard input when `enableKeyboard` is true:

- **Numbers**: 0-9
- **Operators**: +, -, *, /
- **Enter**: Equals (=)
- **Escape**: Clear (C)
- **Backspace**: Clear Entry (CE)
- **Comma/Period**: Decimal point (.)

## Hooks

### useCalculator

A custom hook that provides calculator state and logic.

**Parameters:**
- `enableKeyboard?: boolean` - Enable keyboard input support (default: true)

**Returns:**
- `display: string` - Current display value
- `handleInput: (input: string) => void` - Function to handle user input
- `reset: () => void` - Function to reset calculator

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/eunseonJeong/react-calculator.git
cd react-calculator

# Install dependencies
npm install

# Start development server
npm run dev

# Start Storybook
npm run storybook
```

### Building

```bash
# Build the library
npm run build-lib

# Build Storybook
npm run build-storybook
```

## Storybook

This project includes Storybook for component documentation and testing. Run `npm run storybook` to view the interactive documentation with various themes and configurations.

## License

MIT License - see LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.# react-calculator
# react-calculator
