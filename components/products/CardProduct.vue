<template>
  <div>
    <div
      class="bg-white shadow rounded-lg cursor-pointer hover:bg-teal-50 hover:shadow-md hover:shadow-teal-100 hover:transition-shadow">
      <!--  Imagen  -->
      <img class="object-cover h-35 w-35 w-full"
           :src="product.picture ? $config.baseUrlBack + product.picture : require(`~/assets/images/image-demo.png`)"
           :alt="product.name">
      <div class="p-5 space-y-3">
        <!--  Nombre & Precio -->
        <div class="flex justify-between items-center">
          <h3 class="text-lg  font-bold truncate text-gray-700">{{ product.name }}</h3>
          <span
            class="bg-green-100 text-1xl text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">${{
              product.price | currency
            }}</span>
        </div>
        <!--  Description  -->
        <span class="text-gray-500"> {{ product.description }}</span>
        <div class="flex items-center justify-between">
          <div class="mt-1">
            <button @click="addCart(product)" type="button"
                    class="text-white bg-blue-800 hover:bg-green-500 focus:ring-4 focus:ring-green-600 font-medium rounded-md text-sm px-3 py-2.5 mr-2 mb-2 focus:outline-none">
              Agregar al Carrito
            </button>
          </div>
          <div class="p-2">
            <NumberInputSpinner
              :min="1"
              :max="10"
              :step="1"
              :integerOnly="false"
              v-model="product.quantity"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {bus} from "../../plugins/bus";

export default {
  name: "CardProduct",
  props: ['product'],
  methods: {
    addCart(product) {
      bus.$emit('addProduct', product)
    }
  }
}
</script>

<style scoped>

</style>
