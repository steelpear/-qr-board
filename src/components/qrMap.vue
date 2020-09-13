<template>
  <div>
    <div class="row justify-start items-center content-center">
      <q-icon name="fas fa-map-marked-alt" size="sm" color="grey-9" />
      <div class="text-h5 q-ml-sm">Географические координаты</div>
      <q-space />
      <q-btn flat round icon="close" @click="resetMap" />
    </div>
    <q-separator class="q-mb-lg q-mt-xs" />
    <div>
      <yandex-map
        :apiKey="settings.YandexMapkey"
        :settings="mapSettings"
        :coords="coords"
        zoom="10"
        style="height: 220px;"
        :behaviors="['drag']"
        :controls="['default']"
        class="shadow-4"
        @click="clickOnMap"
      >
      <ymap-marker
        marker-id="123"
        :coords="coords"
        :icon="{color: 'blue', glyph: 'dot'}"
      />
      </yandex-map>
    </div>
    <div class="col-12 q-mt-lg">
      <q-input
        v-model="handleCoords"
        :label="'Текущие координаты: ' + coords"
        hint="Широта и долгота через запятую. Например 55.755814,37.617635"
        outlined
        clearable
      >
      <template v-slot:prepend>
        <q-icon name="fas fa-map-marker-alt" />
      </template>
      </q-input>
    </div>
  </div>
</template>

<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps'
export default {
  name: 'qrMap',
  components: {
    yandexMap,
    ymapMarker
  },
  data: () => ({
    handleCoords: '',
    mapSettings: {
      lang: 'ru_RU',
      coordorder: 'latlong',
      version: '2.1'
    }
  }),
  computed: {
    coords: {
      get () { return this.$store.getters['board/get_geo'] },
      set (value) { this.$store.commit('board/set_geo', value) }
    },
    settings: {
      get () { return this.$store.getters['board/GET_SETTINGS'] }
    }
  },
  watch: {
    handleCoords (value) {
      const regex = /^-?(?:0|0\.\d*|[1-9]\d*\.?\d*)/
      let val = null
      if (value !== '' && value.match(regex)) {
        val = value.split(',')
        if (val.length > 1) { this.$store.commit('board/set_geo', val) }
      }
    }
  },
  methods: {
    clickOnMap (e) {
      this.$store.commit('board/set_geo', e.get('coords'))
    },
    resetMap () {
      this.handleCoords = ''
      this.$store.commit('board/set_geo', [55.75115178233711, 37.61898136805887])
    }
  }
}
</script>
