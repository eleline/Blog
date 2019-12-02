<template>
  <div class="card-index">
    <nuxt-link
      class="card no-underline"
      v-for="(post, index) in posts.contents"
      :key="index"
      :to="'posts/' + post.id"
    >
      <h3 class="card__title">{{ post.title }}</h3>
      <p class="card__date">{{ unixTime2ymd(post.date) }}</p>
      <p class="card__body">{{ post.description }}</p>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: ["posts"],
  methods: {
    unixTime2ymd: function(intTime) {
      const d = new Date(intTime);

      const year = d.getFullYear();
      const month = d.getMonth() + 1;
      const day = d.getDate();

      return `${year}年${month}月${day}日`;
    }
  }
};
</script>

<style lang="scss">
.card-index {
  --column-count: 1;
  display: grid;
  grid-template-columns: repeat(var(--column-count), 1fr);
  grid-gap: 32px;
  @media screen and (min-width: 1024px) {
    --column-count: 2;
  }
  @media screen and (min-width: 1580px) {
    --column-count: 3;
  }
}

.card {
  display: block;
  padding: 16px;
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
      box-shadow: 0 7px 18px rgba(#8a2be2, 0.315);
      transform: translateY(-4px);
    }
  }

  @media (prefers-color-scheme: dark) {
    color: darken(#fcfcfc, 10%);
    background-color: #333;
  }

  &__title {
    line-height: 1.4;
  }

  &__date {
    color: rgba(#000000, 0.64);
    margin-bottom: 8px;
  }

  &__body {
    color: rgba(#292929, 0.78);
    line-height: 1.6;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    @media (prefers-color-scheme: dark) {
      color: rgba(#fcfcfc, 0.78);
    }
  }
}
</style>
