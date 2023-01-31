<template>
  <!--=====================================
		HEADER PRINCIPAL
  ======================================-->
  <div class="bg-blue-700 p-4 px-16 mx-auto  flex items-center justify-between">
    <nuxt-link to="/characters">
      <h3 class="text-3xl font-bold text-white">Ordenes<span class="font-normal">Ventas</span></h3>
    </nuxt-link>
    <nav class="my-5 text-sm md:flex md:items-center md:gap-10 font-bold text-white">
      <a href="">Usuarios</a>
      <a href="">Roles</a>
      <a href="">Clientes</a>
      <a href="">Productos</a>
      <a href="">Ordenes</a>
      <a href="" @click="logout" class="bg-gray-100 text-blue-700 py-2 px-10 rounded-lg hover:bg-blue-500 hover:text-white focus:ring-4 focus:ring-blue-300 transition focus:outline-none">Cerrar Sesión</a>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods:{
    async logout(){
      await this.$auth.logout()
    }
  }
}
</script>

<style scoped>

</style>
