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
      <v-card-text class="text-h6">
        {{ question.content }}
      </v-card-text>
      <br>
      <v-card-text class="text-center">
      <v-radio-group v-if="question.cid === 1" v-model="radioGroup">
        <v-radio
          v-for="n in 4"
          :key="n"
          :label="['そうだ', 'まあそうだ', 'ややちがう', 'ちがう'][n - 1]"
          :value="5 - n"
          @click="goNext"
        />
      </v-radio-group>
      <v-radio-group v-else-if="question.cid === 2" v-model="radioGroup">
        <v-radio
          v-for="n in 4"
          :key="n"
          :label="['そうだ', 'まあそうだ', 'ややちがう', 'ちがう'][n - 1]"
          :value="n"
          @click="goNext"
        />
      </v-radio-group>
      <v-radio-group v-else-if="question.cid === 3" v-model="radioGroup">
        <v-radio
          v-for="n in 4"
          :key="n"
          :label="['ほとんどなかった', 'ときどきあった', 'しばしばあった', 'ほとんどいつもあった'][n - 1]"
          :value="5 - n"
          @click="goNext"
        />
      </v-radio-group>
      <v-radio-group v-else-if="question.cid === 4" v-model="radioGroup">
        <v-radio
          v-for="n in 4"
          :key="n"
          :label="['ほとんどなかった', 'ときどきあった', 'しばしばあった', 'ほとんどいつもあった'][n - 1]"
          :value="n"
          @click="goNext"
        />
      </v-radio-group>
      <v-radio-group v-else-if="question.cid === 5" v-model="radioGroup">
        <v-radio
          v-for="n in 4"
          :key="n"
          :label="['非常に', 'かなり', '多少', '全くない'][n - 1]"
          :value="5 - n"
          @click="goNext"
        />
      </v-radio-group>
      <v-radio-group v-else-if="question.cid === 6" v-model="radioGroup">
        <v-radio
          v-for="n in 4"
          :key="n"
          :label="['非常に', 'かなり', '多少', '全くない'][n - 1]"
          :value="n"
          @click="goNext"
        />
      </v-radio-group>
      <v-radio-group v-else-if="question.cid === 7" v-model="radioGroup">
        <v-radio
          v-for="n in 4"
          :key="n"
          :label="['満足', 'まあ満足', 'やや不満足', '不満足'][n - 1]"
          :value="5 - n"
          @click="goNext"
        />
      </v-radio-group>
      <v-radio-group v-else-if="question.cid === 8" v-model="radioGroup">
        <v-radio
          v-for="n in 4"
          :key="n"
          :label="['満足', 'まあ満足', 'やや不満足', '不満足'][n - 1]"
          :value="n"
          @click="goNext"
        />
      </v-radio-group>
      <v-rdio-group v-else />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
let timeoutId

export default {
  props: {
    question: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      radioGroup: null
    }
  },
  watch: {
    radioGroup(value) {
      this.$emit('changeValue', {
        id: this.question.id,
        point: value
      })
    }
  },
  methods: {
    goNext () {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        this.$emit('goNext')
      }, 200)
    }
  }
}
</script>

<style>

</style>
