import esbuild from 'rollup-plugin-esbuild'

export default [
  //
  {
    external: (id) => !/^[./]/.test(id),
    input: 'src/index.ts',
    output: {
      file: 'bin/index.js',
      format: 'cjs'
    },
    plugins: esbuild({ minify: true })
  },
  //
  {
    external: (id) => !/^[./]/.test(id),
    input: 'src/plugins/sign-tag/index.ts',
    output: {
      file: 'plugins/sign-tag/index.js',
      format: 'cjs'
    },
    plugins: esbuild({ minify: true })
  }
]
