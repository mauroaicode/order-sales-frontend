<template>
  <div>
    <vs-popup :title="!editProduct ? 'Agregar Producto' : 'Editar Producto'" :active.sync="openModal">
      <div class="py-5 px-4">
        <form action="" class="space-y-5">
          <!--  Input Nombre   -->
          <div>
            <label
              for="nameProduct"
              class="block text-sm text-gray-500 mb-3 font-bold"
              :class="{ 'text-red-500': $v.form.name.$error }"
            >Nombre Producto <span class="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="nameProduct"
              id="nameProduct"
              v-model="form.name"
              :class="[{ 'border-red-300': $v.form.name.$error }]"
              class="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
              placeholder="Nombre producto"
            >
            <p
              class="text-red-400 font-bold"
              v-if="$v.form.name.$error">
              El nombre es requerido.
            </p>
          </div>
          <!--  Input Precio   -->
          <div>
            <label
              for="price"
              class="block text-sm text-gray-500 mb-3 font-bold"
              :class="{ 'text-red-500': $v.form.price.$error }"
            >Precio <span class="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="price"
              id="price"
              v-model="form.price"
              :class="[{ 'border-red-300': $v.form.price.$error }]"
              class="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
              placeholder="Precio"
            >
            <p
              class="text-red-400 font-bold"
              v-if="$v.form.price.$error">
              El precio es requerido.
            </p>
          </div>
          <!--  Input Descripción   -->
          <div>
            <label
              for="description"
              class="block text-sm text-gray-500 mb-3 font-bold"
              :class="{ 'text-red-500': $v.form.description.$error }"
            >Descripción <span class="text-red-400">*</span>
            </label>
            <textarea
              :class="[{ 'border-red-300': $v.form.description.$error }]"
              name="description"
              placeholder="Descripción"
              class="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
              rows="4"
              v-model="form.description">
            </textarea>
            <p
              class="text-red-400 font-bold"
              v-if="$v.form.description.$error">
              La descripción es requerida.
            </p>
          </div>

          <div>
            <label
              for="image"
              class="block text-sm text-gray-500 mb-3 font-bold"
            >Imagen del Producto
            </label>
            <div v-if="editProduct" class="my-4">
              <h5 class="text-blue-800 hover:text-green-500 cursor-pointer" @click="editImageProduct">
                {{ editImage ? 'Cancelar' : 'Cambiar Imagen' }}</h5>
            </div>
            <!--  Imagen del Producto   -->
            <div v-if="editProduct" class="flex justify-center">
              <img v-if="!editImage" class="object-contain w-60 h-60"
                   :src="form.picture ? $config.baseUrlBack+form.picture : require(`~/assets/images/image-demo.png`)"
                   alt="">
            </div>

            <div>
              <UploadPicture :productId="productId" v-if="editImage || !editProduct" ref="uploadPicture"/>
            </div>

          </div>

          <!--  Botón agregar y editar producto  -->
          <div>
            <button v-if="!editProduct" @click="fcAddProduct" type="button"
                    class="text-white bg-blue-800 w-full hover:bg-green-500 focus:ring-4 focus:ring-green-600 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none">
              Agregar Producto
            </button>
            <button v-else @click="fcEditProduct" type="button"
                    class="text-white bg-blue-800 w-full hover:bg-green-500 focus:ring-4 focus:ring-green-600 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none">
              Editar Producto
            </button>
          </div>
        </form>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import {required} from "vuelidate/lib/validators";
import {bus} from "../../plugins/bus";

export default {
  name: "FormProduct",
  data() {
    return {
      productId: 0,
      editImage: false,
      openModal: false,
      editProduct: false,

      form: {
        name: '',
        description: '',
        price: '',
        picture: ''
      }
    }
  },
  validations: {
    form: {
      name: {required},
      description: {required},
      price: {required},
    },
  },
  methods: {
    editImageProduct() {
      this.editImage = !this.editImage
      if (!this.editImage) {
        bus.$emit('eventUpload')
      }
    },
    /*=============================================
     FUNCIÓN PARA VALIDAR LOS DATOS REQUERIDOS DEL USUARIO
    =============================================*/
    validationForm() {
      this.$v.form.$touch();
      if (this.$v.$invalid) {
        this.$toast.error('Verifique los campos obligatorios.');
        return true
      }
    },
    /*=============================================
     FUNCIÓN PARA ABRIR MODAL Y OBTENER LOS DATOS DEL PRODUCT
    =============================================*/
    fcOpenModalEdit(product) {
      this.editProduct = true
      this.editImage = false
      this.openModal = true

      this.form = {
        name: product.name,
        description: product.description,
        price: product.price,
        picture: product.picture
      }
      setTimeout(() =>{
        this.productId = product.id
      }, 1000)
    },
    /*=============================================
     FUNCIÓN PARA ABRIR LA MODAL DE AGREGAR PRODUCTO
    =============================================*/
    fcOpenModal() {
      this.form = {
        name: '',
        description: '',
        price: '',
        picture: '',
      }
      this.editProduct = false
      this.productId = null
      this.openModal = true
    },
    /*=============================================
     FUNCIÓN PARA AGREGAR PRODUCTO
    =============================================*/
    fcAddProduct() {
      let validation = this.validationForm() // Validamos el formulario
      if (validation) return
      /* Confirmamos la acción*/
      this.$swal.fire(
        this.swalAlert('¿Esta seguro de agregar el producto?', 'warning', 'Estoy Seguro', 'Cancelar')
      ).then(result => {
        if (result.value) {
          /* Componente Loading*/
          this.$vs.loading({
            color: this.$config.colorLoading,
            text: 'Espere por favor...'
          })
          this.$axios.post('/api/v1/add-product', this.form).then(resp => {
            this.$refs.uploadPicture.uploadFiles()
            this.$vs.loading.close() // Cerrar el Loading
            this.$v.form.$reset() // Reset formulario
            this.$toast.success('Producto agregado exitosamente!');
            this.openModal = false
            this.$emit('updateTable') // Luego de que todo salio bien, actualizamos la tabla
          }).catch(e => {
            this.$vs.loading.close()
            console.log(e.response);
            this.$toast.error('Error al agregar el producto. Consulte al administrador');
          })
        }
      })

    },
    fcEditProduct() {
      let validation = this.validationForm() // Validamos el formulario
      if (validation) return
      /* Confirmamos la acción*/
      this.$swal.fire(
        this.swalAlert('¿Esta seguro de editar el producto?', 'warning', 'Estoy Seguro', 'Cancelar')
      ).then(result => {
        if (result.value) {
          this.$vs.loading({
            color: this.$config.colorLoading,
            text: 'Espere por favor...'
          })
          this.$axios.post(`/api/v1/edit-product/${this.productId}`, this.form).then(resp => {
            this.editImage ? this.$refs.uploadPicture.uploadFiles() :
              this.$vs.loading.close() // Cerrar el Loading
            this.$v.form.$reset() // Reset formulario
            this.$toast.success('Producto actualizado exitosamente!');
            this.openModal = false
            this.$emit('updateTable') // Luego de que todo salio bien, actualizamos la tabla
          }).catch(e => {
            this.$vs.loading.close()
            console.log(e.response);
            this.$toast.error('Error al editar el producto. Consulte al administrador');
          })
        }
      })
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
}
</script>

<style scoped>

</style>
