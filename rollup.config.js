import babel from 'rollup-plugin-babel';
import bundleSize from 'rollup-plugin-bundle-size';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
// import postcss from 'rollup-plugin-postcss-modules'
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';
import svgr from '@svgr/rollup';

import pkg from './package.json';

const extensions = ['.ts', '.tsx'];

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    resolve({ extensions }),
    commonjs(),
    external(['react', 'react-dom', 'react-beautiful-dnd']),
    postcss({
      modules: true,
    }),
    url(),
    svgr(),
    babel({ extensions, include: ['src/**/*'] }),
    bundleSize(),
  ],
};
