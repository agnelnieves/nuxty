<template>
  <div>
    <div class="metadata">
      <h1>{{ article.title }}</h1>
      <p class="text-gray-400">
        Posted on: {{ getDate(article.createdAt) }} • Updated on:
        {{ getDate(article.updatedAt) }}
      </p>
    </div>
    <img
      loading="lazy"
      class="main-img"
      :src="article.image.src"
      :alt="article.image.alt"
    />
    <article class="article">
      <nuxt-content :document="article" />
    </article>
    <div class="next-prev-container">
      <NextPrev v-if="articles.prev || articles.next" :data="articles" />
    </div>
  </div>
</template>

<script>
import { formatDate } from '~/utils'
export default {
  name: 'ArticlePage',
  async asyncData({ $content, params }) {
    // getting the article's data from the params
    const article = await $content('articles', params.slug).fetch()

    const [prev, next] = await $content('articles')
      .only(['title', 'slug', 'image', 'alt']) // only need title and slug
      .sortBy('createdAt', 'asc') // sorting by the creation date
      .surround(params.slug)
      .fetch()
    return {
      article,
      articles: { prev, next },
    }
  },
  methods: {
    getDate: (date) => formatDate(date),
  },
}
</script>

<style scoped lang="scss">
.article {
  @apply 2xl:max-w-6xl xl:max-w-4xl lg:max-w-2xl md:max-w-lg sm:max-w-sm max-w-full mx-auto px-6 text-black my-10 flex;
}

h1 {
  @apply text-4xl md:text-5xl lg:text-6xl text-black;
}

.metadata {
  @apply pt-20 2xl:max-w-6xl xl:max-w-4xl lg:max-w-2xl md:max-w-lg sm:max-w-sm max-w-full mx-auto px-6;
}

.main-img {
  @apply rounded-xl mt-5 2xl:max-w-7xl xl:max-w-5xl lg:max-w-4xl md:max-w-2xl sm:max-w-lg max-w-full mx-auto px-4;
}

.next-prev-container {
  @apply 2xl:max-w-6xl xl:max-w-4xl lg:max-w-2xl md:max-w-lg sm:max-w-sm max-w-full mx-auto;
}
</style>

<style lang="scss">
.article * {
  @apply max-w-full;
}

/* Unscopped styles */

.article h2 {
  @apply text-4xl mt-8 mb-6;
}

.article h3 {
  @apply text-3xl;
}

.article h4 {
  @apply text-2xl;
}

.article h5 {
  @apply text-xl;
}

.article h6 {
  @apply text-base;
}

.article img {
  @apply my-3 rounded-xl mt-5 2xl:max-w-5xl xl:max-w-3xl lg:max-w-xl md:max-w-md sm:max-w-sm max-w-full mx-auto px-4;
}

.article p {
  @apply my-3;
}
</style>
