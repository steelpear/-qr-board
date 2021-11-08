<template>
  <div>
    <div class="row justify-start items-center content-center">
      <q-icon name="far fa-address-card" size="sm" color="grey-9" />
      <div class="text-h5 q-ml-sm">Визитка VCard</div>
    </div>
    <q-separator class="q-mb-lg q-mt-xs" />
    <div class="q-col-gutter-sm row q-mb-md">
      <div class="col-12">
        <q-input
          v-model="vCardSurname"
          label="Фамилия"
          outlined
          clearable
        />
      </div>
      <div class="col-12 col-md-6">
        <q-input
          v-model="vCardName"
          label="Имя"
          outlined
          clearable
        />
      </div>
      <div class="col-12 col-md-6">
        <q-input
          v-model="vCardPatronymic"
          label="Отчество"
          outlined
          clearable
        />
      </div>
      <div class="col-12 col-md-4">
        <q-input
          v-model="vCardPhone"
          label="Телефон"
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
      <div class="col-12 col-md-4">
        <q-input
          ref="email"
          v-model="vCardEmail"
          label="E-Mail"
          hint="Электронная почта"
          outlined
          clearable
          :rules="[rules.email]"
          @blur="resetValidationEmail"
        >
        <template v-slot:prepend>
          <q-icon name="fas fa-at" />
        </template>
        </q-input>
      </div>
      <div class="col-12 col-md-4">
        <q-input
          v-model="vCardLink"
          label="Сайт"
          hint="Сайт, аккаунт в соцсетях и др."
          outlined
          clearable
        >
        <template v-slot:prepend>
          <q-icon name="fas fa-link" />
        </template>
        </q-input>
      </div>
      <div class="col-12 col-md-4">
        <q-input
          v-model="vCardPractice"
          label="Вид деятельности"
          hint="Профессия, хобби и др."
          outlined
          clearable
        >
        <template v-slot:prepend>
          <q-icon name="fas fa-user-tie" />
        </template>
        </q-input>
      </div>
      <div class="col-12 col-md-8">
        <q-input
          v-model="vCardNote"
          label="Примечание"
          hint="Короткое примечание"
          outlined
          clearable
        >
        <template v-slot:prepend>
          <q-icon name="far fa-sticky-note" />
        </template>
        </q-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'qrVcard',
  data: () => ({
    rules: {
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Неверный e-mail!'
      }
    }
  }),
  methods: {
    resetValidationEmail () {
      this.$refs.email.resetValidation()
    }
  },
  computed: {
    vCardSurname: {
      get () { return this.$store.getters['board/get_vcard_surname'] },
      set (value) { this.$store.commit('board/set_vcard_surname', value) }
    },
    vCardName: {
      get () { return this.$store.getters['board/get_vcard_name'] },
      set (value) { this.$store.commit('board/set_vcard_name', value) }
    },
    vCardPatronymic: {
      get () { return this.$store.getters['board/get_vcard_patronymic'] },
      set (value) { this.$store.commit('board/set_vcard_patronymic', value) }
    },
    vCardPhone: {
      get () { return this.$store.getters['board/get_vcard_phone'] },
      set (value) { this.$store.commit('board/set_vcard_phone', value) }
    },
    vCardEmail: {
      get () { return this.$store.getters['board/get_vcard_email'] },
      set (value) { this.$store.commit('board/set_vcard_email', value) }
    },
    vCardLink: {
      get () { return this.$store.getters['board/get_vcard_link'] },
      set (value) { this.$store.commit('board/set_vcard_link', value) }
    },
    vCardPractice: {
      get () { return this.$store.getters['board/get_vcard_practice'] },
      set (value) { this.$store.commit('board/set_vcard_practice', value) }
    },
    vCardNote: {
      get () { return this.$store.getters['board/get_vcard_note'] },
      set (value) { this.$store.commit('board/set_vcard_note', value) }
    }
  }
}
</script>
