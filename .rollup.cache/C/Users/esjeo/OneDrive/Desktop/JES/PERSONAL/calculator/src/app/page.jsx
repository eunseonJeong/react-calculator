import { Calculator } from '../entities/Calculator';
export default function Home() {
    return (<div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Calculator Library
        </h1>
        <Calculator />
        <p className="mt-8 text-gray-600">
          A React calculator component built with TypeScript and Tailwind CSS
        </p>
      </div>
    </div>);
}
//# sourceMappingURL=page.jsx.map