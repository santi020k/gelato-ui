export const HELLO_WORLD = 'Hello, World!'

const template = document.createElement('template')

template.id = 'button-glu-template'

template.innerHTML = /* html */`
  <style>
    button {
      background-color: var(--root-blue-400)
    }
  </style>

  <button>
    <slot name="content"></slot>
  </button>
`

export class ButtonGlu extends HTMLElement {
  static readonly tag = 'button-glu'
  static observedAttributes = ['variant']
  shadow: ShadowRoot

  constructor() {
    super()

    this.shadow = this.attachShadow({ mode: 'open' })

    const templateClone = template.content.cloneNode(true)

    this.shadow.appendChild(templateClone)
  }

  connectedCallback() {
    const slot = this.shadow.querySelector('slot')

    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length) {
          slot?.append(mutation.addedNodes[0] as Element)
        }
      })
    })

    observer.observe(this, { childList: true })
  }

  disconnectedCallback() {
    console.log(`${ButtonGlu.tag} removed from page.`)
  }

  adoptedCallback() {
    console.log(`${ButtonGlu.tag} moved to new page.`)
  }

  attributeChangedCallback(name: string, _oldValue: string, _newValue: string) {
    console.log(`${ButtonGlu.tag} attribute ${name} has changed.`)
  }
}

customElements.define(ButtonGlu.tag, ButtonGlu)
