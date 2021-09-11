<template>
  <div class="bg-gray-50 px-4 lg:px-0 min-h-screen">
    <div class="bg-white rounded-lg p-12 max-w-screen-xl mx-auto space-y-6">
      <div>
        <nuxt-link
          to="/"
          class="bg-gray-900 text-white p-2 rounded-lg hover:bg-gray-700"
          >‹ Back</nuxt-link
        >
      </div>
      <div class="flex justify-between space-x-6">
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
      <div class="bg-gray-50 rounded-lg overflow-hidden">
        <ul class="space-y-4 p-6 ">
          <li class="grid gap-6 grid-cols-7 text-sm">
            <p class="font-medium col-span-4">Item Name</p>
            <p class="col-span-1 text-center">QTY.</p>
            <p class="col-span-1 text-right">Price</p>
            <p class="col-span-1 text-right">
              Total
            </p>
          </li>
          <li
            v-for="item in invoice.lineItems"
            :key="item.id"
            class="grid gap-6 grid-cols-7"
          >
            <p class="font-bold col-span-4">{{ item.name }}</p>
            <p class="col-span-1 text-center">{{ item.quantity }}</p>
            <p class="col-span-1 text-right">${{ item.total.toFixed(2) }}</p>
            <p class="col-span-1 text-right">${{ item.total.toFixed(2) }}</p>
          </li>
        </ul>
        <div
          class="bg-gray-900 text-white flex justify-between items-center p-6"
        >
          <p class="text-sm">Amount Due</p>
          <p class="text-3xl font-bold">${{ invoiceTotal.toFixed(2) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ store }) {
    await store.dispatch("getInvoices");
  },
  computed: {
    invoice() {
      return this.$store.getters.getInvoice(this.$route.params.slug)[0];
    },
    invoiceTotal() {
      return this.invoice.lineItems.reduce((n, { total }) => n + total, 0);
    }
  }
};
</script>

<style></style>
