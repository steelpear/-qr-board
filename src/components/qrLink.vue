<template>
  <div>
    <div class="row justify-start items-center content-center">
      <q-icon name="fas fa-link" size="sm" color="grey-9" />
      <div class="text-h5 q-ml-sm">Ссылка</div>
    </div>
    <q-separator class="q-mb-lg q-mt-xs" />
    <div class="col-12">
      <q-input
          v-model="LinkData"
          label="Ссылка на интернет-ресурс"
          hint="С указанием интернет-протокола. &quot;http://&quot;, &quot;https://&quot; и др. Например: &quot;https://qr-board.ru&quot;"
          outlined
          clearable
        >
        <template v-slot:prepend>
          <q-icon name="link" />
        </template>
        </q-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'qrLink',
  computed: {
    LinkData: {
      get () { return this.$store.getters['board/get_link'] },
      set (value) { this.$store.commit('board/set_link', value) }
    }
  }
}
</script>
