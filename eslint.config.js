// @ts-check
import { ConfigOption, eslintConfig, OptionalOption } from '@santi020k/eslint-config-santi020k'

export default [
  ...eslintConfig({
    config: [ConfigOption.Ts],
    optionals: [OptionalOption.Cspell, OptionalOption.Vitest]
  }),
  {
    name: 'custom-local',
    ignores: ['dist/*', 'node_modules/*']
  }
]
