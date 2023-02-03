export default function ({app, redirect}) {
  if (app.$auth.user.roles[0].name !== 'Empleado' || app.$auth.user.roles[0].name !== 'Administrador') {
    return redirect('/users')
  }
}
