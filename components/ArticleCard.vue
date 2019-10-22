<template>
  <div class="card-index">
    <nuxt-link
      class="card"
      v-for="(post, index) in posts.contents"
      :key="index"
      :to="'posts/' + post.id"
    >
      <h3 class="card__title">{{ post.title }}</h3>
      <p class="card__body">{{ post.description }}</p>
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
  justify-content: space-between;
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
  transition: 300ms ease-out;
  overflow: hidden;
  &:hover {
    background-color: #f0f0f0;
  }
  @media (prefers-color-scheme: dark) {
    color: #fcfcfc;
    background-color: #292929;
    &:hover {
      background-color: #000;
    }
  }
  @media screen and (min-width: 1024px) {
    flex-basis: 48%;
  }
}

.card__title {
  margin-bottom: 12px;
  border-bottom: solid 2px #acb6e5;
}

.card__body {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>