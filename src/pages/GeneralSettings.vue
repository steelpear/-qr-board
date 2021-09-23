<template>
  <q-page>
    <div class="q-pa-md q-mt-xs q-gutter-lg row">
      <q-toggle v-model="settings.switchDonate" color="red" dark label="Donate">
        <q-tooltip content-style="font-size: 16px" :offset="[10, 10]">Просьба о пожертвовании</q-tooltip>
      </q-toggle>
      <q-toggle v-model="settings.switchReCAPTCHA" color="red" dark label="reCAPTCHA">
        <q-tooltip content-style="font-size: 16px" :offset="[10, 10]">Капча Google</q-tooltip>
      </q-toggle>
      <q-toggle v-model="settings.switchCookie" color="red" dark label="Cookies notice">
        <q-tooltip content-style="font-size: 16px" :offset="[10, 10]">Уведомление о Cookies</q-tooltip>
      </q-toggle>
      <q-toggle v-model="settings.switchNoticeMail" color="red" dark label="Уведомление на E-mail">
        <q-tooltip content-style="font-size: 16px" :offset="[10, 10]">Уведомление о новом объявлении</q-tooltip>
      </q-toggle>
      <div class="col">
        <q-input
          v-model="settings.noticeMail"
          label="E-mail для уведомления"
          outlined
          dark
          clearable
          clear-icon="close"
          :disable="!settings.switchNoticeMail"
        />
      </div>
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
          label="Кошелёк ЮMoney"
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
      //
    }
  },
  computed: {
    settings: {
      get () { return this.$store.getters['board/GET_SETTINGS'] }
    }
  },
  methods: {
    saveSettings () {
      axios.put(process.env.VUE_APP_SERVER + '/api/settings', this.settings)
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
