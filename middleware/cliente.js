export default function ({$gates, redirect}) {
  if (!$gates.hasRole('Cliente') && $gates.hasRole('Administrador')) {
    return redirect('/users')
  }
}
