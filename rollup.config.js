import { swc } from 'rollup-plugin-swc3'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import pkg from './package.json' assert { type: 'json' }

const extensions = ['.js', '.ts']
const external = _ => /node_modules/.test(_) && !/@swc\/helpers/.test(_)
const plugins = targets => [
  nodeResolve({
    extensions
  }),
  swc({
    tsconfig: false,
    env: {
      targets
    },
    module: {
      type: 'es6'
    },
    sourceMaps: true
  })
]

export default {
  input: pkg.exports,
  plugins: plugins('defaults and supports es6-module'),
  external,
  output: {
    format: 'es',
    file: pkg.publishConfig.exports.import,
    sourcemap: true
  }
}
