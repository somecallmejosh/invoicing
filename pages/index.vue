<template>
  <div class="relative w-full">
    <transition name="fade">
      <div
        v-if="sidePaneVisible"
        class="bg-black fixed h-screen inset-0 overflow-y-scroll bg-opacity-40 transform transition-all"
        :class="sidePaneVisible ? 'z-30' : 'z-10 '"
      >
        <div
          v-clickout="{
            exclude: ['togglePane'],
            handler: 'toggleSidePanel'
          }"
          class="content fixed top-0 left-0 p-6 lg:p-12 pt-36 lg:pl-48 lg:py-12 lg:pr-24 w-full lg:max-w-4xl bg-white lg:rounded-tr-3xl lg:rounded-br-3xl h-screen z-50 transform transition-transform duration-150 space-y-12 overflow-y-scroll"
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
                  class="bg-white border-mj-purple-gray-1 rounded-md w-full"
                />
              </div>
              <div class="grid lg:grid-cols-3 gap-6">
                <div class="form-group">
                  <label for="sender_address_attributes_city">City</label>
                  <input
                    type="text"
                    v-model="invoice.sender_address_attributes.city"
                    id="sender_address_attributes_city"
                    class="bg-white border-mj-purple-gray-1 rounded-md w-full"
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
                    class="bg-white border-mj-purple-gray-1 rounded-md w-full"
                  />
                </div>
                <div class="form-group">
                  <label for="sender_address_attributes_country">Country</label>
                  <input
                    type="text"
                    v-model="invoice.sender_address_attributes.country"
                    id="sender_address_attributes_country"
                    class="bg-white border-mj-purple-gray-1 rounded-md w-full"
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
                  class="bg-white border-mj-purple-gray-1 rounded-md w-full"
                />
              </div>
              <div class="form-group">
                <label for="client_name">Client's Name</label>
                <input
                  type="text"
                  v-model="invoice.client_name"
                  id="client_name"
                  class="bg-white border-mj-purple-gray-1 rounded-md w-full"
                />
              </div>

              <div class="form-group">
                <label for="lient_address_attributes_street">Street</label>
                <input
                  type="text"
                  v-model="invoice.client_address_attributes.street"
                  id="lient_address_attributes_street"
                  class="bg-white border-mj-purple-gray-1 rounded-md w-full"
                />
              </div>
              <div class="grid grid-cols-3 gap-6">
                <div class="form-group">
                  <label for="lient_address_attributes_city">City</label>
                  <input
                    type="text"
                    v-model="invoice.client_address_attributes.city"
                    id="lient_address_attributes_city"
                    class="bg-white border-mj-purple-gray-1 rounded-md w-full"
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
                    class="bg-white border-mj-purple-gray-1 rounded-md w-full"
                  />
                </div>
                <div class="form-group">
                  <label for="lient_address_attributes_country">Country</label>
                  <input
                    type="text"
                    v-model="invoice.client_address_attributes.country"
                    id="lient_address_attributes_country"
                    class="bg-white border-mj-purple-gray-1 rounded-md w-full"
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
                    class="bg-white border-mj-purple-gray-1 rounded-md w-full"
                  />
                </div>

                <div class="form-group">
                  <label for="payment_terms">Payment Terms</label>
                  <input
                    type="text"
                    v-model="invoice.payment_terms"
                    id="payment_terms"
                    class="bg-white border-mj-purple-gray-1 rounded-md w-full"
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="description">Project Description</label>
                <input
                  type="text"
                  v-model="invoice.description"
                  id="description"
                  class="bg-white border-mj-purple-gray-1 rounded-md w-full"
                />
              </div>
            </div>

            <div class="space-y-6">
              <h3 class="font-bold text-lg text-mj-purple-gray-4">Item List</h3>

              <div class="space-y-3">
                <div class="lg:grid-cols-9 lg:gap-6 hidden lg:grid">
                  <div class="text-xs text-mj-purple-gray-3 col-span-3">
                    Item Name
                  </div>
                  <div class="text-xs text-mj-purple-gray-3 col-span-1">
                    Qty.
                  </div>
                  <div class="text-xs text-mj-purple-gray-3 col-span-2">
                    Price
                  </div>
                  <div class="text-xs text-mj-purple-gray-3 col-span-3">
                    Total
                  </div>
                </div>
                <div
                  class="space-y-6"
                  v-for="(item, index) in invoice.line_items_attributes"
                  :key="index"
                >
                  <div
                    class="grid grid-cols-10 lg:grid-cols-9 gap-4 items-center"
                  >
                    <div class="form-group col-span-10 lg:col-span-3">
                      <label :for="`line_item_name_${index}`" class="lg:hidden"
                        >Item Name</label
                      >
                      <input
                        aria-label="Item Name"
                        type="text"
                        v-model="invoice.line_items_attributes[index].name"
                        :id="`line_item_name_${index}`"
                        class="bg-white border-mj-purple-gray-1 rounded-md w-full"
                      />
                    </div>
                    <div class="form-group col-span-3 lg:col-span-1">
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
                        class="bg-white border-mj-purple-gray-1 rounded-md w-full"
                      />
                    </div>
                    <div class="form-group col-span-3 lg:col-span-2">
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
                        class="bg-white border-mj-purple-gray-1 rounded-md w-full"
                      />
                    </div>
                    <div
                      class="col-span-3 lg:col-span-2 text-xs"
                      aria-label="Total"
                    >
                      <p class="lg:hidden label">Total</p>
                      <p class="mt-2 lg:mt-0 font-bold">
                        {{
                          (
                            invoice.line_items_attributes[index].price *
                            invoice.line_items_attributes[index].quantity
                          ).toFixed(2)
                        }}
                      </p>
                    </div>
                    <div class="col-span-1 flex items-center">
                      <button
                        class="text-xs font-bold mt-3 lg:mt-0 text-mj-purple-gray-2"
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
                  class="bg-mj-lt-gray rounded-full w-full text-center py-4 px-4 text-mj-purple-gray-3 text-xs font-bold mt-2"
                  @click.prevent="addItem()"
                >
                  + Add New Item
                </button>
              </div>
            </div>

            <div class="flex items-center justify-between lg:justify-start">
              <button
                class="py-4 px-4 lg:py-4 lg:px-6 bg-mj-lt-gray text-mj-purple-gray-3 rounded-full text-xs font-bold"
                @click.prevent="toggleSidePanel()"
              >
                Discard
              </button>
              <button
                @click.prevent="saveDraft()"
                class="py-4 px-4 lg:py-4 lg:px-6 bg-mj-purple-gray-5 text-mj-lt-gray rounded-full text-xs lg:ml-auto font-bold"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                class="py-4 px-4 lg:py-4 lg:px-6 bg-mj-purple-1 text-white rounded-full text-xs lg:ml-4 font-bold"
              >
                Save & Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
    <div class="space-y-6">
      <div class="flex items-center justify-between space-x-4 relative">
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
                class="bg-white shadow-lg p-6 rounded-lg absolute top-8 left-1/2 transform -translate-x-1/2 w-48 text-xs font-bold space-y-2 z-10"
              >
                <div class="text-left space-x-2 flex items-center">
                  <input
                    class="text-mj-purple-1 rounded"
                    type="checkbox"
                    value="draft"
                    id="draft"
                  />
                  <label for="draft" class="mt-3">Draft</label>
                </div>
                <div class="text-left space-x-2 flex items-center">
                  <input
                    class="text-mj-purple-1 rounded"
                    type="checkbox"
                    value="pending"
                    id="pending"
                  />
                  <label for="pending" class="mt-3">Pending</label>
                </div>
                <div class="text-left space-x-2 flex items-center">
                  <input
                    class="text-mj-purple-1 rounded"
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
      <ul class="space-y-4 relative">
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
