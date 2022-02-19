<template>
  <div>
    <button
      class="text-white hover:bg-nuxty-darkest focus:bg-nuxty-darkest p-3 rounded-xl ml-2 flex items-center gap-2"
      @click="showDrawer"
    >
      Search
      <svg
        width="14"
        height="15"
        viewBox="0 0 14 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.7"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11 6.70709C11 9.19237 8.98528 11.2071 6.5 11.2071C4.01472 11.2071 2 9.19237 2 6.70709C2 4.22181 4.01472 2.20709 6.5 2.20709C8.98528 2.20709 11 4.22181 11 6.70709ZM9.98668 12.1938C8.97915 12.8354 7.78299 13.2071 6.5 13.2071C2.91015 13.2071 0 10.2969 0 6.70709C0 3.11724 2.91015 0.207092 6.5 0.207092C10.0899 0.207092 13 3.11724 13 6.70709C13 8.2911 12.4334 9.74277 11.4918 10.8705L13.7071 13.0858C14.0976 13.4763 14.0976 14.1095 13.7071 14.5C13.3166 14.8905 12.6834 14.8905 12.2929 14.5L9.98668 12.1938Z"
          fill="white"
        />
      </svg>
    </button>
    <SideDrawer
      v-show="isDrawerVisible"
      :is-open="isDrawerVisible"
      @close="closeDrawer"
    >
      <input
        slot="header"
        v-model="searchQuery"
        class="p-2 w-full border rounded-sm text-nuxty-darker"
        type="search"
        autocomplete="off"
        placeholder="Search Articles"
      />

      <div slot="content">
        <transition mode="out-in" name="content">
          <p v-if="articles.length === 0">Search for articles, tags or text</p>
          <ul v-else class="flex flex-col gap-2">
            <li
              v-for="article of articles"
              :key="article.slug"
              class="hover:bg-gray-200 rounded-lg"
            >
              <NuxtLink
                class="flex p-2 gap-4 items-center"
                :to="{ name: 'blog-slug', params: { slug: article.slug } }"
              >
                <img
                  class="object-cover rounded-md"
                  :src="article.image.src"
                  :alt="article.image.alt"
                />
                <div class="overflow-hidden">
                  <span class="text-xs opacity-50">{{
                    getDate(article.createdAt)
                  }}</span>
                  <h4>{{ article.title }}</h4>
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
              </NuxtLink>
            </li>
          </ul>
        </transition>
      </div>
    </SideDrawer>
  </div>
</template>

<script>
import { formatDate } from '~/utils'
export default {
  name: 'GlobalSearch',
  data() {
    return {
      isDrawerVisible: false,
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
      this.closeDrawer()
    },
  },
  methods: {
    showDrawer() {
      this.isDrawerVisible = true
    },
    closeDrawer() {
      this.isDrawerVisible = false
    },
    getDate: (date) => formatDate(date),
  },
}
</script>

<style scoped>
* {
  transition: background 0.03s ease-in;
}

input {
  background: #e6eaeb;
}

img {
  min-width: 6.625rem;
  min-height: 6.8125rem;
  max-height: 6.8125rem;
}

li {
  background: #f3f3f3;
}

h4 {
  @apply font-bold;
}

.categories {
  @apply mt-1 flex gap-2 flex-wrap;
}

.content-enter,
.content-leave-to {
  opacity: 0;
  transform: translateY(5px);
}

.content-enter-active,
.content-leave-active {
  transition: all 0.3s ease;
}
</style>
