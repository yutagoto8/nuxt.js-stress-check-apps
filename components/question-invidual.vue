<template>
  <v-container>
    <v-card>
      <v-card-title v-if="question.class === 'A'">
        A.あなたの仕事についてうかがいます
      </v-card-title>
      <v-card-title v-else-if="question.class === 'B'">
        B.最近1か月間のあなたの状態についてうかがいます
      </v-card-title>
      <v-card-title v-else-if="question.class === 'C'">
        C.あなたの周りの方々についてうかがいます
      </v-card-title>
      <v-card-title v-else>
        D.満足度について
      </v-card-title>
      <br>
      <v-card-text v-if="question.question === 'C1'">
        次の人たちはどのくらい気軽に話ができますか?
      </v-card-text>
      <v-card-text v-else-if="question.question === 'C2'">
        あなたが困った時、次の人たちはどのくらい頼りになりますか?
      </v-card-text>
      <v-card-text v-else-if="question.question === 'C3'">
        あなたの個人的な問題を相談したら、次の人たちはどのくらいきいてくれますか?
      </v-card-text>
      <v-card-text v-else>
      </v-card-text>
      <br>
      <v-card-text>
        {{ question.content }}
      </v-card-text>
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
      class: ''
    }
  }
}
</script>

<style>

</style>
