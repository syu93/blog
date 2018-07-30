import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import pell from '../node_modules/pell/src/pell.js';

class BlogEditor extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          padding: 16px;
        }
        #pell {
          border: solid 1px #000000;
          background-color: #f7f7f7;
          min-height: var(--pell-min-height, 50vh);
        }
        .pell{border:1px solid hsla(0,0%,4%,.1)}.pell,.pell-content{box-sizing:border-box}.pell-content{height:300px;outline:0;overflow-y:auto;padding:10px}.pell-actionbar{background-color:#fff;border-bottom:1px solid hsla(0,0%,4%,.1)}.pell-button{background-color:transparent;border:none;cursor:pointer;height:30px;outline:0;width:30px;vertical-align:bottom}.pell-button-selected{background-color:#f0f0f0}
        .pell-actionbar {
          height: 48px;
          box-sizing: content-box;
          white-space: nowrap;
        }
        .pell-actionbar button {
          color: #000000;
          border: none;
          font-size: 0.8em;
          background-color: #fefefe;
          width: 48px;
          height: 48px;
          cursor: pointer;
        }
        .pell-actionbar button.pell-button-selected {
          font-weight: bold;
          color: var(--app-primary-color);
          border-bottom: 4px solid var(--app-primary-color);
          box-sizing: border-box;
        }
        .pell-content {
          min-height: 100%;
          height: var(--pell-editor-height, 50vh);
        }
        .pell-content p {
          margin: 0;
          margin-bottom: 1em;
        }
        pre {
          background-color: #eeeeee;
          padding: 1em;
          border-radius: 4px;
        }
      </style>
      <div id="pell"></div>
    `;
  }
  static get properties() {
    return {
      html: {
        type: String,
        notify: true
      },
      actions: {
        type: Array,
        value: null
      },
      classes: {
        type: Object,
        value: () => {
          return {
            actionbar: 'pell-actionbar',
            button: 'pell-button',
            content: 'pell-content',
            selected: 'pell-button-selected'
          }
        }
      }
    };
  }

  static get observers() {
    return [
      'configChanged(actions, classes)'
    ]
  }

  ready() {
    super.ready();
  }

  configChanged(actions, classes) {
    // QUICKFIX : Destroy the editor on config changed
    this.$.pell.innerHTML = "";
    this._editor = pell.init({
      element: this.$.pell,
      onChange: html => {
        // Fire event to get the value
        this.set('html', html);
        this.dispatchEvent(new CustomEvent('html-changed', {detail: {value: html}, bubbles: true, composed: true}));
      },
      defaultParagraphSeparator: 'p',
      styleWithCSS: false,
      actions: this.actions || [
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'heading1',
        'heading2',
        'paragraph',
        'quote',
        'olist',
        'ulist',
        'code',
        'line',
        'link',
        'image',
        {
          name: 'custom',
          icon: '<b><u><i>C</i></u></b>',
          title: 'Custom Action',
          result: () => pell.exec('insertHTML', '<div style="font-size: 14px;background: #4e4846;color: #ffffff;letter-spacing: 1px;font-weight: 600;">// insert some code ...</div>')
        },
      ],
      classes: this.classes
    });

    this._editor.content.innerHTML = this.html;
  }
}

window.customElements.define('blog-editor', BlogEditor);
