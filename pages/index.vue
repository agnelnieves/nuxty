<template>
  <main>
    <section class="hero">
      <div class="mt-16 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6">
        <div class="text-center">
          <img
            data-aos="fade-up-sm"
            class="avatar"
            src="/images/profile-pic.png"
            alt="John wick funko pop with his dog"
          />

          <h1
            data-aos="fade-up-sm"
            data-aos-delay="50"
            class="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-4xl"
          >
            👋 Hey there, It’s John Wick.
          </h1>
          <p
            data-aos-delay="100"
            data-aos="fade-up-sm"
            class="mt-3 max-w-md mx-auto text-base text-gray-200 sm:text-lg md:mt-5 md:text-xl md:max-w-2xl"
          >
            You know who I am. But here's an overview for those who don't. I'm a
            legendary hitman (aka. Baba Yaga) who previously worked for the
            Tarasov Mob until my retirement. I retired in order to spend time
            with my wife, Helen Wick, who later died of an unidentified illness
            (RIP). Since then I've pledged my life to create awesome framework
            blog starters to help others.
          </p>
        </div>
      </div>
    </section>
    <section class="articles">
      <div class="container">
        <div class="article-grid" data-aos-delay="100" data-aos="fade-up-sm">
          <!-- BLOG CARDS -->
          <NuxtLink
            v-for="article in articles"
            :key="article.title"
            :to="{ name: 'blog-slug', params: { slug: article.slug } }"
          >
            <div class="card">
              <div v-if="article.image" class="media">
                <img :src="article.image.src" :alt="article.image.alt" />
              </div>
              <div class="content">
                <div class="flex-1">
                  <div class="flex items-center">
                    <div class="metadata">
                      <time :datetime="article.date">
                        {{ getDate(article.date) }}
                      </time>
                      <span aria-hidden="true"> &middot; </span>
                      <!-- TODO: add dynamic read time -->
                      <span> 4 min read </span>
                    </div>
                  </div>
                  <p class="title">
                    {{ article.title }}
                  </p>
                </div>
                <div class="categories">
                  <NuxtyBadge
                    v-for="category in article.categories"
                    :key="category"
                    class="category"
                  >
                    {{ category }}
                  </NuxtyBadge>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
    <div class="cta">
      <div class="container">
        <h2 data-aos="fade-up-sm" class="title">
          Have a project in mind? Let’s get to work.👋📫
        </h2>
        <a
          data-aos-delay="50"
          data-aos="fade-up-sm"
          href="#"
          class="button light"
        >
          Contact me
        </a>
      </div>
    </div>
  </main>
</template>

<script>
import { formatDate } from '~/utils'
export default {
  name: 'IndexPage',
  async asyncData({ $content }) {
    const articles = await $content('articles')
      .only([
        'title',
        'description',
        'image',
        'date',
        'categories',
        'published',
        'slug',
      ])
      .where({ published: true })
      .sortBy('createdAt', 'asc')
      .fetch()
    return {
      articles,
    }
  },
  methods: {
    getDate: (date) => formatDate(date),
  },
}
</script>

<style scoped lang="scss">
.hero {
  @apply relative py-16 sm:pb-44 bg-nuxty-darker;
}

/* ARTICLES */

.articles {
  @apply relative overflow-hidden sm:-mt-36 pb-12;

  .container {
    @apply relative max-w-7xl mx-auto px-4 sm:px-6;
  }
  .article-grid {
    @apply mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none;
  }
}

/* ArticleCard */
.card {
  @apply flex flex-col rounded-lg shadow-lg overflow-hidden;

  .media {
    @apply flex-shrink-0;

    img {
      @apply h-48 w-full object-cover;
    }
  }

  .content {
    @apply flex-1 bg-white p-6 flex flex-col justify-between;
  }

  .metadata {
    @apply flex space-x-1 text-sm text-gray-500;
  }

  .title {
    @apply text-xl font-semibold text-gray-900;
  }

  .categories {
    @apply mt-4 flex gap-2 flex-wrap;
  }
}

.button {
  @apply mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-nuxty-darker hover:bg-nuxty-dark sm:w-auto;

  &.light {
    @apply text-nuxty-darker bg-white;
  }
}

/* CTA */

.cta {
  @apply bg-nuxty-darker;

  .container {
    @apply max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8;

    .title {
      @apply text-3xl font-extrabold text-white sm:text-4xl;
    }
  }
}

.avatar {
  @apply inline-block h-24 w-24 rounded-full mb-4 object-cover;

  box-shadow: #012e36 0 0 0 3px, #00dc82 0 0 0 5px;
}
</style>
