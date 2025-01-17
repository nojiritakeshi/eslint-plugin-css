import { RuleTester } from "eslint";
import rule from "../../../lib/rules/color-hex-style";

const tester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
});

tester.run("color-hex-style", rule as any, {
  valid: [
    `
        var a = <div style={
            {
                color: '#fff',
                backgroundColor: '#dedede',
                borderColor: '#dedede00',
            }
        } />
        `,
    {
      filename: "test.vue",
      code: `
            <template>
                <div :style="{
                    color: '#fff',
                    backgroundColor: '#dedede',
                    borderColor: '#dedede00',
                }"/>
            </template>
            `,
      parser: require.resolve("vue-eslint-parser"),
    },
    {
      code: `
            var a = <div style={
                {
                    color: '#ffffff',
                    backgroundColor: '#00FF00',
                    borderColor: '#00FF00fF',
                }
            } />
            `,
      options: ["RRGGBB"],
    },
    {
      filename: "test.vue",
      code: `
            <template>
                <div :style="{
                    color: '#ffffff',
                    backgroundColor: '#00FF00',
                    borderColor: '#00FF00fF',
                }"/>
            </template>
            `,
      options: ["RRGGBB"],
      parser: require.resolve("vue-eslint-parser"),
    },
  ],
  invalid: [
    {
      code: `
            var a = <div style={
                {
                    color: '#ffffff',
                    backgroundColor: '#00FF00',
                    borderColor: '#00FF00fF',
                }
            } />
            `,
      output: `
            var a = <div style={
                {
                    color: '#fff',
                    backgroundColor: '#0F0',
                    borderColor: '#0F0f',
                }
            } />
            `,
      errors: [
        {
          message: "Expected '#ffffff' to be '#fff'.",
          line: 4,
          column: 29,
        },
        {
          message: "Expected '#00FF00' to be '#0F0'.",
          line: 5,
          column: 39,
        },
        {
          message: "Expected '#00FF00fF' to be '#0F0f'.",
          line: 6,
          column: 35,
        },
      ],
    },
    {
      filename: "test.vue",
      code: `
            <template>
                <div :style="{
                    color: '#ffffff',
                    backgroundColor: '#00FF00',
                    borderColor: '#00FF00fF',
                }"/>
            </template>
            `,
      output: `
            <template>
                <div :style="{
                    color: '#fff',
                    backgroundColor: '#0F0',
                    borderColor: '#0F0f',
                }"/>
            </template>
            `,
      parser: require.resolve("vue-eslint-parser"),
      errors: [
        {
          message: "Expected '#ffffff' to be '#fff'.",
          line: 4,
          column: 29,
        },
        {
          message: "Expected '#00FF00' to be '#0F0'.",
          line: 5,
          column: 39,
        },
        {
          message: "Expected '#00FF00fF' to be '#0F0f'.",
          line: 6,
          column: 35,
        },
      ],
    },
    {
      code: `
            var a = <div style={
                {
                    color: '#fff',
                    backgroundColor: '#0F0',
                    borderColor: '#0F0f',
                }
            } />
            `,
      output: `
            var a = <div style={
                {
                    color: '#ffffff',
                    backgroundColor: '#00FF00',
                    borderColor: '#00FF00ff',
                }
            } />
            `,
      options: ["RRGGBB"],
      errors: [
        {
          message: "Expected '#fff' to be '#ffffff'.",
          line: 4,
          column: 29,
        },
        {
          message: "Expected '#0F0' to be '#00FF00'.",
          line: 5,
          column: 39,
        },
        {
          message: "Expected '#0F0f' to be '#00FF00ff'.",
          line: 6,
          column: 35,
        },
      ],
    },
    {
      filename: "test.vue",
      code: `
            <template>
                <div :style="{
                    color: '#fff',
                    backgroundColor: '#0F0',
                    borderColor: '#0F0f',
                }"/>
            </template>
            `,
      output: `
            <template>
                <div :style="{
                    color: '#ffffff',
                    backgroundColor: '#00FF00',
                    borderColor: '#00FF00ff',
                }"/>
            </template>
            `,
      options: ["RRGGBB"],
      parser: require.resolve("vue-eslint-parser"),
      errors: [
        {
          message: "Expected '#fff' to be '#ffffff'.",
          line: 4,
          column: 29,
        },
        {
          message: "Expected '#0F0' to be '#00FF00'.",
          line: 5,
          column: 39,
        },
        {
          message: "Expected '#0F0f' to be '#00FF00ff'.",
          line: 6,
          column: 35,
        },
      ],
    },
  ],
});
