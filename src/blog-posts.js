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
        pattern$="[[auth]]/:post/:mode"
        data="{{routePostData}}" tail="{{subroute}}">
      </app-route>
      <iron-ajax
         id="xhr"
         auto
         url$="http://localhost:8080/api/posts/[[slug]]"
         handle-as="json"
         last-response="{{post}}"></iron-ajax>

      <blog-meta id="meta" base="Heraku" title="[[post.title]]" description="[[post.metaDescription]]" separator="😁" reversed></blog-meta>

      <iron-pages selected="[[mode]]" attr-for-selected="name" fallback-selection="read">
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
      user: {
        type: Object,
        value: () => {return {}}
      },
      mode: {
        type: String,
        observer: "_modeChanged"
      },
      post: {
        type: Object,
        value: () => { return {}},
      }
    };
  }

  static get observers() {
    return [
      '_routePostChanged(routePostData.post, routePostData.mode)'
    ];
  }

  ready() {
    super.ready();
    this.set('isready', true);
  }

  triggerMeta() {
    this.$.meta.apply();
  }

  _routePostChanged(post, mode) {
    // If there is no post slug
    if (!post) {
      // If no post slug in URL return to 404 
      window.history.pushState({}, '404 not found', '/404');
      // Trigger navigation to the 404 page
      return window.dispatchEvent(new CustomEvent('location-changed'));
    }

    if (!mode) {
      this.mode = "read";
    } else if (['edit'].indexOf(mode) !== -1) {
      this.mode = "edit";
    } else {
      this.mode = "read";
    }


    // Set the slug to find the corresponding post
    this.set('slug', post);
    if (window.location.search) {
      this.$.xhr.withCredentials = true;
      this.$.xhr.headers = {"Content-Type": "application/json", "Authorization": window.sessionStorage.getItem('token')},
      this.set('slug', 'all/' + post);
    }

    // Perform the XHR request
    // this.$.xhr.generateRequest();
  }

  _modeChanged(mode) {
    // Check if mode is edit and the user to have a token
    if (mode == "edit" && !window.sessionStorage.getItem('token')) {
      window.history.pushState({}, '', '/posts/' + this.routePostData.post);
      window.dispatchEvent(new CustomEvent('location-changed'));
      return this.mode = "read";
    };

    if (mode == "edit") { return import('./blog-posts-edit.js'); }
  }
 
}

window.customElements.define('blog-posts', BlogPosts);
