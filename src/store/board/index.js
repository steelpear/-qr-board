const state = {
  password: '',
  settings: null,
  qrTab: 'sms',
  smsData: {
    smsPhone: '',
    smsText: '',
    eMail: '',
    emailSubject: '',
    emailMessage: '',
    titleBtn: 1
  },
  textData: ''
}

const getters = {
  GET_PASSWORD: state => state.password,
  GET_SETTINGS: state => state.settings,
  GET_QRTAB: state => state.qrTab,
  GET_SMS_PHONE: state => state.smsData.smsPhone,
  GET_SMS_TEXT: state => state.smsData.smsText,
  GET_SMS_EMAIL: state => state.smsData.eMail,
  GET_SMS_EMAIL_SUBJECT: state => state.smsData.emailSubject,
  GET_SMS_EMAIL_MESSAGE: state => state.smsData.emailMessage,
  GET_SMS_TITLE_BTN: state => state.smsData.titleBtn,
  GET_SMS: (state) => {
    let sms = ''
    if (state.smsData.titleBtn === 1) {
      sms = 'smsto:+' + state.smsData.smsPhone + ':' + state.smsData.smsText
    } else if (state.smsData.titleBtn === 2) {
      sms = 'tel:+' + state.smsData.smsPhone
    } else if (state.smsData.titleBtn === 3) {
      sms = 'mailto:' + state.smsData.eMail + '?subject=' + state.smsData.emailSubject + '&body=' + state.smsData.emailMessage
    } else {
      sms = ''
    }
    return sms
  },
  GET_TEXT: state => state.textData
}

const mutations = {
  SET_PASSWORD (state, payload) { state.password = payload },
  SET_SETTINGS (state, payload) { state.settings = payload },
  SET_QRTAB (state, payload) { state.qrTab = payload },
  SET_SMS_PHONE: (state, payload) => { state.smsData.smsPhone = payload },
  SET_SMS_TEXT: (state, payload) => { state.smsData.smsText = payload },
  SET_SMS_EMAIL: (state, payload) => { state.smsData.eMail = payload },
  SET_SMS_EMAIL_SUBJECT: (state, payload) => { state.smsData.emailSubject = payload },
  SET_SMS_EMAIL_MESSAGE: (state, payload) => { state.smsData.emailMessage = payload },
  SET_SMS_TITLE_BTN: (state, payload) => { state.smsData.titleBtn = payload },
  SET_TEXT (state, payload) { state.textData = payload }
}

const actions = {
  //
}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
}
