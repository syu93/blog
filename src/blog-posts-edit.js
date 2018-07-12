import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@vaadin/vaadin-upload/vaadin-upload.js';
import './blog-editor.js';
import './blog-toast.js';

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
        article header input {
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

        article header ::placeholder {
            color: #ffffff;
            opacity: 1; /* Firefox */
        }

        article header :-ms-input-placeholder { /* Internet Explorer 10-11 */
           color: #ffffff;
        }

        article header ::-ms-input-placeholder { /* Microsoft Edge */
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
          padding: 3em 1.2em;
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
          padding: 1em;
        }

        .post-mode {
          position: absolute;
          top: 0;
          left: 0;
          min-height: 32px;
          padding: 1em; 
        }

        button.paper-button, select.paper-button {
          text-transform: uppercase;
          padding: 0.5em;
          min-width: 100px;
          font-size: 1.4em;
          color: var(--app-secondary-color);
          background-color: #ffffff;
          border: none;
          margin: 0.4em;
          cursor: pointer;
          border-radius: 2px;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
        }

        button.paper-button:hover { background-color: #d8d6d6 }

        vaadin-upload {
          background-color: #ffffff;
          margin: 0.4em;
        }

        label { font-size: 1.2em; padding-left: 16px; vertical-align: text-top;}

        .slug input[type="text"] {
          background-color: #ffffff;
          color: var(--app-secondary-color);
          margin-left: 1em;
          height: 32px;
          line-height: 32px;
          width: 70%;
          border: none;
          border-bottom: solid 2px var(--app-primary-color);
        }

        .slug input[type="text"][readonly] {border-bottom: none;}

        .slug input[type="checkbox"] {
          height: 16px;
          width: 16px;
        }

        .read-time input[type="number"].time {
          display: inline-block;
          background-color: transparent;
          color: #ffffff;
          margin-left: 1em;
          height: 1.4em;
          line-height: 1.4em;
          width: 100px;
          border: none;
          border-bottom: solid 2px var(--app-primary-color);
        }

        main section { margin-bottom: 2em; }

        .summary-editor {
          --pell-min-height: 48px;
          --pell-editor-height: 40px;
        }

        .fab {
          position: fixed;
          bottom: 3em;
          right: 3em;
        }

        .fab.validate {
          background-color: var(--app-primary-color);
          color: #ffffff;
        }

        main[ispage] {
          transform: translate(0, 0) !important;
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
      <iron-ajax
        id="xhr"
        handle-as="json"
        on-response="handleResponse"
        on-error="handleError"></iron-ajax>
      <article>
        <header hidden$="[[!_isPost(mode)]]">
          <figure><iron-image
            src$="[[_config.cdn.media]]/uploads/[[post.image]]"
            placeholder="[[post.placeholder]]"
            preload
            fade
            sizing="[[post.cover]]"
            position="[[post.position]]"></iron-image></figure>
            <input id="inpt" type="file" hidden on-change="previewFile">
          <div class="filter">
            <div class="hero-position flex-row">
              <vaadin-upload accept="image/*"
                method="POST"
                form-data-name="cover"
                target="http://localhost:8080/api/media/upload"
                on-upload-success="fileUploaded"></vaadin-upload>
              <button class="paper-button" on-click="_changeSizing">[[post.cover]]</button>
              <select class="paper-button" value="{{post.position::input}}">
                <option value="top" selected$="_isSeleted('top')">Top</option>
                <option value="center" selected$="_isSeleted('center')">Center</option>
                <option value="bottom" selected$="_isSeleted('bottom')">Bottom</option>
              </select>
              <select class="paper-button" value="{{post.published::input}}">
                <option value="false">Draft</option>ee
                <option value="true">Published</option>
              </select>
            </div>
            <h1><input type="text" value="{{post.title::input}}" placeholder="Enter a title here ..."></h1>
            <div class="meta">
              <div class="author-ctn">
                <iron-image src="" preload sizing="cover"></iron-image>
              </div>
              <span class="left-space">[[post.author]]</span>
              <blog-time date="[[post.date]]"></blog-time>
              <span class="align-right read-time"><input class="time" type="number" value="{{post.readTime::input}}"> minutes</span>
            </div>
          </div>
        </header>
        <div class="post-mode">
          <select class="paper-button" value="{{post.type::input}}">
            <option value="post">Post</option>
            <option value="page">Page</option>
          </select>
        </div>
        <main ispage$="[[!_isPost(mode)]]">
          <section class="slug">
            <label>Slug : / </label><input type="text" name="slug" value="{{post.slug::input}}" placeholder="post-slug-url" readonly$="[[!slugEdit]]">
            <input type="checkbox" checked="{{slugEdit::change}}">
          </section>
          <section hidden$="[[!_isPost(mode)]]">
            <label>Summary :</label>
            <blog-editor class="summary-editor" html="[[post.summary]]" actions="[[summaryActions]]" on-html-changed="updateSummary"></blog-editor>
          </section>
          <section>
            <label>Content :</label>
            <blog-editor html="[[post.body]]" on-html-changed="updateBody"></blog-editor>
          </section>
        </main>
      </article>
      <!-- <button class="paper-button fab validate" on-click="testToast">Test</button> -->
      <button class="paper-button fab validate" on-click="savePost">Save [[mode]]</button>
      <blog-toast id="toast" message="[[toastMessage]]" on-toast-closed="toastClosed"></blog-toast>
    `;
  }
  static get properties() {
    return {
      post: {
        type: Object,
        value: () => {
          return {
            cover: "cover",
            published: false,
            position: 'center',
            type: "post",
            summary: "",
            body: "",
          }
        }
      },
      oldSlug: String,
      slugEdit: {type: Boolean, value: false},
      mode: {
        type: String,
        value: "post"
      },
      _config: {
        type: Object,
        value: () => {return window.config}
      }
    };
  }

  static get observers() {
    return [
      '_postChanged(post.*)',
      '_titleChanged(post.title)'
    ];
  }

  ready() {
    super.ready();
    this.summaryActions = ['bold', 'underline'];

    this.set('post.author', 'test@gmail.com');
  }

  savePost(e) {
    // Performe some controll
    if (!this.post.title || !this.post.slug || !this.post.body || !this.post.author) {
      console.error("Error : mandatory field no setted !");
      return;
    }

    this.$.xhr.url = "http://localhost:8080/api/posts/create";
    if (this.post.id)
      this.$.xhr.url = "http://localhost:8080/api/posts/update/" + this.oldSlug;
    // CORS
    this.$.xhr.withCredentials = true;
    this.$.xhr.method = "post";
    if (this.post.id) this.$.xhr.method = "put";
    this.$.xhr.headers = {"Content-Type": "application/json", "Authorization": window.sessionStorage.getItem('token')},
    this.$.xhr.body = this.post;

    this.$.xhr.generateRequest();
  }

  handleResponse(e, detail) {
    this.toastMessage = "Post successfully saved !";
    this.$.toast.show();
    this.set('error', false);
  }

  toastClosed(e) {
    if (this.error) return;
    // FIXME : Little tick to trigger page chage
    window.history.pushState({}, '', `/posts/${this.post.slug}${this.post.id ? '/read' : ''}`);
    // // Trigger navigation
    return window.dispatchEvent(new CustomEvent('location-changed'));
  }

  handleError(e) {
    this.toastMessage = e.detail.error;
    this.$.toast.show();
    this.set('error', true);
  }

  updateSummary(e, detail) {
    this.set('post.summary', detail.value);
  }

  updateBody(e, detail) {
    this.set('post.body', detail.value);
  }

  fileUploaded(e, detail) {
    const parsedResponse = JSON.parse(detail.xhr.response);
    this.set('post.placeholder', parsedResponse.imageBase64);
    this.set('post.image', parsedResponse.imageName);
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

  _titleChanged(title) {
    if (this.post.id && !this.slugEdit) return;
    this.set('post.slug', this._slugify(title));
  }

  _postChanged(post) {
    this.set('mode', 'post');
    if (!this.oldSlug) this.set('oldSlug', this.post.slug);
    if (this.post.type == "page") { return this.set('mode', 'page'); }
  }

  _isPost(mode) { return mode == "post" ? true : false; }

  /**
   * Conver a string into slug URI
   * @source https://gist.github.com/codeguy/6684588
   *
   * @param      {string}  str     The string
   * @return     {string}  { description_of_the_return_value }
   */
  _slugify(str) {
    if (!str) return "";
    str = str.replace(/^\s+|\s+$/g, ""); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaaaeeeeiiiioooouuuunc------";

    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
      .replace(/\s+/g, "-") // collapse whitespace and replace by -
      .replace(/-+/g, "-"); // collapse dashes

    return str;
  }
}

window.customElements.define('blog-posts-edit', BlogPostsEdit);
