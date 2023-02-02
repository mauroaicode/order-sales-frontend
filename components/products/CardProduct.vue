<template>
  <div>
    <div
      class="bg-white shadow rounded-lg cursor-pointer hover:bg-teal-50 hover:shadow-md hover:shadow-teal-100 hover:transition-shadow">
      <!--  Imagen  -->
      <img class="object-cover h-72 w-full" :src="product.picture" :alt="`character-${product.product_name}`">
      <div class="p-5 space-y-3">
        <!--  Nombre & Precio -->
        <div class="flex justify-between items-center">
          <h3 class="text-2xl font-bold truncate text-gray-700">{{ product.product_name }}</h3>
          <span class="bg-teal-100 text-teal-700 text-xs font-medium px-2.5 py-0.5 rounded">{{ product.price }}</span>
        </div>
        <!--  Description  -->
        <span class="text-teal-600 font-bold"> {{ product.product_description }}</span>
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-5 h-5 text-gray-400">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardProduct",
  props: ['product']
}
</script>

<style scoped>

</style>
