<template>
  <!--=====================================
		HEADER PRINCIPAL
  ======================================-->
  <div class="bg-blue-800 p-4 px-16 mx-auto  flex items-center justify-between">
    <nuxt-link to="/">
      <h3 class="text-3xl font-bold text-white">Ordenes<span class="font-normal text-green-300">Ventas</span></h3>
    </nuxt-link>
    <nav class="my-5 text-sm md:flex md:items-center md:gap-10 font-bold text-white">
      <nuxt-link v-role="'Administrador'" to="/users" class="cursor-pointer">Usuarios</nuxt-link>
      <nuxt-link v-role="'Administrador'" to="/roles" class="cursor-pointer">Roles</nuxt-link>
      <a href="" v-role="'Administrador'" class="cursor-pointer">Clientes</a>
      <nuxt-link v-role="'Administrador'" to="/products">Productos</nuxt-link>
      <nuxt-link v-role="'Cliente'" to="/" class="cursor-pointer">Tienda</nuxt-link>
      <a href="">Ordenes</a>
      <Cart/>
      <button @click="logout" class="bg-gray-100 text-blue-800 py-2 px-10 rounded-lg hover:bg-green-500 hover:text-white focus:ring-4 focus:ring-green-600 transition focus:outline-none">Cerrar Sesión</button>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods:{

    async logout(){
      await this.$auth.logout()
      await this.$router.push('auth/login');
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
