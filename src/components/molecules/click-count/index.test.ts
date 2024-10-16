import { describe, expect, it } from 'vitest'

import { TestUtils } from './../../../utils/test'
import { ClickCountComponent } from './'

describe('Click Count Component', () => {
  it('displayed click count starts from 0', async () => {
    const { shadowRoot } = await TestUtils.render(ClickCountComponent.tag)

    expect(shadowRoot?.innerHTML.includes('Clicks: 0')).toBeTruthy()
  })

  it('clicking the button increments displayed click count', async () => {
    const { shadowRoot } = await TestUtils.render(ClickCountComponent.tag)

    shadowRoot?.querySelector('button')?.click()

    shadowRoot?.querySelector('button')?.click()

    expect(shadowRoot?.innerHTML.includes('Clicks: 2')).toBeTruthy()
  })
})
