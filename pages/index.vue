<template>
  <v-row justify="center">
    <v-col>
      Index Page
    </v-col>
    <div v-if="user">
      <v-col>
        ログインしてます。
        {{ user.displayName }} {{ user.count }}
      </v-col>
      <v-btn @click="logout">
        ログアウト
      </v-btn>
    </div>
    <div v-else>
      ログインしてません
    </div>
  </v-row>
</template>

<script>
import { signOut } from '@firebase/auth'
import { auth } from '~/plugins/firebase'

export default {
  name: 'IndexPage',
  middleware: 'authenticated',
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    logout () {
      signOut(auth).then(() => {
        this.$store.dispatch('setUser', null)
      })
    }
  }
}
</script>

<style>

</style>
