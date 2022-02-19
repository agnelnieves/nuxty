<template>
  <span class="tag"><slot /></span>
</template>

<style scoped lang="scss">
span {
  @apply inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800 font-semibold;
}
</style>
