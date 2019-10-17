<template>
  <div class="main">
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
        console.dir(JSON.parse(JSON.stringify(res.data)));
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
  height: 100%;
  background-color: #e4e4e6;
  @media screen and (min-width: 768px) {
    padding: 32px 64px;
  }
  @media screen and (min-width: 1264px) {
    padding: 32px 128px;
  }
}
</style>