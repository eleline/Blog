<template>
  <div>
    <p>{{ posts[0].fields.title }}</p>
    <div v-html="mkbody" />
  </div>
</template>
<script>
import marked from "marked";
import hljs from "highlight.js";
import { createClient } from "~/plugins/contentful.js";

const client = createClient();

export default {
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
  },
  computed: {
    mkbody() {
      return marked(this.posts[0].fields.body);
    }
  },
  created() {
    marked.setOptions({
      langPrefix: "",
      highlight: function(code, lang) {
        return hljs.highlightAuto(code, [lang]).value;
      }
    });
  }
};
</script>
<style src='highlight.js/styles/tomorrow-night.css'></style>