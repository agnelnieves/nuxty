<template>
  <div
    class="flex flex-col p-1 w-48"
    :class="{ 'bg-gray-100 w-96': articles.length }"
  >
    <input
      v-model="searchQuery"
      class="text-black p-2"
      type="search"
      autocomplete="off"
      placeholder="Search Articles"
    />
    <ul v-if="articles.length" class="mt-3">
      <li
        v-for="article of articles"
        :key="article.slug"
        class="hover:bg-gray-200"
      >
        <NuxtLink
          class="flex p-3 gap-4"
          :to="{ name: 'blog-slug', params: { slug: article.slug } }"
        >
          <img
            class="object-cover h-10 w-10"
            :src="article.image.src"
            :alt="article.image.alt"
          />
          <div class="overflow-hidden">
            <h4>{{ article.title }}</h4>
            <span class="text-xs opacity-50">{{
              getDate(article.createdAt)
            }}</span>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
import { formatDate } from '~/utils'
export default {
  name: 'GlobalSearch',
  data() {
    return {
      searchQuery: '',
      articles: [],
    }
  },
  watch: {
    async searchQuery(searchQuery) {
      if (!searchQuery) {
        this.articles = []
        return
      }
      this.articles = await this.$content('articles')
        .limit(6)
        .search(searchQuery)
        .fetch()
    },
    '$route.path'() {
      // Resetting the query on route search to close the global search
      this.searchQuery = ''
    },
  },
  methods: {
    getDate: (date) => formatDate(date),
  },
}
</script>

<style scoped>
* {
  transition: background 0.03s ease-in;
}
</style>
