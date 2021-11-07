<template>
  <div :class="$q.screen.gt.sm ? 'q-px-xl' : 'q-px-lg'">
    <div class="text-center text-h3 q-my-lg">Что такое QR-Board?</div>
    <p class="text-grey-9 text-justify" style="font-size: 18px;"><span class="text-bold">QR-Board</span> - это доска объявлений в формате QR-кода. Вы можете разместить своё объявление в популярных QR-code форматах - географические координаты, визитка VCard, ссылка на YouTube - канал, подключение к Wi-Fi, ссылка на интернет-ресурс и других. Напоминаем, что всю ответственность за содержимое объявления берёт на себя его податель.</p>
    <q-timeline :layout="layout" color="secondary" class="q-my-xl">
      <q-timeline-entry
        title="Опубликовать"
        side="left"
        icon="fas fa-check"
        color="orange"
      >
        <div class="text-grey-9" style="font-size: 18px;">Здесь Вы можете разместить своё объявление в формате QR-кода.</div>
      </q-timeline-entry>

      <q-timeline-entry
        title="Поделиться"
        side="right"
        icon="fas fa-check"
        color="indigo"
      >
        <div class="text-grey-9" style="font-size: 18px;">Размещённому объявлению присваивается уникальный номер, которым можно поделиться удобным для Вас способом.</div>
      </q-timeline-entry>

      <q-timeline-entry
        title="Сканировать"
        side="left"
        icon="fas fa-check"
        color="green"
      >
        <div class="text-grey-9" style="font-size: 18px;">Зная номер объявления, можно найти его и отсканировать смартфоном.</div>
      </q-timeline-entry>
    </q-timeline>
    <div class="text-center text-h3 q-my-lg">Что такое QR-код?</div>
    <q-img src="~assets/pic.png" style="width:250px; float:right;" class="gt-sm shadow-9 q-ml-lg" />
    <p class="text-grey-9 text-justify" style="font-size: 18px;"><span class="text-bold">QR-код</span> (Quick Response Code) был придуман в 1994 году в Японии для нужд автомобильной промышленности для маркировки и учёта деталей. Штрих-код, который использовался до этого, перестал справляться с возросшим объёмом информации.</p>
    <p class="text-grey-9 text-justify" style="font-size: 18px;">С улучшением качества камер смартфонов QR-код получал всё более широкое распространение и в итоге шагнул далеко за пределы автоконцернов. QR-код способен в графическом виде компактно зашифровать довольно значительный объём информации – текст, ссылку, визитку, географическое положение, параметры подключения к Wi-Fi сети и многое другое.</p>
    <p class="text-grey-9 text-justify" style="font-size: 18px;">Расшифровать информацию, содержащуюся в QR-коде, можно при помощи специального приложения, установленного на смартфоне – сканера QR-code. Создать свой QR-код Вы можете на этом сайте, а также с помощью разнообразных online-сервисов и программ.</p>
    <div class="text-center text-h4 q-my-lg">Некоторые сканеры QR-кода</div>
    <div class="text-center q-mb-lg">
      <q-chip v-if="$q.screen.gt.xs" color="indigo" text-color="white" size="28px" icon="phone_android">Для Android</q-chip>
      <q-chip v-else color="indigo" text-color="white" size="28px">Для Android</q-chip>
    </div>
    <div class="fit row justify-center items-center content-center">
      <q-img src="~assets/1.webp" style="width: 100px; height: 100px;" />
      <div class="col text-center">
        <a class="text-h6" href="https://play.google.com/store/apps/details?id=com.teacapps.barcodescanner" target="_blank">Сканер QR и штрих-кодов</a>
        <p class="text-overline">TeaCapps</p>
      </div>
      <q-img src="~assets/1.png" style="width: 130px;" class="gt-sm" />
    </div>
    <q-separator class="q-my-lg" />
    <div class="fit row justify-center items-center content-center">
      <q-img src="~assets/2.webp" style="width: 100px; height: 100px;" />
      <div class="col text-center">
        <a class="text-h6" href="https://play.google.com/store/apps/details?id=com.google.zxing.client.android" target="_blank">Barcode Scanner</a>
        <p class="text-overline">ZXing Team</p>
      </div>
      <q-img src="~assets/2.png" style="width: 130px;" class="gt-sm" />
    </div>
    <div class="row justify-center items-center content-center q-mt-lg">
      <q-icon name="phone_android" size="xl" color="grey-9" class="q-mr-sm gt-sm" />
      <div class="col text-grey-9 text-justify" style="font-size: 18px;">Некоторые производители смартфонов на Android предустанавливают на свои модели приложения для считывания QR и штрих-кодов. Изучите инструкцию пользователя - возможно Ваш смартфон уже обладает необходимым функционалом.</div>
    </div>
    <div class="text-center q-my-lg">
      <q-chip v-if="$q.screen.gt.xs" color="orange" text-color="white" size="28px" icon="phone_iphone">Для iPhone</q-chip>
      <q-chip v-else color="orange" text-color="white" size="28px">Для iPhone</q-chip>
    </div>
    <div class="fit row justify-center items-center content-center">
      <q-img src="~assets/3.png" style="width: 100px; height: 100px;" />
      <div class="col text-center">
        <a class="text-h6" href="https://apps.apple.com/ru/app/qr-%D1%81%D0%BA%D0%B0%D0%BD%D0%B5%D1%80-%D1%88%D1%82%D1%80%D0%B8%D1%85-%D0%BA%D0%BE%D0%B4%D0%B0-qr-%D0%BA%D0%BE%D0%B4/id1262922153" target="_blank">Сканер QR и штрих-кодов</a>
        <p class="text-overline">TALENT ACQUISITIONS PTY LTD</p>
      </div>
      <q-img src="~assets/33.png" style="width: 130px;" class="gt-sm" />
    </div>
    <div class="row justify-center items-center content-center q-mt-lg">
      <q-icon name="phone_iphone" size="xl" color="grey-9" class="q-mr-sm gt-sm" />
      <div class="col text-grey-9 text-justify" style="font-size: 18px;">Начиная с iOS 11 в камере iPhone и iPad появилась функция QR-ридера, предназначенная для считывания QR и штрих-кодов.</div>
    </div>
    <div class="row justify-center items-center">
      <q-icon name="far fa-file-word" size="sm" color="grey-9" class="q-mr-sm gt-sm" />
      <a class="text-h6 text-center" href="https://support.apple.com/ru-ru/HT208843" target="_blank">Инструкция по сканированию</a>
    </div>
    <q-separator class="q-my-lg" />
    <div class="row justify-center items-center">
      <q-icon name="fas fa-cookie-bite" size="sm" color="orange" class="q-mr-sm gt-sm" />
      <router-link class="text-h6 text-center" to="/policy">Использование файлов cookie и политика конфиденциальности</router-link>
    </div>
    <q-separator class="q-my-lg" />
    <div class="text-center text-h4 q-my-lg">Контакты и прочее</div>
    <div class="row justify-center items-center content-center q-mt-lg">
      <q-icon name="fas fa-at" size="md" color="grey-9" class="q-mr-sm gt-sm" />
      <div v-if="settings" class="col text-grey-9 text-h5"><a :href="'mailto:' + settings.adminMail" target="_blank">{{ settings.adminMail }}</a> - для пожеланий и предложений.</div>
    </div>
    <div class="row justify-center items-center content-center q-mt-md">
      <q-icon name="fas fa-link" size="md" color="grey-9" class="q-mr-sm gt-sm" />
      <div class="col text-grey-9 text-h5"><a href="https://qr-generator.ru/" target="_blank">QR-Generator</a> - бесплатный генератор QR-кодов.</div>
    </div>
    <div class="row justify-center items-center content-center q-mt-md">
      <q-icon name="fas fa-link" size="md" color="grey-9" class="q-mr-sm gt-sm" />
      <div class="col text-grey-9 text-h5"><a href="https://all-letters.ru/" target="_blank">Письма</a> - письма, поздравления и благодарности с добрыми словами и картинками.</div>
    </div>
    <q-separator class="q-my-lg" />
    <div v-if="settings && settings.switchDonate" class="row" :class="{'q-gutter-lg justify-between' : $q.screen.gt.sm}">
      <div class="col-12 col-md-6">
        <p class="text-grey-9 text-justify" style="font-size: 18px;"><span class="text-bold">QR-Board</span> совершенно бесплатна, но если у Вас появилось желание поддержать проект - Вы можете либо сделать небольшое добровольное пожертвование на развитие сайта (оплату хостинга, доменного имени и др.) либо поделиться информацией о нём со своими друзьями в социальных сетях.</p>
        <p class="text-grey-9 text-right" style="font-size: 18px;">Либо и то и другое) Спасибо.</p>
      </div>
      <div class="col-12 col-md-5">
        <iframe
          src="https://yoomoney.ru/quickpay/shop-widget?writer=seller&targets=%D0%94%D0%BE%D0%B1%D1%80%D0%BE%D0%B2%D0%BE%D0%BB%D1%8C%D0%BD%D0%BE%D0%B5%20%D0%BF%D0%BE%D0%B6%D0%B5%D1%80%D1%82%D0%B2%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5&targets-hint=&default-sum=100&button-text=12&payment-type-choice=on&mobile-payment-type-choice=on&hint=&successURL=&quickpay=shop&account=410011206433601"
          width="100%"
          height="270"
          frameborder="0"
          allowtransparency="true"
          scrolling="no"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  meta: {
    title: 'Информация',
    titleTemplate: title => `${title} - QR-Board - доска объявлений`
  },
  name: 'PageAbout',
  computed: {
    layout () {
      return this.$q.screen.lt.sm ? 'dense' : (this.$q.screen.lt.md ? 'comfortable' : 'loose')
    },
    settings () {
      return this.$store.getters['board/GET_SETTINGS']
    }
  },
  methods: {
    showLoading () {
      this.$q.loading.show({
        spinnerSize: 140
      })
      this.timer = setTimeout(() => {
        this.$q.loading.hide()
        this.timer = undefined
      }, 500)
    }
  },
  mounted () {
    this.showLoading()
  },
  beforeDestroy () {
    if (this.timer !== undefined) {
      clearTimeout(this.timer)
      this.$q.loading.hide()
    }
  }
}
</script>
