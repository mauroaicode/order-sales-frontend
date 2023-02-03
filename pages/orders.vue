<template>
  <div class="px-16 py-6">
    <div class="bg-white  rounded-md cursor-pointer p-10 w-full mt-4">
      <div class="flex items-center justify-between">
        <h2 class="font-bold text-3xl"> Ordenes de Compra</h2>
      </div>
      <!--=====================================
		          ORDENES DE COMPRA DEL CLIENTE
      ======================================-->
      <div v-if="$auth.user.roles[0].name === 'Cliente'">
        <OrdersCustomer/>
      </div>
      <!--=====================================
		          ORDENES DE COMPRA PARA MOSTRAR AL ADMIN Y EL EMPLEADO
      ======================================-->
      <div v-else>
        <Orders/>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: "orders",
}
</script>

<style scoped>

</style>
