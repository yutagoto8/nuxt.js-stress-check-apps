<template>
  <v-container>
    <v-card>
      <v-text-title>
        {{ question.content }}
      </v-text-title>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    question: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style>

</style>
