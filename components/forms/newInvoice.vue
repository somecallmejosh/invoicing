<template>
  <h1>Data</h1>
</template>

<script>
export default {
  data() {
    return {
      invoice: {
        description: "",
        client_email: "",
        client_name: "",
        payment_date: "",
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
        }
      }
    };
  }
};
</script>

<style></style>
