<template>
  <v-card>
    <v-window v-model="onboarding" touchless>
      <v-window-item v-for="n in length + 1" :key="n">
        <template v-if="n <= length">
          <div class="text-center text-h6">あと{{ length - n + 1}}問です</div>
          <question-invidual
            :question='questions[n - 1]'
            @goNext="next"
            @changeValue="setAnswer"
          />
        </template>
        <template v-else>
          <submit-form
          :answers="answers"
          />
        </template>
      </v-window-item>
    </v-window>
    <v-card-actions>
      <v-btn text :disabled="!onboarding" @click="prev">
        <v-icon>mdi-arrow-u-left-top-bold</v-icon>
        1つ前の画面へ
      </v-btn>
      <v-spacer />
      <v-btn text rounded @click="home">
        <v-icon>mdi-home-import-outline</v-icon>
          ホーム画面に戻る
        </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { collection, onSnapshot } from '@firebase/firestore'
import questionInvidual from './question-invidual.vue'
import SubmitForm from './submit-form.vue'
import { db } from '~/plugins/firebase'


const questionCollectionRef = collection(db, 'Questions')
export default {
  components: { questionInvidual, SubmitForm },
  data () {
    return {
      onboarding: 0,
      questions: [],
      answers: {}
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
    this.answers = {}
  },
  methods: {
    prev() {
      if (this.onboarding > 0) this.onboarding--
    },
    next() {
      if (this.onboarding < this.length) this.onboarding++
    },
    setAnswer(answer) {
      if (answer.point) {
        this.answers[answer.id] = answer.point
      } else {
        delete this.answers[answer.id]
      }
    },
    home () {
      this.$router.push('/')
      alert("ストレスチェックを中断しました。")
    }
  }
}
</script>

<style>

</style>
