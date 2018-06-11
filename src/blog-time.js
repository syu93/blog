import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import 'timeago.js';

class BlogTime extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: inline-block;
          font-size: 0.8em;
          font-weight: bold;
          vertical-align: middle;
          margin: 4px 0 4px .4rem;
        }
        time::before {
          content: '\\0000a0\\002022\\0000a0';
          margin-right: .4rem;
        }
      </style>
      <time datetime$="seconds: [[date]]">[[getDate()]]</time>
    `;
  }

  static get properties() {
    return {
      date: {
        type: Number
      }
    };
  }

  // FIXME : Replace with direct call in LitElement
  getDate() {
    return timeago().format(this.date)
  }
}

window.customElements.define('blog-time', BlogTime);
