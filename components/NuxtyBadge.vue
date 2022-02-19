<template>
  <span class="tag"><slot /></span>
</template>

<style scoped lang="scss">
span {
  @apply inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium text-nuxty-darker font-semibold;

  background: rgb(1 42 53 / 14%);
}
</style>
