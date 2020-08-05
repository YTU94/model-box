// rollup.config.js
import json from "rollup-plugin-json"
import commonjs from "rollup-plugin-commonjs"
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default {
    input: "src/index.js",
    output: {
        // exports: "default",
        file: "bin/bundle.js",
        format: "cjs"
    },
    plugins: [
        json(),
        resolve(),
        commonjs({
            include: "node_modules/**"
        }),
        babel({ babelHelpers: 'bundled' })
    ]
}
