<template>
  <article class="article">
    <h1>{{ article.title }}</h1>
    <p class="text-center text-gray-400">
      Posted on: {{ getDate(article.createdAt) }} • Updated on:
      {{ getDate(article.updatedAt) }}
    </p>
    <img
      loading="lazy"
      class="mt-5"
      :src="article.image.src"
      :alt="article.image.alt"
    />
    <div class="article-content">
      <nuxt-content :document="article" />
    </div>
  </article>
</template>

<script>
import { formatDate } from '~/utils'
export default {
  name: 'ArticlePage',
  async asyncData({ $content, params }) {
    // getting the article's data from the params
    const article = await $content('articles', params.slug).fetch()
    return {
      article,
    }
  },
  methods: {
    getDate: (date) => formatDate(date),
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
