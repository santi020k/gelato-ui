/* eslint-disable no-undef */

import { GluIcon } from './icon'

import { newSpecPage } from '@stencil/core/testing'

describe('glu-icon', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined)
  })

  it('renders correctly with default props', async () => {
    const page = await newSpecPage({
      components: [GluIcon],
      html: '<glu-icon name="academic-cap"></glu-icon>'
    })

    expect(page.root).toEqualHtml(/* html */ `
      <glu-icon class="glu-icon" name="academic-cap" variant="outline">
        <mock:shadow-root>
          <span
            aria-label="academic-cap"
            role="img"
            style="width: 24px; height: 24px; color: inherit;"
          />
        </mock:shadow-root>
      </glu-icon>
    `)
  })

  it('does not renders any icon without name', async () => {
    const page = await newSpecPage({
      components: [GluIcon],
      html: '<glu-icon></glu-icon>'
    })

    expect(page.root).toMatchInlineSnapshot(/* html */ `
      <glu-icon variant="outline">
        <template shadowrootmode="open"></template>
      </glu-icon>
    `)
  })

  it('uses size prop correctly', async () => {
    const page = await newSpecPage({
      components: [GluIcon],
      html: '<glu-icon name="academic-cap" size="32"></glu-icon>'
    })

    const span = page.root.shadowRoot.querySelector('span')

    expect(span.style.width).toBe('32px')

    expect(span.style.height).toBe('32px')
  })

  it('prioritizes size over width/height', async () => {
    const page = await newSpecPage({
      components: [GluIcon],
      html: '<glu-icon name="academic-cap" size="32" width="40" height="20"></glu-icon>'
    })

    const span = page.root.shadowRoot.querySelector('span')

    expect(span.style.width).toBe('32px')

    expect(span.style.height).toBe('32px')
  })

  it('shows error for missing icon', async () => {
    const consoleError = jest.spyOn(console, 'error')

    await newSpecPage({
      components: [GluIcon],
      html: '<glu-icon name="missing-icon"></glu-icon>'
    })

    expect(consoleError).toHaveBeenCalledWith(
      '[GluIcon]: Icon "missing-icon" not found.'
    )
  })

  it('reflects properties correctly', async () => {
    const page = await newSpecPage({
      components: [GluIcon],
      html: '<glu-icon name="academic-cap" variant="solid" size="40" width="50" height="60"></glu-icon>'
    })

    expect(page.root).toHaveAttribute('name')

    expect(page.root).toHaveAttribute('variant')

    expect(page.root).toHaveAttribute('size')

    expect(page.root).toHaveAttribute('width')

    expect(page.root).toHaveAttribute('height')
  })

  it('renders nothing when icon is missing', async () => {
    const page = await newSpecPage({
      components: [GluIcon],
      html: '<glu-icon name="missing-icon"></glu-icon>'
    })

    expect(page.root.shadowRoot.querySelector('span')).toBeNull()
  })

  it('renders solid variant icons', async () => {
    const page = await newSpecPage({
      components: [GluIcon],
      html: '<glu-icon name="academic-cap" variant="solid"></glu-icon>'
    })

    expect(page.root).toEqualHtml(/* html */ `
    <glu-icon class="glu-icon" name="academic-cap" variant="solid">
      <mock:shadow-root>
        <span
          aria-label="academic-cap"
          role="img"
          style="width: 24px; height: 24px; color: inherit;"
        />
      </mock:shadow-root>
    </glu-icon>
  `)
  })

  it('uses width without size', async () => {
    const page = await newSpecPage({
      components: [GluIcon],
      html: '<glu-icon name="academic-cap" width="40"></glu-icon>'
    })

    const span = page.root.shadowRoot.querySelector('span')

    expect(span.style.width).toBe('40px')

    expect(span.style.height).toBe('24px') // Default height
  })

  it('uses height without size', async () => {
    const page = await newSpecPage({
      components: [GluIcon],
      html: '<glu-icon name="academic-cap" height="30"></glu-icon>'
    })

    const span = page.root.shadowRoot.querySelector('span')

    expect(span.style.width).toBe('24px') // Default width

    expect(span.style.height).toBe('30px')
  })
})
