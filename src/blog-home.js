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

        /* Wide layout: when the viewport width is bigger than 460px, layout
        changes to a wide layout. */
        @media (min-width: 460px) {

          section main, section header {
            width: 60%;
            margin: auto;
          }
        }
      </style>
      <!-- <iron-ajax
         auto
         url="https://jsonplaceholder.typicode.com/posts"
         handle-as="json"
         last-response="{{posts}}"></iron-ajax> -->
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
        value: () => [
            {slug: "/posts/some-post-slug-url-1", title: "Eiusmod dolore ea duis in dolor dolor ut aliqua occaecat aliqua quis mollit ex aute ut dolor non.", author: "Syu93", date: Date.now() - 1*24*60*60*1000, readTime: 12, body: "Ut enim eu sint consectetur pariatur commodo sit eiusmod sit ea laborum velit nostrud sunt proident aliqua excepteur tempor qui tempor aute. Ut enim eu sint consectetur pariatur commodo sit eiusmod sit ea laborum velit nostrud sunt proident aliqua excepteur tempor qui tempor aute. Ut enim eu sint consectetur pariatur commodo sit eiusmod sit ea laborum velit nostrud sunt proident aliqua excepteur tempor qui tempor aute. "},
            {slug: "/posts/some-post-slug-url-2", title: "Cillum tempor esse aliquip adipisicing amet enim dolore sunt in quis in pariatur.", author: "Syu93", date: Date.now() - 2*24*60*60*1000, readTime: 12, body: "plop is the new plop "},
            {slug: "/posts/some-post-slug-url-3", title: "Exercitation culpa quis in sint eu proident consectetur quis ea voluptate.", author: "Syu93", date: Date.now() - 3*24*60*60*1000, readTime: 12, body: "In dolore sed laboris veniam amet voluptate in excepteur eiusmod adipisicing eu fugiat incididunt est dolore ea cillum in et ullamco proident ea commodo occaecat ut."},
            {slug: "/posts/some-post-slug-url-4", title: "Sit nulla dolor amet eiusmod culpa eu dolore dolor dolore eu.", author: "Syu93", date: Date.now() - 4*24*60*60*1000, readTime: 12, body: "Anim et fugiat eu et tempor sed minim officia et excepteur aute sit."},
            {slug: "/posts/some-post-slug-url-4", title: "Sit nulla dolor amet eiusmod culpa eu dolore dolor dolore eu.", author: "Syu93", date: Date.now() - 4*24*60*60*1000, readTime: 12, body: "Anim et fugiat eu et tempor sed minim officia et excepteur aute sit."},
            {slug: "/posts/some-post-slug-url-4", title: "Sit nulla dolor amet eiusmod culpa eu dolore dolor dolore eu.", author: "Syu93", date: Date.now() - 4*24*60*60*1000, readTime: 12, body: "Anim et fugiat eu et tempor sed minim officia et excepteur aute sit."},
            {slug: "/posts/some-post-slug-url-4", title: "Sit nulla dolor amet eiusmod culpa eu dolore dolor dolore eu.", author: "Syu93", date: Date.now() - 4*24*60*60*1000, readTime: 12, body: "Anim et fugiat eu et tempor sed minim officia et excepteur aute sit."},
            {slug: "/posts/some-post-slug-url-4", title: "Sit nulla dolor amet eiusmod culpa eu dolore dolor dolore eu.", author: "Syu93", date: Date.now() - 4*24*60*60*1000, readTime: 12, body: "Anim et fugiat eu et tempor sed minim officia et excepteur aute sit."},
            {slug: "/posts/some-post-slug-url-4", title: "Sit nulla dolor amet eiusmod culpa eu dolore dolor dolore eu.", author: "Syu93", date: Date.now() - 4*24*60*60*1000, readTime: 12, body: "Anim et fugiat eu et tempor sed minim officia et excepteur aute sit."},
            {slug: "/posts/some-post-slug-url-4", title: "Sit nulla dolor amet eiusmod culpa eu dolore dolor dolore eu.", author: "Syu93", date: Date.now() - 4*24*60*60*1000, readTime: 12, body: "Anim et fugiat eu et tempor sed minim officia et excepteur aute sit."},
            {slug: "/posts/some-post-slug-url-4", title: "Sit nulla dolor amet eiusmod culpa eu dolore dolor dolore eu.", author: "Syu93", date: Date.now() - 4*24*60*60*1000, readTime: 12, body: "Anim et fugiat eu et tempor sed minim officia et excepteur aute sit."},
            {slug: "/posts/some-post-slug-url-4", title: "Sit nulla dolor amet eiusmod culpa eu dolore dolor dolore eu.", author: "Syu93", date: Date.now() - 4*24*60*60*1000, readTime: 12, body: "Anim et fugiat eu et tempor sed minim officia et excepteur aute sit."},
            {slug: "/posts/some-post-slug-url-4", title: "Sit nulla dolor amet eiusmod culpa eu dolore dolor dolore eu.", author: "Syu93", date: Date.now() - 4*24*60*60*1000, readTime: 12, body: "Anim et fugiat eu et tempor sed minim officia et excepteur aute sit."},
            {slug: "/posts/some-post-slug-url-4", title: "Sit nulla dolor amet eiusmod culpa eu dolore dolor dolore eu.", author: "Syu93", date: Date.now() - 4*24*60*60*1000, readTime: 12, body: "Anim et fugiat eu et tempor sed minim officia et excepteur aute sit."},
            {slug: "/posts/some-post-slug-url-4", title: "Sit nulla dolor amet eiusmod culpa eu dolore dolor dolore eu.", author: "Syu93", date: Date.now() - 4*24*60*60*1000, readTime: 12, body: "Anim et fugiat eu et tempor sed minim officia et excepteur aute sit."},
            {slug: "/posts/some-post-slug-url-4", title: "Sit nulla dolor amet eiusmod culpa eu dolore dolor dolore eu.", author: "Syu93", date: Date.now() - 4*24*60*60*1000, readTime: 12, body: "Anim et fugiat eu et tempor sed minim officia et excepteur aute sit."},
            {slug: "/posts/some-post-slug-url-4", title: "Sit nulla dolor amet eiusmod culpa eu dolore dolor dolore eu.", author: "Syu93", date: Date.now() - 4*24*60*60*1000, readTime: 12, body: "Anim et fugiat eu et tempor sed minim officia et excepteur aute sit."},
            {slug: "/posts/some-post-slug-url-4", title: "Sit nulla dolor amet eiusmod culpa eu dolore dolor dolore eu.", author: "Syu93", date: Date.now() - 4*24*60*60*1000, readTime: 12, body: "Anim et fugiat eu et tempor sed minim officia et excepteur aute sit."},
            {slug: "/posts/some-post-slug-url-4", title: "Sit nulla dolor amet eiusmod culpa eu dolore dolor dolore eu.", author: "Syu93", date: Date.now() - 4*24*60*60*1000, readTime: 12, body: "Anim et fugiat eu et tempor sed minim officia et excepteur aute sit."},
            {slug: "/posts/some-post-slug-url-4", title: "Sit nulla dolor amet eiusmod culpa eu dolore dolor dolore eu.", author: "Syu93", date: Date.now() - 4*24*60*60*1000, readTime: 12, body: "Anim et fugiat eu et tempor sed minim officia et excepteur aute sit."},
            {slug: "/posts/some-post-slug-url-4", title: "Sit nulla dolor amet eiusmod culpa eu dolore dolor dolore eu.", author: "Syu93", date: Date.now() - 4*24*60*60*1000, readTime: 12, body: "Anim et fugiat eu et tempor sed minim officia et excepteur aute sit."},
            {slug: "/posts/some-post-slug-url-4", title: "Sit nulla dolor amet eiusmod culpa eu dolore dolor dolore eu.", author: "Syu93", date: Date.now() - 4*24*60*60*1000, readTime: 12, body: "Anim et fugiat eu et tempor sed minim officia et excepteur aute sit."},
          ]
      }
    };
  }

  createNewPost() {
    window.history.pushState({}, '', '/create');
    // Trigger navigation
    return window.dispatchEvent(new CustomEvent('location-changed'));
  }

  _log(value) {
    console.log(value);
  }

}

window.customElements.define('blog-home', BlogHome);
