<template>
  <div>
    <section>
      <div class="metadata">
        <h1>{{ article.title }}</h1>
        <p>
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
    </section>
    <article class="article">
      <nuxt-content :document="article" />
      <div class="tags">
        <span class="font-bold">Tags</span>
        <div>
          <NuxtyBadge v-for="category in article.categories" :key="category">
            {{ category }}
          </NuxtyBadge>
        </div>
      </div>
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
section {
  @apply relative text-white px-3 sm:pt-24 pt-20;

  &::before {
    @apply bg-nuxty-darker absolute top-0 left-0 w-full;

    height: 70%;
    content: '';
    z-index: -1;
  }
}

h1 {
  @apply text-3xl md:text-4xl font-extrabold;
}

.metadata {
  @apply pt-10 xl:max-w-2xl md:max-w-2xl sm:max-w-lg max-w-full mx-auto px-6 mb-8;

  p {
    @apply opacity-70 text-sm mt-2;
  }
}

.main-img {
  @apply mt-5 2xl:max-w-3xl xl:max-w-5xl lg:max-w-4xl md:max-w-2xl sm:max-w-lg max-w-full mx-auto mb-6 rounded-3xl shadow-xl;
}

.next-prev-container {
  @apply md:max-w-4xl sm:max-w-sm max-w-full mx-auto px-4;
}

.tags {
  @apply max-w-prose mx-auto w-full;

  div {
    @apply mt-4 flex gap-2 flex-wrap;
  }
}

/* Unscopped styles */
.article {
  @apply 2xl:max-w-6xl xl:max-w-4xl lg:max-w-2xl md:max-w-lg sm:max-w-sm max-w-full mx-auto px-6 text-black my-10 flex flex-col items-center;

  // Pierce into the children's component styles
  // In this case <nuxt-content>
  ::v-deep {
    .nuxt-content {
      @apply max-w-prose;
    }

    iframe {
      @apply max-w-full;
    }

    img {
      @apply my-3 rounded-3xl mt-5 mx-auto shadow-xl max-w-full;
    }

    h2 {
      @apply text-4xl mt-8 mb-6;
    }

    h3 {
      @apply text-3xl;
    }

    h4 {
      @apply text-2xl;
    }

    h5 {
      @apply text-xl;
    }

    h6 {
      @apply text-base;
    }

    p {
      @apply my-3 text-lg;
    }
  }
}
</style>
