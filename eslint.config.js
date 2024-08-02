// @ts-check
import { ConfigOptions, eslintConfig, OptionalOptions } from '@santi020k/eslint-config-santi020k'

export default [
  ...eslintConfig({
    config: [ConfigOptions.Ts],
    optionals: [OptionalOptions.Cspell, OptionalOptions.Vitest]
  }),
  {
    name: 'custom-local',
    ignores: ['dist/*', 'node_modules/*']
  }
]
