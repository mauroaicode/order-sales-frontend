<template>
  <div>
    <div>
      <TableOrders :orders="orders"/>
    </div>
    <div v-if="exist">
      <h2 class="text-2xl text-center">No hay ordenes creadas</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "Orders",
  data() {
    return {
      exist: false,
      orders: [],
    }
  },
  methods: {
    getOrders() {
      this.$axios.get(`api/v1/get-orders`).then(resp => {
        this.orders = resp.data.data
      }).catch(e => {
        console.log(e)
        if (e.response.status === 401) {
          this.exist = true
          this.$toast.error(e.response.data[0]);
        } else {
          this.$toast.error("Error al obtener las ordenes de compra. Consulte al administrador.");
        }
      })
    }
  },
  mounted() {
    this.getOrders()
  }
}
</script>

<style scoped>

</style>
