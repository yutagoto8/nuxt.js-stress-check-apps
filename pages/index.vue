<template>
  <v-card v-if="user">
    <v-card-title>
      {{ user.displayName }}さんがログインしています。
    </v-card-title>
    <br>
    <v-card-text class="text-h6 text-center">
      <nuxt-link to="/app">
        ストレスチェックへ
      </nuxt-link>
    </v-card-text>
    <br>
    <v-card-text class="text-h6 text-center">
      過去の結果一覧
    </v-card-text>
    <v-simple-table fixed-header>
      <thead>
        <tr>
          <th class="text-left text-h6">
            検査日
          </th>
          <th class="text-left text-h6">
            結果先リンク
          </th>
        </tr>
      </thead>
      <tbody v-for="result in results" :key="result.id">
        <tr>
          <td v-if="result.checked_at" class="text-h6">
            {{ $dateFns.format(result.checked_at.toDate(), 'yyyy-MM-dd HH:mm') }}
          </td>
          <td>
            <router-link to="/result">
              <router-link :to="{name:'result', query:{id: result.id}}" class="text-h6">
                結果
              </router-link>
            </router-link>
          </td>
        </tr>
      </tbody>
      </v-simple-table>
    <br>
    <v-card-text class="text-center">
      <v-btn color="primary" rounded @click="logout">
        ログアウト
      </v-btn>
    </v-card-text>
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
