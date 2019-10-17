<template>
  <div class="card-index">
    <nuxt-link
      class="card"
      v-for="(post, index) in posts.contents"
      :key="index"
      :to="'posts/' + post.id"
    >
      <h3 class="card__title">{{ post.title }}</h3>
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
  padding: (8px * 1.8);
  border: solid 1px #a9a9a9;
  border-radius: 4px;
  color: #292929;
  background-color: #fcfcfc;
  @media (prefers-color-scheme: dark) {
    color: #fcfcfc;
    background-color: #292929;
  }
}

.card__title {
  margin-bottom: 12px;
  border-bottom: solid 2px #acb6e5;
}
</style>