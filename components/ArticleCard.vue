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
  margin-bottom: 32px;
  padding: (16px);
  border-bottom: solid 2px #8a2be2;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  color: #292929;
  background-color: #f2f2f2;
  transition: all 300ms ease-out;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.165);
  @media (hover: hover) {
    &:hover {
      box-shadow: 0 0 8px rgba(#8a2be2, 0.315);
      transform: translateY(-4px);
    }
  }

  @media (prefers-color-scheme: dark) {
    color: darken(#fcfcfc, 10%);
    background-color: #333;
  }
  @media screen and (min-width: 1024px) {
    flex-basis: 48%;
  }

  &__title {
    margin-bottom: 16px;
  }

  &__body {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
}
</style>