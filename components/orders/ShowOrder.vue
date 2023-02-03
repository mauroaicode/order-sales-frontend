<template>
  <div class="show-order">
    <vs-popup :title="`Orden de Compra #${order.id}`" :active.sync="openModal">
      <div class="py-5 px-4">
        <div class="text-center">
          <h1 class="text-2xl font-bold">Orden de Compra #{{ order.id }}</h1>
        </div>
        <div class="py-5 px-3 bg-gray-50">
           Orden de compra creada el <span
          class="text-green-500 font-bold">{{ $moment(order.created_at).format('LL') }}</span>, será enviada el dia <span
          class="text-green-500 font-bold">{{ $moment(order.purchase_date).format('LL') }}.</span>
        </div>
        <div class="mt-5">
          <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th class="px-6 py-3">#</th>
              <th class="px-6 py-3">Producto</th>
              <th class="px-6 py-3">Cantidad</th>
              <th class="text-center px-6 py-3">Valor Unitario $</th>
              <th>Total $</th>
            </tr>
            </thead>
            <tbody>
            <tr class="bg-white border-b" v-for="(product, index) in order.products" :key="product.id">
              <td class="text-center">{{ index + 1 }}</td>
              <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{{ product.product.product_name }}</td>
              <td class="text-center px-1 py-4">{{ product.quantity }}</td>
              <td class="text-center px-6 py-4">${{ product.product.price | currency }}</td>
              <td class="px-3 py-4">${{ parseInt(product.product.price) * parseInt(product.quantity) | currency }}</td>
            </tr>
            </tbody>
            <tfoot>
            <tr class="font-semibold text-gray-900 ">
              <th></th>
              <th></th>
              <th></th>
              <th scope="row" class="px-6 py-3 text-base float-right">Total</th>
              <td class="px-6 py-3">${{ order.total | currency }}</td>
            </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </vs-popup>
  </div>
</template>

<script>
export default {
  name: "ShowOrder",
  data(){
    return{
      openModal: false,
      order: {
        purchase_date: null,
        total: null,
        products: null
      },
    }
  },
  methods:{
    fcOpenModal(order){
      this.order = order
      this.openModal = true
    }
  }
}
</script>

<style scoped>
.show-order .con-vs-popup .vs-popup{
  width: 700px !important;
}
</style>
