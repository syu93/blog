import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

class BlogPostsComment extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          margin: 3em 1em;
        }
      </style>
      <div><slot></slot></div>
      <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
    `;
  }
  static get properties() {
    return {
      config: {
        type: Object,
        value: () => {
          return {
            domain: "",
            slug: "",
            identifier: "",
          }
        }
      }
    };
  }

  static get observers() {
    return [
      'configChanged(config.identifier, config.slug)'
    ];
  }

  configChanged(id, slug) {
    if (id == "" && slug == "") return;
    this.set('url', `${window.location.origin}/${slug}`);
    this.set('identifier', "0");

    var _this = this;
    window.disqus_config = function() {
      this.page.url = _this.config.url;
      this.page.identifier = _this.config.identifier;
    };

    (() => {
      var d = document, s = d.createElement('script');
      s.src = `${this.config.domain}/embed.js`;
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
    })();
  }
}

window.customElements.define('blog-posts-comment', BlogPostsComment);
