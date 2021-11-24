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

  </div>
</template>

<script>
export default {
  meta: {
    title: 'Главная',
    titleTemplate: title => `${title} - QR-Board - доска объявлений`
  },
  name: 'PageIndex',
  data: () => ({
    qrItems: [],
    timeOut: 0,
    routeProps: {
      limit: 50,
      skip: 0
    }
  }),
  methods: {
    fetchData (index, done) {
      setTimeout(async () => {
        const response = await this.$axios.get(process.env.VUE_APP_SERVER + '/api/records/limit/' + this.routeProps.limit + '/' + this.routeProps.skip)
        const array = response.data
        if (array.length > 0) {
          this.qrItems = this.qrItems.concat(array)
          this.routeProps.skip = this.routeProps.skip + this.routeProps.limit
          this.timeOut = 1000
          done()
        }
      }, this.timeOut)
    },
    showQrImgLarge (src, id) {
      const vals = {
        qrImgDialogSrc: src,
        id: id,
        qrId: process.env.VUE_APP_URL + '/?id=' + id,
        showQrDialog: true
      }
      this.$store.dispatch('board/set_qrDialogAct', vals)
    },
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
  async mounted () {
    this.routeProps.skip = 0
    this.showLoading()
    this.fetchData()
    if (this.$route.query.id) {
      const response = await this.$axios.get(process.env.VUE_APP_SERVER + '/api/records/find/' + this.$route.query.id)
      const vals = {
        qrImgDialogSrc: response.data.qrImgSrc,
        id: response.data.qrId,
        qrId: process.env.VUE_APP_URL + '/?id=' + response.data.qrId,
        showQrDialog: true
      }
      this.$store.dispatch('board/set_qrDialogAct', vals)
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
