const config = require("./.contentful.json");

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: "ja"
    },
    title: "connect",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "eleline blog" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress bar color
   */
  loading: { color: "#3B8070" },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    },
    postcss: {
      plugins: {
        "postcss-preset-env": {
          autoprefixer: { grid: true }
        }
      }
    }
  },
  css: [{ src: "~/assets/scss/style.scss", lang: "scss" }],
  env: {
    CTF_SPACE_ID: config.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: config.CTF_CDA_ACCESS_TOKEN,
    CTF_PERSON_ID: config.CTF_PERSON_ID,
    CTF_BLOG_POST_TYPE_ID: config.CTF_BLOG_POST_TYPE_ID
  },
  generate: {
    routes() {
      return client
        .getEntries({
          content_type: process.env.CTF_BLOG_POST_TYPE_ID,
          order: "-sys.createdAt"
        })
        .then(entries => {
          return entries.items.map(entry => {
            return {
              route: `posts/${entry.fields.slug}`,
              payload: entry
            };
          });
        });
    }
  }
};
