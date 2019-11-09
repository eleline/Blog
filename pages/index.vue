<template>
  <div class="main">
    <h2 class="contents-title">New</h2>
    <ArticleCard :posts="posts"></ArticleCard>
  </div>
</template>

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

<script>
import ArticleCard from "../components/ArticleCard";

export default {
  async asyncData({ env, $axios }) {
    const data = await $axios.$get(`${env.baseUrl}/blog`, {
      headers: {
        "X-API-KEY": env.API_KEY
      }
    });

    return { posts: data };
  },
  components: {
    ArticleCard
  }
};
</script>
