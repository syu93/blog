import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icon/iron-icon.js';
import './blog-editor.js';

class BlogPostsEdit extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          position: relative;
        }

        article { transform: translate(0, -64px); }
        article header { position: relative; }

        article header h1 {
          margin: 0;
          color: #f7f7f7;
          line-height: 52px;
          width: 80%;
          text-align: center;
          text-transform: none;
          letter-spacing: 0px;
          font-size: 2em;
        }
        article input {
          background-color: transparent;
          border: none;
          width: 100%;
          height: inherit;
          line-height: inherit;
          font-size: inherit;
          color: inherit;
          text-align: center;
          cursor: pointer;
        }

        ::placeholder {
            color: #ffffff;
            opacity: 1; /* Firefox */
        }

        :-ms-input-placeholder { /* Internet Explorer 10-11 */
           color: #ffffff;
        }

        ::-ms-input-placeholder { /* Microsoft Edge */
           color: #ffffff;
        }

        article header h1 input:hover {
          background-color: rgba(181, 181, 181, 0.33);
        }

        header figure {
          margin: 0;
          padding: 0;
          height: 80vh;
        }

        header figure iron-image {
          background-color: #3eb7e9;
          width: 100%;
          height: 100%;
        }

        header .filter {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          color: #ffffff;
          font-weight: 400;
          font-size: 12px;
          background-color: rgba(0, 0, 0, 0);
          background-image: -webkit-linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, .4) 75%, rgba(0, 0, 0, .4) 100%);
          background-image: linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, .4) 75%, rgba(0, 0, 0, .4) 100%);
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          justify-content: center;
          align-items: center;
        }

        header .filter .meta {
          position: absolute;
          bottom: 0;
          width: 90%;
          margin: 20px 0;
          font-size: 20px;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-direction: row;
          flex-direction: row;
          -ms-flex-wrap: nowrap;
          flex-wrap: nowrap;
          -ms-flex-pack: start;
          justify-content: flex-start;
          -ms-flex-line-pack: stretch;
          align-content: stretch;
          -ms-flex-align: center;
          align-items: center;
        }

        header .filter .meta .align-right {
          padding: 0 8px;
          text-align: right;
          box-sizing: border-box;
          z-index: 1;
          -ms-flex-order: 0;
          order: 0;
          -ms-flex: 1 1 auto;
          flex: 1 1 auto;
          -ms-flex-item-align: auto;
          align-self: auto;
        }

        .author-ctn {
          width: 64px;
          height: 64px;
          min-width: 64px;
          min-height: 64px;
          border-radius: 100%;
          overflow: hidden;
          display: inline-block;
          height: 64px;
          background-color: lightgrey;
          vertical-align: middle;
        }

        .author-ctn iron-image {
          width: 64px;
          height: 64px;
          background-color: lightgrey;
        }

        main {
          padding: 0.5em 1.2em;
          text-align: justify;
          font-size: 1.2em;
          background-color: #fefefe;
          z-index: 1;
        }

        main h2#summary { 
          margin: 1em 0;
          font-style: italic;
          font-weight: 400;
          letter-spacing: normal;
          line-height: normal;
          text-transform: none;
          font-size: 1.2em;
          color: #6A6A6A;
        }

        [hidden] {display: none !important;}

        .left-space { margin-left: 0.6em; }

        .flex-row {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          align-content: flex-end;
        }

        .hero-position {
          position: absolute;
          top: 0;
          right: 0;
          min-height: 32px;
        }

        .hero-position button, .hero-position select {
          text-transform: uppercase;
          padding: 0.5em;
          font-size: 1.4em;
          color: var(--app-secondary-color);
          background-color: #ffffff;
          border: none;
          margin: 0.4em;
          cursor: pointer;
          border-radius: 2px;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
        }

        .hero-position button:hover { background-color: #d8d6d6 }

        .summary-editor {
          margin-bottom: 1em;
          --pell-min-height: 48px;
          --pell-editor-height: 40px;
        }

        /* Wide layout: when the viewport width is bigger than 460px, layout
        changes to a wide layout. */
        @media (min-width: 460px) {
          :host article{
            transform: translate(0, 0);
          }

          article header h1 {
            font-size: 47px; 
          }

          header .filter .meta {
            bottom: 4.5em;
          }

          main {
            margin: 0.5em 15%;
            transform: translate(0, -100px);
          }
        }
      </style>
      <article>
        <header>
          <figure><iron-image
            src="[[post.image]]"
            placeholder="[[post.image]]"
            preload
            fade
            sizing="[[post.cover]]"
            position="[[post.position]]"></iron-image></figure>
            <input id="inpt" type="file" hidden on-change="previewFile">
          <div class="filter">
            <div class="hero-position flex-row">
              <button on-click="_fileUpload">UPLOAD</button>
              <button on-click="_changeSizing">SIZING</button>
              <select value="{{post.position::input}}">
                <option value="top" selected$="_isSeleted('top')">Top</option>
                <option value="center" selected$="_isSeleted('center')">Center</option>
                <option value="bottom" selected$="_isSeleted('bottom')">Bottom</option>
              </select>
            </div>
            <h1><input type="text" value="{{post.title::input}}" placeholder="Enter a title here ..."></h1>
            <div class="meta">
              <div class="author-ctn">
                <iron-image src="" preload sizing="cover"></iron-image>
              </div>
              <span class="left-space">[[post.author]]</span>
              <blog-time date="[[post.date]]"></blog-time>
              <span class="align-right">[[post.readTime]] minutes</span>
            </div>
          </div>
        </header>
        <main>
          <blog-editor class="summary-editor" html="[[post.summary]]" actions="[[summaryActions]]" on-html-changed="updateSummary"></blog-editor>
          <blog-editor html="[[post.body]]" on-html-changed="updateBody"></blog-editor>
        </main>
      </article>
    `;
  }
  static get properties() {
    return {
      post: {
        type: Object,
      },
      mode: {
        type: String,
        value: "post"
      }
    };
  }

  static get observers() {
    return [
      '_postChanged(post.*)'
    ];
  }

  ready() {
    super.ready();

    this.summaryActions = ['bold', 'underline'];
  }

  updateSummary(e, detail) {
    this.set('post.summary', detail.value);
  }

  updateBody(e, detail) {
    this.set('post.body', detail.value);
  }

  previewFile() {
    // FIXME : to test cross browser
    var file    = this.$.inpt.files[0];
    var reader  = new FileReader();

    reader.addEventListener("load", () => {
      if (reader.result) {
        this.set('post.image', reader.result);
      }
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  _fileUpload(e) { this.$.inpt.click(); }


  _isSeleted(position) { return position == this.post.position ? true : false; }

  _changeSizing(e) {
    let cover = this.post.cover == "cover" ? "contain" : "cover";
    this.set('post.cover', cover);
  }

  _postChanged(post) {
    this.set('mode', 'post');
    if (this.post.type == "page") { return this.set('mode', 'page'); }
  }

  _isPost(mode) { return mode == "post" ? true : false; }
}

window.customElements.define('blog-posts-edit', BlogPostsEdit);
