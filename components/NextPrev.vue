<template>
  <div class="next-prev-container">
    <NuxtLink
      v-if="data.prev"
      :to="{ name: 'blog-slug', params: { slug: data.prev.slug } }"
      class="prev_next--link"
    >
      <img :src="data.prev.image.src" :alt="data.prev.image.alt" />
      <div class="content">
        <span>Previous post</span>
        <h4>{{ data.prev.title }}</h4>
      </div>
    </NuxtLink>
    <NuxtLink
      v-if="data.next"
      :to="{ name: 'blog-slug', params: { slug: data.next.slug } }"
      class="prev_next--link"
    >
      <img :src="data.next.image.src" :alt="data.next.image.alt" />
      <div class="content">
        <span>Next post</span>
        <h4>{{ data.next.title }}</h4>
      </div>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
      default: () => null,
    },
  },
}
</script>

<style lang="scss" scoped>
.next-prev-container {
  @apply flex justify-center md:justify-between md:flex-nowrap flex-wrap gap-2;
}
::v-deep {
  .prev_next--link {
    @apply bg-gray-200 font-bold hover:underline flex w-full rounded-lg overflow-hidden items-center justify-between items-center p-2;

    .content {
      @apply md:pr-2;
    }

    span {
      @apply text-sm opacity-70;
    }

    img {
      @apply rounded-lg mr-4 object-cover;

      min-width: 7.625rem;
      height: 7.125rem;
    }
  }
}
</style>
