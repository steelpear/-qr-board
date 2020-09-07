<template>
  <q-page>
    <div class="q-pa-md q-mt-xs q-gutter-lg">
      <q-toggle v-model="settings.switchDonate" color="red" dark label="Donate">
        <q-tooltip content-style="font-size: 16px" :offset="[10, 10]">Просьба о пожертвовании</q-tooltip>
      </q-toggle>
      <q-toggle v-model="settings.switchReCAPTCHA" color="red" dark label="reCAPTCHA">
        <q-tooltip content-style="font-size: 16px" :offset="[10, 10]">Капча Google</q-tooltip>
      </q-toggle>
      <q-toggle v-model="settings.switchCookie" color="red" dark label="Cookies notice">
        <q-tooltip content-style="font-size: 16px" :offset="[10, 10]">Уведомление о Cookies</q-tooltip>
      </q-toggle>
    </div>
    <div class="q-pa-md q-col-gutter-lg row">
      <div class="col">
        <q-input
          v-model="settings.ReCAPTCHAkey"
          label="reCAPTCHA key"
          outlined
          dark
          clearable
          clear-icon="close"
        />
      </div>
      <div class="col">
        <q-input
          v-model="settings.YandexMapkey"
          label="ЯндексКарты API key"
          outlined
          dark
          clearable
          clear-icon="close"
        />
      </div>
    </div>
    <div class="q-pa-md q-col-gutter-lg row">
      <div class="col">
        <q-input
          v-model="settings.yandexMoney"
          label="Яндекс-кошелёк"
          outlined
          dark
          clearable
          clear-icon="close"
        />
      </div>
      <div class="col">
        <q-input
          v-model="settings.adminMail"
          label="E-mail администратора"
          outlined
          dark
          clearable
          clear-icon="close"
        />
      </div>
    </div>
    <div class="q-pa-md">
      <q-btn icon="far fa-save" label="Сохранить изменения" outline class="q-py-sm float-right" @click="saveSettings" />
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'
export default {
  name: 'PageGeneralSettings',
  data () {
    return {
      settings: {}
    }
  },
  mounted () {
    this.settings = this.$store.getters['board/GET_SETTINGS']
  },
  methods: {
    saveSettings: function () {
      axios.put(process.env.VUE_APP_SERVER + '/api/settings', {
        switchDonate: this.settings.switchDonate,
        switchReCAPTCHA: this.settings.switchReCAPTCHA,
        switchCookie: this.settings.switchCookie,
        yandexMoney: this.settings.yandexMoney,
        adminMail: this.settings.adminMail,
        ReCAPTCHAkey: this.settings.ReCAPTCHAkey,
        YandexMapkey: this.settings.YandexMapkey
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
