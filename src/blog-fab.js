import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icon/iron-icon.js';

class BlogFab extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: inline-block;
          position: fixed;
          bottom: var(--blog-fab-bottom, 2em);
          right: var(--blog-fab-right, 2em);
          z-index: 100;
        }
        button {
          border: none;
          background-color: var(--blog-fab-bg-color, royalblue);
          min-height: 64px;
          min-width: 64px;
          border-radius: 100%;
          color: #ffffff;
          cursor: pointer;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
        }
        button:active {
          background-color: #5c75bf;
        }
      </style>
      <button alt$="[[tooltip]]"><iron-icon icon="my-icons:create"></iron-icon></button>
    `;
  }
  static get properties() {
    return {
      tooltip: String
    }
  }
}

window.customElements.define('blog-fab', BlogFab);
