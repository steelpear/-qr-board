<template>
  <div class="q-mb-md">
    <div class="row justify-start items-center content-center">
      <q-icon name="fab fa-skype" size="sm" color="grey-9" />
      <div class="text-h5 q-ml-sm">Skype ({{ modeTitle }})</div>
    </div>
    <q-separator class="q-mb-lg q-mt-xs" />
    <div :class="{ 'row wrap items-baseline' : $q.screen.gt.xs }">
      <div class="col-12 col-md q-mb-sm">
        <q-input
            v-model="skypeAccount"
            label="Аккаунт Skype"
            hint="Для конференции или мультичата разделяйте аккаунты точкой с запятой"
            outlined
            clearable
          >
          <template v-slot:prepend>
            <q-icon name="fas fa-user" />
          </template>
          </q-input>
      </div>
      <div class="q-ml-xs" :class="{ 'fit text-right' : $q.screen.lt.md }">
        <q-btn flat round icon="fas fa-mobile-alt" size="lg" :color="buttonToggle === 1 ? 'indigo' : 'grey-9'" @click="mode('call')" />
        <q-btn flat round icon="far fa-comment-alt" size="lg" :color="buttonToggle === 2 ? 'indigo' : 'grey-9'" @click="mode('chat')" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'qrSkype',
  data: () => ({
    buttonToggle: null,
    modeTitle: ''
  }),
  computed: {
    skypeAccount: {
      get () { return this.$store.getters['board/get_skype_data'] },
      set (value) { this.$store.commit('board/set_skype_data', value) }
    }
  },
  mounted () {
    this.buttonToggle = this.$store.getters['board/get_skype_mode']
    if (this.buttonToggle === 1) {
      this.modeTitle = 'звонок'
    } else {
      this.modeTitle = 'чат'
    }
    this.$watch(vm => [vm.buttonToggle], (val) => {
      this.$store.commit('board/set_skype_mode', this.buttonToggle)
    }, { immediate: true })
  },
  methods: {
    mode (e) {
      if (e === 'call') {
        this.buttonToggle = 1
        this.modeTitle = 'звонок'
      }
      if (e === 'chat') {
        this.buttonToggle = 2
        this.modeTitle = 'чат'
      }
    }
  }
}
</script>
