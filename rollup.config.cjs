const resolve = require('@rollup/plugin-node-resolve')
const terser = require('@rollup/plugin-terser')
const typescript = require('rollup-plugin-typescript2')

module.exports = {
    input: 'lib/index.ts',
    output: [
        {
            format: 'iife',
            name: '$uu',
            file: 'dist/uiueutils.min.js',
            plugins: [
                terser()
            ]
        },
        {
            format: 'es',
            file: 'dist/uiueutils.es.js'
        }
    ],
    plugins: [
        typescript(),
        resolve(),
    ]
}