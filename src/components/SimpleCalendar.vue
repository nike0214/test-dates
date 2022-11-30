<template>
  <div id="calendar">
    <h1>DATE's Calendar</h1>
    <calendar-view
      :show-date="selectionStart"
      :events="events"
      @click-date="onClickDate"
      class="theme-default holiday-us-traditional holiday-us-official"
      style="cursor: pointer"
    >
      <template #header="{ headerProps }">
        <calendar-view-header :header-props="headerProps" @input="setShowDate" />
      </template>
    </calendar-view>
  </div>
</template>
<script>
import { CalendarView, CalendarViewHeader } from 'vue-simple-calendar'

import '../../node_modules/vue-simple-calendar/dist/style.css'
// The next two lines are optional themes
import '../../node_modules/vue-simple-calendar/dist/css/default.css'
import '../../node_modules/vue-simple-calendar/dist/css/holidays-us.css'

export default {
  name: 'SimpleCalendar',
  data: function () {
    return {
      date: '',
      day: 0,
      selectionStart: new Date(2023, 0, 1)
    }
  },
  components: {
    CalendarView,
    CalendarViewHeader
  },
  methods: {
    setShowDate(d) {
      this.showDate = d
    },
    onClickDate(...params) {
      this.date = params[0].toString()
      this.day = this.date.split(' ')[2]
      this.$router.push({ path: '/date/' + this.day })
    }
  }
}
</script>
<style scoped>
#calendar {
  height: 100%;
}
</style>
