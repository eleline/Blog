<template>
  <div class="full">
    <div class="main">
      <h1 class="contents-title">{{ currentTitle }}</h1>
      <div v-if="loading">Loading</div>
      <article class="rich-text" v-else v-html="$md.render(currentBody)"></article>
    </div>
    <div class="side">サイド</div>
  </div>
</template>

<script>
import Prism from "~/plugins/prism";
import Meta from "~/assets/mixins/meta";

export default {
  mixins: [Meta],
  data() {
    return {
      loading: true,
      currentBody: "",
      currentTitle: ""
    };
  },
  mounted() {
    Prism.highlightAll();
  },
  async asyncData({ env, route, $axios }) {
    const dir = route.path.split("/");
    const postId = dir[dir.length - 1];

    const data = await $axios.$get(`${env.baseApiUrl}/blog/${postId}`, {
      headers: {
        "X-API-KEY": env.API_KEY
      }
    });

    return {
      loading: false,
      currentBody: data.body,
      currentTitle: data.title,
      meta: {
        title: data.title,
        description: data.description,
        type: "article",
        url: `https://eleline.site/posts/${postId}/`,
        image: data.hero.url
      }
    };
  }
};
</script>

<style lang="scss">
.full {
  display: flex;
  width: 100%;
  height: 100%;
}
/**
 * a11y-dark theme for JavaScript, CSS, and HTML
 * Based on the okaidia theme: https://github.com/PrismJS/prism/blob/gh-pages/themes/prism-okaidia.css
 * @author ericwbailey
 */
code[class*="language-"],
pre[class*="language-"] {
  color: #f8f8f2;
  background: none;
  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.5;
  tab-size: 4;
  hyphens: none;
}

/* Code blocks */
pre[class*="language-"] {
  padding: 1em;
  margin: 0.5em 0;
  overflow: auto;
  border-radius: 0.3em;
}

:not(pre) > code[class*="language-"],
pre[class*="language-"] {
  background: #2b2b2b;
}

/* Inline code */
:not(pre) > code[class*="language-"] {
  padding: 0.1em;
  border-radius: 0.3em;
  white-space: normal;
}

.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: #d4d0ab;
}

.token.punctuation {
  color: #fefefe;
}

.token.property,
.token.tag,
.token.constant,
.token.symbol,
.token.deleted {
  color: #ffa07a;
}

.token.boolean,
.token.number {
  color: #00e0e0;
}

.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.builtin,
.token.inserted {
  color: #abe338;
}

.token.operator,
.token.entity,
.token.url,
.language-css .token.string,
.style .token.string,
.token.variable {
  color: #00e0e0;
}

.token.atrule,
.token.attr-value,
.token.function {
  color: #ffd700;
}

.token.keyword {
  color: #00e0e0;
}

.token.regex,
.token.important {
  color: #ffd700;
}

.token.important,
.token.bold {
  font-weight: bold;
}
.token.italic {
  font-style: italic;
}

.token.entity {
  cursor: help;
}

@media screen and (-ms-high-contrast: active) {
  code[class*="language-"],
  pre[class*="language-"] {
    color: windowText;
    background: window;
  }

  :not(pre) > code[class*="language-"],
  pre[class*="language-"] {
    background: window;
  }

  .token.important {
    background: highlight;
    color: window;
    font-weight: normal;
  }

  .token.atrule,
  .token.attr-value,
  .token.function,
  .token.keyword,
  .token.operator,
  .token.selector {
    font-weight: bold;
  }

  .token.attr-value,
  .token.comment,
  .token.doctype,
  .token.function,
  .token.keyword,
  .token.operator,
  .token.property,
  .token.string {
    color: highlight;
  }

  .token.attr-value,
  .token.url {
    font-weight: normal;
  }
}

pre {
  color: #ccc;
  background-color: #2d2d2d !important;
  @media (prefers-color-scheme: dark) {
    background-color: #393939 !important;
  }
}

.rich-text {
  h2,
  h3,
  h4 {
    margin-top: 2em;
  }

  h2 {
    position: relative;
    margin-bottom: 1em;
    line-height: 1.46;
    &::before {
      content: "#";
      position: absolute;
      top: 0;
      margin: auto;
      color: #8a2be2;
      font-weight: bold;
      font-size: 1.2em;
      font-family: Quicksand;
      margin-left: -0.85em;
      transform: translateY(-12%);
    }
  }

  h3 {
    position: relative;
    margin-bottom: calc(1em + 7px);
    line-height: 1.5;

    &::before,
    &::after {
      content: "";
      position: absolute;
      bottom: -6px;
      height: 2px;
    }

    &::before {
      width: 100%;
      background-color: lighten(#8a2be2, 30%);
    }

    &::after {
      left: 0;
      width: 18%;
      background-color: #8a2be2;
    }
  }

  ul {
    list-style: inside;
    padding: 1.4em;
    border: solid 1px rgba(#000, 0.185);
    border-radius: 0.3em;
    @media (prefers-color-scheme: dark) {
      border: solid 1px rgba(#fff, 0.185);
    }
  }

  pre {
    font-size: 0.9em;
    padding: 1.3rem 32px;
    margin-top: 1.8em;
    margin-left: -32px;
    margin-right: -32px;
    border-radius: 0;
    overflow-x: auto;
    @media screen and (min-width: 768px) {
      margin-left: -1.2em;
      margin-right: -1.2em;
      padding: 1.3em 1.2em;
      border-radius: 0.6em;
    }
  }

  p {
    strong {
      font-size: 1.1em;
      margin: 0 4px;
      border-bottom: solid 2px #8a2be2;
    }

    code {
      background-color: rgba(#000, 0.085);
      font-size: 0.72em;
      margin: 0 4px;
      padding: 0.4em;
      border-radius: 0.2em;
      @media (prefers-color-scheme: dark) {
        background-color: rgba(#fff, 0.115);
      }
    }
  }

  hr {
    display: block;
    height: 2px;
    background-color: rgba(#000, 0.185);
    margin: 3em 5em;
    border: none;
    border-radius: 2px;
    @media (prefers-color-scheme: dark) {
      background-color: rgba(#fff, 0.185);
    }
  }
}
</style>