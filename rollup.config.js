import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.ts',
  treeshake: {
    moduleSideEffects: false,
    propertyReadSideEffects: false,
  },
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: false,
      exports: 'named',
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: false,
    },
  ],
  plugins: [
    nodeResolve({
      browser: true,
      preferBuiltins: false,
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.lib.json',
      declaration: true,
      declarationDir: './dist',
      exclude: ['**/*.stories.*', '**/*.test.*', '**/app/**', '**/pages/**', '**/stories/**', '**/widgets/**', '**/features/**'],
      outputToFilesystem: true,
    }),
  ],
  external: ['react', 'react-dom'],
};
