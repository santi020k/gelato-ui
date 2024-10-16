export const HELLO_WORLD = 'Hello, World!'

export class TextComponent extends HTMLElement {
  static readonly tag = 'text-component'
  static observedAttributes = ['text']
  shadow: ShadowRoot

  constructor() {
    super()

    this.shadow = this.attachShadow({ mode: 'open' })

    this.shadow.innerHTML = this.getAttribute('text') || this.getDefaultText()
  }

  attributeChangedCallback(_name: string, _oldValue: string, newValue: string) {
    this.shadow.innerHTML = newValue
  }

  getDefaultText() {
    return HELLO_WORLD
  }
}

customElements.define(TextComponent.tag, TextComponent)
