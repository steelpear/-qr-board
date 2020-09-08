<template>
  <div>
    <div class="row justify-start items-center content-center">
      <q-icon :name="titleIcon" size="sm" color="grey-9" />
      <div class="text-h5 q-ml-sm cursor-pointer" :class="{'text-indigo': titleBtn == 1}" @click="mode('sms')">SMS</div>
      <span class="text-h5 q-ma-xs">/</span>
      <div class="text-h5 cursor-pointer" :class="{'text-indigo': titleBtn == 2}" @click="mode('call')">Звонок</div>
      <span class="text-h5 q-ma-xs">/</span>
      <div class="text-h5 cursor-pointer" :class="{'text-indigo': titleBtn == 3}" @click="mode('email')">E-Mail</div>
    </div>
    <q-separator class="q-mb-lg q-mt-xs" />
    <div class="q-col-gutter-sm row q-mb-md">
      <div class="col-12" :class="titleBtn === 1 ? 'col-md-5' : 'col-md-7'">
        <q-input
          v-model="smsPhone"
          label="Номер телефона"
          outlined
          clearable
          prefix="+"
          mask="###############"
          hint="В международном формате"
          :disable="titleBtn === 3"
          :filled="titleBtn === 1 || titleBtn === 2"
        >
        <template v-slot:prepend>
          <q-icon name="fas fa-mobile-alt" />
        </template>
        </q-input>
      </div>
      <div class="col-12" :class="titleBtn === 1 ? 'col-md-7' : 'col-md-5'">
        <q-input
          v-model="smsText"
          label="Сообщение"
          type="textarea"
          hint="Избегайте слишком длинных сообщений."
          outlined
          clearable
          counter
          rows="1"
          :disable="titleBtn !=1"
          :filled="titleBtn === 1"
        >
        <template v-slot:prepend>
          <q-icon name="far fa-comment" />
        </template>
        </q-input>
      </div>
    </div>
    <div class="q-col-gutter-sm row q-mb-md">
      <div class="col-12 col-md">
        <q-input
          ref="email"
          v-model="eMail"
          label="E-Mail"
          hint="Электронная почта"
          outlined
          clearable
          :filled="titleBtn === 3"
          :disable="titleBtn != 3"
          :rules="[rules.email]"
          @blur="resetValidationEmail"
        >
        <template v-slot:prepend>
          <q-icon name="fas fa-at" />
        </template>
        </q-input>
      </div>
      <div class="col-12 col-md">
        <q-input
          v-model="emailSubject"
          label="Тема письма"
          hint="Избегайте слишком длинных сообщений."
          outlined
          counter
          clearable
          :filled="titleBtn === 3"
          :disable="titleBtn != 3"
        >
        <template v-slot:prepend>
          <q-icon name="far fa-envelope-open" />
        </template>
        </q-input>
      </div>
    </div>
    <div class="q-my-md">
      <q-input
        v-model="emailMessage"
        type="textarea"
        label="Текст письма"
        outlined
        clearable
        counter
        hint="Помните - слишком длинный текст может отрицательно сказаться на правильном распознавании кода."
        :filled="titleBtn === 3"
        :disable="titleBtn != 3"
      >
      <template v-slot:prepend>
          <q-icon name="fas fa-envelope-open-text" />
        </template>
      </q-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'qrSms',
  data () {
    return {
      titleBtn: '',
      titleIcon: 'fas fa-sms',
      rules: {
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Неверный e-mail!'
        }
      }
    }
  },
  methods: {
    mode (e) {
      if (e === 'sms') {
        this.titleIcon = 'fas fa-sms'
        this.titleBtn = 1
      } else if (e === 'call') {
        this.titleIcon = 'fas fa-phone-alt'
        this.titleBtn = 2
      } else {
        this.titleIcon = 'fas fa-at'
        this.titleBtn = 3
      }
    },
    resetValidationEmail () {
      this.$refs.email.resetValidation()
    }
  },
  watch: {
    titleBtn (value) {
      this.$store.commit('board/SET_SMS_TITLE_BTN', value)
    }
  },
  mounted () {
    this.titleBtn = this.$store.getters['board/GET_SMS_TITLE_BTN']
  },
  computed: {
    smsPhone: {
      get () { return this.$store.getters['board/GET_SMS_PHONE'] },
      set (value) { this.$store.commit('board/SET_SMS_PHONE', value) }
    },
    smsText: {
      get () { return this.$store.getters['board/GET_SMS_TEXT'] },
      set (value) { this.$store.commit('board/SET_SMS_TEXT', value) }
    },
    eMail: {
      get () { return this.$store.getters['board/GET_SMS_EMAIL'] },
      set (value) { this.$store.commit('board/SET_SMS_EMAIL', value) }
    },
    emailSubject: {
      get () { return this.$store.getters['board/GET_SMS_EMAIL_SUBJECT'] },
      set (value) { this.$store.commit('board/SET_SMS_EMAIL_SUBJECT', value) }
    },
    emailMessage: {
      get () { return this.$store.getters['board/GET_SMS_EMAIL_MESSAGE'] },
      set (value) { this.$store.commit('board/SET_SMS_EMAIL_MESSAGE', value) }
    }
  }
}
</script>
