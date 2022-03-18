<template>
  <v-card>
    <v-card-title>
      <p>アンケートは以上です。</p>
      <p>送信いたします</p>
    </v-card-title>
    <v-card-actions class="justify-center">
      <v-btn @click="submit">送信</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { addDoc, collection, serverTimestamp } from '@firebase/firestore'
import { db } from '~/plugins/firebase'

const answerCollectionRef = collection(db, 'result')
export default {
  name: 'SubmitForm',
  props: {
    answers: { type: Object, default: null },
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    submit () {
      addDoc(answerCollectionRef, {
        answers: this.answers,
        checked_at: serverTimestamp(),
        uid: this.user.uid,
        user: this.user.displayName
      })
      this.$router.push('/')
    },
  },
}
</script>

<style>
</style>
