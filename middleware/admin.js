export default function ({app, redirect}) {
  if (app.$auth.user.roles[0].name !== 'Administrador') {
    return redirect('auth/login')
  }
}


// export default function ({app, redirect}) {
//   console.log(app.$auth.user.role_names)
//   if (!app.$auth.user.role_names.includes('Administrador')){
//     return redirect('/auth/login')
//   }
// }
