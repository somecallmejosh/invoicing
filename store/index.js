import Vue from "vue";
export const state = () => ({
  invoices: [],
  currentInvoice: []
});

export const getters = {
  getInvoice: state => slug => {
    return state.invoices.filter(
      invoice => invoice.id.toString() === slug.toString()
    );
  },
  getCurrentInvoice: state => {
    return state.currentInvoice;
  }
};

export const mutations = {
  setInvoices(state, payload) {
    state.invoices = payload;
  },
  setCurrentInvoice(state, payload) {
    state.currentInvoice = payload;
  }
};

export const actions = {
  async getInvoices({ commit }) {
    const invoices = await this.$axios.$get("/invoices.json");
    commit("setInvoices", invoices);
  },

  async getCurrentInvoice({ commit }, slug) {
    const invoice = await this.$axios.$get(`/invoices/${slug}.json`);
    commit("setCurrentInvoice", invoice);
  }
};
