<template>
  <div>
    <div @click="openCart"
         class="font-sans block mt-4 lg:inline-block lg:mt-0 lg:ml-6 align-middle text-white hover:text-green-300">
      <a href="#" role="button" class="relative flex">
        <svg class="flex-1 w-6 h-6 fill-current" viewbox="0 0 24 24">
          <path
            d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z"/>
        </svg>
        <span
          class="absolute right-0 -top-1 rounded-full bg-red-500 w-4 h-4  p-0 m-0 text-white text-sm leading-snug text-center"
          style="line-height: 1.2">{{ products ? products.length : 0 }}
    </span>
      </a>
    </div>
    <vs-sidebar position-right parent="body" default-index="1" color="primary" class="sidebarx" spacer v-model="active">
      <!--    Header Carrito    -->
      <div class="p-5">
        <div class="flex justify-between">
          <h3 class="block text-sm text-gray-500 mb-3 font-bold">RESUMEN ORDEN DE COMPRAS</h3>
          <svg @click="active = false" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer hover:text-green-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </div>
      </div>
      <hr>
      <!--    Contenido Carritp    -->
      <div v-if="products && products.length > 0" class="p-3 mt-3">
        <div v-for="(product, index) in products" :key="product.id">
          <div>
            <div class="flex justify-between mb-3 p-3 bg-gray-100">
              <div class="flex">
                <div>
                  <img class="w-20 h-20 object-cover border"
                       :src="product.picture ? $config.baseUrlBack + product.picture : require(`~/assets/images/image-demo.png`)"
                       :alt="product.name">
                </div>
                <div class="ml-2 space-y-1">
                  <p>{{ product.name }}</p>
                  <p class="text-gray-400 text-sm">{{ product.quantity }}x <span
                    class="bg-green-100 text-1xl text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">${{
                      parseInt(product.price) * parseInt(product.quantity) | currency
                    }}</span></p>
                </div>
              </div>
              <div>
                <svg @click="removeProduct(index)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     stroke-width="1.5" stroke="currentColor" class="w-5 h-5 cursor-pointer hover:text-green-500">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="flex items-center justify-center mt-5">
        <h3 class="text-gray-400 py-2">No hay productos agregados.</h3>
      </div>
      <!--    Footer Carrito    -->
      <div class="footer-sidebar p-5" slot="footer" v-if="products && products.length > 0">
        <div class="flex justify-between">
          <h3 class="block text-sm text-gray-500 mb-3 font-bold">TOTAL</h3>
          <p class="text-green-500">${{ totalCart | currency }}</p>
        </div>
        <button
          @click="createOrder"
          class="text-white w-full bg-blue-800 hover:bg-green-500 focus:ring-4 focus:ring-green-600 font-medium rounded-sm text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none">
          GENERAR ORDEN DE COMPRA
        </button>
      </div>
    </vs-sidebar>
  </div>
</template>

<script>
import {bus} from "../plugins/bus";
import ConfirmOrder from "./ConfirmOrder";
import {publishMQTT} from "../plugins/mqtt";

export default {
  name: "Cart",
  data() {
    return {
      active: false,
      total: 0,
      products: [],
    }
  },
  methods: {
    openConfirmOrder(products) {
      this.active = false
      this.$FModal.show(
        {
          component: ConfirmOrder,
          clickToClose: true,
          escToClose: true,
          placement: 'center top',
        },
        {
          products: products,
        }
      )
    },
    calculateDate(){
      let fecha = new Date();
      let dias = 3; // Número de días a agregar
      fecha.setDate(fecha.getDate() + dias);
      return fecha
    },
    createOrder() {
      /* Confirmamos la acción*/
      let form = {
        products: this.products,
        total: this.totalCart,
        customerId: this.$auth.user.customer.id,
        date: this.calculateDate()
      }
      this.$swal.fire(
        this.swalAlert('¿Esta seguro de crear la orden de compra?', 'warning', 'Estoy Seguro', 'Cancelar')
      ).then(result => {
        if (result.value) {
          /* Componente Loading*/
          this.$vs.loading({
            color: this.$config.colorLoading,
            text: 'Espere por favor...'
          })
          this.$axios.post('/api/v1/create-order', form).then(resp => {
            this.$vs.loading.close() // Cerrar el Loading
            this.$toast.success('Orden de compra creada exitosamente!');
            this.active = false
            this.products = []
            publishMQTT('new-order-sale', this.$auth.user.name)
            this.openConfirmOrder(form)
          }).catch(e => {
            this.$vs.loading.close()
            console.log(e.response);
            this.$toast.error('Error al crear la orden de compra. Consulte al administrador');
          })
        }
      })
    },
    removeProduct(index) {
      this.products.splice(index, 1)
    },
    openCart() {
      this.active = true
    },
    /*=============================================
    FUNCIÓN PARA LAS OPCIONES DE LA ALERTA DE CONFIRMACIÓN
   =============================================*/
    swalAlert(message, icon, textAccept, textCancel) {
      return {
        title: message,
        icon: icon,
        confirmButtonText: textAccept,
        cancelButtonText: textCancel,
        customClass: {
          confirmButton: 'text-white bg-blue-700 w-full hover:bg-green-500 focus:ring-1 focus:ring-green-600 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2',
          cancelButton: 'text-white bg-gray-700 w-full hover:bg-gray-800 focus:ring-1 focus:ring-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
        },
        buttonsStyling: false,
        showCancelButton: true,
        reverseButtons: true,
        allowOutsideClick: false,
      }
    }
  },
  computed: {
    /*=============================================
     CALCULAR EL VALOR TOTAL
    =============================================*/
    totalCart() {
      this.total = 0
      this.products.map(pro => {
        this.total += (pro.price * pro.quantity)
      });
      return this.total
    },
  },
  mounted() {
    setTimeout(() => {
      bus.$on('addProduct', (product) => {
        let exist = false
        exist = this.products.some(pro => {
          return pro.id === product.id
        })
        if (!exist) this.products.push(product)
        this.active = true
      })
    }, 1000)

  }
}
</script>

<style scoped>
</style>
