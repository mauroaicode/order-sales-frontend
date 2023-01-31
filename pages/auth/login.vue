<template>
 <div class="py-10">
   <h1 class="text-4xl my-10 font-bold text-center">Ordenes<span class="font-normal">Ventas</span></h1>
   <h2 class=" text-center text-2xl font-extrabold">Iniciar Sesión</h2>
   <div class="mt-8 mx-auto max-w-md px-4 md:px-0 lg:px-0">
      <div class="bg-white py-8 px-4 shadow">
        <form action="" class="space-y-5">
          <div>
            <h5 class="text-center text-gray-400 py-2">Bienvenido de nuevo ! 👋</h5>
          </div>
          <div>
            <label
              for="email"
              class="block text-sm uppercase text-gray-500 mb-3 font-bold "
              :class="{ 'text-red-500': $v.form.email.$error }">Correo Electrónico <span class="text-red-400">*</span>
            </label>
            <input
              v-model="form.email"
              type="email"
              name="email"
              id="email"
              :class="[{ 'border-red-300': $v.form.email.$error }, { 'border-red-300': !$v.form.email.email}]"
              class="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
              placeholder="Tu correo electrónico"
            >
            <p class="text-red-400 font-bold" v-if="!$v.form.email.email">Ingrese un correo
              electrónico
              válido.</p>
            <p class="text-red-400 font-bold" v-if="$v.form.email.$error && $v.form.email.email">El
              correo
              electrónico es requerido.</p>
          </div>
          <div>
            <label
              for="password"
              class="block text-sm uppercase text-gray-500 mb-3 font-bold"
              :class="{ 'text-red-500': $v.form.password.$error }">Contraseña <span class="text-red-400">*</span></label>
            <input
              v-model="form.password"
              :class="[{ 'border-red-300': $v.form.password.$error }]"
              type="password"
              name="password"
              id="password"
              class="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
              placeholder="Tu contraseña">
            <p class="text-red-400 font-bold" v-if="$v.form.password.$error">La contraseña es requerida.</p>
          </div>
          <div>
            <button @click="login" type="button" class="text-white bg-blue-700 w-full hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none">Iniciar Sesión</button>
          </div>
        </form>
      </div>
   </div>
 </div>
</template>

<script>
import {email, required} from "vuelidate/lib/validators";
export default {
  middleware: ['guest'],
  layout: 'auth',
  name: "login",
  dir: {
    // Rename `pages` directory to `routes`
    pages: 'pages/auth'
  },
  data(){
    return{
      form: {
        email: '',
        password: ''
      },
    }
  },
  validations: {
    form: {
      email: {required, email},
      password: {required}
    },
  },
  methods:{
    async login() {
      this.$v.form.$touch();
      if (this.$v.$invalid) {
        this.$toast.error("Verifique que todos los campos requeridos esten llenos.");
        return
      }
      const loginSuccess = await this.$auth.loginWith('local', {
        data: this.form
      }).then(res => {
        this.$auth.redirect('home')
        this.$toast.success("Bienvenido");
      })
        .catch(e => {
          console.log(e)
          this.messageActiveAccount = e.response.data.errors.verification ? e.response.data.errors.verification : null
          this.messageInvalid = e.response.data.errors.email ? e.response.data.errors.email : ''

        })
    }
  }
}
</script>

<style scoped>

</style>
