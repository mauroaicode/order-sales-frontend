<template>
  <div class="px-16 py-6">
<!-- Tienda Cliente   -->
    <Shop/>
  </div>
</template>

<script>
export default {
  middleware: ['auth', 'cliente'],
  layout: 'default',
  name: 'IndexPage'
}
</script>
