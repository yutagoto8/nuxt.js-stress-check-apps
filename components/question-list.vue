<template>
  <v-container>
    <v-card v-for="question in questions" :key="question.id">
      <v-card-title>
        {{ question.content }}
      </v-card-title>
    </v-card>
  </v-container>
</template>

<script>
import { collection, onSnapshot } from '@firebase/firestore'
import { db } from '~/plugins/firebase'

const questionCollectionRef = collection(db, 'Questions')
export default {
  data () {
    return {
      questions: []
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
