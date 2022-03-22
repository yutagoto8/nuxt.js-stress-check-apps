<template>
    <!-- <question-title :question-title='context' /> -->
    <!-- <question-text :question-text='questionText' /> -->
    <!-- <question-invidual :question='questions' /> -->
  <v-card>
    <v-window v-model="onboarding">
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
    <!-- <v-card-actions>
      <v-btn text :disabled="!onboarding" @click="prev">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn text :disabled="onboarding === length || setAnswer !== 0" @click="next">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-card-actions> -->
    <v-card-text class="text-center">
      <v-btn color="primary" rounded @click="home">
        ホームに戻る
      </v-btn>
    </v-card-text>
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
    }
  }
}
</script>

<style>

</style>
