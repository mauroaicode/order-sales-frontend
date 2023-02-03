<template>
  <div>
    <!--=====================================
		          TABLA ORDENES DE COMPRA
      ======================================-->
    <div class="my-5" v-if="orders && orders.length > 0">
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
        <div class="table-pagination mt-2" v-if="orders.length > 10">
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
    <!--=====================================
		    MODAL PARA MOSTRAR LA ORDEN DE COMPRA
       ======================================-->
    <ShowOrder ref="showOrder"/>
  </div>
</template>

<script>
export default {
  name: "TableOrders",
  data() {
    return {
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
          field: "customer",
          key: "customer",
          title: "Cliente",
          align: "left"
        },
        {
          field: "purchase_date",
          key: "purchase_date",
          title: "Fecha de Entrega",
          align: "left"
        },
        {
          field: "created_at",
          key: "created_at",
          title: "Fecha de Registro",
          align: "left"
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
                  on-click={() => this.openModalShowOrder(row)}
                  type="button"
                  class="text-white bg-blue-800 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm p-2.5 text-center inline-flex items-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                       stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
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
  props: ['orders'],
  methods: {
    /*=============================================
     ABRIR MODAL MOSTRAR ORDEN DE COMPRA
    =============================================*/
    openModalShowOrder(order) {
      this.$refs.showOrder.fcOpenModal(order)
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
     PASAR LOS DATOS ROLES A LA TABLA
    =============================================*/
    tableData() {
      const {pageIndex, pageSize} = this;
      return this.orders.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
    },
    /*=============================================
     CANTIDAD DE ROLES
    =============================================*/
    totalCount() {
      return this.orders.length;
    },
  },
}
</script>

<style scoped>

</style>
