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

        blog-card { 
          border-bottom: 1px solid #d6cece;
        }

        blog-card:last-child {
          border: none;
        }
        /* Wide layout: when the viewport width is bigger than 460px, layout
        changes to a wide layout. */
        @media (min-width: 460px) {
         :host {}

         section main {
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          -webkit-flex-direction: row;
          -ms-flex-direction: row;
          flex-direction: row;
          -webkit-justify-content: space-between;
          -ms-flex-pack: justify;
          justify-content: space-between;
          -webkit-align-content: stretch;
          -ms-flex-line-pack: stretch;
          align-content: stretch;
          -webkit-align-items: stretch;
          -ms-flex-align: stretch;
          align-items: stretch;
          -webkit-flex-wrap: wrap;
          -ms-flex-wrap: wrap;
          flex-wrap: wrap;
         }

         blog-card {
          border: none;
          flex-grow: 1;
         } 
        }
      </style>
      <section>
        <main>
          <blog-card></blog-card>
          <blog-card></blog-card>
          <blog-card></blog-card>
          <blog-card></blog-card>
          <blog-card></blog-card>
          <blog-card></blog-card>
          <blog-card></blog-card>
          <blog-card></blog-card>
          <blog-card></blog-card>
          <blog-card></blog-card>
          <blog-card></blog-card>
          <blog-card></blog-card>
          <blog-card></blog-card>
          <blog-card></blog-card>
          <blog-card></blog-card>
          <blog-card></blog-card>
          <blog-card></blog-card>
          <blog-card></blog-card>
        </main>
      </section>
    `;
  }
}

window.customElements.define('blog-home', BlogHome);
