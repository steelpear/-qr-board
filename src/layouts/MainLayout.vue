<template>
<div class="q-py-md" :class="{ 'q-px-xl' : $q.screen.gt.xs }">
  <q-layout view="hHh lpR fFf">

    <q-header class="bg-white text-black q-py-xs" :class="$q.screen.gt.xs ? 'q-px-xl' : 'q-px-md'">
      <div class="row text-grey-9 flex flex-center" :class="{'justify-between':$q.screen.lt.sm}">
        <div>
          <q-icon
            :size="$q.screen.gt.sm ? '4rem' : '3rem'"
            name="qr_code"
            color="grey-8"
            class="rotate-315 q-mt-xs q-mr-sm gt-xs"
          />
          <span class="text-h4 text-weight-medium text-grey-8 gt-sm">qr-board</span>
        </div>
        <q-space class="gt-sm" />
        <q-icon
          size="xl"
          name="casino"
          class="q-mx-xs roulette"
          color="grey-8"
          @click="randomQR"
        >
        <q-tooltip content-class="bg-white text-grey-9" content-style="font-size: 16px;border: 2px solid grey;" :offset="[5, 5]">
          Случайное объявление
        </q-tooltip>
        </q-icon>
        <q-space class="gt-xs" />
        <q-input class="gt-sm search" color="grey-8" outlined rounded v-model="qrSearch" dense clearable clear-icon="close" mask="aa######">
          <template v-slot:prepend>
            <q-icon name="search" size="md" />
          </template>
        </q-input>
        <q-btn class="lt-md" flat round icon="search" size="xl" padding="sm" @click="searchDialog = true" />
        <q-space class="gt-sm" />
        <q-btn to="/" flat round icon="qr_code" size="xl" padding="sm" :color="$route.path === '/' ? 'indigo': ''" />
        <q-btn to="/about" flat round icon="help_outline" size="xl" padding="sm" :color="$route.path === '/about' ? 'indigo': ''" />
        <q-btn to="/add" flat round icon="add_circle_outline" size="xl" padding="sm" :color="$route.path === '/add' ? 'indigo': ''" />
      </div>
    </q-header>

    <q-page-container>
      <q-page>
        <transition name="fade">
          <router-view />
        </transition>
      </q-page>
    </q-page-container>

    <q-footer bordered class="bg-indigo text-white">
      <q-toolbar class="glossy text-caption text-weight-light" style="min-height:40px;">
        <q-space />
        <ShareNetwork
          v-for="network in networks"
          :network="network.network"
          :key="network.network"
          :url="sharing.url"
          :title="sharing.title"
          :description="sharing.description"
          :quote="sharing.quote"
          :hashtags="sharing.hashtags"
          :twitterUser="sharing.twitterUser"
        >
        <q-icon :name="network.icon" size="sm" color="grey-12" class="cursor-pointer" :class="$q.screen.gt.xs ? 'q-mx-sm' : 'q-mx-xs'" />
        </ShareNetwork>

        <q-space />
        <div>&copy; qr-board {{ new Date().getFullYear() }}</div>
      </q-toolbar>
    </q-footer>

    <q-page-scroller position="bottom-right" :scroll-offset="400" :duration=400 :offset="[18, 18]" class="gt-sm">
      <q-btn fab outline icon="arrow_upward" color="grey-9" />
    </q-page-scroller>

  </q-layout>

<q-dialog v-model="bottomSheet" position="bottom" full-width square>
  <q-card>
    <q-card-section class="q-pa-md row items-center content-center" :class="$q.screen.gt.sm ? 'justify-between' : 'justify-center'">
      <div class="text-justify">На этом сайте используются файлы <span class="text-weight-bold">cookie</span>. Продолжая просматривать его, Вы соглашаетесь с этим. Чтобы узнать больше о файлах <span class="text-weight-bold">cookie</span>&nbsp;<router-link to="/policy" class="text-weight-bold text-indigo">нажмите здесь</router-link>.</div>
      <q-btn class="float-right" flat label="OK, понятно" color="indigo" v-close-popup @click="setCookie" />
    </q-card-section>
  </q-card>
