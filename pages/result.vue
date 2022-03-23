<template>
  <div>
    <v-card>
      <br>
      <v-card-text v-if="result" class="text-h6 text-center">
        {{ result.user }}さんの結果
      </v-card-text>
      <v-card-text v-if="result && result.checked_at" class="text-h6">
        <v-icon>mdi-calendar-text</v-icon>
        検査日：{{ $dateFns.format(result.checked_at.toDate(), 'yyyy-MM-dd HH:mm') }}
      </v-card-text>
      <v-card-text v-if="result && result.checked_at" class="text-h6">
        <v-icon>mdi-chart-box</v-icon>
        検査結果：{{ HighStress(result.answers) ? '高ストレス' : '異常なし'}}
      </v-card-text>
      <v-card-text v-else class="text-h5 text-center">
        結果が存在しません。
      </v-card-text>
      <br>
      <v-card-text class="text-center">
        <v-btn large color="primary" rounded @click="home">
          ホームに戻る
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { doc, getDoc } from '@firebase/firestore'
import { db } from '~/plugins/firebase'

// const onceResultCollectionRef = (db, 'result')
export default {
  name: 'ReslutPage',
  middleware: 'authenticated',
  data () {
    return {
      result: {}
    }
  },
  computed: {
    HighStress: () => (answers) => {
      const totalB = Object.keys(answers).filter((key) => key.startsWith('B')).reduce((sum, key) => sum + answers[key], 0)
      const totalAC = Object.keys(answers).filter((key) => key.startsWith('A') || key.startsWith('C')).reduce((sum, key) => sum + answers[key], 0)
      return totalB >= 77 || (totalB >= 63 && totalAC >= 76)
    }
  },
  mounted () {
    const docRef = doc(db, 'result', this.$route.query.id)
    getDoc(docRef).then((doc) => {
      this.result = doc.data()
    })
  },
  methods: {
    home () {
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
