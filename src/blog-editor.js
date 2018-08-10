import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import pell from '../node_modules/pell/src/pell.js';
import '@vaadin/vaadin-upload/vaadin-upload.js';
import '@polymer/iron-image/iron-image.js';

class BlogEditor extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          padding: 16px;
          position: relative;
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

        .dialog {
          display: none;
          position: absolute;
          top: 0;
          left: 15%;
          right: 15%;
          width: 70%;
          height: 70%;
          margin: 12% auto;
          padding: 1em;
          box-sizing: border-box;
          background-color: #ffffff;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
          overflow-y: scroll;
        }

        .dialog footer {
          text-align: right;
        }

        #embed.dialog textarea {
          width: 100%;
          min-height: 10vh;
        }

        .dialog.opened {
          display: block;
        }

        button.paper-button, select.paper-button {
          text-transform: uppercase;
          padding: 0.5em;
          min-width: 100px;
          font-size: 0.9em;
          color: #ffffff;
          background-color: red;
          border: none;
          margin: 0.4em;
          cursor: pointer;
          border-radius: 2px;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
        }

        button.paper-button.success {
          background-color: var(--app-primary-color);
        }
      </style>
      <div id="pell"></div>

      <!-- Upload image modal -->
      <section id="image" class="dialog">
        <header><h1>Upload image</h1></header>
        <main>
          <vaadin-upload
                id="upload"
                accept="image/*"
                method="POST"
                form-data-name="cover"
                target="[[_config.cdn.media]]/api/media/upload"
                withCredentials
                headers$='{"Authorization": "[[token]]"}'
                on-upload-success="fileUploaded"
                on-upload-error="fileUploadError"></vaadin-upload>
        </main>
        <footer>
          <button class="paper-button" on-click="close">Cancel</button>
        </footer>
      </section>

      <!-- Embed codepen modal -->
      <section id="embed" class="dialog">
        <header><h1>Embed Codepen</h1></header>
        <main>
          <textarea></textarea>
        </main>
        <footer>
          <button class="paper-button success" on-click="addCode">Add</button>
          <button class="paper-button" on-click="close">Cancel</button>
        </footer>
      </section>
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
      },
      _config: {
        type: Object,
        value: () => {return window.config}
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

    this._setUser();

    window.addEventListener('login-success', () => {
      this._setUser();
    });
    window.addEventListener('logout-success', () => {
      // Clear the token
      this.token = null;
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new CustomEvent('location-changed'));
    });
  }

  _setUser() {
      const profile = JSON.parse(window.sessionStorage.getItem('profile'));
      this.set('post.author', profile.email);

      this.token = window.sessionStorage.getItem('token');
  }

  fileUploaded(e, detail) {
    const parsedResponse = JSON.parse(detail.xhr.response);
    this.dispatchEvent(new CustomEvent('add-image-success', {
      detail: {image: parsedResponse}
    }));
  }

  fileUploadError(e, detail) {
    this._logout(detail.xhr.status);
  }

  addCode() {
    const embed = this.$.embed.querySelector('textarea').value;
    if (!embed) return;
    this.dispatchEvent(new CustomEvent('add-code-success', {detail: {embed: embed}}));
    this.$.embed.querySelector('textarea').value = "";
  }

  close() {
    this.shadowRoot.querySelectorAll('.dialog').forEach(dialog => {
      dialog.classList.remove('opened');
    });
  }

  changedSizing(e) {
    console.log(e.currentTarget);
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
        {
          name: 'picture',
          icon: '<b>📷</b>',
          title: 'Image',
          result: () => {
            this.$.image.classList.add('opened');
            const editor = this.$.pell.querySelector('#pell [contenteditable="true"]');
            this.addEventListener('add-image-success', (e) => {
              if (e.detail && e.detail.image) {
                let image = `<blog-figure style="max-width:${e.detail.image.dimensions.width}px;max-height:${e.detail.image.dimensions.height}px;" placeholder="${e.detail.image.imageBase64}" src="${this._config.cdn.media}/uploads/${e.detail.image.imageName}""></blog-figure><br>`;
                if (editor) {
                  editor.focus();
                  pell.exec('insertHTML', image);
                }
              }
              this.close();
              editor.focus();
            }, {once: true});
          }
        },
        {
          name: 'custom',
          icon: '<b><u><i>C</i></u></b>',
          title: 'Custom Action',
          result: () => {
            const codeModal = this.$.embed;
            codeModal.classList.add('opened');
            const editor = this.$.pell.querySelector('#pell [contenteditable="true"]');
            this.addEventListener('add-code-success', (e) => {
              if (e.detail && e.detail.embed) {
                if (editor) {
                  editor.focus();
                  pell.exec('insertHTML', `${e.detail.embed}<br>`);
                  this.close();
                  editor.focus();
                }
              }
            }, {once: true});
          }
        },
      ],
      classes: this.classes
    });

    this._editor.content.innerHTML = this.html;
  }
}

window.customElements.define('blog-editor', BlogEditor);
