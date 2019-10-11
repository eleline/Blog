<template>
  <div>
    <h1 class="article-title">{{ currentTitle }}</h1>
    <div v-if="loading">Loading</div>
    <div v-if="!loading" v-html="currentBody" />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loading: true,
      currentBody: "",
      currentTitle: ""
    };
  },
  async asyncData({ env, route }) {
    const dir = route.path.split("/");
    const postId = dir[dir.length - 1];

    const data = await axios
      .get(`${env.baseUrl}/blog/${postId}`, {
        headers: {
          "X-API-KEY": env.API_KEY
        }
      })
      .then(res => {
        return res.data;
      })
      .catch(console.error);

    return {
      loading: false,
      currentBody: data.body,
      currentTitle: data.title
    };
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
  overflow-x: auto;
}
</style>