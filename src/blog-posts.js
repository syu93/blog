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
      <iron-pages selected="[[mode]]" attr-for-selected="name">
        <blog-posts-read name="read" post="[[post]]"><slot name="comments"></slot></blog-posts-read>
        <blog-posts-edit name="edit" post="[[post]]"></blog-posts-edit>
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
        value: () => {return {type: 'post', image: "", placeholder: "", position: 'center', cover: 'cover', slug: "/posts/some-post-slug-url-1", title: "Eiusmod dolore ea duis in dolor dolor ut .", author: "Syu93", date: Date.now() - 1*24*60*60*1000, readTime: 12, summary: "Ut eiusmod in mollit excepteur nulla in et voluptate voluptate laboris culpa.",body: "<p>Anim nostrud ut duis veniam aliqua veniam est eiusmod elit officia irure sunt minim qui exercitation nostrud dolor officia velit ullamco commodo et laborum non voluptate enim qui ut sunt eiusmod exercitation sed occaecat amet cillum enim ex proident velit magna velit fugiat nulla in est deserunt ea ut id nisi nulla tempor velit irure et magna aliquip duis in aliquip deserunt incididunt in occaecat ex mollit eiusmod consectetur quis mollit culpa exercitation ea elit pariatur deserunt occaecat qui incididunt quis culpa aliquip dolor amet est cillum in cillum est est ut officia culpa esse elit consectetur in culpa dolore in commodo cillum veniam sunt in excepteur nisi sed dolore in mollit laborum id ea velit est consectetur incididunt velit labore consequat enim cupidatat proident incididunt nostrud esse elit in incididunt sint ad laborum ut velit sunt nisi cillum minim nisi ad mollit eu nostrud sunt consequat pariatur cillum deserunt do aute duis exercitation nisi labore nulla in labore aute amet tempor excepteur non proident et consequat deserunt eiusmod enim amet tempor sed occaecat culpa nostrud ut enim officia aliqua est est ut reprehenderit voluptate dolore aute labore adipisicing in ut aliqua non veniam in do elit aliqua ullamco nulla enim.</p><p>Pariatur in quis minim duis velit culpa ullamco in dolore dolore labore ad ad amet eiusmod anim elit do sint fugiat non sit do tempor sint ut non elit et aliqua aliquip excepteur tempor laborum fugiat occaecat sint dolor esse ad officia quis elit amet qui qui velit velit aute nostrud aliqua enim enim in ullamco exercitation dolore cillum velit pariatur dolore elit velit culpa veniam irure laboris adipisicing reprehenderit esse adipisicing proident ullamco eiusmod eu ad eiusmod mollit cupidatat ex elit mollit velit voluptate tempor occaecat dolor dolor sed ut fugiat sint est aliqua magna ut proident cillum nulla irure adipisicing eiusmod fugiat nostrud enim ea occaecat adipisicing in laboris nisi in amet pariatur ex deserunt consequat ea sed fugiat sint consectetur ullamco commodo eu sit sunt mollit in proident dolore fugiat commodo ex nisi ullamco elit veniam in ut veniam labore nostrud proident esse consequat in consectetur mollit commodo cupidatat irure in tempor reprehenderit laboris eiusmod exercitation minim adipisicing labore proident ullamco quis irure elit officia nulla veniam reprehenderit.</p><p>Nisi magna aliquip minim in velit eu duis enim consectetur ut voluptate eu nulla in in cupidatat cillum consectetur nisi dolore culpa do ut officia dolore aute excepteur minim ut culpa ad consectetur nulla cillum laborum sit ut eiusmod aliquip anim dolor tempor exercitation sed esse exercitation amet reprehenderit ea ut esse proident consequat ut in cillum nisi ullamco ut consequat veniam sint dolore mollit quis magna quis sint voluptate officia quis duis sit consequat laboris anim nulla laborum magna deserunt veniam deserunt in mollit aute dolor exercitation do nulla aliquip velit elit in adipisicing voluptate occaecat ad cillum velit consectetur veniam tempor dolore magna anim tempor et mollit sed nostrud irure sunt enim incididunt occaecat adipisicing tempor aute sint dolor in sed ut ad sed aliqua cupidatat dolor adipisicing exercitation commodo esse pariatur officia do commodo id cupidatat sed ut mollit dolor proident ad et deserunt id duis reprehenderit quis minim proident ex ut proident veniam deserunt cupidatat anim officia eu consectetur.</p><p>Culpa sint ullamco in sed nostrud in nisi anim duis nulla commodo laboris in laboris in aute culpa excepteur mollit eu laboris minim labore pariatur excepteur officia dolor non in aliquip ea adipisicing consequat nulla reprehenderit enim aliqua non occaecat ex minim voluptate culpa pariatur sit consectetur sit aliquip officia ut veniam et laborum in dolor labore dolore commodo id in est eu officia id minim consequat minim officia exercitation in reprehenderit sit reprehenderit eu voluptate exercitation nostrud nostrud cupidatat consequat elit dolor ullamco dolor id eu quis sint officia dolor consectetur est duis elit non ullamco deserunt laborum eu esse sed nisi ad dolor ut irure sit amet cupidatat irure elit ex dolore anim aliquip incididunt ad sit est velit elit mollit pariatur aliqua ullamco nostrud culpa labore magna do pariatur officia veniam aliqua cillum dolore duis id ea ea proident ut commodo elit in cupidatat duis.</p>"}},
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
  }

  _routeModeChanged(mode) {
    // FIXME: check if user is logged in
    this.mode = mode || 'read';
    if (this.mode == "edit") {
      return import('./blog-posts-edit.js');
    }
  }

}

window.customElements.define('blog-posts', BlogPosts);
