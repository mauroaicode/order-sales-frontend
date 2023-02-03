<template>
  <div>
    <h2 class="font-bold text-4xl"> Tienda</h2>
    <div  class="grid grid-cols-1 md:grid-cols-4 gap-5 mt-10">
      <div v-for="product in products" :key="product.id">
        <CardProduct :product="product"/>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Shop",
  data(){
    return{
      products: []
    }
  },
  methods:{
    /*=============================================
    FUNCIÓN PARA OBTENER TODOS LOS PRODUCTOS
   =============================================*/
    getProducts() {
      this.$axios.get('api/v1/get-products').then(resp => {
        this.products = resp.data.data
        this.products.length > 0 ? this.exist = false : this.exist = true // Nos permite saber si tenemos usuarios registrados
      }).catch(e => {
        this.exist = true
        console.log(e)
        this.$toast.error("Error al obtener los productos. Consulte al administrador.");
      })
    },
  },
  mounted() {
    this.getProducts()
  }
}
</script>

<style scoped>

</style>
