import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

class BlogTime extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          font-size: 0.8em;
        }
      </style>
      <span id="time">2 days ago</span>
    `;
  }
  static get properties() {
    return {
    };
  }
}

window.customElements.define('blog-time', BlogTime);
