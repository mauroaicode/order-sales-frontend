<template>
  <div>
    <vs-popup :title="!editUser ? 'Agregar Usuario' : 'Editar Usuario'" :active.sync="openModal">
      <div class="py-5 px-4">
        <form action="" class="space-y-5">
          <!--  Input Nombre   -->
          <div>
            <label
              for="name"
              class="block text-sm text-gray-500 mb-3 font-bold"
              :class="{ 'text-red-500': $v.form.name.$error }"
            >Nombre Completo <span class="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              v-model="form.name"
              :class="[{ 'border-red-300': $v.form.name.$error }]"
              class="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
              placeholder="Nombre completo"
            >
            <p
              class="text-red-400 font-bold"
              v-if="$v.form.name.$error">
              El nombre es requerido.
            </p>
          </div>
          <!--  Input Email   -->
          <div>
            <label
              for="email"
              class="block text-sm  text-gray-500 mb-3 font-bold "
              :class="{ 'text-red-500': $v.form.email.$error }"
            >Correo Electrónico <span class="text-red-400">*</span>
            </label>
            <input
              v-model="form.email"
              type="email"
              name="email"
              id="email"
              :class="[{ 'border-red-300': $v.form.email.$error }, { 'border-red-300': !$v.form.email.email}]"
              class="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
              placeholder="Correo electrónico"
            >
            <!--  Mensajes de Validación   -->
            <p class="text-red-400 font-bold" v-if="!$v.form.email.email">Ingrese un correo
              electrónico
              válido.</p>
            <p class="text-red-400 font-bold" v-if="$v.form.email.$error && $v.form.email.email">El
              correo electrónico es requerido.</p>
          </div>
          <!--   Select Roles   -->
          <div class="w-full md:w-auto gap-2">
            <label class="block text-sm  text-gray-500 mb-3 font-bold "
                   :class="{ 'text-red-500': $v.form.roleId.$error }">
              Seleccionar Rol <span class="text-red-400">*</span>
            </label>
            <vs-select
              placeholder="Seleccionar"
              width="100%"
              class="w-full"
              v-model="form.roleId"
            >
              <vs-select-item :key="rol.id" :value="rol.id"
                              :text="rol.name === 'Admin' ? 'Administrador' : rol.name === 'Customer' ? 'Cliente' : 'Empleado'"
                              v-for="rol in roles"/>
            </vs-select>
            <p
              class="text-red-400 font-bold"
              v-if="$v.form.roleId.$error">
              El rol es requerido.
            </p>
          </div>
          <!--  Botón agregar usuario y editar usuario  -->
          <div>
            <button v-if="!editUser" @click="fcAddUser" type="button"
                    class="text-white bg-blue-700 w-full hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none">
              Agregar Usuario
            </button>
            <button v-else @click="fcEditUser" type="button"
                    class="text-white bg-blue-700 w-full hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none">
              Editar Usuario
            </button>
          </div>
        </form>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import {email, required} from "vuelidate/lib/validators";

export default {
  name: "FormUser",
  data() {
    return {
      userId: null,
      openModal: false,
      editUser: false,
      roles: [],
      form: {
        name: '',
        email: '',
        roleId: null
      }
    }
  },
  validations: {
    form: {
      name: {required},
      email: {required, email},
      roleId: {required},
    },
  },
  methods: {
    fcOpenModal() {
      this.form = {
        name: '',
        email: '',
        roleId: null
      }
      this.editUser = false
      this.userId = null,
      this.openModal = true
    },
    fcOpenModalEdit(user) {

      this.editUser = true
      this.openModal = true
      this.userId = user.id
      this.form = {
        name: user.name,
        email: user.email,
        roleId: user.roles[0].id
      }
    },
    validationForm() {
      this.$v.form.$touch();
      if (this.$v.$invalid) {
        this.$toast.error('Verifique los campos obligatorios.');
        return true
      }
    },
    fcEditUser() {
      let validation = this.validationForm() // Validamos el formulario
      if (validation) return
      this.$swal.fire(
        this.swalAlert('¿Esta seguro de editar el usuario', 'warning', 'Estoy Seguro', 'Cancelar')
       ).then(result => {
        if (result.value) {
          this.$vs.loading({
            color: this.$config.colorLoading,
            text: 'Espere por favor...'
          })
          this.$axios.post(`/api/v1/edit-user/${this.userId}`, this.form).then(resp => {
            this.$vs.loading.close()
            this.$v.form.$reset()
            this.$toast.success('Usuario actualizado exitosamente!');
            this.openModal = false
            this.$emit('updateTable')
          }).catch(e => {
            this.$vs.loading.close()
            console.log(e.response);
            this.$toast.error('Error al editar el usuario. Consulte al administrador');
          })
        }
      })
    },
    fcAddUser() {
      let validation = this.validationForm() // Validamos el formulario
      if (validation) return
      this.$swal.fire(
        this.swalAlert('¿Esta seguro de agregar el usuario', 'warning', 'Estoy Seguro', 'Cancelar')
      ).then(result => {
        if (result.value) {
          this.$vs.loading({
            color: this.$config.colorLoading,
            text: 'Espere por favor...'
          })
          this.$axios.post('/api/v1/add-user', this.form).then(resp => {
            this.$vs.loading.close()
            this.$v.form.$reset()
            this.$toast.success('Usuario agregado exitosamente!');
            this.openModal = false
            this.$emit('updateTable')
          }).catch(e => {
            this.$vs.loading.close()
            console.log(e.response);
            this.$toast.error('Error al agregar el usuario. Consulte al administrador');
          })
        }
      })
    },
    getRoles() {
      this.$axios.get('api/v1/get-roles').then(resp => {
        this.roles = resp.data.data
      }).catch(e => {
        console.log(e)
        this.$toast.error("Error al obtener los roles. Consulte al administrador.");
      })
    },
    swalAlert(message, icon, textAccept, textCancel) {
      return {
        title: message,
        icon: icon,
        confirmButtonText: textAccept,
        cancelButtonText: textCancel,
        customClass: {
          confirmButton: 'text-white bg-blue-700 w-full hover:bg-blue-800 focus:ring-1 focus:ring-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2',
          cancelButton: 'text-white bg-gray-700 w-full hover:bg-gray-800 focus:ring-1 focus:ring-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
        },
        buttonsStyling: false,
        showCancelButton: true,
        reverseButtons: true,
        allowOutsideClick: false,
      }
    }
  },
  mounted() {
    this.getRoles()
  }
}
</script>

<style scoped>

</style>
