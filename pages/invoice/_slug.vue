<template>
  <div class="relative w-full">
    <transition name="faded">
      <div
        @click.self="toggleSidePanel()"
        v-if="sidePaneVisible"
        class="fixed inset-0 h-screen overflow-y-scroll transition-all transform bg-black bg-opacity-40"
        :class="sidePaneVisible ? 'z-30' : 'z-10 '"
      >
        <div
          class="fixed top-0 left-0 z-50 w-full h-screen p-6 space-y-12 overflow-y-scroll transition-transform duration-150 transform bg-white content lg:p-12 pt-36 lg:pl-36 lg:py-12 lg:pr-12 lg:max-w-4xl lg:rounded-tr-3xl lg:rounded-br-3xl"
        >
          <h2 class="text-2xl font-bold">New Invoice</h2>
          <form @submit.prevent="submitInvoice()" class="space-y-10 text-sm">
            <div class="space-y-6 default-form">
              <h3 class="font-bold text-mj-purple-1">Bill From</h3>
              <div class="form-group">
                <label for="sender_address_street">Street</label>
                <input
                  type="text"
                  v-model="invoice.sender_address_attributes.street"
                  id="sender_address_street"
                  class="w-full bg-white rounded-md border-mj-purple-gray-1"
                />
              </div>
              <div class="grid gap-6 lg:grid-cols-3">
                <div class="form-group">
                  <label for="sender_address_city">City</label>
                  <input
                    type="text"
                    v-model="invoice.sender_address_attributes.city"
                    id="sender_address_city"
                    class="w-full bg-white rounded-md border-mj-purple-gray-1"
                  />
                </div>
                <div class="form-group">
                  <label for="sender_address_post_code">Postal Code</label>
                  <input
                    type="text"
                    v-model="invoice.sender_address_attributes.post_code"
                    id="sender_address_post_code"
                    class="w-full bg-white rounded-md border-mj-purple-gray-1"
                  />
                </div>
                <div class="form-group">
                  <label for="sender_address_country">Country</label>
                  <input
                    type="text"
                    v-model="invoice.sender_address_attributes.country"
                    id="sender_address_country"
                    class="w-full bg-white rounded-md border-mj-purple-gray-1"
                  />
                </div>
              </div>
            </div>

            <div class="space-y-6 default-form">
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
                  v-for="(item, index) in invoice.line_items_attributes"
                  :key="index"
                >
                  <div
                    class="grid items-center grid-cols-10 gap-4 lg:grid-cols-9"
                    :class="index > 0 ? 'mt-10 lg:mt-0' : ''"
                  >
                    <div class="col-span-10 form-group lg:col-span-3">
                      <label
                        :for="`line_item_name_${index}`"
                        class="block mb-2 lg:hidden"
                        >Item Name</label
                      >
                      <input
                        aria-label="Item Name"
                        type="text"
                        v-model="invoice.line_items_attributes[index].name"
                        :id="`line_item_name_${index}`"
                        class="w-full rounded-md border-mj-purple-gray-1"
                        :class="
                          invoice.line_items_attributes[index]._destroy === 1
                            ? 'line-through bg-mj-lt-gray'
                            : 'bg-white '
                        "
                      />
                    </div>
                    <div class="col-span-3 form-group lg:col-span-1">
                      <label
                        :for="`line_item_quantity_${index}`"
                        class="block mb-2 lg:hidden"
                        >Qty.</label
                      >
                      <input
                        aria-label="Quanity"
                        type="number"
                        v-model="invoice.line_items_attributes[index].quantity"
                        :id="`line_item_quantity_${index}`"
                        class="w-full rounded-md appearance-none border-mj-purple-gray-1"
                        :class="
                          invoice.line_items_attributes[index]._destroy === 1
                            ? 'line-through bg-mj-lt-gray'
                            : 'bg-white '
                        "
                        :disabled="
                          invoice.line_items_attributes[index]._destroy === 1
                        "
                      />
                    </div>
                    <div class="col-span-3 form-group lg:col-span-2">
                      <label
                        :for="`line_item_price_${index}`"
                        class="block mb-2 lg:hidden"
                        >Price</label
                      >
                      <input
                        aria-label="Price"
                        type="number"
                        min="0.01"
                        step="0.01"
                        v-model="invoice.line_items_attributes[index].price"
                        :id="`line_item_price_${index}`"
                        class="w-full rounded-md appearance-none border-mj-purple-gray-1"
                        :class="
                          invoice.line_items_attributes[index]._destroy === 1
                            ? 'line-through bg-mj-lt-gray'
                            : 'bg-white '
                        "
                        :disabled="
                          invoice.line_items_attributes[index]._destroy === 1
                        "
                      />
                    </div>
                    <div
                      class="col-span-3 text-xs lg:col-span-2"
                      aria-label="Total"
                    >
                      <p class="lg:hidden label">Total</p>
                      <p
                        class="flex items-center h-12 mt-2 font-bold lg:mt-0 "
                        :class="
                          invoice.line_items_attributes[index]._destroy === 1
                            ? 'line-through'
                            : ''
                        "
                      >
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
                        v-if="
                          invoice.line_items_attributes[index]._destroy != 1
                        "
                        type="button"
                        class="mt-3 text-xs font-bold lg:mt-0 text-mj-purple-gray-2"
                        aria-label="Delete item"
                        @click.prevent="
                          deleteLineItem(
                            invoice.line_items_attributes[index].id
                          )
                        "
                      >
                        <svg
                          class="w-6 h-6 pointer-events-none"
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
                      <button
                        v-else
                        type="button"
                        class="mt-3 text-xs font-bold lg:mt-0 text-mj-purple-gray-2"
                        aria-label="Reset item"
                        @click.prevent="resetItem(index)"
                      >
                        <svg
                          class="w-6 h-6 pointer-events-none"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="pt-6">
                  <button
                    type="button"
                    class="w-full px-4 py-4 text-xs font-bold text-center rounded-full bg-mj-lt-gray text-mj-purple-gray-3"
                    @click.prevent="addItem()"
                  >
                    + Add New Item
                  </button>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between lg:justify-start">
              <button
                type="button"
                class="px-4 py-4 text-xs font-bold rounded-full lg:py-4 lg:px-6 bg-mj-lt-gray text-mj-purple-gray-3"
                @click.prevent="toggleSidePanel()"
              >
                Discard
              </button>
              <button
                type="submit"
                class="px-4 py-4 text-xs font-bold text-white rounded-full lg:py-4 lg:px-6 bg-mj-purple-1 lg:ml-4"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
    <div>
      <div class="relative z-10 w-full max-w-3xl mx-auto space-y-6 rounded-lg">
        <div class="w-full max-w-screen-xl mx-auto">
          <nuxt-link to="/" class="flex items-center space-x-2">
            <svg
              class="w-6 h-6 text-mj-purple-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="block mt-1 text-sm font-bold">Go Back</span>
          </nuxt-link>
        </div>
        <div
          class="flex justify-between p-6 space-x-6 bg-white rounded-lg lg:p-12"
        >
          <div
            class="flex items-center justify-between w-full space-x-2 lg:w-auto"
          >
            <p>Status</p>
            <p
              class="flex items-center p-2 space-x-1 text-sm font-bold rounded bg-opacity-5"
              :class="statusClass(invoice.status)"
            >
              <span
                aria-hidden="true"
                class="w-2 h-2 bg-current rounded-full"
              ></span>
              <span class="capitalize">{{ invoice.status }}</span>
            </p>
          </div>
          <div class="items-center hidden space-x-4 lg:flex">
            <button
              type="button"
              @click="toggleSidePanel()"
              class="flex items-center px-4 text-sm font-bold rounded-full rounded-ful lg:px-6 bg-mj-lt-gray text-mj-purple-gray-3 h-14"
            >
              Edit
            </button>
            <button
              type="button"
              @click="modalVisibility()"
              class="flex items-center px-4 text-sm font-bold text-white bg-red-500 rounded-full h-14 lg:px-6"
            >
              Delete
            </button>
            <button
              v-if="invoice.status !== 'paid'"
              @click="setAsPaid()"
              type="button"
              class="flex items-center px-4 text-sm font-bold text-white rounded-full h-14 lg:px-6 bg-mj-purple-1"
            >
              Mark as Paid
            </button>
          </div>
        </div>
        <div
          class="p-6 space-y-12 overflow-hidden bg-white rounded-lg shadow lg:p-12 "
        >
          <div
            class="space-y-6 bg-white lg:space-x-6 lg:flex lg:justify-between lg:space-y-0"
          >
            <div class="space-y-1">
              <h1>
                <span class="text-mj-purple-gray-2">#</span
                ><span class="font-bold">{{ invoice.id }}</span>
              </h1>
              <p class="text-sm leading-normal text-mj-purple-gray-2">
                {{ invoice.description }}
              </p>
            </div>
            <div class="text-sm lg:text-right text-mj-purple-gray-2">
              <p class="space-y-1 ">
                <span
                  v-if="invoice.sender_address_attributes.street"
                  class="block"
                  >{{ invoice.sender_address_attributes.street }}</span
                >
                <span
                  v-if="invoice.sender_address_attributes.city"
                  class="block"
                  >{{ invoice.sender_address_attributes.city }}</span
                >
                <span
                  v-if="invoice.sender_address_attributes.state"
                  class="block"
                  >{{ invoice.sender_address_attributes.state }}</span
                >
                <span
                  v-if="invoice.sender_address_attributes.country"
                  class="block"
                  >{{ invoice.sender_address_attributes.country }}</span
                >
                <span
                  v-if="invoice.sender_address_attributes.postalCode"
                  class="block"
                  >{{ invoice.sender_address_attributes.postalCode }}</span
                >
              </p>
            </div>
          </div>
          <div class="grid grid-cols-4 gap-6 lg:grid-cols-7">
            <div class="flex flex-col self-stretch col-span-2 space-y-6">
              <div>
                <h2 class="mb-2 text-sm text-mj-purple-gray-2">Invoice Date</h2>
                <p class="font-bold">
                  {{ $moment(invoice.created_at).format("d MMM YYYY") }}
                </p>
              </div>
              <div>
                <h2 class="mb-2 text-sm text-mj-purple-gray-2">
                  Payment Due
                </h2>
                <p class="font-bold">
                  {{ $moment(invoice.payment_date).format("d MMM YYYY") }}
                </p>
              </div>
            </div>
            <div class="col-span-2">
              <h2 class="mt-auto mb-2 text-sm text-mj-purple-gray-2">
                Bill To
              </h2>
              <p v-if="invoice.client_name" class="mb-1 font-bold">
                {{ invoice.client_name }}
              </p>
              <p class="space-y-1 text-sm text-mj-purple-gray-2">
                <span
                  v-if="invoice.client_address_attributes.street"
                  class="block"
                  >{{ invoice.client_address_attributes.street }}</span
                >
                <span
                  v-if="invoice.client_address_attributes.city"
                  class="block"
                  >{{ invoice.client_address_attributes.city }}</span
                >
                <span
                  v-if="invoice.client_address_attributes.state"
                  class="block"
                  >{{ invoice.client_address_attributes.state }}</span
                >
                <span
                  v-if="invoice.client_address_attributes.country"
                  class="block"
                  >{{ invoice.client_address_attributes.country }}</span
                >
                <span
                  v-if="invoice.client_address_attributes.postalCode"
                  class="block"
                  >{{ invoice.client_address_attributes.postalCode }}</span
                >
              </p>
            </div>
            <div class="col-span-4 lg:col-span-3">
              <h2 class="mt-auto mb-2 text-sm text-mj-purple-gray-2">
                Sent To
              </h2>
              <p class="font-bold truncate">{{ invoice.client_email }}</p>
            </div>
          </div>
          <div class="overflow-hidden rounded-lg bg-mj-lt-gray">
            <div class="p-8">
              <ul class="hidden lg:block lg:mb-8 ">
                <li
                  class="text-xs lg:grid lg:gap-6 lg:grid-cols-9 text-mj-purple-gray-3"
                >
                  <p class="col-span-4 ">Item Name</p>
                  <p class="col-span-1 text-center">QTY.</p>
                  <p class="col-span-2 text-right">Price</p>
                  <p class="col-span-2 text-right">
                    Total
                  </p>
                </li>
              </ul>
              <ul class="space-y-6">
                <li
                  v-for="item in invoice.line_items_attributes"
                  :key="item.id"
                  class="grid items-center grid-cols-2 gap-6 text-sm font-bold lg:grid-cols-9"
                >
                  <div class="lg:col-span-4">
                    <p class="capitalize">{{ item.name }}</p>
                    <p class="lg:hidden text-mj-purple-gray-3">
                      {{ item.quantity }} x ${{ item.price }}
                    </p>
                  </div>
                  <div
                    class="hidden text-center lg:block lg:col-span-1 text-mj-purple-gray-3"
                  >
                    <p class="text-center">
                      {{ item.quantity }}
                    </p>
                  </div>
                  <div
                    class="hidden text-right lg:col-span-2 lg:block text-mj-purple-gray-3"
                  >
                    <p v-if="item.total">${{ item.total.toFixed(2) }}</p>
                  </div>

                  <div class="text-right lg:col-span-2">
                    <p v-if="item.total">${{ item.total.toFixed(2) }}</p>
                  </div>
                </li>
              </ul>
            </div>
            <div
              class="flex items-center justify-between p-4 text-white bg-mj-purple-gray-5 lg:p-6"
            >
              <p class="text-sm">Amount Due</p>
              <p class="text-3xl font-bold">${{ invoice.total.toFixed(2) }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center w-full p-4 space-x-4 lg:hidden">
        <button
          type="button"
          @click="toggleSidePanel()"
          class="flex items-center px-4 text-sm font-bold rounded-full rounded-ful lg:px-6 bg-mj-lt-gray text-mj-purple-gray-3 h-14"
        >
          Edit
        </button>
        <button
          type="button"
          @click="modalVisibility()"
          class="flex items-center px-4 text-sm font-bold text-white bg-red-500 rounded-full h-14 lg:px-6"
        >
          Delete
        </button>
        <button
          v-if="invoice.status !== 'paid'"
          @click="setAsPaid()"
          type="button"
          class="flex items-center px-4 text-sm font-bold text-white rounded-full h-14 lg:px-6 bg-mj-purple-1"
        >
          Mark as Paid
        </button>
      </div>
      <transition name="modalui">
        <div
          v-if="modalVisible"
          class="fixed inset-0 z-20 flex items-center justify-center w-screen h-screen transition-all transform bg-black bg-opacity-20"
        >
          <div
            class="w-full max-w-md p-16 space-y-4 transition-transform transform bg-white rounded-lg shadow-xl content"
          >
            <p class="font-bold">Confirm Deletion</p>
            <p class="text-sm">
              Are you sure you want to delete invoice #{{ invoice.id }}? This
              action cannot be undone.
            </p>
            <div class="flex items-center space-x-4">
              <button
                @click="modalVisibility()"
                class="flex items-center px-4 text-sm font-bold rounded-full rounded-ful lg:px-6 bg-mj-lt-gray text-mj-purple-gray-3 h-14"
              >
                Cancel
              </button>
              <button
                @click="deleteInvoice()"
                class="flex items-center px-4 text-sm font-bold text-white bg-red-500 rounded-full h-14 lg:px-6"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </transition>
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
      return this.invoice.line_items_attributes.reduce(
        (n, { total }) => n + total,
        0
      );
    }
  },
  data() {
    return {
      modalVisible: false,
      showFilter: false,
      sidePaneVisible: false,
      invoice: {}
    };
  },
  methods: {
    // THIS IS A DUPLICATE METHOD FROM index.vue
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
    deleteInvoice() {
      const router = this.$router;
      this.$axios
        .$delete(`/invoices/${this.$route.params.slug}`)
        .then(function() {
          router.push("/");
        });
    },
    addItem() {
      this.invoice.line_items_attributes.push({
        name: "",
        quantity: 0.0,
        price: 0.0
      });
    },
    deleteLineItem(id) {
      let sign = prompt(`Are you sure you want to delete invoice number ${id}`);

      if (sign === "Yes") {
        this.$axios.$delete(`invoices/${this.invoice.id}/line_items/${id}`);
      }
    },
    resetItem(index) {
      this.$set(this.invoice.line_items_attributes[index], "_destroy", 0);
    },
    toggleFilterMenu() {
      this.showFilter = !this.showFilter;
    },
    toggleSidePanel() {
      this.sidePaneVisible = !this.sidePaneVisible;
    },
    modalVisibility() {
      this.modalVisible = !this.modalVisible;
    },
    async submitInvoice() {
      const thisScope = this;
      const invoice = JSON.parse(JSON.stringify(this.invoice));
      const editListItems = invoice.line_items_attributes.filter(
        item => item.id
      );

      const newListItems = invoice.line_items_attributes.filter(
        item => !item.id
      );

      delete invoice.line_items_attributes;

      editListItems.forEach(item => {
        this.$axios({
          method: "post",
          url: `invoices/${thisScope.invoice.id}/line_items/${item.id}.json`,
          headers: {
            "Content-Type": "application/json"
          },
          data: {
            line_item: item
          }
        }).then(function(error) {
          console.log(error);
        });
      });

      newListItems.forEach(item => {
        this.$axios({
          method: "post",
          url: `/invoices/${thisScope.invoice.id}/line_items`,
          headers: {
            "Content-Type": "application/json"
          },
          data: {
            line_item: item
          }
        }).then(function(error) {
          console.log(error);
        });
      });

      await this.$axios
        .$post(`invoices/${this.invoice.id}.json`, {
          headers: {
            "Content-Type": "application/json"
          },
          ...invoice
        })
        .then(function(error) {
          console.log(error);
        });

      thisScope.toggleSidePanel();
    },
    async setAsPaid() {
      await this.$axios.$post(`invoices/${this.invoice.id}.json`, {
        headers: {
          "Content-Type": "application/json"
        },
        invoice: {
          status: "paid"
        }
      });
    },
    saveDraft() {
      alert("Saving Draft, but not really...");
    }
  }
};
</script>

<style scoped>
.faded-enter-active {
  transition: all 0.15s ease;
}
.faded-leave-active {
  transition: all 0.3s ease;
}
.faded-enter,
.faded-leave-to {
  @apply bg-opacity-25;
}

.faded-enter-active .content {
  transition: all 0.15s ease;
}
.faded-leave-active .content {
  transition: all 0.3s ease;
}
.faded-enter .content,
.faded-leave-to .content {
  @apply -translate-x-full;
}

.modalui-enter-active {
  transition: all 0.4s ease;
}
.modalui-leave-active {
  transition: all 0.4s ease;
}
.modalui-enter,
.modalui-leave-to {
  @apply bg-opacity-40;
}

.modalui-enter-active .content {
  transition: all 0.4s ease;
}
.modalui-leave-active .content {
  transition: all 0.3s ease;
}
.modalui-enter .content,
.modalui-leave-to .content {
  @apply -translate-y-12;
}

label,
.label {
  @apply mb-2 text-xs text-mj-purple-gray-3;
}

.default-form label,
.default-form .label {
  @apply block;
}
input:not([type="checkbox"]):not([type="radio"]) {
  @apply text-xs font-bold text-mj-dk-gray h-12 px-5;
}
</style>
