<template>
  <div :class="$q.screen.gt.sm ? 'q-px-xl' : 'q-px-sm'">
    <div class="row justify-center">
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
            <q-btn round color="amber" glossy icon="fas fa-paint-brush" size="lg">
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
            <q-btn round color="indigo" glossy icon="far fa-eye" size="lg">
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
  </div>
</template>

<script>
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
    qrcode: VueQrcode
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
      inverse: false
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
