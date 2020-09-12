<template>
  <div :class="$q.screen.gt.sm ? 'q-px-lg' : 'q-px-sm'">
    <div class="row justify-center" :class="{ 'q-gutter-lg' : $q.screen.gt.sm }">
      <div class="col-12 col-md-7">
        <q-tabs
          v-model="qrTab"
          inline-label
          outside-arrows
          mobile-arrows
          class="bg-indigo text-white shadow-2 q-py-sm"
        >
          <q-tab
            v-for="(tab, index) in tabs"
            :key="index"
            :name="tab.name"
            :icon="tab.icon"
            class="q-px-sm"
          />
        </q-tabs>
        <q-tab-panels v-model="qrTab" animated>
          <q-tab-panel
            v-for="(tab, index) in tabs"
            :key="index"
            :name="tab.name"
            class="q-px-xs"
          >
            <qr-sms v-if="tab.name === 'sms'" />
            <qr-text v-else-if="tab.name === 'text'" />
            <qr-vcard v-else-if="tab.name === 'card'" />
            <qr-map v-else-if="tab.name === 'map'" />
            <qr-wifi v-else-if="tab.name === 'wifi'" />
            <qr-link v-else-if="tab.name === 'link'" />
            <qr-whatsapp v-else-if="tab.name === 'whatsapp'" />
            <qr-skype v-else-if="tab.name === 'skype'" />
            <qr-telegram v-else-if="tab.name === 'telegram'" />
            <qr-youtube v-else />
          </q-tab-panel>
        </q-tab-panels>
      </div>
      <div class="col-12 col-md-4">
        <div class="col" :class="$q.screen.gt.sm ? 'float-right' : 'q-mx-auto'" :style="{ 'max-width': qrWidth + 'px' }">
          <qrcode
            ref="canvas"
            :value="qrValue ? qrValue : 'QR-Board'"
            :options="{
              color: {
                dark: qrFrontColor,
                light: qrBackColor
              },
              width: qrWidth
            }"
            class="shadow-8"
          />
          <div class="q-mt-lg row wrap justify-around items-center content-center">
            <q-btn round color="amber" glossy icon="fas fa-paint-brush" size="lg" class="lt-md" @click="paintMobileDialog = true" />
            <q-btn round color="amber" glossy icon="fas fa-paint-brush" size="lg" class="gt-sm">
              <q-menu
                :offset="[450, 0]"
              >
                <div class="q-gutter-md row q-pa-md">
                  <div>
                  <div>Фон</div>
                  <q-color
                    v-model="qrBackColor"
                    no-header
                    no-footer
                    default-view="palette"
                  />
                  </div>
                  <div>
                  <div>Пиксели</div>
                  <q-color
                    v-model="qrFrontColor"
                    no-header
                    no-footer
                    default-view="palette"
                  />
                  </div>
                </div>
                <q-separator inset class="q-mb-xs" />
                <div class="row justify-between items-center content-center">
                  <q-btn class="q-ma-sm" flat rounded color="indigo" label="Сбросить" @click="resetColors" />
                  <q-toggle
                    v-model="inverse"
                    color="primary"
                    keep-color
                    label="Поменять цвета"
                    checked-icon="check"
                    unchecked-icon="clear"
                    @input="inverseColors"
                  />
                  <q-btn class="q-ma-sm" flat rounded color="indigo" label="Ok" v-close-popup />
                </div>
              </q-menu>
              <q-tooltip content-class="bg-amber" content-style="font-size: 15px;" anchor="top middle" self="bottom right">
                Раскрасить
              </q-tooltip>
            </q-btn>
            <q-btn round color="indigo" glossy icon="far fa-eye" size="lg" @click="settings.switchReCAPTCHA && $q.screen.gt.sm ? recaptchaDialog = true : publicQr()">
              <q-tooltip content-class="bg-indigo" content-style="font-size: 15px;" anchor="top middle" self="bottom middle">
                Опубликовать
              </q-tooltip>
            </q-btn>
            <q-btn round color="secondary" glossy icon="fas fa-download" size="lg" @click="saveImg">
              <q-tooltip content-class="bg-secondary" content-style="font-size: 15px;" anchor="top right" self="bottom middle">
                Сохранить
              </q-tooltip>
            </q-btn>
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="paintMobileDialog">
      <q-card>
        <q-card-section>
          <div>Фон</div>
          <q-color
            v-model="qrBackColor"
            no-header
            no-footer
            default-view="palette"
            :palette="customPalette"
          />
          <div class="q-mt-xs">Пиксели</div>
          <q-color
            v-model="qrFrontColor"
            no-header
            no-footer
            default-view="palette"
            :palette="customPalette"
          />
        </q-card-section>
        <q-card-section class="q-py-none">
          <div class="flex justify-center">
            <qrcode
              :value="qrValue ? qrValue : 'QR-Board'"
              :options="{
                color: {
                  dark: qrFrontColor,
                  light: qrBackColor
                },
                width: 220
              }"
              class="shadow-8"
            />
          </div>
        </q-card-section>
        <q-card-actions>
          <div class="row justify-between items-center content-center">
            <q-btn class="q-ma-sm" flat rounded color="indigo" label="Сбросить" @click="resetColors" />
            <q-toggle
              v-model="inverse"
              color="primary"
              keep-color
              checked-icon="check"
              unchecked-icon="clear"
              @input="inverseColors"
            />
            <q-btn class="q-ma-sm" flat rounded color="indigo" label="Ok" v-close-popup />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="recaptchaDialog">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <q-icon name="fas fa-robot" size="md" color="red" />
          <div class="text-h6 q-ml-lg">Вы не робот?</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="flex justify-center">
          <vue-recaptcha
            :sitekey="settings.ReCAPTCHAkey"
            :loadRecaptchaScript="true"
            @verify="recaptchaOk"
            :size="$q.screen.xs ? 'compact' : 'normal'"
          />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="publicDialog">
      <q-card>
        <q-card-section class="row items-center content-center q-pb-none">
          <q-icon name="fas fa-info-circle" size="md" color="primary" class="gt-xs" />
          <div class="text-h5 text-center q-mx-md">Объявление <span class="gt-xs">успешно</span> опубликовано</div>
          <q-space />
          <q-btn icon="close" class="gt-xs" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="q-pb-none">
          <div class="row justify-center items-center">
            <div class="text-h6 q-mr-sm">Номер объявления:</div>
            <q-chip color="primary" text-color="white" class="text-h6">
              {{ qrId }}
            </q-chip>
          </div>
        </q-card-section>
        <q-card-actions>
            <q-btn class="q-ma-sm" flat rounded icon="far fa-copy" color="indigo" :label="$q.screen.gt.xs ? 'Копировать' : ''" @click="copyClipboard" />
            <q-space />
            <q-btn class="q-ma-sm" flat rounded icon="fas fa-eye" color="indigo" :label="$q.screen.gt.xs ? 'Посмотреть' : ''" @click="showPublicAd(qrId)" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