</q-dialog>

<q-dialog v-model="errorDialog" square>
  <q-card dark>
    <h5 class="text-center q-mb-none">Такого объявления нет<q-icon class="q-ml-xs" name="sentiment_dissatisfied" size="lg" /></h5>
    <q-card-section class="q-pt-lg q-px-lg q-pb-none row items-center content-center text-body1 justify-center">
      <div class="text-justify">Пожалуйста, проверьте раскладку клавиатуры и попробуйте ввести номер ещё раз. Номер объявления должен содержать префикс <span class="text-weight-bold">"qr"</span> и шестизначное число.</div>
      <q-badge class="text-justify text-h6 q-mt-lg q-px-lg">Например: qr123456</q-badge>
    </q-card-section>
    <q-btn class="float-right q-ma-sm" flat label="OK" color="white" v-close-popup @click="qrSearch = ''" />
  </q-card>
</q-dialog>

<q-dialog v-model="searchDialog" square>
  <q-card>
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">Поиск объявления</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section class="items-center q-pb-lg q-pt-sm">
    <q-input color="indigo" outlined rounded v-model="qrSearch" label="Поиск" clearable clear-icon="close" mask="aa######">
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
    </q-input>
    </q-card-section>
  </q-card>
</q-dialog>

<qr-dialog
  :show="dialogProps.showQrDialog"
  :img="dialogProps.qrImgDialogSrc"
  :url="dialogProps.qrId"
  :id="dialogProps.id"
/>

</div>
</template>

<script>
import Vue from 'vue'
import VueSocialSharing from 'vue-social-sharing'
import qrDialog from '../components/qrDialog.vue'
Vue.use(VueSocialSharing)

export default {
  components: { qrDialog },
  data: () => ({
    bottomSheet: true,
    errorDialog: false,
    searchDialog: false,
    qrSearch: '',
    sharing: {
      url: process.env.VUE_APP_URL,
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
  computed: {
    dialogProps () { return this.$store.getters['board/get_qrDialogVals'] }
  },
  methods: {
    setCookie () {
      this.$q.cookies.set('cookie_assent', 'cookie_session', { expires: '30d' })
    },
    randomQR () {
      this.$axios.get(process.env.VUE_APP_SERVER + '/api/records/random/' + 1, {
      })
        .then(response => {
          const vals = {
            qrImgDialogSrc: response.data[0].qrImgSrc,
            id: response.data[0].qrId,
            qrId: process.env.VUE_APP_URL + '/?id=' + response.data[0].qrId,
            showQrDialog: true
          }
          this.$store.dispatch('board/set_qrDialogAct', vals)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  watch: {
    qrSearch (val) {
      if (val && val.length === 8) {
        this.$axios.get(process.env.VUE_APP_SERVER + '/api/records/find/' + val, {
        })
          .then(response => {
            const vals = {
              qrImgDialogSrc: response.data.qrImgSrc,
              id: response.data.qrId,
              qrId: process.env.VUE_APP_URL + '/?id=' + response.data.qrId,
              showQrDialog: true
            }
            this.$store.dispatch('board/set_qrDialogAct', vals)
            setTimeout(() => {
              this.qrSearch = ''
            }, 300)
          })
          .catch(error => {
            console.log(error)
            this.errorDialog = true
          })
      }
    }
  },
  mounted () {
    const settings = this.$store.getters['board/GET_SETTINGS']
    if (this.$q.cookies.has('cookie_assent') || !settings.switchCookie) {
      this.bottomSheet = false
    } else { this.bottomSheet = true }
  }
}
</script>

<style lang="scss">
  a {text-decoration: none;}
  .roulette {
    cursor:pointer;
    transition: transform 1s ease-in-out;
    &:hover {
      transform: rotate(720deg);
    }
  }
  .search {
    max-width: 213px;
    border: 3px solid;
    border-radius: 28px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .q-fab--opened .q-fab__actions {margin-left: 3px;}
</style>
