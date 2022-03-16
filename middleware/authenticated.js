import { onAuthStateChanged } from '@firebase/auth'
import { auth } from '../plugins/firebase'

export default function ({ store, redirect }) {
  // this.user = auth.currentUser
  onAuthStateChanged(auth, (user) => {
    // this.user = user
    if (user) {
      store.dispatch('setUser', {
        uid: user.uid,
        displayName: user.displayName
      }).then(() => {
        if (!store.getters.isAuthenticated) {
          return redirect('/login')
        }
      })
    } else {
      return redirect('/login')
    }
    // this.user = this.$store.state.user
  })
}
