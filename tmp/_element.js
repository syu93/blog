import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `blog-card`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class BlogCard extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'blog-card',
      },
    };
  }
}

window.customElements.define('blog-card', BlogCard);
