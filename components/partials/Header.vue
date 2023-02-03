<template>
  <!--=====================================
		HEADER PRINCIPAL
  ======================================-->
  <div class="bg-blue-800 p-4 px-16 mx-auto flex items-center justify-between">
    <nuxt-link to="/">
      <h3 class="text-3xl font-bold text-white">Ordenes<span class="font-normal text-green-300">Ventas</span></h3>
      <p class="text-white">{{ $laravel.getRoles()[0] }} <span
        class="font-bold text-green-200">{{ $auth.user.name }}</span></p>
    </nuxt-link>
    <nav class="my-5 text-sm md:flex md:items-center md:gap-10 font-bold text-white">
      <nuxt-link v-role="'Administrador'" to="/users" class="cursor-pointer">Usuarios</nuxt-link>
      <nuxt-link v-role="'Administrador'" to="/roles" class="cursor-pointer">Roles</nuxt-link>
      <a href="" v-role="'Administrador'" class="cursor-pointer">Clientes</a>
      <nuxt-link v-role:any="'Administrador|Empleado'" to="/products">Productos</nuxt-link>
      <nuxt-link v-role="'Cliente'" to="/" class="cursor-pointer">Tienda</nuxt-link>
      <ul class="list-none">
        <li>
          <div class="dropdown inline-block relative">
            <button class="text-white font-semibold block  pr-3 text-whit inline-flex items-center">
              <span class="mr-1">Ordenes</span>
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </button>
            <ul class="dropdown-menu absolute hidden text-gray-700 pt-1">
              <li class="">
                <nuxt-link to="/orders"
                           class="rounded-t bg-white hover:bg-green-400 hover:text-white py-2 px-4 block whitespace-no-wrap">
                  Listar
                </nuxt-link>
              </li>
              <li class="" v-role="'Cliente'">
                <nuxt-link to="/"
                           class="bg-white hover:bg-green-400 hover:text-white py-2 px-4 block whitespace-no-wrap">Crear
                </nuxt-link>
              </li>
            </ul>
          </div>
        </li>
      </ul>

      <!--=====================================
          COMPONENTE CARRITO
      ======================================-->
      <Cart v-role="'Cliente'"/>
      <!--=====================================
		    BOTÓN CERRAR SESIÓN
      ======================================-->
      <button @click="logout"
              class="bg-gray-100 text-blue-800 py-2 px-10 rounded-lg hover:bg-green-500 hover:text-white focus:ring-4 focus:ring-green-600 transition focus:outline-none">
        Cerrar Sesión
      </button>
    </nav>
  </div>
</template>

<script>
import {subscriberMQTT} from "../../plugins/mqtt";

export default {
  name: "Header",
  methods: {

    async logout() {
      await this.$auth.logout()
      await this.$router.push('auth/login');
    },
    newOrder(){
      if (this.$auth.user.roles[0].name === 'Administrador'){
        subscriberMQTT("new-order", 'new-order-sale', (data) => {
          console.log('llega esto: ', data)
        });
      }
    }
  },
  mounted() {
    // this.newOrder()
  }
}
</script>

<style scoped>
.dropdown:hover .dropdown-menu {
  display: block !important;
}
</style>
