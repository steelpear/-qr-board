<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  async created () {
    const response = await this.$axios.get(process.env.VUE_APP_SERVER + '/api/settings')
    this.$store.commit('board/SET_SETTINGS', response.data[0])
  }
}
</script>
