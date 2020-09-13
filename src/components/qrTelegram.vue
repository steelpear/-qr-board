<template>
  <div class="q-mb-md">
    <div class="row justify-start items-center content-center">
      <q-icon name="fab fa-telegram-plane" size="sm" color="grey-9" />
      <div class="text-h5 q-ml-sm">Telegram</div>
    </div>
    <q-separator class="q-mb-lg q-mt-xs" />
    <div class="col-12">
      <q-input
          v-model="telegram"
          label="Аккаунт Telegram"
          hint="Аккаунт или канал Telegram (без символа @)"
          outlined
          clearable
        >
        <template v-slot:prepend>
          <q-icon name="fab fa-telegram" />
        </template>
        </q-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'qrTelegram',
  computed: {
    telegram: {
      get () { return this.$store.getters['board/get_telegram_data'] },
      set (value) { this.$store.commit('board/set_telegram_data', value) }
    }
  }
}
</script>
