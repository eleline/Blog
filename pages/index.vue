<template>
  <div>
    <!-- render data of the person -->
    <h2>{{ person.fields.name }}</h2>
    <!-- render blog posts -->
    <ul>
      <nuxt-link :to="'posts/'+post.fields.slug" v-for="(post, index) in posts" :key="index">
        <li>{{ post.fields.title }}</li>
      </nuxt-link>
    </ul>
  </div>
</template>

<script>
import { createClient } from "~/plugins/contentful.js";

const client = createClient();

export default {
  // `env` is available in the context object
  asyncData({ env }) {
    return Promise.all([
      // fetch the owner of the blog
      client.getEntries({
        "sys.id": env.CTF_PERSON_ID
      }),
      // fetch all blog posts sorted by creation date
      client.getEntries({
        content_type: env.CTF_BLOG_POST_TYPE_ID,
        order: "-sys.createdAt"
      })
    ])
      .then(([entries, posts]) => {
        // return data that should be available
        // in the template
        return {
          person: entries.items[0],
          posts: posts.items
        };
      })
      .catch(console.error);
  }
};
</script>

<style lang="scss" scoped>
</style>