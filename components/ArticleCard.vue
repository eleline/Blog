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
  height: 240px;
  margin-bottom: 32px;
  padding: (8px * 1.5);
  border-radius: 10px;
  background-color: #fcfcfc;
  box-shadow: 8px 4px 19px -6px rgba(0, 0, 0, 0.25);
  @media screen and (min-width: 768px) {
    flex-basis: 30%;
  }
  @media screen and (min-width: 1264px) {
    flex-basis: 20.25%;
  }
}
</style>