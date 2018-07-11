import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-image/iron-image.js';
import './blog-time.js';
import './blog-posts-read.js';

class BlogPosts extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          position: relative;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #f7f7f7;
        }
      </style>
      <app-route
        route="{{route}}"
        pattern="/:post"
        data="{{routePostData}}" tail="{{subroute}}">
      </app-route>
      <app-route
        route="{{subroute}}"
        pattern="/:mode"
        data="{{routeModeData}}">
      </app-route>
      <iron-ajax
         auto
         url$="http://localhost:8080/api/posts/[[slug]]"
         handle-as="json"
         last-response="{{post}}"></iron-ajax>
      <iron-pages selected="[[mode]]" attr-for-selected="name">
        <blog-posts-read name="read" post="[[post]]" user="[[user]]"><slot name="comments"></slot></blog-posts-read>
        <blog-posts-edit name="edit" post="[[post]]" user="[[user]]"></blog-posts-edit>
      </iron-pages>
    `;
  }
  static get properties() {
    return {
      isready: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      mode: {
        type: String,
      },
      post: {
        type: Object,
        value: () => { return {}},
      }
    };
  }

  static get observers() {
    return [
      '_routePostChanged(routePostData.post)',
      '_routeModeChanged(routeModeData.mode)'
    ];
  }

  ready() {
    super.ready();
    this.set('isready', true);
  }

  _routePostChanged(post) {
    if (!post) {
      // If no post slug in URL return to 404 
      window.history.pushState({}, '404 not found', '/404');
      // Trigger navigation to the 404 page
      return window.dispatchEvent(new CustomEvent('location-changed'));
    }
    this.set('slug', post);
  }

  _routeModeChanged(mode) {
    // Check if mode is edit and the user to have a token
    if (mode == "edit" && !window.sessionStorage.getItem('token')) {
      window.history.pushState({}, '', '/posts/' + this.routePostData.post);
      window.dispatchEvent(new CustomEvent('location-changed'));

      // FIXME : Toast show : not allowed to this section
      return this.mode = "read";
    };
    // FIXME: check if user is logged in
    this.mode = mode || 'read';
    if (this.mode == "edit") {
      return import('./blog-posts-edit.js');
    }
  }

}

window.customElements.define('blog-posts', BlogPosts);
