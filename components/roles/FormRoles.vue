<template>
  <div>
    <vs-popup :title="!editRole ? 'Agregar Rol' : 'Editar Rol'" :active.sync="openModal">
      <div class="py-5 px-4">
        <form action="" class="space-y-5">
          <!--  Input Nombre   -->
          <div>
            <label
              for="role"
              class="block text-sm text-gray-500 mb-3 font-bold"
              :class="{ 'text-red-500': $v.form.name.$error }"
            >Nombre Rol <span class="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="role"
              id="role"
              v-model="form.name"
              :class="[{ 'border-red-300': $v.form.name.$error }]"
              class="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
              placeholder="Nombre"
            >
            <p
              class="text-red-400 font-bold"
              v-if="$v.form.name.$error">
              El nombre es requerido.
            </p>
          </div>

          <!--  Botón agregar y editar rol  -->
          <div>
            <button v-if="!editRole" @click="fcAddRol" type="button"
                    class="text-white bg-blue-800 w-full hover:bg-green-500 focus:ring-4 focus:ring-green-600 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none">
              Agregar Rol
            </button>
            <button v-else @click="fcEditRol" type="button"
                    class="text-white bg-blue-800 w-full hover:bg-green-500 focus:ring-4 focus:ring-green-600 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none">
              Editar Rol
            </button>
          </div>
        </form>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import {required} from "vuelidate/lib/validators";

export default {
  name: "FormRoles",
  data() {
    return {
      roleId: null,
      openModal: false,
      editRole: false,
      form: {
        name: '',
      }
    }
  },
  validations: {
    form: {
      name: {required},
    },
  },
  methods: {
    /*=============================================
     FUNCIÓN PARA ABRIR LA MODAL DE AGREGAR ROL
    =============================================*/
    fcOpenModal() {
      this.form = {
        name: '',
      }
      this.editRole = false
      this.roleId = null
      this.openModal = true
    },
    /*=============================================
     FUNCIÓN PARA ABRIR MODAL Y OBTENER EL DATO DEL ROL
    =============================================*/
    fcOpenModalEdit(role) {
      this.editRole = true
      this.openModal = true
      this.roleId = role.id
      this.form = {
        name: role.name,
      }
    },
    /*=============================================
     FUNCIÓN PARA VALIDAR EL DATO REQUERIDO DEL ROL
    =============================================*/
    validationForm() {
      this.$v.form.$touch();
      if (this.$v.$invalid) {
        this.$toast.error('Verifique el campo obligatorio.');
        return true
      }
    },
    /*=============================================
     FUNCIÓN PARA AGREGAR ROL
    =============================================*/
    fcAddRol() {
      let validation = this.validationForm() // Validamos el formulario
      if (validation) return
      /* Confirmamos la acción*/
      this.$swal.fire(
        this.swalAlert('¿Esta seguro de agregar el rol?', 'warning', 'Estoy Seguro', 'Cancelar')
      ).then(result => {
        if (result.value) {
          /* Componente Loading*/
          this.$vs.loading({
            color: this.$config.colorLoading,
            text: 'Espere por favor...'
          })
          this.$axios.post('/api/v1/add-role', this.form).then(resp => {
            this.$vs.loading.close() // Cerrar el Loading
            this.$v.form.$reset() // Reset formulario
            this.$toast.success('Rol agregado exitosamente!');
            this.openModal = false
            this.$emit('updateTable') // Luego de que todo salio bien, actualizamos la tabla
          }).catch(e => {
            this.$vs.loading.close()
            console.log(e.response);
            this.$toast.error('Error al agregar el rol. Consulte al administrador');
          })
        }
      })
    },
    /*=============================================
     FUNCIÓN PARA EDITAR LO ROL
    =============================================*/
    fcEditRol() {
      let validation = this.validationForm() // Validamos el formulario
      if (validation) return
      /* Confirmamos la acción*/
      this.$swal.fire(
        this.swalAlert('¿Esta seguro de editar el rol?', 'warning', 'Estoy Seguro', 'Cancelar')
      ).then(result => {
        if (result.value) {
          this.$vs.loading({
            color: this.$config.colorLoading,
            text: 'Espere por favor...'
          })
          this.$axios.post(`/api/v1/edit-role/${this.roleId}`, this.form).then(resp => {
            this.$vs.loading.close() // Cerrar el Loading
            this.$v.form.$reset() // Reset formulario
            this.$toast.success('Rol actualizado exitosamente!');
            this.openModal = false
            this.$emit('updateTable') // Luego de que todo salio bien, actualizamos la tabla
          }).catch(e => {
            this.$vs.loading.close()
            console.log(e.response);
            this.$toast.error('Error al editar el rol. Consulte al administrador');
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
  }
}
</script>

<style scoped>

</style>
