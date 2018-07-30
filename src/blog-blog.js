import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import './blog-card.js';
import './shared-styles.js';

class BlogBlog extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          padding: 10px;
        }

        blog-card { margin-bottom: 1em; }
        blog-card:last-child { border: none; }

        /* Wide layout: when the viewport width is bigger than 460px, layout
        changes to a wide layout. */
        @media (min-width: 460px) {

          section main, section header {
            width: 60%;
            margin: auto;
          }
        }
      </style>
      <iron-ajax
         id="xhr"
         url="[[_config.cdn.media]]/api/posts?start=0&limit=5"
         handle-as="json"
         last-response="{{posts}}"
         on-error="handleError"></iron-ajax>
      <blog-meta id="meta" base="Heraku" title="Home" description="[[page.description]]" separator="😁" reversed></blog-meta>
      <section>
        <header>
          <h1>Blog</h1>
        </header>
        <main>
          <template is="dom-repeat" items={{posts}}
            as=post index-as=index>
            <blog-card post="[[post]]"></blog-card>
          </template>
        </main>
        <template is="dom-if" if={{user.id}}>
          <blog-fab on-click="createNewPost"></blog-fab>
        </template>
      </section>
    `;
  }
  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      route: Object,
      posts: {
        type: Array,
        value: () => []
      },
      user: {
        type: Object,
        value: () => {return {}}
      },
      _config: {
        type: Object,
        value: () => {return window.config}
      }
    };
  }

  static get observers() {
    return [
      '_userChanged(user.email)'
    ];
  }

  ready() {
    super.ready();
    this.$.xhr.generateRequest();
    window.addEventListener('logout-success', () => {
      this.$.xhr.url = `${this._config.cdn.media}/api/posts`;
      this.$.xhr.headers = {};
      this.$.xhr.withCredentials = false;
      this.$.xhr.generateRequest();
    });
  }

  handleError(e, detail) {
    this._logout(detail.request.__data.status);
  }

  _logout(code) {
    if (code == 401) {
      window.dispatchEvent(new CustomEvent('session-unauthorized'));
    }
  }

  _userChanged(email) {
    if (!email) return;
    this.$.xhr.url = `${this._config.cdn.media}/api/posts/all`;
    this.$.xhr.withCredentials = true;
    this.$.xhr.headers = {"Content-Type": "application/json", "Authorization": window.sessionStorage.getItem('token')},
    this.$.xhr.generateRequest();
  }

  createNewPost() {
    window.history.pushState({}, '', '/create');
    // Trigger navigation
    return window.dispatchEvent(new CustomEvent('location-changed'));
  }

  triggerMeta() {
    this.$.meta.apply();
  }

}

window.customElements.define('blog-blog', BlogBlog);
