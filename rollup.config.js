// rollup.config.js

import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
// import css from 'rollup-plugin-css-only'
// import css from 'rollup-plugin-css-only'
import copy from 'rollup-plugin-copy'

import { chromeExtension, simpleReloader} from 'rollup-plugin-chrome-extension'

export default {
  input: 'src/manifest.json',
  output: {
    dir: 'dist',
    format: 'esm',
    sourcemap: true
  },
  plugins: [
    // always put chromeExtension() before other plugins
    // css(),
    chromeExtension({}),
    simpleReloader(),
    typescript(),
    resolve({browser: true}),
    commonjs(),
    copy(
      {
        targets: [
          {src: 'src/pages/devtools/panel.html', dest: 'dist/pages/devtools'}
        ]
      }
    )
  ],
}