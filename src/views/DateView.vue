<template>
  <div id="dayView">
    <div id="date">[ 2023년 1월 {{ $route.params.id }}일 ]</div>
    <div id="main"><day-content /></div>
  </div>
</template>
<script>
import DayContent from '../components/DayContent.vue'
export default {
  components: { DayContent },
  data() {
    return {
      sampleData: ''
    }
  },
  setup() {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style scoped>
#dayView {
  height: 100vh;
}
</style>
