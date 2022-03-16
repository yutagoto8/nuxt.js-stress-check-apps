<template>
  <v-container>
    <v-card v-for="question in questions" :key="question.id">
      <v-text-title>
        {{ question }}
      </v-text-title>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    qusestions: {
      type: Array,
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
