import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import './blog-toast.js';

class BlogLoginModal extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: none;
          position: relative;
        }

        :host([show]) { display: block; }
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(80, 80, 80, 0.45);;
          z-index: 20;
        }

        .modal main {
          position: relative;
          background-color: #ffffff;
          border-radius: 4px;
          min-height: 50vh;
          width: 90vw;
          margin: 160px auto;
          padding: 4em 1em 1em 1em;
          box-sizing: border-box;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
          z-index: 21;
        }

        .modal main ::placeholder {
            color: lightgrey;
            opacity: 1; /* Firefox */
        }

        .modal main :-ms-input-placeholder { /* Internet Explorer 10-11 */
           color:  lightgrey;
        }

        .modal main ::-ms-input-placeholder { /* Microsoft Edge */
           color:  lightgrey;
        }

        .modal main label {
          font-size: 1.5em;
        }

        .modal main div.flex {
          padding: 1em;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
        }

        .modal main div.login {
          position: absolute;
          bottom: 0;
          right: 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          align-items: center; 
        }

        .modal main button.paper-button {
          text-transform: uppercase;
          padding: 0.5em;
          min-width: 100px;
          width: 100%;
          font-size: 1.4em;
          color: #ffffff;
          background-color: var(--app-primary-color);
          border: none;
          margin: 0.4em;
          cursor: pointer;
          border-radius: 2px;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
        }

        .modal main button.paper-button:hover { background-color: #7fa9ef }
        .modal main button.paper-button.cancel {
          background-color: lightgrey;

        }

        .modal main button.paper-button:focus {
          border: solid 2px orange;
        }

        .modal main input {
          width: 100%;
          height: 32px;
          line-height: 1.6em;
          font-size: 1.6em;
          border: none;
          color: var(--app-secondary-color);
          background-color: #ffffff;
          border-bottom: solid 2px var(--app-primary-color);
        }

        /* Wide layout: when the viewport width is bigger than 460px, layout
        changes to a wide layout. */
        @media (min-width: 460px) {
          .modal main {
            background-color: #ffffff;
            border-radius: 4px;
            height: 50vh;
            width: 60vw;
            margin: 25vh auto;
          }

          .modal main div.login {
            padding: 3em;
          }

          .modal main button.paper-button {
            width: auto;
          }
        }
      </style>
      <iron-ajax
        id="xhr"
        handle-as="json"
        on-response="handleResponse"
        on-error="handleError"></iron-ajax>
      <section id="modal" class="modal" on-click="clickOutClose">
        <main>
          <form id="form" on-submit="login">
            <div class="flex">
              <label for="email">Email : </label><input id="email" type="email" name="email" placeholder="Enter email" value="{{email::input}}" tabindex="0">
            </div>
            <div class="flex">
              <label for="password">Password : </label><input id="password" type="password" name="password" placeholder="Enter password" value="{{password::input}}" tabindex="0">
            </div>
            <div class="login"><button type="submit" class="paper-button" on-click="login" tabindex="0">Login</button><button class="paper-button cancel" on-click="hide" tabindex="0">Cancel</button></div>
          </form>
        </main>
      </section>
    `;
  }
  static get properties() {
    return {
      user: {
        type: Object,
        value: () => {return {}},
        notify: true,
      },
      show: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      email: {
        type: String,
      },
      password: {
        type: String
      }
    };
  }

  ready() {
    super.ready();

    // Check if use logged in at page load
    if (window.sessionStorage.getItem('token')) {
      this.dispatchEvent(new CustomEvent('login-success', {detail: {user: window.sessionStorage.getItem('profile')}}));
      this.set('user', JSON.parse(window.sessionStorage.getItem('profile')));
    }
  }

  login(e) {
    e.preventDefault();
    if (!this.email || !this.password) return false;
    this.$.xhr.url = "http://localhost:8080/api/auth/login";
    this.$.xhr.method = "post";
    this.$.xhr.headers = {"Content-Type": "application/json"},
    this.$.xhr.body = {email: this.email, password: this.password};

    this.$.xhr.generateRequest();
  }

  logout() {
    if (window.sessionStorage.getItem('token')) {
      window.sessionStorage.removeItem('token');
      window.sessionStorage.removeItem('profile');
      this.set('user', {});
      window.dispatchEvent(new CustomEvent('logout-success'));
    }
  }

  handleResponse(e) {
    // Check if the response object and token 
    if (e.detail.__data.response && e.detail.__data.response.token) {
      // Set the token in sessin storage and user profile
      window.sessionStorage.setItem('token', e.detail.__data.response.token);
      window.sessionStorage.setItem('profile', JSON.stringify(e.detail.__data.response.user));

      // Set user for two way data binding
      this.set('user', e.detail.__data.response.user);

      // Fire a custom event when user is logged in
      window.dispatchEvent(new CustomEvent('login-success', {detail: {message: "Login successful !", user: e.detail.__data.response.user}}));

      // Clear inputs
      this.$.email.value = "";
      this.$.password.value = "";

      this.hide();
    }
  }

  handleError(e) {
    this.dispatchEvent(new CustomEvent('login-error', {detail: {message: e.detail.error}}));
  }

  toastClosed(e) {
    if (!window.sessionStorage.getItem('token')) return;
  }

  clickOutClose(e) {
    if (e.target != this.$.modal) return;
    this.hide();
  }

  display() {
    if (window.sessionStorage.getItem('token')) return;
    this.set('show', true);
    this.$.email.focus();
  }
  hide() { this.set('show', false); }
}

window.customElements.define('blog-login-modal', BlogLoginModal);
