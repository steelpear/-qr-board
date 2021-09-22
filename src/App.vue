<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'App',
  created () {
    axios.get(process.env.VUE_APP_SERVER + '/api/settings', {
    })
      .then(response => {
        this.$store.commit('board/SET_SETTINGS', response.data[0])
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
