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
      article: {
        type: Object,
      },
      title: {
        type: String,
        value: '',
        // observer: 'titleChanged'
      },
      description: {
        type: String,
        value: '',
        // observer: 'descriptionChanged'
      },
      _config: {
        type: Object,
        value: () => {return window.config}
      }
    };
  }

  static get observers() {
    return [
      '_updateDocumentTitle(title, description, article.*)'
    ];
  }

  apply() {
    this._updateDocumentTitle(this.title, this.description, this.article);
  }

  _updateDocumentTitle(title, description, article) {
    if (!title) return;
    if (!this.reversed) window.document.title = `${this.base} ${this.separator} ${title}`;
    else window.document.title = window.document.title = `${title} ${this.separator} ${this.base}`;

    if (!description) return;
    const meta = window.document.head.querySelector('meta[name=description]');
    meta.content = description;

    this._setPageMetadata({
      title: article.title,
      description: article.metaDescription,
      image: `${this._config.cdn.media}/uploads/${article.image}`,
    });

  }

  _setPageMetadata(article) {
    // Set open graph metadata
    this._setMeta('property', 'og:title', document.title);
    this._setMeta('property', 'og:description', article.description || document.title);
    this._setMeta('property', 'og:url', document.location.href);
    this._setMeta('property', 'og:image', article.image);
    // Set twitter card metadata
    this._setMeta('property', 'twitter:title', document.title);
    this._setMeta('property', 'twitter:description', article.description || document.title);
    this._setMeta('property', 'twitter:url', document.location.href);
    this._setMeta('property', 'twitter:image:src', article.image);
  }
  _setMeta(attrName, attrValue, content) {
    let element = document.head.querySelector(`meta[${attrName}="${attrValue}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attrName, attrValue);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content || '');
  }
}

window.customElements.define('blog-meta', BlogMeta);
