import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

class BlogToast extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          position: fixed;
          top: var(--blog-toast-top, 30vh);
          right: var(--blog-toast-right, 0);
          z-index: 100;
          width: 0;
          height: 0;
        }
        :host([showed]) {
          width: auto;
          height: auto;
        }
        .toast {
          font-size: 1.2em;
          white-space: wrap;
          min-height: 128px;
          width: 400px;
          padding: 2em 1em;
          border-left: solid 8px var(--app-primary-color);
          background-color: #ffffff;
          transform: translate(101vw, 0);
          transition: all 0.6s;
          box-sizing: border-box;
        }

        .toast.showed {
          transform: translate(0, 0);
          cursor: pointer;
        }
      </style>
      <section id="toast" class="toast" on-click="hide">
        <p>[[message]]</p>
      </section>
    `;
  }
  static get properties() {
    return {
      message: {
        type: String,
        value: ""
      },
      showed: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      duration: {
        type: Number,
        value: 6000
      }
    };
  }

  show() {
    this._clear();
    this.$.toast.classList.add('showed');
    this.timeout = setTimeout(this.hide.bind(this), this.duration);
    this.set('showed', true);
  }

  hide() {
    this.$.toast.classList.remove('showed');
    setTimeout(() => {
      this.set('showed', false);
      this.dispatchEvent(new CustomEvent('toast-closed'));
    }, 1100);
  }

  _clear() {clearTimeout(this.timeout)}
}

window.customElements.define('blog-toast', BlogToast);
