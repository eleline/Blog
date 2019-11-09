const axios = require("axios");
require("dotenv").config();
const { API_KEY, baseUrl } = process.env;

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: "ja"
    },
    title: "ELELINE",
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
  loading: { color: "#8a2be2" },
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
  css: [
    { src: "~/assets/scss/style.scss", lang: "scss" },
    { src: "~/assets/css/prism-a11y-dark.css", lang: "css" }
  ],
  plugins: ["~/plugins/prism"],
  modules: [
    "nuxt-webfontloader",
    "@nuxtjs/pwa",
    "@nuxtjs/axios",
    "@nuxtjs/markdownit",
    "@nuxtjs/tailwindcss"
  ],
  markdownit: {
    preset: "default",
    injected: true,
    breaks: true,
    html: true,
    linkify: true,
    typography: true,
    xhtmlOut: true,
    langPrefix: "language-",
    quotes: "“”‘’",
    highlight: function(/*str, lang*/) {
      return "";
    }
  },
  manifest: {
    name: "eleline",
    lang: "ja",
    short_name: "eleline",
    title: "Nuxt * microCMS",
    "og:title": "Nuxt * microCMS",
    description: "Nuxt * microCMS",
    "og:description": "Nuxt * microCMS",
    theme_color: "#8a2be2",
    background_color: "#fcfcfc"
  },
  workbox: {
    dev: true
  },
  webfontloader: {
    google: {
      families: ["Quicksand"]
    }
  },
  tailwindcss: {
    configPath: "~/config/tailwind.config.js",
    cssPath: "~/assets/css/tailwind.css"
  },
  env: {
    API_KEY: process.env.API_KEY,
    baseUrl: process.env.baseUrl
  },
  generate: {
    routes() {
      return axios
        .get(`${process.env.baseUrl}/blog`, {
          headers: {
            "X-API-KEY": process.env.API_KEY
          }
        })
        .then(res => {
          return JSON.parse(JSON.stringify(res.data.contents)).map(content => {
            return {
              route: "/posts/" + content.id,
              payload: content
            };
          });
        })
        .catch(console.error);
    }
  }
};
