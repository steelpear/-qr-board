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
  textData: '',
  vcardData: {
    vCardSurname: '',
    vCardName: '',
    vCardPatronymic: '',
    vCardPhone: '',
    vCardEmail: '',
    vCardLink: '',
    vCardPractice: '',
    vCardNote: ''
  },
  geoData: [55.75115178233711, 37.61898136805887]
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
  GET_TEXT: state => state.textData,
  get_vcard_surname: state => state.vcardData.vCardSurname,
  get_vcard_name: state => state.vcardData.vCardName,
  get_vcard_patronymic: state => state.vcardData.vCardPatronymic,
  get_vcard_phone: state => state.vcardData.vCardPhone,
  get_vcard_email: state => state.vcardData.vCardEmail,
  get_vcard_link: state => state.vcardData.vCardLink,
  get_vcard_practice: state => state.vcardData.vCardPractice,
  get_vcard_note: state => state.vcardData.vCardNote,
  get_vcard: (state) => {
    let vcard = ''
    if (state.vcardData.vCardName || state.vcardData.vCardSurname || state.vcardData.vCardPatronymic || state.vcardData.vCardPhone || state.vcardData.vCardEmail || state.vcardData.vCardLink || state.vcardData.vCardPractice || state.vcardData.vCardNote) {
      vcard = 'BEGIN:VCARD\nVERSION:4.0\r\nFN:' + state.vcardData.vCardSurname + ' ' + state.vcardData.vCardName + ' ' + state.vcardData.vCardPatronymic + '\r\nN:' + state.vcardData.vCardSurname + ';' + state.vcardData.vCardName + ';' + state.vcardData.vCardPatronymic + '\r\nTEL;VALUE=uri:tel:' + '+' + state.vcardData.vCardPhone + '\r\nEMAIL:' + state.vcardData.vCardEmail + '\r\nTITLE:' + state.vcardData.vCardPractice + '\r\nNOTE:' + state.vcardData.vCardNote + '\r\nURL:' + state.vcardData.vCardLink + '\r\nEND:VCARD'
    }
    return vcard
  },
  get_geo: state => state.geoData,
  get_geo_data: (state) => {
    const geo = 'GEO:' + state.geoData
    return geo
  }
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
  SET_TEXT (state, payload) { state.textData = payload },
  set_vcard_surname: (state, payload) => { state.vcardData.vCardSurname = payload },
  set_vcard_name: (state, payload) => { state.vcardData.vCardName = payload },
  set_vcard_patronymic: (state, payload) => { state.vcardData.vCardPatronymic = payload },
  set_vcard_phone: (state, payload) => { state.vcardData.vCardPhone = payload },
  set_vcard_email: (state, payload) => { state.vcardData.vCardEmail = payload },
  set_vcard_link: (state, payload) => { state.vcardData.vCardLink = payload },
  set_vcard_practice: (state, payload) => { state.vcardData.vCardPractice = payload },
  set_vcard_note: (state, payload) => { state.vcardData.vCardNote = payload },
  set_geo: (state, payload) => { state.geoData = payload }
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
