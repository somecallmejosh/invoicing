<template>
  <div class="bg-gray-50 min-h-screen px-4 lg:px-0">
    <div class="w-full max-w-screen-xl mx-auto space-y-6">
      <h1 class="font-bold text-2xl">Invoices</h1>
      <ul class="space-y-2">
        <li class="" v-for="invoice in invoices" :key="invoice.id">
          <nuxt-link
            :to="`/invoice/${invoice.id}`"
            class=" p-4 flex items-center justify-between lg:space-x-6 bg-white rounded hover:bg-gray-100 transition-colors duration-200"
          >
            <div class="grid gap-1 lg:gap-6 lg:grid-cols-8 w-full">
              <p class="font-semibold lg:col-span-1">#{{ invoice.id }}</p>
              <p class="lg:col-span-4">{{ invoice.clientName }}</p>
              <p class="text-lg font-semibold lg:col-span-3">
                ${{ invoice.total.toFixed(2) }}
              </p>
            </div>
            <div class="lg:flex lg:items-center">
              <p
                class="p-2 rounded-2xl font-medium flex items-center space-x-1 text-sm"
                :class="statusClass(invoice.status)"
              >
                <span
                  aria-hidden="true"
                  class="bg-current h-2 w-2 rounded-full"
                ></span>
                <span class="capitalize">{{ invoice.status }}</span>
              </p>
            </div>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ store }) {
    await store.dispatch("getInvoices");
  },
  computed: {
    invoices() {
      return this.$store.state.invoices;
    }
  },
  methods: {
    statusClass(status) {
      let classString = "";
      if (status === "pending") {
        classString = "bg-red-100 text-red-600";
      }
      return classString;
    }
  }
};
</script>
