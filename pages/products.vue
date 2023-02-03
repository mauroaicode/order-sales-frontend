<template>
  <div class="px-16 py-6">
    <div class="bg-white  rounded-md cursor-pointer p-10 w-full mt-4">
      <div class="flex items-center justify-between">
        <h2 class="font-bold text-3xl"> Productos</h2>
        <button @click="openModal" type="button"
                class="text-white bg-blue-800 hover:bg-green-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none">
          Agregar Producto
        </button>
      </div>
      <!--=====================================
            TABLA DE PRODUCTOS
     ======================================-->
      <div class="my-5" v-if="products && products.length > 0">
        <client-only>
          <ve-table
            class="table-auto"
            id="loading-container"
            :row-style-option="rowStyleOption"
            fixed-header
            :border-y="true"
            :max-height="500"
            row-key-field-name="id"
            :columns="columnsTable"
            :table-data="tableData"/>
          <div class="table-pagination mt-2" v-if="products.length > 10">
            <ve-pagination
              :total="totalCount"
              :page-index="pageIndex"
              :page-size="pageSize"
              @on-page-number-change="pageNumberChange"
              @on-page-size-change="pageSizeChange"
            />
          </div>
        </client-only>
      </div>
      <div v-if="exist">
        <h2 class="text-2xl text-center">No hay usuarios registrados</h2>
      </div>
      <!--=====================================
		          MODAL PARA AGREGAR PRODUCTO
       ======================================-->
      <FormProduct ref="addProduct" @updateTable="updateTable"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "products",
  middleware: ['auth'],
  data() {
    return {
      exist: false,
      products: [],
      /* Diseño de la tabla*/
      rowStyleOption: {
        stripe: true,
        hoverHighlight: true,
      },
      /* Opciones de la tabla*/
      columnsTable: [
        {
          field: "",
          key: "a",
          title: "#",
          align: "center",
          renderBodyCell: ({row, column, rowIndex}, h) => {
            return ++rowIndex;
          },
        },
        {
          field: "name",
          key: "name",
          title: "Nombre Producto",
          align: "left",
          renderBodyCell: ({row, column, rowIndex}, h) => {
            return <div class="flex items-center">
              <div class="border mr-2">
                <img class="object-cover h-10 w-10" src={row.picture ? this.$config.baseUrlBack + row.picture : require(`~/assets/images/image-demo.png`)} alt={row.name}/>
              </div>
              <div>
                <h3>{row.name}</h3>
              </div>
            </div>
          },
        },
        {
          field: "description",
          key: "description",
          title: "Descripción",
          align: "left",
          width: "40%",
        },
        {
          field: "price",
          key: "price",
          title: "Precio",
          align: "left",
          renderBodyCell: ({row, column, rowIndex}, h) => {
              return <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">${row.price}</span>
          },
        },
        {
          field: "created_at",
          key: "created_at",
          title: "Fecha de Registro",
          align: "left",

        },
        {
          field: "actions",
          key: "actions",
          title: "Acciones",
          align: "left",
          renderBodyCell: ({row, column, rowIndex}, h) => {
            let html = <div class="flex">
              <div>
                <button
                  on-click={() => this.editProduct(row)}
                  type="button"
                  class="text-white bg-blue-800 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-600 font-medium rounded-md text-sm p-2.5 text-center inline-flex items-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                       stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"/>
                  </svg>

                  <span class="sr-only">Icon description</span>
                </button>
              </div>
              <div>
                <button
                  on-click={() => this.deleteProduct(row.id)}
                  type="button"
                  class="text-white bg-red-500 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-md text-sm p-2.5 text-center inline-flex items-center mr-2 ">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                       stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                  </svg>
                  <span class="sr-only">Icon description</span>
                </button>
              </div>
            </div>
            return html
          },
        },
      ],
      pageIndex: 1,
      pageSize: 20,
    }
  },
  methods: {
    /*=============================================
     FUNCIÓN PARA  ENVIAR DATOS Y ABRIR MODAL EDITAR
    =============================================*/
    editProduct(product) {
      this.$refs.addProduct.fcOpenModalEdit(product)
    },
    /*=============================================
     FUNCIÓN PARA ABRIR MODAL AGREGAR PRODUCTO
    =============================================*/
    openModal() {
      this.$refs.addProduct.fcOpenModal()
    },
    /*=============================================
     FUNCIÓN PARA ACTUALIZAR LOS DATOS DE LA TABLA LUEGO DE GUARDAR O EDITAR
    =============================================*/
    updateTable() {
      this.getProducts()
    },
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
    /*=============================================
     FUNCIÓN PARA ELIMINAR EL PRODUCTO
    =============================================*/
    deleteProduct(id) {
      /* Confirmamos la acción*/
      this.$swal.fire(
        {
          title: '¿Esta seguro de eliminar el producto?',
          icon: 'warning',
          confirmButtonText: 'Estoy Seguro',
          cancelButtonText: 'Cancelar',
          customClass: {
            confirmButton: 'text-white bg-blue-700 w-full hover:bg-green-500 focus:ring-1 focus:ring-green-600font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2',
            cancelButton: 'text-white bg-gray-700 w-full hover:bg-gray-800 focus:ring-1 focus:ring-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
          },
          buttonsStyling: false,
          showCancelButton: true,
          reverseButtons: true,
          allowOutsideClick: false,
        }
      ).then(async result => {
        if (result.value) {
          /* Componente Loading*/
          this.$vs.loading({
            color: this.$config.colorLoading,
            text: 'Espere por favor...'
          })
          /* Eliminamos el usuario*/
          this.$axios.post(`api/v1/delete-product/${id}`).then(resp => {
            this.$vs.loading.close() // Cerrar el Loading
            this.$toast.success('Producto eliminado exitosamente!');
            this.getUsers()
          }).catch(e => {
            /* Capturamos el error y lo guardamos en consola para verlo*/
            this.$vs.loading.close() // Cerrar el Loading
            console.log(e.response)

            this.$toast.error('Error al eliminar el producto. Consulte al administrador');
          })
        }
      })
    },
    /*=============================================
     FUNCIÓN QUE PERMITE LA FUNCIÓN DE PAGINAR
    =============================================*/
    pageNumberChange(pageIndex) {
      this.pageIndex = pageIndex;
    },

    pageSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
    },
  },
  computed: {
    /*=============================================
     PASAR LOS DATOS DEL USUARIO A LA TABLA
    =============================================*/
    tableData() {
      const {pageIndex, pageSize} = this;
      return this.products.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
    },
    /*=============================================
     CANTIDAD DE USUARIOS
    =============================================*/
    totalCount() {
      return this.products.length;
    },
  },
  mounted() {
    this.getProducts()
  }
}
</script>

<style scoped>

</style>
