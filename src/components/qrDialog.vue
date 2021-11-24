<template>
  <div>
    <q-dialog v-model="showLocal" square @hide="clearData">
      <q-card class="cursor-pointer" style="width:350px; max-width:350px;" @mouseover="active=true" @mouseleave="active=false">
        <q-card-section class="q-pa-none">
          <q-img ref="canvas" :src="img" />
          <transition
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
          <q-btn
            v-if="active"
            fab
            glossy
            color="orange"
            icon="share"
            class="absolute shadow-24"
            :style="btnStyle"
            @click="bottSheet=true"
          />
          </transition>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="bottSheet" position="bottom" square>
      <q-card style="width: 350px">
        <q-card-section class="row items-center justify-center no-wrap">
          <ShareNetwork
            v-for="network in networks"
            :network="network.network"
            :key="network.network"
            :style="{color: network.color}"
            :url="url"
            :title="sharing.title"
            :description="sharing.description"
            :quote="sharing.quote"
            :hashtags="sharing.hashtags"
            :twitterUser="sharing.twitterUser"
          >
            <q-icon :name="network.icon" size="sm" class="cursor-pointer q-mr-sm" />
          </ShareNetwork>
          <q-icon name="fas fa-link" color="indigo" size="sm" class="cursor-pointer q-ml-xs" @click="copyClipboard(url)" />
          <q-icon name="fas fa-download" color="blue-9" size="25px" class="cursor-pointer q-ml-sm" @click="saveImg(id)" />
        </q-card-section>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
import { copyToClipboard } from 'quasar'

export default {
  name: 'qrDialog',
  props: {
    show: Boolean,
    img: String,
    url: String,
    id: String
  },
  data () {
    return {
      showLocal: this.show,
      btnStyle: {
        top: '50%',
        left: '50%',
        transform: 'translateY(-50%) translateX(-50%)',
        transition: 'all .3s'
      },
      active: false,
      bottSheet: false,
      sharing: {
        url: process.env.VUE_APP_SERVER,
        title: 'QR-Board',
        description: 'QR-Board - доска объявлений',
        quote: 'Доска объявлений в формате QR-кода',
        hashtags: 'qrcode,free,generator',
        twitterUser: ''
      },
      networks: [
        { network: 'twitter', name: 'Twitter', icon: 'fab fah fa-lg fa-twitter', color: '#1da1f2' },
        { network: 'telegram', name: 'Telegram', icon: 'fab fah fa-lg fa-telegram-plane', color: '#0088cc' },
        { network: 'facebook', name: 'Facebook', icon: 'fab fah fa-lg fa-facebook-f', color: '#1877f2' },
        { network: 'odnoklassniki', name: 'Odnoklassniki', icon: 'fab fah fa-lg fa-odnoklassniki', color: '#ed812b' },
        { network: 'vk', name: 'Vk', icon: 'fab fah fa-lg fa-vk', color: '#4a76a8' }
      ]
    }
  },
  watch: {
    show () { this.showLocal = this.show }
  },
  methods: {
    async copyClipboard (url) {
      await copyToClipboard(url)
      this.$q.notify({
        type: 'positive',
        position: 'top',
        message: 'Ссылка скопирована',
        timeout: 2500,
        actions: [{ icon: 'close', color: 'white' }]
      })
    },
    saveImg (id) {
      const link = document.createElement('a')
      link.href = this.$refs.canvas.src
      link.download = 'qr-board.ru_' + id + '.png'
      link.click()
    },
    clearData () {
      const vals = {
        qrImgDialogSrc: '',
        id: '',
        qrId: '',
        showQrDialog: false
      }
      this.$store.dispatch('board/set_qrDialogAct', vals)
    }
  }
}
</script>
