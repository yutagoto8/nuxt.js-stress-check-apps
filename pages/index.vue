<template>
  <v-card v-if="user">
    <v-card-title>
      {{ user.displayName }}さんがログインしています。
    </v-card-title>
    <v-card-text>
      <nuxt-link to="/app">
        ストレスチェックへ
      </nuxt-link>
    </v-card-text>
    <br>
    <v-card-text class="text-h6">
      過去の結果一覧
    </v-card-text>
    <v-simple-table>
      <thead>
        <th class="text-left">
          検査日
        </th>
        <th class="text-left">
          結果先リンク
        </th>
      </thead>
      <tbody v-for="result in results" :key="result.id">
        <td v-if="result.checked_at">
          {{ $dateFns.format(result.checked_at.toDate(), 'yyyy年/MM月dd日/hh時mm分') }}
        </td>
        <td>
          <router-link to="/result">
            <router-link :to="{name:'result', query:{id: result.id}}">
              結果
            </router-link>
          </router-link>
        </td>
      </tbody>
      </v-simple-table>
    <br>
    <v-btn @click="logout">
      ログアウト
    </v-btn>
  </v-card>
</template>

<script>
import { signOut } from '@firebase/auth'
import { collection, onSnapshot, orderBy, query, where } from '@firebase/firestore'
import { auth, db } from '~/plugins/firebase'

const resultCollectionRef = collection(db, 'result')

export default {
  name: 'IndexPage',
  middleware: 'authenticated',
  data () {
    return {
      results: []
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  mounted () {
    const q = query(resultCollectionRef, where('uid', '==', auth.currentUser.uid), orderBy('checked_at', 'desc'))
    onSnapshot(q, (querySnapshot) => {
      this.results = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    })
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
