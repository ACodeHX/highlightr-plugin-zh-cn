import dotenv from "dotenv";
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import css from "rollup-plugin-css-only";
import copy from "rollup-plugin-copy";

const isProd = process.env.BUILD === "production";

dotenv.config();

const banner = `/*
THIS IS A GENERATED/BUNDLED FILE BY ROLLUP
if you want to view the source visit the plugins github repository
*/
`;

const output = [
  {
    input: "src/plugin/main.ts",
    output: {
      dir: ".",
      format: "cjs",
      exports: "default",
      banner,
      sourcemap: "inline",
    },
    external: ["obsidian"],
    plugins: [
      css({ output: "styles.css" }),
      typescript(),
      nodeResolve({ browser: true }),
      commonjs(),
    ],
  },
];

if (process.env.PLUGIN_DEST) {
  output.push({
    input: "src/plugin/main.ts",
    output: {
      dir: process.env.PLUGIN_DEST,
      sourcemap: "inline",
      format: "cjs",
      exports: "default",
      banner,
    },
    external: ["obsidian"],
    plugins: [
      css({ output: "styles.css" }),
      typescript(),
      nodeResolve({ browser: true }),
      commonjs(),
      copy({
        targets: [
          { src: "./manifest.json", dest: process.env.PLUGIN_DEST },
          { src: "./styles.css", dest: process.env.PLUGIN_DEST },
        ],
      }),
    ],
  });
}

export default output;
