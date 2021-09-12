<template>
  <div
    class="bg-mj-lt-gray min-h-screen px-4 md:px-0 font-medium text-mj-purple-gray-4"
  >
    <div class="w-full max-w-3xl mx-auto space-y-6 py-8 md:py-24">
      <div class="flex items-center justify-between space-x-4">
        <div class="flex flex-col">
          <h1 class="text-2xl font-bold">Invoices</h1>
          <p class="text-xs">
            <span class="hidden md:inline">There are</span>
            {{ invoices.length }}
            <span class="hidden md:inline">total</span> invoices
          </p>
        </div>
        <div class="flex items-center space-x-4">
          <button class="flex items-center space-x-3">
            <span class="text-xs font-bold">
              Filter <span class="hidden md:inline">By Status</span>
            </span>
            <span class="text-mj-purple-1">
              <svg
                class="w-4 h-4 fill-text-mj-purple-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
          </button>
          <button
            class="bg-mj-purple-1 border-transparent hover:bg-mj-purple-2 transition-colors duration-150 p-2 pr-4 rounded-full flex items-center space-x-2 lg:space-x-4"
          >
            <span
              class="inline-flex h-8 w-8 text-mj-purple-1 items-center justify-center rounded-full bg-white"
            >
              <svg
                class="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
            <span class="text-white text-xs font-bold block mt-1"
              >New <span class="hidden lg:inline">Invoice</span></span
            >
          </button>
        </div>
      </div>
      <ul class="space-y-4">
        <li class="" v-for="invoice in invoices" :key="invoice.id">
          <nuxt-link
            :to="`/invoice/${invoice.id}`"
            class="p-6 flex items-center justify-between md:space-x-6 bg-white rounded hover:bg-gray-100 transition-colors duration-200 shadow-sm"
          >
            <div
              class="grid gap-1 md:gap-6 md:grid-cols-9 w-full md:items-center"
            >
              <p class="font-bold md:col-span-1 text-xs md:order-1">
                <span class="text-mj-purple-gray-3">#</span>{{ invoice.id }}
              </p>
              <p class="hidden md:block md:col-span-4 md:order-3 text-xs ">
                {{ invoice.clientName }}
              </p>
              <p
                class="text-mj-purple-gray-3 text-xs mt-6 md:mt-0 md:col-span-2 md:order-2"
              >
                Due {{ $moment(invoice.paymentDate).format("MMM D, YYYY") }}
              </p>
              <p class="font-bold md:col-span-2 md:text-right md:order-4">
                ${{ invoice.total.toFixed(2) }}
              </p>
            </div>
            <div class="md:flex md:items-center text-right">
              <p
                class="md:hidden md:col-span-4 text-xs text-right text-mj-purple-gray-2 truncate"
              >
                {{ invoice.clientName }}
              </p>
              <p
                class="px-4 py-3 rounded font-bold inline-flex items-center space-x-2 text-xs bg-opacity-5 mt-6 md:mt-0"
                :class="statusClass(invoice.status)"
              >
                <span
                  aria-hidden="true"
                  class="bg-current h-2 w-2 rounded-full"
                ></span>
                <span class="capitalize">{{ invoice.status }}</span>
              </p>
              <div class="hidden md:block text-mj-purple-gray-3 ml-2">
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="4"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </div>
            </div>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const invoices = await $axios.$get("/invoices.json");
    return { invoices };
  },
  methods: {
    statusClass(status) {
      let classString = "";
      if (status === "pending") {
        classString = "bg-mj-orange text-mj-orange";
      }
      return classString;
    }
  }
};
</script>
