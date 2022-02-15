<template>
  <main>
    <section class="hero">
      <div class="mt-16 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6">
        <div class="text-center">
          <img
            class="inline-block h-24 w-24 rounded-full mb-4 object-cover border-2 border-gray-300"
            src="/images/profile-pic.png"
            alt="John wick funko pop with his dog"
          />

          <h1
            class="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-4xl"
          >
            👋 Hey there, It’s John Wick.
          </h1>
          <p
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
      <div class="relative">
        <div class="max-w-7xl mx-auto px-4 sm:px-6">
          <div class="relative max-w-7xl mx-auto">
            <div
              class="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none"
            >
              <!-- BLOG CARDS -->
              <div
                v-for="article in articles"
                :key="article.title"
                class="card"
              >
                <div class="flex-shrink-0">
                  <img
                    class="h-48 w-full object-cover"
                    src="https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80"
                    alt=""
                  />
                </div>
                <div class="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div class="flex-1">
                    <div class="flex items-center">
                      <div class="flex space-x-1 text-sm text-gray-500">
                        <!-- TODO: add dynamic published date -->
                        <time datetime="2020-03-10"> Mar 10, 2020 </time>
                        <span aria-hidden="true"> &middot; </span>
                        <!-- TODO: add dynamic read time -->
                        <span> 4 min read </span>
                      </div>
                    </div>
                    <a href="#" class="block mt-2">
                      <p class="text-xl font-semibold text-gray-900">
                        {{ article.title }}
                      </p>
                    </a>
                  </div>
                  <div class="mt-4 flex gap-2 flex-wrap">
                    <span
                      v-for="category in article.categories"
                      :key="category"
                      class="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800"
                    >
                      {{ category }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center px-4">
        <a
          href="#"
          class="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 sm:w-auto"
        >
          View all posts
        </a>
      </div>
    </section>
    <div class="cta">
      <div
        class="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8"
      >
        <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
          Have a project in mind? Let’s get to work.👋📫
        </h2>
        <a
          href="#"
          class="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
        >
          Contact me
        </a>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData({ $content }) {
    const articles = await $content('articles')
      .limit(5)
      .only(['title', 'description', 'img', 'date', 'categories', 'published'])
      .where({ published: true })
      .sortBy('createdAt', 'asc')
      .fetch()
    return {
      articles,
    }
  },
}
</script>

<style scoped>
.hero {
  @apply relative pt-6 pb-16 sm:pb-44 bg-blue-800;
}

.articles {
  @apply relative overflow-hidden sm:-mt-36 pb-12;
}

.cta {
  @apply bg-indigo-700;
}

/* ArticleCard */
.card {
  @apply flex flex-col rounded-lg shadow-lg overflow-hidden;
}
</style>
