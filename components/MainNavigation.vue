<template>
  <nav
    :class="{
      'h-full': showMobileMenu,
    }"
    class="fixed top-0 left-0 w-full flex box-border"
    role="navigation"
    aria-label="main navigation"
  >
    <div
      id="nav-wrapper"
      class="w-full mx-auto max-w-full"
      :class="{
        'h-full bg-nuxty-darker': showMobileMenu,
        'p-6': !scrolled,
        'shadow-lg bg-nuxty-darker bg-opacity-100': scrolled,
        'p-2': showMobileMenu || scrolled,
      }"
    >
      <div
        class="nav-content flex justify-between items-center mx-auto max-w-7xl"
      >
        <nuxt-link class="block p-2" to="/">
          <NuxtyLogo class="h-9" style="max-width: 120px" />
        </nuxt-link>
        <ul class="m-0 p-0 hidden sm:flex text-white">
          <li v-for="(link, i) in links" :key="i">
            <nuxt-link
              class="hover:bg-nuxty-darkest focus:bg-nuxty-darkest p-3 rounded-xl ml-2"
              :to="link.route"
            >
              {{ link.label }}
            </nuxt-link>
          </li>
        </ul>
        <GlobalSearch />
        <button
          v-if="links"
          class="flex flex-col justify-between items-end bg-gray-200 py-4 px-3 sm:hidden toggle-btn rounded-2xl cursor-pointer toggle-button"
          :class="{ 'toggle-active': showMobileMenu }"
          @click="toggleMobileMenu"
        >
          <span class="w-8 h-1 one bg-black block rounded-full"></span>
          <span class="w-6 h-1 two bg-black block rounded-full mt-2"></span>
        </button>
      </div>
      <div
        id="mobile-menu"
        :class="{ hidden: !showMobileMenu, 'h-0': !showMobileMenu }"
        class="w-full h-full flex justify-center items-start mt-20"
      >
        <ul class="m-0 p-0 block text-white">
          <li
            v-for="(link, i) in links"
            :key="i"
            class="block text-center"
            :style="`--animation-order: ${i + 1}`"
          >
            <nuxt-link
              class="hover:bg-nuxty-darkest focus:bg-nuxty-darkest text-center text-xl font-bold py-3 px-5 rounded-xl ml-2 block"
              to="link.route"
            >
              {{ link.label }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import { disableScroll, enableScroll } from '~/utils/scroll'
export default {
  name: 'MainNavigation',
  props: {
    logo: {
      type: String,
      default: '/images/logo.svg',
    },
    links: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      showMobileMenu: false,
      scrolled: false,
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleSCroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleSCroll)
  },
  methods: {
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu
      this.showMobileMenu
        ? disableScroll(
            'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel'
          )
        : enableScroll(
            'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel'
          )
    },
    handleSCroll(event) {
      const scrollOffset = 100
      if (window.scrollY > scrollOffset) {
        this.scrolled = true
      } else if (window.scrollY < scrollOffset) {
        this.scrolled = false
      }
    },
  },
}
</script>

<style scoped lang="scss">
nav,
#nav-wrapper {
  transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.toggle-button * {
  transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.toggle-button {
  background: #b1fede4f;
  span {
    background: #02dc81;
  }
}

.toggle-active span {
  width: 29px;
}

.toggle-active span:first-child {
  transform: rotate(45deg) translate(4px, 4px);
}

.toggle-active span:last-child {
  transform: rotate(-45deg) translate(4px, -5px);
}

#mobile-menu:not(.hidden) li {
  animation-name: animate-in;
  animation-duration: 350ms;
  animation-delay: calc(var(--animation-order) * 100ms);
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
}

#mobile-menu:not(.hidden) li + li {
  margin-top: 2rem;
}

@keyframes animate-in {
  0% {
    opacity: 0;
    transform: translateY(8px);
  }

  100% {
    opacity: 1;
  }
}
</style>

<style scoped>
nav {
  z-index: 80;
}
</style>
