<template>
  <div class="q-mb-md">
    <div class="row justify-start items-center content-center">
      <q-icon name="fab fa-youtube" size="sm" color="grey-9" />
      <div class="text-h5 q-ml-sm">YouTube ({{ modeTitle }})</div>
    </div>
    <q-separator class="q-mb-lg q-mt-xs" />
    <div :class="{ 'row wrap items-baseline' : $q.screen.gt.xs }">
      <div class="col-12 col-md q-mb-sm">
        <q-input
            v-model="youtube"
            :label="buttonToggle === 1 ? 'Видеоролик' : 'Канал'"
            :hint="buttonToggle === 1 ? 'ID видеоролика. Например A8N4_cjLXH8' : 'Название канала'"
            outlined
            clearable
          >
          <template v-slot:prepend>
            <q-icon :name="buttonToggle === 1 ? 'fas fa-photo-video' : 'fas fa-video'" />
          </template>
          </q-input>
      </div>
      <div class="q-ml-xs" :class="{ 'fit text-right' : $q.screen.lt.md }">
        <q-btn flat round icon="fas fa-photo-video" size="lg" :color="buttonToggle === 1 ? 'indigo' : 'grey-9'" @click="mode('clip')" />
        <q-btn flat round icon="fas fa-video" size="lg" :color="buttonToggle === 2 ? 'indigo' : 'grey-9'" @click="mode('channel')" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'qrYoutube',
  data: () => ({
    buttonToggle: null,
    modeTitle: ''
  }),
  computed: {
    youtube: {
      get () { return this.$store.getters['board/get_youtube_data'] },
      set (value) { this.$store.commit('board/set_youtube_data', value) }
    }
  },
  mounted () {
    this.buttonToggle = this.$store.getters['board/get_youtube_mode']
    if (this.buttonToggle === 1) {
      this.modeTitle = 'ролик'
    } else {
      this.modeTitle = 'канал'
    }
    this.$watch(vm => [vm.buttonToggle], (val) => {
      this.$store.commit('board/set_youtube_mode', this.buttonToggle)
    }, { immediate: true })
  },
  methods: {
    mode (e) {
      if (e === 'clip') {
        this.buttonToggle = 1
        this.modeTitle = 'ролик'
      }
      if (e === 'channel') {
        this.buttonToggle = 2
        this.modeTitle = 'канал'
      }
    }
  }
}
</script>
