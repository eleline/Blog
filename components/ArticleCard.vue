<template>
  <div class="card-index">
    <nuxt-link
      class="card"
      v-for="(post, index) in posts.contents"
      :key="index"
      :to="'posts/' + post.id"
    >
      <h2>{{ post.title }}</h2>
      <p>{{ post.description }}</p>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: ["posts"]
};
</script>

<style lang="scss">
.card-index {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.card {
  display: block;
  flex-basis: 100%;
  height: auto;
  margin-bottom: 24px;
  padding: (8px * 1.5);
  border: solid 1px #a9a9a9;
  border-radius: 10px;
  color: #292929;
  background-color: #fcfcfc;
  @media (prefers-color-scheme: dark) {
    color: #fcfcfc;
    background-color: #292929;
  }
}
</style>