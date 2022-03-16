<template>
  <h1>test</h1>
</template>

<script>
export default {
  data () {
    return {
      categories: [
        {
          class: 'A',
          text: 'あなたの仕事についてうかがいます',
          reverse: true,
          answerText: ['そうだ', 'まあそうだ', 'ややちがう', 'ちがう'],
          value: [4,3,2,1]
        },
        {
          class: 'A',
          text: 'あなたの仕事についてうかがいます',
          reverse: false,
          answerText: ['そうだ', 'まあそうだ', 'ややちがう', 'ちがう'],
          value: [1,2,3,4]
        },
        {
          class: 'B',
          text: '最近1か月間のあなたの状態についてうかがいます',
          reverse: true,
          answerText: ['ほとんどなかった', 'ときどきあった', 'しばしばあった', 'ほとんどいつもあった'],
          value: [4,3,2,1]
        },
        {
          class: 'B',
          text: '最近1か月間のあなたの状態についてうかがいます',
          reverse: false,
          answerText: ['ほとんどなかった', 'ときどきあった', 'しばしばあった', 'ほとんどいつもあった'],
          value: [1,2,3,4]
        },
        {
          class: 'C',
          text: 'あなたの周りの方々についてうかがいます',
          reverse: true,
          answerText: ['非常に', 'かなり', '多少', '全くない'],
          value: [4,3,2,1]
        },
        {
          class: 'C',
          text: 'あなたの周りの方々についてうかがいます',
          reverse: false,
          answerText: ['非常に', 'かなり', '多少', '全くない'],
          value: [1,2,3,4]
        },
        {
          class: 'D',
          text: '満足度について',
          reverse: true,
          answerText: ['満足', 'まあ満足', 'やや不満足', '不満足'],
          value: [4,3,2,1]
        },
        {
          class: 'D',
          text: '満足度について',
          reverse: false,
          answerText: ['満足', 'まあ満足', 'やや不満足', '不満足'],
          value: [1,2,3,4]
        }
      ]
    }
  }
}
</script>

<style>

</style>
