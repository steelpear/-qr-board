<template>
  <q-layout view="hHh lpR fFf">

    <q-page-container class="fullscreen bg-blue text-white text-center q-pa-sm flex flex-center">
      <div>
        <div style="font-size: 25vh">
          404
        </div>

        <div :class="$q.screen.lt.sm ? 'text-h4' : 'text-h3'" style="opacity:.6">
          Oops. Такой страницы не существует...
        </div>

        <q-btn
          class="q-mt-lg"
          color="white"
          text-color="blue"
          unelevated
          to="/"
          label="На главную"
        />
      </div>
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  name: 'Error404',
  meta: {
    title: 'Страница не существует',
    titleTemplate: title => `${title} - QR-Board - доска объявлений`
  }
}
</script>
