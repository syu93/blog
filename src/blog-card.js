import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-image/iron-image.js';
import './blog-time.js';

class BlogCard extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          padding: 24px;
          position: relative;
          text-align: left;
        }

        article {
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          -webkit-flex-direction: row;
          -ms-flex-direction: row;
          flex-direction: row;
          -webkit-flex-wrap: nowrap;
          -ms-flex-wrap: nowrap;
          flex-wrap: nowrap;
          -webkit-justify-content: space-between;
          -ms-flex-pack: justify;
          justify-content: space-between;
          -webkit-align-content: stretch;
          -ms-flex-line-pack: stretch;
          align-content: stretch;
          -webkit-align-items: stretch;
          -ms-flex-align: stretch;
          align-items: stretch;
        }

        figure {
          margin: 0;
          width: 20%;
        }

        a {
          display: block;
          color: inherit;
          text-decoration: none;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
        }

        article header {
          width: 80%;
          box-sizing: border-box;
        }

        article header h1 {
          margin: 0;
          font-size: 1em;
        }

        article iron-image {
          background-color: lightgray;
          min-height: 64px;
          min-width: 64px;
          border-radius: 4px;
        }

        article header p {
          margin: 0;
          font-size: 0.8em;
          color: #424141;
        }


        /* Wide layout: when the viewport width is bigger than 460px, layout
        changes to a wide layout. */
        @media (min-width: 460px) {
          :host {
            display: inline-block;
            width: 25%;
          }

          article {
            -webkit-flex-direction: column-reverse;
            -ms-flex-direction: column-reverse;
            flex-direction: column-reverse;
            box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
          }

          article header {
            padding: 16px;
            width: 100%;
            z-index: 10;
          }

          article figure {
            width: 100%;
            height: 20%;
          }

          article iron-image {
            display: block;
            min-height: 15vh;
            border-radius: 4px 4px 0 0;
          }

          blog-time { padding: 16px; }
        }
      </style>
      <!-- <a href="#read"></a> -->
      <article>
        <header>
          <h1>Pariatur tempor incididunt esse adipisicing aliqua aute occaecat in voluptate aliqua.</h1>
          <p>Lorem ipsum nisi est voluptate non ex cillum culpa sint aliquip eu sunt magna exercitation aliqua sint ullamco et sunt tempor aute dolore eu cillum in in commodo sit deserunt eu dolor.</p>
        </header>
        <!-- FIXME : add b64 placeholder -->
        <figure><iron-image
            src="http://placehold.it/720/4285f4"
            preload sizing="cover"></iron-image></figure>
      </article>
      <blog-time></blog-time>
    `;
  }
  static get properties() {
    return {
      horizontal: {
        type: Boolean,
        value: true,
        reflectToAttribute: true
      },
    };
  }
}

window.customElements.define('blog-card', BlogCard);
