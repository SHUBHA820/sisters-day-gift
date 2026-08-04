import js from '@eslint/js'
import globals from 'globals'
import * as reactPlugin from 'eslint-plugin-react'
import * as reactHooks from 'eslint-plugin-react-hooks'
import * as reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

const reactPluginObject = reactPlugin.default ?? reactPlugin
const reactHooksObject = reactHooks.default ?? reactHooks
const reactRefreshObject = reactRefresh.default ?? reactRefresh
const reactJsxRuntimeConfig = reactPluginObject.configs['jsx-runtime']

const rules = {
  ...js.configs.recommended.rules,
  ...reactPluginObject.configs.recommended.rules,
  ...reactHooksObject.configs.recommended.rules,
  ...reactRefreshObject.configs.vite.rules,
  ...reactJsxRuntimeConfig.rules,
  'react/prop-types': 0,
}

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      react: reactPluginObject,
      'react-hooks': reactHooksObject,
      'react-refresh': reactRefreshObject,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ...reactJsxRuntimeConfig.parserOptions,
        ecmaFeatures: {
          ...(reactJsxRuntimeConfig.parserOptions?.ecmaFeatures || {}),
          jsx: true,
        },
      },
    },
    rules,
  },
])
