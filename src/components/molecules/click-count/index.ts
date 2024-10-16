export class ClickCountComponent extends HTMLElement {
  static readonly tag = 'click-count-component'
  clickCount: number
  shadow: ShadowRoot

  constructor() {
    super()

    this.shadow = this.attachShadow({ mode: 'open' })

    this.clickCount = 0

    this.render()
  }

  onClick() {
    this.clickCount += 1
  }

  render() {
    this.shadow.innerHTML = `
      <button>Increment</button> Clicks: ${this.clickCount}
    `

    this.shadow.querySelector('button')
      ?.addEventListener('click', () => {
        this.onClick()

        this.render()
      })
  }
}

customElements.define(ClickCountComponent.tag, ClickCountComponent)
