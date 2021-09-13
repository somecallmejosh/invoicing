<template>
  <div>
    <div class="rounded-lg max-w-3xl mx-auto space-y-6 w-full">
      <div class="w-full max-w-screen-xl mx-auto">
        <nuxt-link
          to="/"
          class="bg-gray-900 text-white p-2 rounded-lg hover:bg-gray-700"
          >‹ Back</nuxt-link
        >
      </div>
      <div
        class="flex justify-between space-x-6 bg-white p-6 lg:p-12 rounded-lg shadow"
      >
        <div
          class="flex items-center space-x-2 justify-between w-full lg:w-auto"
        >
          <p>Status</p>
          <p
            class="p-2 rounded flex items-center space-x-1 text-xs bg-opacity-5"
            :class="statusClass(invoice.status)"
          >
            <span
              aria-hidden="true"
              class="bg-current h-2 w-2 rounded-full"
            ></span>
            <span class="capitalize">{{ invoice.status }}</span>
          </p>
        </div>
        <div class="hidden lg:flex items-center space-x-4">
          <button>Edit</button>
          <button @click="deleteInvoice()">Delete</button>
          <button>Mark as Paid</button>
        </div>
      </div>
      <div
        class="flex justify-between space-x-6 bg-white p-6 lg:p-12 rounded-lg shadow"
      >
        <div>
          <h1>Invoice #: {{ invoice.id }}</h1>
          <p>{{ invoice.description }}</p>
        </div>
        <div class="text-right">
          <p>
            <span v-if="invoice.clientAddress.street" class="block">{{
              invoice.clientAddress.street
            }}</span>
            <span v-if="invoice.clientAddress.city" class="block">{{
              invoice.clientAddress.city
            }}</span>
            <span v-if="invoice.clientAddress.state" class="block">{{
              invoice.clientAddress.state
            }}</span>
            <span v-if="invoice.clientAddress.country" class="block">{{
              invoice.clientAddress.country
            }}</span>
            <span v-if="invoice.clientAddress.postalCode" class="block">{{
              invoice.clientAddress.postalCode
            }}</span>
          </p>
        </div>
      </div>
      <div class="bg-white rounded-lg overflow-hidden shadow">
        <div class="p-4 lg:p-12">
          <ul class="hidden lg:block lg:mb-4">
            <li class="lg:grid lg:gap-6 lg:grid-cols-9 text-sm">
              <p class=" col-span-4">Item Name</p>
              <p class="col-span-1 text-center">QTY.</p>
              <p class="col-span-2 text-right">Price</p>
              <p class="col-span-2 text-right">
                Total
              </p>
            </li>
          </ul>
          <ul class="space-y-6">
            <li
              v-for="item in invoice.lineItems"
              :key="item.id"
              class="grid gap-6 grid-cols-2 lg:grid-cols-9 items-center"
            >
              <div class="lg:col-span-4">
                <p class="font-bold capitalize">{{ item.name }}</p>
                <p class="lg:hidden text-sm">
                  {{ item.quantity }} x ${{ item.price }}
                </p>
              </div>
              <div class="hidden lg:block lg:col-span-1 text-center">
                <p class="text-center">
                  {{ item.quantity }}
                </p>
              </div>
              <div class="lg:col-span-2 text-right hidden lg:block">
                <p>${{ item.total.toFixed(2) }}</p>
              </div>

              <div class="lg:col-span-2 text-right">
                <p>${{ item.total.toFixed(2) }}</p>
              </div>
            </li>
          </ul>
        </div>
        <div
          class="bg-gray-900 text-white flex justify-between items-center p-4 lg:p-12"
        >
          <p class="text-sm">Amount Due</p>
          <p class="text-3xl font-bold">${{ invoiceTotal.toFixed(2) }}</p>
        </div>
      </div>
    </div>
    <div
      class="lg:hidden flex items-center space-x-4 bg-white p-4 fixed bottom-0 left-0 righ-0 w-full shadow"
    >
      <button>Edit</button>
      <button @click="deleteInvoice()">Delete</button>
      <button>Mark as Paid</button>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    const invoice = await $axios.$get(`/invoices/${params.slug}.json`);
    return { invoice };
  },
  computed: {
    invoiceTotal() {
      return this.invoice.lineItems.reduce((n, { total }) => n + total, 0);
    }
  },
  methods: {
    // THIS IS A DUPLICATE METHOD FROM index.vue
    statusClass(status) {
      let classString = "";
      if (status === "pending") {
        classString = "bg-mj-orange text-mj-orange";
      }
      return classString;
    },
    deleteInvoice() {
      alert(
        `Are you sure you want to delete invoice # ${this.$route.params.slug}? This action can't be undone.`
      );
      const router = this.$router;
      this.$axios
        .$delete(`/invoices/${this.$route.params.slug}`)
        .then(function(response) {
          router.push("/");
        });
    }
  }
};
</script>

<style></style>
