<template>
  <q-page>
    <div class="q-pa-md q-mt-xs q-col-gutter-lg row">
      <div class="col">
        <q-input
          v-model="login"
          label="Логин"
          outlined
          dark
          clearable
          clear-icon="close"
          style="min-width: 255px"
        >
        <template v-slot:prepend>
          <q-icon name="fas fa-user" />
        </template>
        </q-input>
      </div>
      <div class="col">
        <q-input
          v-model="password"
          type="password"
          label="Пароль"
          outlined
          dark
          clearable
          clear-icon="close"
          style="min-width: 255px"
        >
        <template v-slot:prepend>
          <q-icon name="fas fa-key" />
        </template>
        </q-input>
      </div>
    </div>
    <div class="q-pa-md">
      <q-btn icon="far fa-save" label="Сохранить изменения" outline class="q-py-sm float-right" @click="saveSettings" />
    </div>
  </q-page>
</template>

<script>
export default {
  meta: {
    title: 'Настройки авторизации',
    titleTemplate: title => `${title} - QR-Board - доска объявлений`
  },
  name: 'PageAuth',
  data: () => ({
    login: '',
    password: ''
  }),
  mounted () {
    this.$axios.get(process.env.VUE_APP_SERVER + '/api/login', {
    })
      .then(response => {
        this.login = response.data[0].login
        this.password = this.$store.getters['board/GET_PASSWORD']
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    saveSettings () {
      this.$axios.put(process.env.VUE_APP_SERVER + '/api/login', {
        login: this.login,
        password: this.password
      })
        .then(response => {
          this.$q.notify({
            type: 'positive',
            position: 'top',
            message: 'Изменения сохранены',
            timeout: 2500,
            actions: [{ icon: 'close', color: 'white' }]
          })
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
