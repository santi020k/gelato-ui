import { describe, expect, it } from 'vitest'

import { HELLO_WORLD, TextComponent } from './'

import { TestUtils } from '../../utils/test'

const ALTERNATIVE_TEXT = 'Provided text'

describe('Text Component', () => {
  it('returns default text', () => {
    const component = new TextComponent()

    expect(component.getDefaultText()).toEqual(HELLO_WORLD)
  })

  it('displays default text', async () => {
    const { shadowRoot } = await TestUtils.render(TextComponent.tag)

    expect(shadowRoot?.innerHTML.includes(HELLO_WORLD)).toBeTruthy()
  })

  it('displays text', async () => {
    const { shadowRoot } = await TestUtils.render(
      TextComponent.tag, { text: ALTERNATIVE_TEXT }
    )

    expect(shadowRoot?.innerHTML.includes(ALTERNATIVE_TEXT)).toBeTruthy()
  })
})
