import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import './blog-posts-comment.js';

class BlogPostsRead extends PolymerElement {
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

        header figure {
          margin: 0;
          padding: 0;
          height: 80vh;
        }

        header figure iron-image {
          background-color: lightgray;
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
          <figure><iron-image src="/images/dataset-original.jpg"
            preload
            sizing="cover"></iron-image></figure>
          <div class="filter">
            <h1>[[post.title]]!</h1>
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
          <h2 id="summary" hidden="[[!_isPost(mode)]]"></h2>
          <section class="social-network"><a href="#">Share</a></section>
          <div id="content"></div>
        </main>
        <blog-posts-comment config="[[config]]"><slot></slot></blog-posts-comment>
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
      '_postChanged(post)'
    ];
  }

  ready() {
    super.ready();
    this.$.summary.textContent = this.post.summary;
    this.$.content.innerHTML = this.post.body;
  }

  _postChanged(post) {
    this.set('mode', 'post');
    this.$.content.innerHTML = this.post.body;
    
    if (!this.post.summary) { return this.set('mode', 'page'); }
    
    this.$.summary.textContent = this.post.summary;

    this.set('config', {
      slug: this.post.slug,
      identifier: this.post.id,
      domain: "https://heraku.disqus.com",
    });
  }

  _isPost(mode) { return mode == "post" ? true : false; }
}

window.customElements.define('blog-posts-read', BlogPostsRead);