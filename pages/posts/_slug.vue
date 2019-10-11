<style src='highlight.js/styles/tomorrow-night.css'></style>

<template>
  <div>
    <h1 class="article-title">{{ currentTitle }}</h1>
    <div v-if="loading">Loading</div>
    <div v-if="!loading" v-html="mkbody" />
  </div>
</template>

<script>
import axios from "axios";
import marked from "marked";
import hljs from "highlight.js";

export default {
  data() {
    return { loading: true, currentBody: "Loading", currentTitle: "" };
  },
  async asyncData({ env }) {
    const data = await axios
      .get(`${env.baseUrl}/blog`, {
        headers: {
          "X-API-KEY": env.API_KEY
        }
      })
      .then(res => {
        return JSON.parse(JSON.stringify(res.data));
      })
      .catch(console.error);

    return {
      loading: false,
      currentBody: data.contents[1].body,
      currentTitle: data.contents[1].title
    };
  },
  computed: {
    mkbody() {
      return marked(this.currentBody);
    }
  },
  created() {
    marked.setOptions({
      langPrefix: "",
      highlight: function(code, lang) {
        return hljs.highlightAuto(code, [lang]).value;
      }
    });
  }
};
</script>

<style lang="scss">
.article-title {
  margin-bottom: 24px;
}
pre {
  padding: 1.3rem;
  color: #fcfcfc;
  background-color: #23241f;
  border-radius: calc(1rem / 2.4);
}
</style>