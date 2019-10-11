<template>
  <div>
    <ul>
      <nuxt-link v-for="(post, index) in posts.contents" :key="index" :to="'posts/' + post.id">
        <li>{{ post.title }}</li>
      </nuxt-link>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

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
  }
};
</script>

<style lang="scss" scoped>
.card-index {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.card {
  flex-basis: 30%;
  height: 240px;
  border-radius: 10px;
}
</style>