// rollup.config.js
import typescript from "rollup-plugin-typescript2";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import cssnano from "cssnano";
import replace from "@rollup/plugin-replace";
import autoprefixer from "autoprefixer";
import postcssImport from "postcss-import";
import compiler from "@ampproject/rollup-plugin-closure-compiler";

export default [{
    input: "./src/index.tsx",
    output: [
        {
            dir: "./dist/scripts",
            entryFileNames: "bundle.es.js", 
            format: "es", 
            sourcemap: true,
        },
    ],
    plugins: [
        nodeResolve(),
        commonjs(),
        replace({
            "process.env.NODE_ENV": '"production"',
            "API_KEY": process.env.API_KEY,
        }),
        typescript(),
        compiler(),
        postcss({
            extract: "styles.css",
            plugins: [
                postcssImport(),
                autoprefixer(),
		        cssnano()
		    ],
        }),
    ],
}];
