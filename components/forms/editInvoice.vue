<template>
  <div>
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
            <label for="lient_address_attributes_post_code">Post Code</label>
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
          <div v-for="(item, index) in listItems" :key="index">
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
                  v-model="listItems[index].name"
                  :id="`line_item_name_${index}`"
                  class="w-full bg-white rounded-md border-mj-purple-gray-1"
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
                  v-model="listItems[index].quantity"
                  :id="`line_item_quantity_${index}`"
                  class="w-full bg-white rounded-md appearance-none border-mj-purple-gray-1"
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
                  v-model="listItems[index].price"
                  :id="`line_item_price_${index}`"
                  class="w-full bg-white rounded-md appearance-none border-mj-purple-gray-1"
                />
              </div>
              <div class="col-span-3 text-xs lg:col-span-2" aria-label="Total">
                <p class="lg:hidden label">Total</p>
                <p class="flex items-center h-12 mt-2 font-bold lg:mt-0 ">
                  {{
                    (
                      listItems[index].price * listItems[index].quantity
                    ).toFixed(2)
                  }}
                </p>
              </div>
              <div class="flex items-center col-span-1">
                <button
                  type="button"
                  class="mt-3 text-xs font-bold lg:mt-0 text-mj-purple-gray-2"
                  aria-label="Delete item"
                  @click.prevent="deleteLineItem(index, item.id, item.name)"
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
              </div>
            </div>
          </div>
          <div class="pt-6">
            <button
              type="button"
              class="w-full px-4 py-4 text-xs font-bold text-center rounded-full bg-mj-lt-gray text-mj-purple-gray-3"
              @click="addItem()"
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
</template>

<script>
export default {
  async asyncData({ store, params }) {
    await store.dispatch("getCurrentInvoice", params.slug);
  },
  computed: {
    invoice() {
      const invoice = JSON.parse(
        JSON.stringify(this.$store.state.currentInvoice)
      );
      return invoice;
    }
  },
  data() {
    return {
      listItems: {}
    };
  },
  methods: {
    addItem() {
      this.listItems.push({
        name: "",
        quantity: 0.0,
        price: 0.0
      });
    },
    deleteLineItem(index, id, name) {
      let sign = confirm(
        `Are you sure you want to delete the following line item: "${name}"`
      );

      if (sign) {
        this.listItems.splice(index, 1);
        this.$axios.$delete(`invoices/${this.invoice.id}/line_items/${id}`);
        this.$store.dispatch("getCurrentInvoice", this.$route.params.slug);
      }
    },
    async submitInvoice() {
      const thisScope = this;
      const invoice = JSON.parse(JSON.stringify(this.invoice));
      const editListItems = this.listItems.filter(item => item.id);

      const newListItems = this.listItems.filter(item => !item.id);

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

      this.$store.dispatch("getCurrentInvoice", this.$route.params.slug);
    }
  },
  mounted() {
    this.listItems = this.invoice.line_items_attributes;
  }
};
</script>

<style></style>