import axios from 'axios'
import { copyToClipboard } from 'quasar'
import VueQrcode from '@chenfengyuan/vue-qrcode'
import qrSms from '../components/qrSms.vue'
import qrText from '../components/qrText.vue'
import qrVcard from '../components/qrVcard.vue'
import qrMap from '../components/qrMap.vue'
import qrWifi from '../components/qrWifi.vue'
import qrLink from '../components/qrLink.vue'
import qrWhatsapp from '../components/qrWhatsapp.vue'
import qrSkype from '../components/qrSkype.vue'
import qrTelegram from '../components/qrTelegram.vue'
import qrYoutube from '../components/qrYoutube.vue'
import VueRecaptcha from 'vue-recaptcha'

export default {
  name: 'PageAdd',
  components: {
    qrSms,
    qrText,
    qrVcard,
    qrMap,
    qrWifi,
    qrLink,
    qrWhatsapp,
    qrSkype,
    qrTelegram,
    qrYoutube,
    qrcode: VueQrcode,
    VueRecaptcha
  },
  data () {
    return {
      tabs: [
        { name: 'sms', icon: 'fas fa-sms' },
        { name: 'text', icon: 'fas fa-font' },
        { name: 'card', icon: 'far fa-address-card' },
        { name: 'map', icon: 'fas fa-map-marker-alt' },
        { name: 'wifi', icon: 'fas fa-wifi' },
        { name: 'link', icon: 'fas fa-link' },
        { name: 'whatsapp', icon: 'fab fa-whatsapp' },
        { name: 'skype', icon: 'fab fa-skype' },
        { name: 'telegram', icon: 'fab fa-telegram-plane' },
        { name: 'youtube', icon: 'fab fa-youtube' }
      ],
      qrWidth: 300,
      qrFrontColor: '#000000ff',
      qrBackColor: '#ffffffff',
      inverse: false,
      paintMobileDialog: false,
      recaptchaDialog: false,
      publicDialog: false,
      qrId: 'qr123456',
      customPalette: ['#ffffffff', '#999999', '#7F7F7F', '#666666', '#4C4C4C', '#333333', '#191919', '#20124d', '#4c1130', '#000000ff', '#990000', '#b45f06', '#bf9000', '#38761d', '#134f5c', '#0b5394', '#351c75', '#741b47', '#e06666', '#f6b26b', '#ffd966', '#93c47d', '#76a5af', '#6fa8dc', '#8e7cc3', '#c27ba0', '#cc0000', '#e69138', '#f1c232', '#6aa84f', '#45818e', '#3d85c6', '#674ea7', '#a64d79', '#660000', '#783f04', '#7f6000', '#274e13', '#0c343d', '#073763']
    }
  },
  methods: {
    showLoading () {
      this.$q.loading.show({
        spinnerSize: 140
      })
      this.timer = setTimeout(() => {
        this.$q.loading.hide()
        this.timer = undefined
      }, 500)
    },
    resetColors () {
      this.qrFrontColor = '#000000ff'
      this.qrBackColor = '#ffffffff'
      this.inverse = false
    },
    inverseColors () {
      const front = this.qrFrontColor
      const back = this.qrBackColor
      this.qrFrontColor = back
      this.qrBackColor = front
    },
    saveImg () {
      const canvas = this.$refs.canvas.$el
      const dataURL = canvas.toDataURL('image/jpeg', 1)
      const link = document.createElement('a')
      link.href = dataURL
      link.download = 'qr-board.jpg'
      link.click()
    },
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    publicQr () {
      const imgSrc = this.$refs.canvas.$el.toDataURL()
      const id = 'qr' + this.getRandomInt(100000, 999999)
      axios.post(process.env.VUE_APP_SERVER + '/api/records', {
        qrId: id,
        qrImgSrc: imgSrc,
        qrDate: new Date()
      })
        .then(response => {
          this.qrId = id
          this.publicDialog = true
        })
        .catch(error => {
          console.log(error)
        })
    },
    recaptchaOk () {
      this.publicQr()
      this.recaptchaDialog = false
    },
    showPublicAd: function (qrId) {
      this.$router.push({ path: '/', query: { id: qrId } })
    },
    copyClipboard () {
      copyToClipboard(this.qrId)
        .then(() => {
          this.$q.notify({
            type: 'positive',
            position: 'top',
            message: 'Номер скопирован',
            timeout: 2500,
            actions: [{ icon: 'close', color: 'white' }]
          })
        })
        .catch(() => {
          console.log('Error copyng to clipboard!')
        })
    }
  },
  computed: {
    qrTab: {
      get () { return this.$store.getters['board/GET_QRTAB'] },
      set (value) { this.$store.commit('board/SET_QRTAB', value) }
    },
    qrValue () {
      if (this.qrTab === 'sms') {
        return this.$store.getters['board/GET_SMS']
      } else if (this.qrTab === 'text') {
        return this.$store.getters['board/GET_TEXT']
      } else if (this.qrTab === 'card') {
        return this.$store.getters.get_vcard
      } else if (this.qrTab === 'map') {
        return this.$store.getters.get_geo_data
      } else if (this.qrTab === 'wifi') {
        return this.$store.getters.get_wifi
      } else if (this.qrTab === 'link') {
        return this.$store.getters.get_link
      } else if (this.qrTab === 'whatsapp') {
        return this.$store.getters.get_whatsapp
      } else if (this.qrTab === 'skype') {
        return this.$store.getters.get_skype
      } else if (this.qrTab === 'telegram') {
        return this.$store.getters.get_telegram
      } else if (this.qrTab === 'youtube') {
        return this.$store.getters.get_youtube
      } else {
        return false
      }
    },
    settings: {
      get () { return this.$store.getters['board/GET_SETTINGS'] }
    }
  },
  mounted () {
    this.showLoading()
  },
  beforeDestroy () {
    if (this.timer !== undefined) {
      clearTimeout(this.timer)
      this.$q.loading.hide()
    }
  }
}
</script>
