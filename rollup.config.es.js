import generatePackageJson from 'rollup-plugin-generate-package-json'

import typescript from '@rollup/plugin-typescript'

// rollup.config.js
export default {
  input: './src/index.ts',
  output: {
    file: './dist/index.mjs',
    name: 'gelatoUI',
    format: 'es'
  },
  plugins: [
    typescript({
      target: 'ES5',
      declaration: true,
      outDir: './dist',
      rootDir: 'src'
    }),
    generatePackageJson({
      outputFolder: './dist',
      baseContents: pkg => {
        pkg.scripts = undefined

        return pkg
      }
    })
  ]
}
