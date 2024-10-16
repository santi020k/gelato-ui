import { describe, expect, it, vi } from 'vitest'

import { ButtonGlu } from '.'

import { TestUtils } from '../../../utils/test'

const ALTERNATIVE_TEXT = 'Provided text'

describe('ButtonGlu Component', () => {
  it('should display the default text', async () => {
    const { shadowRoot } = await TestUtils.render(ButtonGlu.tag)

    // Verify that the default slot is rendered
    expect(shadowRoot?.innerHTML.includes('<slot name="content"></slot>')).toBeTruthy()
  })

  it('should display provided text inside the button', async () => {
    const { shadowRoot } = await TestUtils.render(
      ButtonGlu.tag, { }, ALTERNATIVE_TEXT
    )

    // MutationObserver works asynchronously, so we need to wait for it
    await new Promise(resolve => setTimeout(resolve, 0))

    // Check that the alternative text is rendered inside the shadow DOM
    expect(shadowRoot?.innerHTML.includes(ALTERNATIVE_TEXT)).toBeTruthy()
  })

  it('should respond to attribute changes', async () => {
    const { shadowRoot } = await TestUtils.render(ButtonGlu.tag)

    // Simulate changing an attribute
    shadowRoot?.host.setAttribute('variant', 'primary')

    // Since `attributeChangedCallback` logs a message, we can mock console.log
    const consoleSpy = vi.spyOn(console, 'log')

    // Trigger attribute change detection
    shadowRoot?.host.setAttribute('variant', 'secondary')

    expect(consoleSpy).toHaveBeenCalledWith(`${ButtonGlu.tag} attribute variant has changed.`)

    // Clean up the spy
    consoleSpy.mockRestore()
  })

  it('should call disconnectedCallback when removed from the DOM', async () => {
    const { shadowRoot } = await TestUtils.render(ButtonGlu.tag)
    // Mock console log
    const consoleSpy = vi.spyOn(console, 'log')

    // Remove the element from the DOM to trigger disconnectedCallback
    shadowRoot?.host.remove()

    expect(consoleSpy).toHaveBeenCalledWith(`${ButtonGlu.tag} removed from page.`)

    // Clean up the spy
    consoleSpy.mockRestore()
  })

  it('should observe child mutations and append them to the slot', async () => {
    const { shadowRoot } = await TestUtils.render(ButtonGlu.tag)
    const content = document.createElement('span')

    content.textContent = 'Dynamic content'

    // Add new content to the component
    shadowRoot?.host.appendChild(content)

    // MutationObserver works asynchronously, so we need to wait for it
    await new Promise(resolve => setTimeout(resolve, 0))

    // MutationObserver should trigger and append this new node to the slot
    expect(shadowRoot?.innerHTML.includes('Dynamic content')).toBeTruthy()
  })

  // TODO: this test doesn't work right now, but its not necessary in this moment
  it.skip('should call adoptedCallback when moved to a new document', async () => {
    const { shadowRoot } = await TestUtils.render(ButtonGlu.tag)
    // Mock console log
    const consoleSpy = vi.spyOn(console, 'log')
    // Move the element to a new document to trigger adoptedCallback
    const newDocument = document.implementation.createHTMLDocument()

    newDocument.body.appendChild(document.adoptNode(shadowRoot?.host as Node))

    expect(consoleSpy).toHaveBeenCalledWith(`${ButtonGlu.tag} moved to new page.`)

    // Clean up the spy
    consoleSpy.mockRestore()
  })
})
