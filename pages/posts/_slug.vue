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

export default {
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

    const data = await $axios.$get(`${env.baseUrl}/blog/${postId}`, {
      headers: {
        "X-API-KEY": env.API_KEY
      }
    });

    return {
      loading: false,
      currentBody: data.body,
      currentTitle: data.title
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

.rich-text {
  pre {
    padding: 1.3rem;
    border-radius: calc(1rem / 2.4);
    overflow-x: auto;
    margin-left: calc(-1rem / 2.4);
    @media (prefers-color-scheme: dark) {
      background-color: #333;
    }
  }
}
</style>