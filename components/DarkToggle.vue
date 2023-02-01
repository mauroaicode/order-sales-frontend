<template>
  <div>
    <button @click="toggle">
      Holas
    </button>
  </div>
</template>
<script>
export default {
  methods:{
    toggle(){
      this.$colorMode.preference
    }
  }
}
</script>
<style>

</style>
