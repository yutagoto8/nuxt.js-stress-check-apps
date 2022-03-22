<template>
  <question-list />
</template>

<script>
import questionList from '~/components/question-list.vue'

export default {
  name: 'AppPage',
  components: { questionList },
  middleware: 'authenticated',
  computed: {
  user () {
    return this.$store.state.user
    }
  }
}
</script>

<style>

</style>
