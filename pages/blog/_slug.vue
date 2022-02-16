<template>
  <article class="article">
    <h1>{{ article.title }}</h1>
    <p class="text-center text-gray-400">
      Posted on: {{ formatDate(article.createdAt) }} • Updated on:
      {{ formatDate(article.updatedAt) }}
    </p>
    <div class="article-content">
      <nuxt-content :document="article" />
    </div>
  </article>
</template>

<script lang="js">
export default {
  name: 'ArticlePage',
  async asyncData({ $content, params }) {
    // getting the article's data from the params
    const article = await $content('articles', params.slug).fetch()
    return {
      article
    }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleString('en', options)
    },
  },
}
</script>

<style scoped>
.article {
  @apply max-w-4xl mx-auto text-white my-10;
}

.article-content {
  @apply bg-gray-200 p-4 md:p-12 text-black mt-4;
}

h1 {
  @apply text-3xl text-center text-black;
}
</style>
