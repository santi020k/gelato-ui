/* eslint-disable @stylistic/lines-around-comment */

export class TestUtils {
  /**
   * Renders a given element with provided attributes
   * and returns a promise which resolves as soon as
   * rendered element becomes available.
   * @param {string} tag
   * @param {object} attributes
   * @param {children} unknown
   * @returns {Promise<HTMLElement>}
   */
  static render(tag: string, attributes = {}, children?: unknown): Promise<HTMLElement> {
    TestUtils._renderToDocument(tag, attributes, children)

    return TestUtils._waitForComponentToRender(tag)
  }

  /**
   * Replaces document's body with provided element
   * including given attributes.
   * @param {string} tag
   * @param {object} attributes
   * @param {children} unknown
   */
  static _renderToDocument(tag: string, attributes = {}, children?: unknown): void {
    const htmlAttributes = TestUtils._mapObjectToHTMLAttributes(attributes)

    document.body.innerHTML = `<${tag} ${htmlAttributes}>${children}</${tag}>`
  }

  /**
   * Converts an object to HTML string representation of attributes.
   *
   * For example: `{ foo: "bar", baz: "foo" }`
   * becomes `foo="bar" baz="foo"`
   *
   * @param {object} attributes
   * @returns {string}
   */
  static _mapObjectToHTMLAttributes(attributes = {}): string {
    return Object.entries(attributes).reduce((previous, current) => previous + ` ${current[0]}="${current[1]}"`, '')
  }

  /**
   * Returns a promise which resolves as soon as
   * requested element becomes available.
   * @param {string} tag
   * @returns {Promise<HTMLElement>}
   */
  static async _waitForComponentToRender(tag: string): Promise<HTMLElement> {
    return new Promise(resolve => {
      const requestComponent = () => {
        const element: HTMLElement | null = document.querySelector(tag)

        if (element) {
          resolve(element)
        } else {
          window.requestAnimationFrame(requestComponent)
        }
      }

      requestComponent()
    })
  }
}
