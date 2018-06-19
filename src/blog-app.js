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
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import { scroll } from '@polymer/app-layout/helpers/helpers.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import './my-icons.js';

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

class BlogApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          --app-primary-color: #4285f4;
          --app-secondary-color: black;

          /*--app-secondary-color: #293237;*/
          --app-dark-text-color: var(--app-secondary-color);
          --app-light-text-color: white;
          --app-section-even-color: #f7f7f7;
          --app-section-odd-color: white;
          --app-header-background-color: white;
          --app-header-text-color: var(--app-dark-text-color);
          display: block;
        }

        [main-title] {
          font-family: 'Pacifico';
          text-transform: lowercase;
          font-size: 30px;
          /* In the narrow layout, the toolbar is offset by the width of the
          drawer button, and the text looks not centered. Add a padding to
          match that button */
          padding-right: 44px;
          /* Set pointer event to allow access to the input in header bar */
          pointer-events: auto;
          background-color: var(--app-header-background-color);
        }

        :host(:not([page="home"])) [drawer-toggle] {
          display: none;
        }

        :host([page="home"]) [back-home] { display: none; }
        :host(:not([page="home"])) [back-home] { display: block; }

        app-header a {
          color: var(--app-header-text-color);
          text-decoration: none;
          cursor: pointer;
        }

        iron-selector.links {
          display: none;
        }

        iron-selector.links a {
          display: inline-block;
          color: var(--app-header-text-color);
          text-decoration: none;
          line-height: 30px;
          padding: 4px 24px;
        }

        app-drawer-layout:not([narrow]) [drawer-toggle] {
          display: none;
        }

        app-header {
          color: #fff;
          text-align: center;
          background-color: var(--app-header-background-color);
          color: var(--app-header-text-color);
          border-bottom: 1px solid #d6cece;
        }

        app-header paper-icon-button {
          --paper-icon-button-ink-color: white;
        }

        app-header paper-icon-button[drawer-toggle] {
          display: block;
        }

        .drawer-list {
          margin: 0 20px;
        }

        .drawer-list a {
          display: block;
          padding: 0 16px;
          text-decoration: none;
          color: var(--app-secondary-color);
          line-height: 40px;
        }

        .drawer-list a.iron-selected, .links a.iron-selected {
          color: black;
          font-weight: bold;
        }

        .links a.iron-selected {
          color : var(--app-primary-color);
          border-bottom: 4px solid var(--app-primary-color);
        }


        /* Read mode */
        :host([page="posts"]) app-header {
          color: #ffffff;
          background-color: transparent;
          border: none;
        }

        :host([page="posts"]) app-header[shadow] { background-color: rgba(0, 0, 0, 0.48); }
        :host([page="posts"]) [main-title] a, :host([page="posts"]) [back-home] { color: #ffffff; }
        :host([page="posts"]) [main-title] {
          background-color: transparent;
        }

        /* Page animation */
        .animated {
          animation-duration: 0.4s;
        }

        .p-enter { animation-name: p-enter; }
        .p-leave { animation-name: p-leave; }

        @keyframes p-enter {
          from {
            transform: translate(100vw, 0);
          }
          to {
            transform: translate(0, 0);
          }
        }

        @keyframes p-leave {
          from {
            transform: translate(-100vw, 0);
          }
          to {
            transform: translate(0, 0);
          }
        }

        /* Page animation */

        /*iron-pages blog-posts { transform: translate(100vw, 0); }
        iron-pages blog-posts[isready].iron-selected { transform: translate(0, 0); }*/

        /* Wide layout: when the viewport width is bigger than 460px, layout
        changes to a wide layout. */
        @media (min-width: 460px) {
          app-header paper-icon-button[drawer-toggle], :host(:not([page="home"])) app-header [back-home] {
            display: none;
          }

          :host([page="posts"]) [main-title] a { color: var(--app-secondary-color); }
          :host([page="posts"]) app-header[shadow] [main-title] a {
            color: #ffffff;
          }
          :host([page="posts"]) app-header[shadow] iron-selector.links a {
            color: transparent;
          }

          iron-selector.links {
            display: block;
          }
          

          /* The drawer button isn't shown in the wide layout, so we don't
          need to offset the title */
          [main-title] {
            padding-right: 0px;
          }
        }
      </style>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
      </app-location>

      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
      </app-route>

      <app-drawer-layout fullbleed="" narrow="{{narrow}}" force-narrow>
        <!-- Drawer content -->
        <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
          <app-toolbar>Menu</app-toolbar>
          <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
            <a name="home" href="[[rootPath]]home" title="Home">Home</a>
            <a href="">Projects</a>
            <a href="">About</a>
          </iron-selector>
        </app-drawer>

        <!-- Main content -->
        <app-header-layout >

          <app-header slot="header" condenses="" reveals="" effects="waterfall">
            <app-toolbar>
              <paper-icon-button icon="my-icons:menu" drawer-toggle=""></paper-icon-button>
              <a href="/" alt="Back home" back-home=""><paper-icon-button icon="my-icons:arrow-back"></paper-icon-button></a>
              <div main-title><a href="/" title="My Simple Blog">My Simple Blog</a></div>
            </app-toolbar>
            <iron-selector selected="[[page]]" attr-for-selected="name" class="links" role="navigation">
              <a name="home" href="[[rootPath]]home" title="Home">Home</a>
              <a href="">Projects</a>
              <a href="">About</a>
            </iron-selector>
          </app-header>

          <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
            <blog-home name="home" route="[[subroute]]" data-animation="p-leave"></blog-home>
            <blog-posts name="posts" route="[[subroute]]" data-animation="p-enter"></blog-posts>
            <my-view404 name="view404"></my-view404>
          </iron-pages>
        </app-header-layout>
      </app-drawer-layout>
    `;
  }

  static get properties() {
    return {
      unresolved: {
        type: Boolean,
        value: true,
        reflectToAttribute: true
      },
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      routeData: Object,
      subroute: Object
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }

  ready() {
    super.ready();
    this.set('unresolved', false);
  }

  _routePageChanged(page) {
     // Show the corresponding page according to the route.
     //
     // If no page was found in the route data, page will be an empty string.
     // Show 'view1' in that case. And if the page doesn't exist, show 'view404'.
    if (!page) {
      this.page = 'home';
    } else if (['home'].indexOf(page) !== -1) {
      this.page = page;
    } else if (['posts'].indexOf(page) !== -1) {
      this.page = page;
    } else {
      this.page = 'view404';
    }

    scroll({ top: 0, behavior: 'silent' });

    // Close a non-persistent drawer when the page & route are changed.
    if (!this.$.drawer.persistent) {
      this.$.drawer.close();
    }
  }

  _pageChanged(page) {
    // Import the page component on demand.
    //
    // Note: `polymer build` doesn't like string concatenation in the import
    // statement, so break it up.
    switch (page) {
      case 'home':
        import('./blog-home.js')
          .catch(err => console.error(`[Router] ${err}`));
        break;
      case 'posts':
        import('./blog-posts.js')
          .catch(err => console.error(`[Router] ${err}`));
        break;
      case 'view404':
        import('./my-view404.js');
        break;
    }

    const selectedPage = this.shadowRoot.querySelector('iron-pages .iron-selected');
    // If no page selected e.g : if we are on this home page
    if (!selectedPage) return;

    if (!selectedPage.classList.contains('animated')) {
      selectedPage.classList.add('animated');
      selectedPage.classList.add(selectedPage.dataset.animation || "p-enter");
    }

  }
}

window.customElements.define('blog-app', BlogApp);
