<template>
  <div class="flex justify-center md:justify-between flex-wrap">
    <NuxtLink
      v-if="data.prev"
      :to="{ name: 'blog-slug', params: { slug: data.prev.slug } }"
      class="font-bold hover:underline prev_next--link flex"
    >
      <div class="flex justify-between">
        <div class="py-6 pl-6">
          <p class="text-sm opacity-80">prev post</p>
          {{ data.prev.title }}
        </div>
        <img
          class="ml-6 object-cover w-24 h-full"
          :src="data.prev.image.src"
          :alt="data.prev.image.alt"
        />
      </div>
    </NuxtLink>
    <span v-else>&nbsp;</span>
    <NuxtLink
      v-if="data.next"
      :to="{ name: 'blog-slug', params: { slug: data.next.slug } }"
      class="font-bold hover:underline prev_next--link flex"
    >
      <div class="flex justify-between">
        <img
          class="mr-6 object-cover w-24 h-full"
          :src="data.next.image.src"
          :alt="data.next.image.alt"
        />
        <div class="py-6 pr-6">
          <p class="text-sm opacity-80">Next post</p>
          {{ data.next.title }}
        </div>
      </div>
    </NuxtLink>
    <span v-else>&nbsp;</span>
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

<style lang="scss">
.prev_next--link {
  @apply my-3 bg-gray-200;
}
</style>
