<template>
  <transition name="drawer-fade">
    <div class="drawer-backdrop">
      <div
        class="drawer"
        :class="{ 'drawer--open': isOpen }"
        role="dialog"
        aria-labelledby="drawerTitle"
        aria-describedby="drawerContent"
      >
        <header id="drawerTitle" class="drawer-header">
          <button
            type="button"
            class="btn-close"
            aria-label="Close drawer"
            @click="close"
          >
            <svg
              width="15"
              height="17"
              viewBox="0 0 15 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.4857 13.568C14.8057 13.888 14.9657 14.2613 14.9657 14.688C14.9657 15.0933 14.8164 15.4453 14.5177 15.744C14.2404 16.0213 13.8991 16.16 13.4937 16.16C13.0884 16.16 12.7151 15.9787 12.3737 15.616L7.47773 10.112L2.61373 15.616C2.2724 15.9787 1.89906 16.16 1.49373 16.16C1.0884 16.16 0.736395 16.0107 0.437729 15.712C0.160395 15.4133 0.0217285 15.0613 0.0217285 14.656C0.0217285 14.2507 0.171062 13.888 0.469729 13.568L5.52573 8.00001L0.725729 2.65601C0.405729 2.29334 0.245729 1.93067 0.245729 1.56801C0.245729 1.16267 0.395062 0.821341 0.693729 0.544008C0.992395 0.245342 1.33373 0.0960083 1.71773 0.0960083C2.12306 0.0960083 2.4964 0.277342 2.83773 0.640008L7.47773 5.88801L12.1177 0.640008C12.4591 0.277342 12.8431 0.0960083 13.2697 0.0960083C13.6537 0.0960083 13.9951 0.245342 14.2937 0.544008C14.5924 0.821341 14.7417 1.16267 14.7417 1.56801C14.7417 1.97334 14.5817 2.33601 14.2617 2.65601L9.46173 8.00001L14.4857 13.568Z"
                fill="#012A35"
              />
            </svg>
          </button>
          <div class="header-content">
            <slot name="header"> This is the default tile! </slot>
          </div>
        </header>

        <section id="drawerContent" class="drawer-body overflow-y-auto">
          <slot name="content"> This is the default body! </slot>
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'SideDrawer',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    close() {
      this.$emit('close')
    },
  },
}
</script>

<style scoped lang="scss">
.drawer-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(1 42 53 / 79%);
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.drawer {
  width: 25rem;
  background: #fff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  height: 100%;
  transform: translateX(100%);
  transition: transform ease-in 0.35s;

  &--open {
    transform: translateX(0);
  }
}

.drawer-header {
  align-items: center;
  padding: 15px;
  display: flex;
  position: relative;
  border-bottom: 1px solid #eee;
  color: #4aae9b;
  justify-content: space-between;
}

.header-content {
  flex-grow: 1;
}

.drawer-body {
  position: relative;
  padding: 10px 10px;
}

.btn-close {
  @apply text-nuxty-darker rounded-full flex items-center justify-center mr-2;

  height: 2.625rem;
  width: 2.625rem;
  border: none;
  cursor: pointer;
  background: #f3f3f3;
}

.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}

.drawer-fade-enter,
.drawer-fade-leave-to {
  opacity: 0;
}

.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
