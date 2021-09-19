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
          <edit-invoice />
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
              v-if="invoice.status !== 'paid'"
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
          v-if="invoice.status !== 'paid'"
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
import editInvoice from "~/components/forms/editInvoice.vue";
export default {
  components: { editInvoice },
  async asyncData({ store, params }) {
    await store.dispatch("getCurrentInvoice", params.slug);
  },
  computed: {
    invoice() {
      return this.$store.state.currentInvoice;
    },
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
      sidePaneVisible: false
    };
  },
  methods: {
    deleteInvoice() {
      const router = this.$router;
      this.$axios
        .$delete(`/invoices/${this.$route.params.slug}`)
        .then(function() {
          router.push("/");
        });
    },
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

    toggleSidePanel() {
      this.sidePaneVisible = !this.sidePaneVisible;
    },
    modalVisibility() {
      this.modalVisible = !this.modalVisible;
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
