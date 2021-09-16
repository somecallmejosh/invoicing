<template>
  <div class="relative w-full">
    <transition name="fade">
      <div
        v-if="sidePaneVisible"
        class="fixed inset-0 h-screen overflow-y-scroll transition-all transform bg-black bg-opacity-40"
        :class="sidePaneVisible ? 'z-30' : 'z-10 '"
      >
        <div
          v-clickout="{
            exclude: ['togglePane'],
            handler: 'toggleSidePanel'
          }"
          class="fixed top-0 left-0 z-50 w-full h-screen p-6 space-y-12 overflow-y-scroll transition-transform duration-150 transform bg-white content lg:p-12 pt-36 lg:pl-48 lg:py-12 lg:pr-24 lg:max-w-4xl lg:rounded-tr-3xl lg:rounded-br-3xl"
        >
          <h2 class="text-2xl font-bold">New Invoice</h2>
          <form @submit.prevent="submitInvoice()" class="space-y-10 text-sm">
            <div class="space-y-6">
              <h3 class="font-bold text-mj-purple-1">Bill From</h3>
              <div class="form-group">
                <label for="sender_address_attributes_street">Street</label>
                <input
                  type="text"
                  v-model="invoice.sender_address_attributes.street"
                  id="sender_address_attributes"
                  class="w-full bg-white rounded-md border-mj-purple-gray-1"
                />
              </div>
              <div class="grid gap-6 lg:grid-cols-3">
                <div class="form-group">
                  <label for="sender_address_attributes_city">City</label>
                  <input
                    type="text"
                    v-model="invoice.sender_address_attributes.city"
                    id="sender_address_attributes_city"
                    class="w-full bg-white rounded-md border-mj-purple-gray-1"
                  />
                </div>
                <div class="form-group">
                  <label for="sender_address_attributes_post_code"
                    >Postal Code</label
                  >
                  <input
                    type="text"
                    v-model="invoice.sender_address_attributes.post_code"
                    id="sender_address_attributes_post_code"
                    class="w-full bg-white rounded-md border-mj-purple-gray-1"
                  />
                </div>
                <div class="form-group">
                  <label for="sender_address_attributes_country">Country</label>
                  <input
                    type="text"
                    v-model="invoice.sender_address_attributes.country"
                    id="sender_address_attributes_country"
                    class="w-full bg-white rounded-md border-mj-purple-gray-1"
                  />
                </div>
              </div>
            </div>

            <div class="space-y-6">
              <h3 class="font-bold text-mj-purple-1">Bill To</h3>
              <div class="form-group">
                <label for="client_name">Client's Email</label>
                <input
                  type="email"
                  v-model="invoice.client_email"
                  id="client_email"
                  class="w-full bg-white rounded-md border-mj-purple-gray-1"
                />
              </div>
              <div class="form-group">
                <label for="client_name">Client's Name</label>
                <input
                  type="text"
                  v-model="invoice.client_name"
                  id="client_name"
                  class="w-full bg-white rounded-md border-mj-purple-gray-1"
                />
              </div>

              <div class="form-group">
                <label for="lient_address_attributes_street">Street</label>
                <input
                  type="text"
                  v-model="invoice.client_address_attributes.street"
                  id="lient_address_attributes_street"
                  class="w-full bg-white rounded-md border-mj-purple-gray-1"
                />
              </div>
              <div class="grid grid-cols-3 gap-6">
                <div class="form-group">
                  <label for="lient_address_attributes_city">City</label>
                  <input
                    type="text"
                    v-model="invoice.client_address_attributes.city"
                    id="lient_address_attributes_city"
                    class="w-full bg-white rounded-md border-mj-purple-gray-1"
                  />
                </div>
                <div class="form-group">
                  <label for="lient_address_attributes_post_code"
                    >Post Code</label
                  >
                  <input
                    type="text"
                    v-model="invoice.client_address_attributes.post_code"
                    id="lient_address_attributes_post_code"
                    class="w-full bg-white rounded-md border-mj-purple-gray-1"
                  />
                </div>
                <div class="form-group">
                  <label for="lient_address_attributes_country">Country</label>
                  <input
                    type="text"
                    v-model="invoice.client_address_attributes.country"
                    id="lient_address_attributes_country"
                    class="w-full bg-white rounded-md border-mj-purple-gray-1"
                  />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-6">
                <div class="form-group">
                  <label for="payment_date">Invoice Date</label>
                  <input
                    type="date"
                    v-model="invoice.payment_date"
                    id="payment_date"
                    class="w-full bg-white rounded-md border-mj-purple-gray-1"
                  />
                </div>

                <div class="form-group">
                  <label for="payment_terms">Payment Terms</label>
                  <input
                    type="text"
                    v-model="invoice.payment_terms"
                    id="payment_terms"
                    class="w-full bg-white rounded-md border-mj-purple-gray-1"
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="description">Project Description</label>
                <input
                  type="text"
                  v-model="invoice.description"
                  id="description"
                  class="w-full bg-white rounded-md border-mj-purple-gray-1"
                />
              </div>
            </div>

            <div class="space-y-6">
              <h3 class="text-lg font-bold text-mj-purple-gray-4">Item List</h3>

              <div class="space-y-3">
                <div class="hidden lg:grid-cols-9 lg:gap-6 lg:grid">
                  <div class="col-span-3 text-xs text-mj-purple-gray-3">
                    Item Name
                  </div>
                  <div class="col-span-1 text-xs text-mj-purple-gray-3">
                    Qty.
                  </div>
                  <div class="col-span-2 text-xs text-mj-purple-gray-3">
                    Price
                  </div>
                  <div class="col-span-3 text-xs text-mj-purple-gray-3">
                    Total
                  </div>
                </div>
                <div
                  class="space-y-6"
                  v-for="(item, index) in invoice.line_items_attributes"
                  :key="index"
                >
                  <div
                    class="grid items-center grid-cols-10 gap-4 lg:grid-cols-9"
                  >
                    <div class="col-span-10 form-group lg:col-span-3">
                      <label :for="`line_item_name_${index}`" class="lg:hidden"
                        >Item Name</label
                      >
                      <input
                        aria-label="Item Name"
                        type="text"
                        v-model="invoice.line_items_attributes[index].name"
                        :id="`line_item_name_${index}`"
                        class="w-full bg-white rounded-md border-mj-purple-gray-1"
                      />
                    </div>
                    <div class="col-span-3 form-group lg:col-span-1">
                      <label
                        :for="`line_item_quantity_${index}`"
                        class="lg:hidden"
                        >Qty.</label
                      >
                      <input
                        aria-label="Quanity"
                        type="number"
                        v-model="invoice.line_items_attributes[index].quantity"
                        :id="`line_item_quantity_${index}`"
                        class="w-full bg-white rounded-md border-mj-purple-gray-1"
                      />
                    </div>
                    <div class="col-span-3 form-group lg:col-span-2">
                      <label :for="`line_item_price_${index}`" class="lg:hidden"
                        >Price</label
                      >
                      <input
                        aria-label="Price"
                        type="number"
                        min="0.01"
                        step="0.01"
                        v-model="invoice.line_items_attributes[index].price"
                        :id="`line_item_price_${index}`"
                        class="w-full bg-white rounded-md border-mj-purple-gray-1"
                      />
                    </div>
                    <div
                      class="col-span-3 text-xs lg:col-span-2"
                      aria-label="Total"
                    >
                      <p class="lg:hidden label">Total</p>
                      <p class="mt-2 font-bold lg:mt-0">
                        {{
                          (
                            invoice.line_items_attributes[index].price *
                            invoice.line_items_attributes[index].quantity
                          ).toFixed(2)
                        }}
                      </p>
                    </div>
                    <div class="flex items-center col-span-1">
                      <button
                        class="mt-3 text-xs font-bold lg:mt-0 text-mj-purple-gray-2"
                        aria-label="Delete item"
                        @click.prevent="deleteLineItem(index)"
                      >
                        <svg
                          class="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  class="w-full px-4 py-4 mt-2 text-xs font-bold text-center rounded-full bg-mj-lt-gray text-mj-purple-gray-3"
                  @click.prevent="addItem()"
                >
                  + Add New Item
                </button>
              </div>
            </div>

            <div class="flex items-center justify-between lg:justify-start">
              <button
                class="px-4 py-4 text-xs font-bold rounded-full lg:py-4 lg:px-6 bg-mj-lt-gray text-mj-purple-gray-3"
                @click.prevent="toggleSidePanel()"
              >
                Discard
              </button>
              <button
                @click.prevent="saveDraft()"
                class="px-4 py-4 text-xs font-bold rounded-full lg:py-4 lg:px-6 bg-mj-purple-gray-5 text-mj-lt-gray lg:ml-auto"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                class="px-4 py-4 text-xs font-bold text-white rounded-full lg:py-4 lg:px-6 bg-mj-purple-1 lg:ml-4"
              >
                Save & Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
    <div class="space-y-6">
      <div class="relative flex items-center justify-between space-x-4">
        <div class="flex flex-col">
          <h1 class="text-2xl font-bold">Invoices</h1>
          <p class="text-xs">
            <span class="hidden md:inline">There are</span>
            {{ invoices.length }}
            <span class="hidden md:inline">total</span> invoices
          </p>
        </div>
        <div class="flex items-center space-x-4">
          <div class="relative">
            <button
              ref="toggleFilter"
              @click="toggleFilterMenu()"
              class="flex items-center space-x-3"
            >
              <div class="relative">
                <span class="text-xs font-bold">
                  Filter <span class="hidden md:inline">By Status</span>
                </span>
              </div>
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
            <transition name="slide-down">
              <form
                v-if="showFilter"
                v-clickout="{
                  exclude: ['toggleFilter'],
                  handler: 'toggleFilterMenu'
                }"
                class="absolute z-10 w-48 p-6 space-y-2 text-xs font-bold transform -translate-x-1/2 bg-white rounded-lg shadow-lg top-8 left-1/2"
              >
                <div class="flex items-center space-x-2 text-left">
                  <input
                    class="rounded text-mj-purple-1"
                    type="checkbox"
                    value="draft"
                    id="draft"
                  />
                  <label for="draft" class="mt-3">Draft</label>
                </div>
                <div class="flex items-center space-x-2 text-left">
                  <input
                    class="rounded text-mj-purple-1"
                    type="checkbox"
                    value="pending"
                    id="pending"
                  />
                  <label for="pending" class="mt-3">Pending</label>
                </div>
                <div class="flex items-center space-x-2 text-left">
                  <input
                    class="rounded text-mj-purple-1"
                    type="checkbox"
                    value="paid"
                    id="paid"
                  />
                  <label for="paid" class="mt-3">Paid</label>
                </div>
              </form>
            </transition>
          </div>
          <button
            ref="togglePane"
            @click="toggleSidePanel()"
            class="flex items-center p-2 pr-4 space-x-2 transition-colors duration-150 border-transparent rounded-full bg-mj-purple-1 hover:bg-mj-purple-2 lg:space-x-4"
          >
            <span
              class="inline-flex items-center justify-center w-8 h-8 bg-white rounded-full text-mj-purple-1"
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
            <span class="block mt-1 text-xs font-bold text-white"
              >New <span class="hidden lg:inline">Invoice</span></span
            >
          </button>
        </div>
      </div>
      <ul class="relative space-y-4">
        <li class="" v-for="invoice in invoices" :key="invoice.id">
          <nuxt-link
            :to="`/invoice/${invoice.id}`"
            class="flex items-center justify-between p-6 transition-colors duration-200 bg-white rounded shadow-sm md:space-x-6 hover:bg-gray-100"
          >
            <div
              class="grid w-full gap-1 md:gap-6 md:grid-cols-9 md:items-center"
            >
              <p class="text-xs font-bold md:col-span-1 md:order-1">
                <span class="text-mj-purple-gray-3">#</span>{{ invoice.id }}
              </p>
              <p class="hidden text-xs md:block md:col-span-4 md:order-3 ">
                {{ invoice.client_name }}
              </p>
              <p
                class="mt-6 text-xs text-mj-purple-gray-3 md:mt-0 md:col-span-2 md:order-2"
              >
                Due {{ $moment(invoice.paymentDate).format("MMM D, YYYY") }}
              </p>
              <p class="font-bold md:col-span-2 md:text-right md:order-4">
                ${{ invoice.total.toFixed(2) }}
              </p>
            </div>
            <div class="text-right md:flex md:items-center">
              <p
                class="text-xs text-right truncate md:hidden md:col-span-4 text-mj-purple-gray-2"
              >
                {{ invoice.clientName }}
              </p>
              <p
                class="inline-flex items-center px-4 py-3 mt-6 space-x-2 text-xs font-bold rounded bg-opacity-5 md:mt-0"
                :class="statusClass(invoice.status)"
              >
                <span
                  aria-hidden="true"
                  class="w-2 h-2 bg-current rounded-full"
                ></span>
                <span class="capitalize">{{ invoice.status }}</span>
              </p>
              <div class="hidden ml-2 md:block text-mj-purple-gray-3">
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
  async asyncData({ store }) {
    await store.dispatch("getInvoices");
  },
  computed: {
    invoices() {
      return this.$store.state.invoices;
    }
  },
  data() {
    return {
      showFilter: false,
      sidePaneVisible: false,
      invoice: {
        description: "",
        client_email: "",
        client_name: "",
        payment_date: "",
        payment_terms: "",
        sender_address_attributes: {
          street: "",
          city: "",
          post_code: "",
          country: ""
        },
        client_address_attributes: {
          street: "",
          city: "",
          post_code: "",
          country: ""
        },
        line_items_attributes: []
      }
    };
  },
  methods: {
    addItem() {
      this.invoice.line_items_attributes.push({
        name: "",
        quantity: 0,
        price: 0
      });
    },
    statusClass(status) {
      let classString = "";
      if (status === "pending") {
        classString = "bg-mj-orange text-mj-orange";
      }
      if (status === "paid") {
        classString = "bg-mj-green text-mj-green";
      }
      return classString;
    },
    toggleFilterMenu() {
      this.showFilter = !this.showFilter;
    },
    toggleSidePanel() {
      this.sidePaneVisible = !this.sidePaneVisible;
      const header = document.querySelector("header");
    },
    async submitInvoice() {
      const thisScope = this;
      this.$axios
        .$post("/invoices.json", {
          headers: {
            "Content-Type": "application/json"
          },
          ...thisScope.invoice
        })
        .then(function(response) {
          thisScope.$store.dispatch("getInvoices");
          thisScope.toggleSidePanel();
        });
    },
    saveDraft() {
      alert("Saving Draft, but not really...");
    },
    deleteLineItem(index) {
      this.invoice.line_items_attributes.splice(index, 1);
    }
  }
};
</script>
<style scoped>
.fade-enter-active {
  transition: all 0.15s ease;
}
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  @apply bg-opacity-25;
}

.fade-enter-active .content {
  transition: all 0.15s ease;
}
.fade-leave-active .content {
  transition: all 0.3s ease;
}
.fade-enter .content,
.fade-leave-to .content {
  @apply -translate-x-full;
}

.slide-down-enter-active {
  @apply transition-all duration-150 origin-top;
}
.slide-down-leave-active {
  @apply transition-all duration-300 origin-top;
}
.slide-down-enter,
.slide-down-leave-to {
  @apply scale-y-75 opacity-0;
}

label,
.label {
  @apply block mb-2 text-xs text-mj-purple-gray-3;
}

input:not([type="checkbox"]):not([type="radio"]) {
  @apply text-xs font-bold text-mj-dk-gray h-12 px-5;
}
</style>
