<template>
  <div class="fullscreen flex flex-center">
    <div class="q-pa-lg shadow-8">
      <q-icon
        :size="$q.screen.gt.sm ? '4rem' : '3rem'"
        name="qr_code"
        color="grey-8"
        class="rotate-315 q-mt-xs q-mr-sm gt-xs"
      />
      <span class="text-h4 text-weight-medium text-grey-8 gt-xs">qr-board</span>
      <q-form
        class="q-gutter-md"
        :class="$q.screen.gt.sm ? 'q-mt-lg' : 'q-mt-sm'"
        style="max-width: 400px"
        :style="{ 'min-width' : $q.screen.gt.sm ? '400px' : '' }"
      >
        <q-input
          v-model="login"
          label="Логин"
          outlined
          clearable
          clear-icon="close"
          :style="{ 'max-width' : $q.screen.gt.sm ? '400px' : '219px' }"
          @keyup.enter="goLogin"
        >
        <template v-slot:prepend>
          <q-icon name="fas fa-user" />
          </template>
        </q-input>

        <q-input
          v-model="password"
          type="password"
          label="Пароль"
          outlined
          clearable
          clear-icon="close"
          :style="{ 'max-width' : $q.screen.gt.sm ? '400px' : '219px' }"
          @keyup.enter="goLogin"
        >
        <template v-slot:prepend>
          <q-icon name="fas fa-key" />
          </template>
        </q-input>

        <div>
          <q-btn icon-right="fas fa-sign-in-alt" label="Войти" color="indigo" class="full-width glossy q-py-xs" @click="goLogin" />
        </div>
      </q-form>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      login: '',
      password: ''
    }
  },
  methods: {
    goLogin () {
      axios.post(process.env.VUE_APP_SERVER + '/api/login', {
        login: this.login,
        password: this.password
      })
        .then(response => {
          if (!response.data.state) {
            this.$q.notify({
              type: 'negative',
              position: 'top',
              message: 'Логин или пароль не верны!',
              timeout: 2500,
              actions: [{ icon: 'close', color: 'white' }]
            })
          } else {
            this.$q.cookies.set('login', 'login_session')
            this.$router.push({ path: '/admin' })
            this.$store.commit('board/SET_PASSWORD', this.password)
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
