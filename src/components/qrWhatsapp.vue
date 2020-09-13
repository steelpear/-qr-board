<template>
  <div class="q-mb-md">
    <div class="row justify-start items-center content-center">
      <q-icon name="fab fa-whatsapp" size="sm" color="grey-9" />
      <div class="text-h5 q-ml-sm">WhatsApp</div>
    </div>
    <q-separator class="q-mb-lg q-mt-xs" />
    <div class="q-col-gutter-md">
      <div class="col-12">
        <q-input
          v-model="WhatsAppPhone"
          label="Номер телефона"
          outlined
          clearable
          prefix="+"
          mask="###############"
          hint="В международном формате"
        >
        <template v-slot:prepend>
          <q-icon name="fas fa-mobile-alt" />
        </template>
        </q-input>
      </div>
      <div class="col-12">
        <q-input
          v-model="WhatsAppMessage"
          type="textarea"
          label="Сообщение"
          outlined
          square
          clearable
          counter
          hint="Избегайте слишком длинных сообщений"
        >
        <template v-slot:prepend>
          <q-icon name="far fa-comment-alt" />
        </template>
        </q-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'qrWhatsapp',
  computed: {
    WhatsAppPhone: {
      get () { return this.$store.getters['board/get_whatsapp_phone'] },
      set (value) { this.$store.commit('board/set_whatsapp_phone', value) }
    },
    WhatsAppMessage: {
      get () { return this.$store.getters['board/get_whatsapp_message'] },
      set (value) { this.$store.commit('board/set_whatsapp_message', value) }
    }
  }
}
</script>
