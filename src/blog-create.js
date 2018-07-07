import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-image/iron-image.js';
import './blog-time.js';
import './blog-posts-edit.js';

class BlogCreate extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          position: relative;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #f7f7f7;
        }
      </style>
      <blog-posts-edit></blog-posts-edit>
    `;
  }
  static get properties() {
    return {
      isready: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
    };
  }

  ready() {
    super.ready();
    this.set('isready', true);
  }

}

window.customElements.define('blog-create', BlogCreate);
