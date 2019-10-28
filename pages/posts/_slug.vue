<template>
  <div class="full">
    <div class="main">
      <h1 class="content-title">{{ currentTitle }}</h1>
      <div v-if="loading">Loading</div>
      <div v-if="!loading" v-html="$md.render(currentBody)" />
    </div>
    <div class="side">サイド</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      currentBody: "",
      currentTitle: ""
    };
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
pre {
  padding: 1.3rem;
  color: #fcfcfc;
  background-color: #23241f;
  border-radius: calc(1rem / 2.4);
  overflow-x: auto;
  @media (prefers-color-scheme: dark) {
    background-color: #333;
  }
}
</style>