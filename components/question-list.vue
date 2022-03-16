<template>
  <v-container>
    <!-- <question-title :question-title='context' /> -->
    <!-- <question-text :question-text='questionText' /> -->
    <question-invidual :question='questions' />
  </v-container>
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
      questions: [],
      context: [
        {
          class: 'A',
          text: 'あなたの仕事についてうかがいます'
        },
        {
          class: 'B',
          text: '最近1か月間のあなたの状態についてうかがいます'
        },
        {
          class: 'C',
          text: 'あなたの周りの方々についてうかがいます'
        },
        {
          class: 'D',
          text: '満足度について'
        }
      ],
      questionText: [
        {
          class: 'C',
          question: 'C1',
          text: '次の人たちはどのくらい気軽に話ができますか?'
        },
        {
          class: 'C',
          question: 'C2',
          text: 'あなたが困った時、次の人たちはどのくらい頼りになりますか?'
        },
        {
          class: 'C',
          question: 'C3',
          text: 'あなたの個人的な問題を相談したら、次の人たちはどのくらいきいてくれますか?'
        }
      ]
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  mounted () {
    onSnapshot(questionCollectionRef, (querySnapshot) => {
      this.questions = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    })
  }
}
</script>

<style>

</style>
