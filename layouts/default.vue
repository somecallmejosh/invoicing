<template>
  <div class="relative lg:flex bg-mj-lt-gray">
    <header
      ref="header"
      class="z-20 bg-mj-purple-gray-5 flex text-white w-screen lg:w-28 lg:rounded-tr-3xl lg:rounded-br-3xl lg:flex-col overflow-hidden justify-between lg:h-screen fixed top-0 left-0"
    >
      <nuxt-link
        to="/"
        class="bg-mj-purple-1 rounded-tr-3xl rounded-br-3xl flex items-center justify-center w-24 h-24 lg:w-28 lg:h-28 relative overflow-hidden block"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 lg:h-12 lg:w-12 relative z-10"
          viewBox="0 0 28 26"
        >
          <path
            d="M20.51,0A13.75,13.75,0,0,1,28,12.21,13.89,13.89,0,0,1,14,26,13.89,13.89,0,0,1,0,12.21,13.77,13.77,0,0,1,7.49,0L14,12.9Z"
            style="fill:#fff;fill-rule:evenodd"
          />
        </svg>
        <div
          aria-hidden="true"
          class="h-full w-full rounded-tl-3xl absolute top-0 transform translate-y-1/2 bg-mj-purple-2 z-0"
        ></div>
      </nuxt-link>
      <div
        class="divide-x lg:divide-x-0 lg:divide-y divide-mj-purple-gray-3 flex lg:flex-col"
      >
        <div class="flex justify-center  px-6 py-6 lg:px-0">
          <button>
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
              ></path>
            </svg>
          </button>
        </div>
        <div class="flex justify-center px-6 py-6 lg:px-0">
          <img
            class="inline-block h-10 w-10 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div>
      </div>
    </header>
    <main
      class="min-h-screen px-4 md:px-0 font-medium text-mj-purple-gray-4 relative z-10 lg:flex-grow "
    >
      <div class="pt-28 lg:pl-28 lg:pt-0">
        <Nuxt class="w-full max-w-3xl mx-auto py-8 md:py-24" />
      </div>
    </main>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
