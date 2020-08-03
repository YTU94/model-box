// rollup.config.js
import json from "rollup-plugin-json"
import resolve from "rollup-plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"
import babel from "rollup-plugin-babel"

export default {
    input: "src/main.js",
    output: {
        exports: "default",
        file: "bin/bundle.js",
        format: "cjs"
    },
    plugin: [
        json(),
        resolve(),
        commonjs({
            include: "node_modules/**"
        }),
        babel({
            babelHelpers: 'bundled',
            exclude: "node_modules/**"
        })
    ]
}
