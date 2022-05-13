import typescript from 'rollup-plugin-typescript2';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import cleaner from 'rollup-plugin-cleaner';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';

const extensions = ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss'];
export default {
  input: 'layouts-builder/index.ts',
  output: [
    {
      dir: './packages',
      format: 'cjs',
      sourcemap: false,
    },
    {
      dir: './packages/esm',
      format: 'esm',
      sourcemap: false,
      preserveModules: true,
    },
  ],
  plugins: [
    postcss({
      minimize: true,
      modules: false,
      use: {
        sass: null,
        stylus: null,
        less: { javascriptEnabled: true },
      },
      extract: true,
    }),
    resolve({ extensions }),
    typescript({ tsconfig: './tsconfig.json' }),
    babel({
      extensions,
      babelHelpers: 'bundled',
      include: ['layouts-builder/**/*'],
      exclude: ['packages/**/*', 'node_modules'],
    }),
    // cleaner({
    //   targets: ['./packages'],
    // }),
    peerDepsExternal(),
    commonjs({ extensions: ['.js', '.ts'] }),
  ],
};
