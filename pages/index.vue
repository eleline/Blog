<template>
  <div class="main">
    <h2 class="content-title">New</h2>
    <ArticleCard :posts="posts"></ArticleCard>
  </div>
</template>

<script>
import axios from "axios";

import ArticleCard from "../components/ArticleCard";

export default {
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

    return { posts: data };
  },
  components: {
    ArticleCard
  }
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  @media screen and (min-width: 768px) {
    padding: 32px 128px;
  }
  @media screen and (min-width: 1264px) {
    padding: 32px 224px;
  }
}
</style>