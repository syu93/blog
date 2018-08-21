/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import './blog-card.js';
import './shared-styles.js';

class BlogHome extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          padding: 10px;
        }

        blog-card { margin-bottom: 1em; }
        blog-card:last-child { border: none; }

        section.description {
          display: block;
          position: relative;
          text-align: left;
          border: 1px solid #dadce0;
          border-radius: 8px;
          padding: 24px;
          margin: auto;
          box-sizing: border-box;
          font-size: 1.2em;
        }

        section.description .mii {
          height: 128px;
          float: left;
        }

        section.description [small] {
          font-size: 16px;
          letter-spacing: 2px;
        }

        /* Wide layout: when the viewport width is bigger than 460px, layout
        changes to a wide layout. */
        @media (min-width: 460px) {

          section.description, section main, section header {
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
      <section class="description">
          <img class="mii" src="/images/mii.jpg" alt="My Nintendo Mii avatare">
          <p>Hi,<br>I'm <strong>Hervé TUTUAKU</strong>, a web developer based in Paris.</p>
          <p small>I ♡ the Web, Web Components are the future, talking about the Web, Polymer and Progressive Web App</p>
      </section>
      <section>
        <header>
          <h1>Latest posts</h1>
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

  _log(value) {
    console.log(value);
  }

}

window.customElements.define('blog-home', BlogHome);
