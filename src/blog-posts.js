import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-image/iron-image.js';
import './blog-time.js';

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

        article {
          transform: translate(0, -64px);
        }

        article header {
          position: relative;
        }

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
          display: -webkit-flex;
          display: flex;
          -webkit-flex-direction: row;
          -ms-flex-direction: row;
          flex-direction: row;
          -webkit-flex-wrap: nowrap;
          -ms-flex-wrap: nowrap;
          flex-wrap: nowrap;
          -webkit-justify-content: flex-start;
          -ms-flex-pack: start;
          justify-content: flex-start;
          -webkit-align-content: stretch;
          -ms-flex-line-pack: stretch;
          align-content: stretch;
          -webkit-align-items: center;
          -ms-flex-align: center;
          align-items: center;
        }

        header .filter .meta .align-right {
          padding: 0 8px;
          text-align: right;
          box-sizing: border-box;
          z-index: 1;
          -webkit-order: 0;
          -ms-flex-order: 0;
          order: 0;
          -webkit-flex: 1 1 auto;
          -ms-flex: 1 1 auto;
          flex: 1 1 auto;
          -webkit-align-self: auto;
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
      <app-route
        route="{{route}}"
        pattern="[[rootPath]]:article"
        data="{{routeData}}" tail="{{subroute}}">
      </app-route>
      <article>
        <header>
          <figure><iron-image src="/images/dataset-original.jpg"
            preload
            sizing="cover"></iron-image></figure>
          <div class="filter">
            <h1>Hello [[post.title]]!</h1>
            <div class="meta">
              <div class="author-ctn">
                <iron-image src="" preload sizing="cover"></iron-image>
              </div>
              <span>&nbsp;[[post.author]]</span>
              <blog-time date="[[post.date]]"></blog-time>
              <span class="align-right">[[post.readTime]] minutes</span>
            </div>
          </div>
        </header>
        <main>
          <p>Anim nostrud ut duis veniam aliqua veniam est eiusmod elit officia irure sunt minim qui exercitation nostrud dolor officia velit ullamco commodo et laborum non voluptate enim qui ut sunt eiusmod exercitation sed occaecat amet cillum enim ex proident velit magna velit fugiat nulla in est deserunt ea ut id nisi nulla tempor velit irure et magna aliquip duis in aliquip deserunt incididunt in occaecat ex mollit eiusmod consectetur quis mollit culpa exercitation ea elit pariatur deserunt occaecat qui incididunt quis culpa aliquip dolor amet est cillum in cillum est est ut officia culpa esse elit consectetur in culpa dolore in commodo cillum veniam sunt in excepteur nisi sed dolore in mollit laborum id ea velit est consectetur incididunt velit labore consequat enim cupidatat proident incididunt nostrud esse elit in incididunt sint ad laborum ut velit sunt nisi cillum minim nisi ad mollit eu nostrud sunt consequat pariatur cillum deserunt do aute duis exercitation nisi labore nulla in labore aute amet tempor excepteur non proident et consequat deserunt eiusmod enim amet tempor sed occaecat culpa nostrud ut enim officia aliqua est est ut reprehenderit voluptate dolore aute labore adipisicing in ut aliqua non veniam in do elit aliqua ullamco nulla enim.</p>
          <p>Pariatur in quis minim duis velit culpa ullamco in dolore dolore labore ad ad amet eiusmod anim elit do sint fugiat non sit do tempor sint ut non elit et aliqua aliquip excepteur tempor laborum fugiat occaecat sint dolor esse ad officia quis elit amet qui qui velit velit aute nostrud aliqua enim enim in ullamco exercitation dolore cillum velit pariatur dolore elit velit culpa veniam irure laboris adipisicing reprehenderit esse adipisicing proident ullamco eiusmod eu ad eiusmod mollit cupidatat ex elit mollit velit voluptate tempor occaecat dolor dolor sed ut fugiat sint est aliqua magna ut proident cillum nulla irure adipisicing eiusmod fugiat nostrud enim ea occaecat adipisicing in laboris nisi in amet pariatur ex deserunt consequat ea sed fugiat sint consectetur ullamco commodo eu sit sunt mollit in proident dolore fugiat commodo ex nisi ullamco elit veniam in ut veniam labore nostrud proident esse consequat in consectetur mollit commodo cupidatat irure in tempor reprehenderit laboris eiusmod exercitation minim adipisicing labore proident ullamco quis irure elit officia nulla veniam reprehenderit.</p>
          <p>Nisi magna aliquip minim in velit eu duis enim consectetur ut voluptate eu nulla in in cupidatat cillum consectetur nisi dolore culpa do ut officia dolore aute excepteur minim ut culpa ad consectetur nulla cillum laborum sit ut eiusmod aliquip anim dolor tempor exercitation sed esse exercitation amet reprehenderit ea ut esse proident consequat ut in cillum nisi ullamco ut consequat veniam sint dolore mollit quis magna quis sint voluptate officia quis duis sit consequat laboris anim nulla laborum magna deserunt veniam deserunt in mollit aute dolor exercitation do nulla aliquip velit elit in adipisicing voluptate occaecat ad cillum velit consectetur veniam tempor dolore magna anim tempor et mollit sed nostrud irure sunt enim incididunt occaecat adipisicing tempor aute sint dolor in sed ut ad sed aliqua cupidatat dolor adipisicing exercitation commodo esse pariatur officia do commodo id cupidatat sed ut mollit dolor proident ad et deserunt id duis reprehenderit quis minim proident ex ut proident veniam deserunt cupidatat anim officia eu consectetur.</p>
          <p>Culpa sint ullamco in sed nostrud in nisi anim duis nulla commodo laboris in laboris in aute culpa excepteur mollit eu laboris minim labore pariatur excepteur officia dolor non in aliquip ea adipisicing consequat nulla reprehenderit enim aliqua non occaecat ex minim voluptate culpa pariatur sit consectetur sit aliquip officia ut veniam et laborum in dolor labore dolore commodo id in est eu officia id minim consequat minim officia exercitation in reprehenderit sit reprehenderit eu voluptate exercitation nostrud nostrud cupidatat consequat elit dolor ullamco dolor id eu quis sint officia dolor consectetur est duis elit non ullamco deserunt laborum eu esse sed nisi ad dolor ut irure sit amet cupidatat irure elit ex dolore anim aliquip incididunt ad sit est velit elit mollit pariatur aliqua ullamco nostrud culpa labore magna do pariatur officia veniam aliqua cillum dolore duis id ea ea proident ut commodo elit in cupidatat duis.</p>
        </main>
      </article>

    `;
  }
  static get properties() {
    return {
      isready: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      post: {
        type: Object,
        value: () => {return {slug: "/posts/some-post-slug-url-1", title: "Eiusmod dolore ea duis in dolor dolor ut .", author: "Syu93", date: Date.now() - 1*24*60*60*1000, readTime: 12, body: "Ut enim eu sint consectetur pariatur commodo sit eiusmod sit ea laborum velit nostrud sunt proident aliqua excepteur tempor qui tempor aute. Ut enim eu sint consectetur pariatur commodo sit eiusmod sit ea laborum velit nostrud sunt proident aliqua excepteur tempor qui tempor aute. Ut enim eu sint consectetur pariatur commodo sit eiusmod sit ea laborum velit nostrud sunt proident aliqua excepteur tempor qui tempor aute. "}},
      }
    };
  }

  ready() {
    super.ready();
    this.set('isready', true);
  }

}

window.customElements.define('blog-posts', BlogPosts);
