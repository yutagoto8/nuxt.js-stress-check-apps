<template>
    <!-- <question-title :question-title='context' /> -->
    <!-- <question-text :question-text='questionText' /> -->
    <!-- <question-invidual :question='questions' /> -->
  <v-card>
    <v-window v-model="onboarding">
      <v-window-item v-for="n in length" :key="n">
        <question-invidual
        :question='questions[n - 1]'
        @goNext="next"
        />
      </v-window-item>
    </v-window>
    <v-card-actions>
      <v-btn text :disabled="!onboarding" @click="prev">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn text :disabled="onboarding === length" @click="next">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { collection, onSnapshot } from '@firebase/firestore'
import questionInvidual from './question-invidual.vue'
import { db } from '~/plugins/firebase'

const questionCollectionRef = collection(db, 'Questions')
export default {
  components: { questionInvidual },
  data () {
    return {
      onboarding: 0,
      questions: [],
      categories: [
        {
          cid: 1,
          points: {'そうだ': 4, 'まあそうだ': 3, 'ややちがう': 2, 'ちがう': 1}
        },
        {
          cid: 2,
          points: {'そうだ': 1, 'まあそうだ': 2, 'ややちがう': 3, 'ちがう': 4}
        },
        {
          cid: 3,
          points: {'ほとんどなかった': 4, 'ときどきあった': 3, 'しばしばあった': 2, 'ほとんどいつもあった': 1}
        },
        {
          cid: 4,
          points: {'ほとんどなかった': 1, 'ときどきあった': 2, 'しばしばあった': 3, 'ほとんどいつもあった': 4}
        },
        {
          cid: 5,
          points: {'非常に': 4, 'かなり': 3, '多少': 2, '全くない': 1}
        },
        {
          cid: 6,
          points: {'非常に': 1, 'かなり': 2, '多少': 3, '全くない': 4}
        },
        {
          cid: 7,
          answerText: {'満足': 4, 'まあ満足': 3, 'やや不満足': 2, '不満足': 1}
        },
        {
          cid: 8,
          answerText: {'満足': 1, 'まあ満足': 2, 'やや不満足': 3, '不満足': 4}
        }
      ]
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    length () {
      return this.questions.length
    }
  },
  mounted () {
    onSnapshot(questionCollectionRef, (querySnapshot) => {
      this.questions = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    })
  },
  methods: {
    prev() {
      if (this.onboarding > 0) this.onboarding--
    },
    next() {
      if (this.onboarding < this.length) this.onboarding++
    }
  }
}
</script>

<style>

</style>
