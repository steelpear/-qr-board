<template>
  <div class="q-pa-md">
    <div class="row">
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
          />
        </q-tabs>
        <q-tab-panels v-model="qrTab" animated>
          <q-tab-panel
            v-for="(tab, index) in tabs"
            :key="index"
            :name="tab.name"
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
      <div class="col-12 col-md-5">
        <div class="col q-mx-auto" :style="{ 'max-width': qrWidth + 'px' }">
          <qrcode
            ref="canvas"
            value="QR-Generator"
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
              <q-tooltip content-class="bg-amber" content-style="font-size: 15px;" anchor="top middle" self="bottom right">
                Раскрасить
              </q-tooltip>
            </q-btn>
            <q-btn round color="indigo" glossy icon="far fa-eye" size="lg">
              <q-tooltip content-class="bg-indigo" content-style="font-size: 15px;" anchor="top middle" self="bottom middle">
                Опубликовать
              </q-tooltip>
            </q-btn>
            <q-btn round color="secondary" glossy icon="fas fa-download" size="lg">
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
      qrTab: 'sms',
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
      qrBackColor: '#ffffffff'
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
