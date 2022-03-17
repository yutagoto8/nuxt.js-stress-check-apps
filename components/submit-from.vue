<template>
  <v-card>
    <v-card-title>
      <p>アンケートは以上です。</p>
      <p>送信いたします</p>
    </v-card-title>
    <v-card-actions class="justify-center">
      <v-btn @click="submit">送信</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'SubmitForm',
  props: {
    answers: { type: Object, default: null },
  },
  methods: {
    submit() {
      this.$store.dispatch('finishCheck', { answers: this.answers })
    },
  },
}
</script>

<style>
</style>
