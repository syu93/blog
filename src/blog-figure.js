import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

class BlogFigure extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
      display: block;
      position: relative;
      width: 100%;
      height:100%;
    }
    figure {
      position: relative;
      padding-bottom: 56.25%;
      margin: 0 auto;
      width: 100%;
      height:100%;
      box-sizing: border-box;
    }

    iron-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height:100%;
    }
  </style>
  <figure class="progressiveMedia" style="">
    <iron-image
    placeholder="[[placeholder]]"
    sizing="contain"
    src="[[src]]"
    ></iron-image></figure>
    `;
  }
  static get properties() {
    return {
      src: {
        type: String,
        value: '',
      },
      placeholder: {
        type: String,
        value: ''
      }
    };
  }
}

window.customElements.define('blog-figure', BlogFigure);
