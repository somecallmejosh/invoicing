import Vue from "vue";
export const state = () => ({
  invoices: []
});

export const getters = {
  getInvoice: state => slug => {
    return state.invoices.filter(
      invoice => invoice.id.toString() === slug.toString()
    );
  }
};

export const mutations = {
  setInvoices(state, payload) {
    state.invoices = payload;
  }
};

export const actions = {
  async getInvoices({ commit }) {
    const invoices = await this.$axios.$get("/invoices.json");
    commit("setInvoices", invoices);
  }
};
