import vue from '@vitejs/plugin-vue'
import { swc } from 'rollup-plugin-swc3'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import pkg from './package.json' assert { type: 'json' }

const extensions = ['.js', '.ts']
const external = _ => /node_modules/.test(_) && !/@swc\/helpers/.test(_)
const plugins = (targets, vueOptions = {}) => [
  vue(vueOptions),
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

export default [
  {
    input: pkg.main,
    plugins: plugins('defaults, not ie 11, not ie_mob 11', {
      template: {
        optimizeSSR: true
      }
    }),
    external,
    output: {
      format: 'cjs',
      file: pkg.publishConfig.main,
      exports: 'named',
      sourcemap: true
    }
  },
  {
    input: pkg.main,
    plugins: plugins('defaults and supports es6-module'),
    external,
    output: {
      format: 'es',
      file: pkg.publishConfig.module,
      sourcemap: true
    }
  }
]
