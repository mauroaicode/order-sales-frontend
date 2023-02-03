<template>
  <div>
    <div v-if="orders && orders.length > 0">
      <TableOrders :orders="orders"/>
    </div>
    <div v-if="exist">
      <h2 class="text-2xl text-center">No hay ordenes creadas</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrdersCustomer",
  data() {
    return {
      exist: false,
      orders: [],
    }
  },
  methods: {
    getOrdersCustomer() {
      this.$axios.get(`api/v1/get-orders/customer/${this.$auth.user.customer.id}`).then(resp => {
        this.orders = resp.data.data
      }).catch(e => {
        console.log(e)
        if (e.response.status === 401) {
          this.exist = true
          this.$toast.error(e.response.data[0]);
        } else {
          this.$toast.error("Error al obtener las ordenes de compra del cliente. Consulte al administrador.");
        }

      })
    }
  },
  mounted() {
    if (this.$auth.user.roles[0].name === 'Cliente') {
      this.getOrdersCustomer()
    }
  }
}
</script>

<style scoped>

</style>
