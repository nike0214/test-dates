<template>
  <div class="Home">
    <div id="explainProject">시간이란 것은 그 자체로 희소성을 지녔습니다</div>
    <div id="dategif">
      <img src="../assets/day_special.gif" />
    </div>
    <div id="mintingDate">22년 12월 31일 11시 59분 첫 민팅 예정...(로드맵)</div>
    <div id="calendar"><simple-calendar /></div>
  </div>
</template>

<script>
import SimpleCalendar from '../components/SimpleCalendar.vue'

export default {
  name: 'HomeView',
  components: {
    SimpleCalendar
  }
}
</script>
<style scoped>
#dategif {
  height: 80vh;
}

#calendar {
  height: 100vh;
  padding: 20px;
}

#mintingDate {
  margin: 20px;
  font-weight: bold;
}

#explainProject {
  margin: 20px;
  font-weight: bold;
  font-size: large;
}
</style>
