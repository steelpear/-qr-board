<template>
  <div>
    <div class="row justify-start items-center content-center">
      <q-icon name="fas fa-font" size="sm" color="grey-9" />
      <div class="text-h5 q-ml-sm">Текст</div>
    </div>
    <q-separator class="q-mb-lg q-mt-xs" />
    <div class="q-my-md">
      <q-input
        v-model="TextData"
        type="textarea"
        label="Текст объявления"
        outlined
        square
        clearable
        counter
        hint="Помните - слишком длинный текст может отрицательно сказаться на правильном распознавании кода."
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'qrText',
  computed: {
    TextData: {
      get () { return this.$store.getters['board/GET_TEXT'] },
      set (value) { this.$store.commit('board/SET_TEXT', value) }
    }
  }
}
</script>
