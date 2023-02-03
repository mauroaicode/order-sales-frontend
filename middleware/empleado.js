export default function ({app, redirect}) {
  if (app.$auth.user.roles[0].name !== 'Empleado') {
    return redirect('auth/login')
  }
}
