<template>
  <v-container>
    <h1>Login Page</h1>
    <v-form ref="login_form">
      <v-text-field
        v-model="email"
        type="emai"
        :rules="[required]"
        label="Email"
        prepend-icon="mdi-email"
      />
    <v-text-field
      v-model="password"
      :type="showPassword ? 'text' : 'password'"
      :rules="[required]"
      label="Password"
      prepend-icon="mdi-lock"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="showPassword = !showPassword"
    />
    <v-btn
      type="submit"
      @click.prevent="login"
    >
      Login
    </v-btn>
    <div>
      {{ message }}
    </div>
    </v-form>
    <br>
    <div>
      <v-icon>mdi-account-edit</v-icon>
      <nuxt-link to="/signup">
        Create Account
      </nuxt-link>
    </div>
  </v-container>

</template>

<script>
import { signInWithEmailAndPassword } from '@firebase/auth'
import { auth } from '../plugins/firebase'

export default {
  name: 'LoginPage',
  data () {
    return {
      email: '',
      password: '',
      showPassword: false,
      message: '',
      required: value => !!value || '必須入力です'
    }
  },
  methods: {
    login () {
      if (this.$refs.login_form.validate()) {
        signInWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            this.message = 'ログインに成功しました'
            this.$router.push('/')
          })
          .catch((err) => {
            this.message = err.message
          })
      } else {
        this.message = '入力エラーです！'
      }
    }
  }
}
</script>

<style>

</style>
