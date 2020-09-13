<template>
  <div>
    <div class="row justify-start items-center content-center">
      <q-icon name="fas fa-wifi" size="sm" color="grey-9" />
      <div class="text-h5 q-ml-sm">Wi-Fi</div>
    </div>
    <q-separator class="q-mb-lg q-mt-xs" />
    <div class="q-col-gutter-md row q-mb-md">
      <div class="col-12">
        <q-input
          v-model="wifiNetworkName"
          label="Название сети (SSID)"
          outlined
          clearable
        >
        <template v-slot:prepend>
          <q-icon name="perm_scan_wifi" />
        </template>
        </q-input>
      </div>
      <div class="col-12 col-md">
        <q-input
          v-model="wifiNetworkPassword"
          label="Пароль"
          type="password"
          outlined
          clearable
        >
        <template v-slot:prepend>
          <q-icon name="vpn_key" />
        </template>
        </q-input>
      </div>
      <div class="col-12 col-md">
        <q-select
          v-model="wifiNetworkType"
          :options="typesNetwork"
          label="Тип шифрования"
          outlined
        >
        <template v-slot:prepend>
          <q-icon name="cell_wifi" />
        </template>
        </q-select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'qrWifi',
  data: () => ({
    typesNetwork: [
      'WPA/WPA2',
      'WEP',
      'Без защиты'
    ]
  }),
  computed: {
    wifiNetworkName: {
      get () { return this.$store.getters['board/get_wifi_name'] },
      set (value) { this.$store.commit('board/set_wifi_name', value) }
    },
    wifiNetworkPassword: {
      get () { return this.$store.getters['board/get_wifi_password'] },
      set (value) { this.$store.commit('board/set_wifi_password', value) }
    },
    wifiNetworkType: {
      get () { return this.$store.getters['board/get_wifi_type'] },
      set (value) { this.$store.commit('board/set_wifi_type', value) }
    }
  }
}
</script>
