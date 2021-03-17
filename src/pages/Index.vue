<template>
  <div class="q-pa-lg">
    <q-infinite-scroll @load="fetchData" :offset="250">
      <div class="q-gutter-md row wrap justify-center item-start">
        <div  v-for="(qrItem, index) in qrItems" :key="index" class="col-auto">
          <q-img
            :src="qrItem.qrImgSrc"
            spinner-color="indigo"
            class="cursor-pointer shadow-5 my-hover-shadow"
            style="height: 190px; width: 190px; border-radius: 28px 0;"
            @click = "showQrImgLarge(qrItem.qrImgSrc,qrItem.qrId)"
          />
        </div>
      </div>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="indigo" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>

    <q-dialog v-model="showQrDialog" square>
      <q-card class="cursor-pointer" style="width:350px; max-width:350px;" @mouseover="active=true" @mouseleave="active=false">
        <q-card-section class="q-pa-none">
          <q-img :src="qrImgDialogSrc"/>
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
            :url="qrId"
            :title="sharing.title"
            :description="sharing.description"
            :quote="sharing.quote"
            :hashtags="sharing.hashtags"
            :twitterUser="sharing.twitterUser"
          >
            <q-icon :name="network.icon" size="sm" class="cursor-pointer q-mr-sm" />
          </ShareNetwork>
          <q-icon name="fas fa-link" color="indigo" size="sm" class="cursor-pointer q-ml-xs" @click="copyClipboard" />
          <q-icon name="fas fa-download" color="blue-9" size="25px" class="cursor-pointer q-ml-sm" @click="saveImg" />
        </q-card-section>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
import axios from 'axios'
import { copyToClipboard } from 'quasar'

export default {
  name: 'PageIndex',
  data: () => ({
    btnStyle: {
      top: '50%',
      left: '50%',
      transform: 'translateY(-50%) translateX(-50%)',
      transition: 'all .3s'
    },
    active: false,
    bottSheet: false,
    qrItems: [],
    showQrDialog: false,
    qrImgDialogSrc: '',
    qrId: '',
    id: '',
    timeOut: 0,
    routeProps: {
      limit: 50,
      skip: 0
    },
    sharing: {
      url: process.env.VUE_APP_SERVER,
      title: 'QR-Board',
      description: 'QR-Board - доска объявлений',
      quote: 'Доска объявлений в формате QR-кода',
      hashtags: 'qrcode,free,generator',
      twitterUser: 'steelpear'
    },
    networks: [
      { network: 'twitter', name: 'Twitter', icon: 'fab fah fa-lg fa-twitter', color: '#1da1f2' },
      { network: 'telegram', name: 'Telegram', icon: 'fab fah fa-lg fa-telegram-plane', color: '#0088cc' },
      { network: 'facebook', name: 'Facebook', icon: 'fab fah fa-lg fa-facebook-f', color: '#1877f2' },
      { network: 'odnoklassniki', name: 'Odnoklassniki', icon: 'fab fah fa-lg fa-odnoklassniki', color: '#ed812b' },
      { network: 'vk', name: 'Vk', icon: 'fab fah fa-lg fa-vk', color: '#4a76a8' }
    ]
  }),
  methods: {
    fetchData (index, done) {
      setTimeout(() => {
        axios.get(process.env.VUE_APP_SERVER + '/api/records/limit/' + this.routeProps.limit + '/' + this.routeProps.skip, {
        })
          .then(response => {
            const array = response.data
            if (array.length > 0) {
              this.qrItems = this.qrItems.concat(array)
              this.routeProps.skip = this.routeProps.skip + this.routeProps.limit
              this.timeOut = 1000
              done()
            }
          })
          .catch(error => {
            console.log(error)
          })
      }, this.timeOut)
    },
    showQrImgLarge (src, id) {
      this.qrImgDialogSrc = src
      this.id = id
      this.qrId = process.env.VUE_APP_URL + '/?id=' + id
      this.showQrDialog = true
    },
    copyClipboard () {
      copyToClipboard(this.qrId)
        .then(() => {
          this.$q.notify({
            type: 'positive',
            position: 'top',
            message: 'Ссылка скопирована',
            timeout: 2500,
            actions: [{ icon: 'close', color: 'white' }]
          })
        })
        .catch(() => {
          console.log('Error copyng to clipboard!')
        })
    },
    showLoading () {
      this.$q.loading.show({
        spinnerSize: 140
      })
      this.timer = setTimeout(() => {
        this.$q.loading.hide()
        this.timer = undefined
      }, 500)
    },
    saveImg () {
      const link = document.createElement('a')
      link.href = this.qrImgDialogSrc
      link.download = 'qr-board.ru_' + this.id + '.png'
      link.click()
    }
  },
  mounted () {
    this.routeProps.skip = 0
    this.showLoading()
    this.fetchData()
    if (this.$route.query.id) {
      axios.get(process.env.VUE_APP_SERVER + '/api/records/find/' + this.$route.query.id, {
      })
        .then(response => {
          this.id = response.data.qrId
          this.qrId = process.env.VUE_APP_URL + '/?id=' + response.data.qrId
          this.qrImgDialogSrc = response.data.qrImgSrc
          this.showQrDialog = true
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  beforeDestroy () {
    if (this.timer !== undefined) {
      clearTimeout(this.timer)
      this.$q.loading.hide()
    }
  }
}
</script>

<style lang="scss">
  .my-hover-shadow:hover { box-shadow: $shadow-10; }
</style>
