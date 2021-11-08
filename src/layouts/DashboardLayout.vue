<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-9 text-white">
    <q-header elevated class="bg-grey-6">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title class="row">
          QR-Board - панель управления - {{ $route.name }}
          <q-space />
          <q-btn flat icon="fas fa-sign-out-alt" @click="loginOut" />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      content-class="bg-grey-8"
    >
      <q-list dark class="q-mt-lg">

        <q-item class="text-white" clickable to="/admin">
          <q-item-section avatar>
            <q-icon name="fas fa-cogs" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-subtitle1">Общие настройки</q-item-label>
          </q-item-section>
        </q-item>

        <q-item class="text-white" clickable to="/admin/ads">
          <q-item-section avatar>
            <q-icon name="fas fa-qrcode" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-subtitle1">Объявления</q-item-label>
          </q-item-section>
        </q-item>

        <q-item class="text-white" clickable to="/admin/auth">
          <q-item-section avatar>
            <q-icon name="fas fa-key" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-subtitle1">Авторизация</q-item-label>
          </q-item-section>
        </q-item>

        <router-link to="/">
        <q-item class="text-white fixed-bottom q-mb-lg" clickable>
          <q-item-section avatar>
            <q-icon name="fas fa-home" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-subtitle1">Перейти на сайт</q-item-label>
          </q-item-section>
        </q-item>
        </router-link>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'DashboardLayout',
  data: () => ({
    leftDrawerOpen: false
  }),
  created () {
    if (!this.$q.cookies.get('login')) {
      this.$router.push({ path: '/login' })
    }
  },
  methods: {
    loginOut: () => {
      this.$q.cookies.remove('login')
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style lang="scss">
  .q-router-link--exact-active {
    color: white;
    background: $grey-7;
    i {color: white;}
  }
</style>
