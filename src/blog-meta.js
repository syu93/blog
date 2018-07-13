import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

class BlogMeta extends PolymerElement {
  static get properties() {
    return {
      base: {
        type: String,
        value: ''
      },
      separator: {
        type: String,
        value: "-"
      },
      reversed: {
        type: Boolean,
        value: false,
      },
      title: {
        type: String,
        value: '',
        observer: 'titleChanged'
      },
      description: {
        type: String,
        value: '',
        observer: 'descriptionChanged'
      },
    };
  }

  titleChanged(title) {
    if (!title) return;
    if (!this.reversed) return window.document.title = `${this.base} ${this.separator} ${title}`;
    window.document.title = window.document.title = `${title} ${this.separator} ${this.base}`;
  }
  descriptionChanged(description) {
    if (!description) return;
    const meta = window.document.head.querySelector('meta[name=description]');
    meta.content = description;
  }
}

window.customElements.define('blog-meta', BlogMeta);
