import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-image/iron-image.js';
import './blog-time.js';

class BlogCard extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          position: relative;
          text-align: left;
          border: 1px solid #dadce0;
          border-radius: 8px;
        }

        article {
          display: flex;
          flex-wrap: nowrap;
          padding: 24px;
        }

        article>a {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        figure {
          position: absolute;
          top: 24px;
          right: 24px;
          bottom: auto;
          left: auto;
          z-index: 1;

          margin: 0;
          width: 20%;
          min-height: 64px;
          min-width: 64px;
          max-height: 64px;
          max-width: 64px;
        }

        a {
          display: block;
          color: inherit;
          text-decoration: none;
        }

        article header {
          width: 100%;
          box-sizing: border-box;
          margin-right: 0.8rem;
          padding-right: 4em;
        }

        article header h1 {
          margin: 0;
          font-size: 1.4em;
          margin-bottom: 1em;
        }

        article iron-image {
          background-color: lightgray;
          min-height: 64px;
          min-width: 64px;
          border-radius: 4px;
        }

        article header p#summary {
          margin: 0;
          margin-bottom: 3em;
          font-size: 1em;
          color: #424141;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .flex-row {
          display: -webkit-box;
          display: -moz-box;
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          -webkit-align-items: center;
          align-items: center;
          -webkit-flex-wrap: nowrap;
          flex-wrap: nowrap;
        }

        .flex-row-center {
          display: flex;
          justify-content: space-between;
          align-items: center;
          align-content: flex-end;
        }

        .unpublished {
          padding: 0.5em;
          background-color: orange;
          border-radius: 6px;
          color: #ffffff;
          font-weight: bold;
          font-size: 0.7em;
          margin-left: 1em;
        }

        /* Wide layout: when the viewport width is bigger than 460px, layout
        changes to a wide layout. */
        @media (min-width: 460px) {
          article header {
            padding-right: 10em;
          }
          figure {
            min-height: 128px;
            min-width: 128px;
            max-height: 128px;
            max-width: 128px;
          }
          article iron-image {
            background-color: lightgray;
            min-height: 128px;
            min-width: 128px;
            width: 100%;
            height: 100%;
          }
          /* Caroussel mode */
          :host([card]) {
            display: inline-block;
            width: 25%;
            margin: 24px;
            padding: 0;
            /*box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);*/
          }
          :host([card]) article {
            -webkit-flex-direction: column-reverse;
            -ms-flex-direction: column-reverse;
            flex-direction: column-reverse;
          }
          :host([card]) article header {
            padding: 16px;
            width: 100%;
            z-index: 10;
          }
          :host([card]) article figure {
            width: 100%;
            height: 20%;
          }
          :host([card]) article iron-image {
            display: block;
            min-height: 24vh;
            border-radius: 4px 4px 0 0;
          }
          :host([card]) blog-time {
            position: absolute;
            top: 16px;
            left: 16px;
            color: #ffffff;
          }
        }
      </style>
        <article>
          <a href$="/posts/[[post.slug]]/[[_unpublished(post.published)]]" title$="[[post.title]]"></a>
          <header>
            <h1><a href$="/posts/[[post.slug]]/">[[post.title]]<template is="dom-if" if={{!post.published}}><span class="unpublished">unpublished</span></template></a></h1>
            <p id="summary"></p>
            <div class="flex-row-center">
              <span class="author-time flex-row">[[post.Authors.name]]<blog-time date="[[post.createdAt]]"></blog-time></span>
              <span class="read-time">[[post.readTime]] minutes</span>
            </div>
          </header>
          <!-- FIXME : add b64 placeholder -->
          <figure><a href$="/posts/[[post.slug]]"><iron-image
            src="http://localhost:8080/uploads/[[post.image]]"
            placeholder="[[post.placeholder]]"
            preload 
            fade
            sizing="cover"></iron-image><figcaption></figcaption></a></figure>
        </article>
    `;
  }
  static get properties() {
    return {
      post: {
        type: Object,
        value: () => {
          return {};
        },
        observer: '_postChanged'
      },
      horizontal: {
        type: Boolean,
        value: true,
        reflectToAttribute: true
      },
    };
  }
  _postChanged(post) { this.$.summary.innerHTML = this.post.summary; }
  _unpublished(published) {
    if (!published) return '?unpublished=1';
  }
}

window.customElements.define('blog-card', BlogCard);
