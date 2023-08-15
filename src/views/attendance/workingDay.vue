<template>
    <div>
        <h3 class="card-title">근무시간</h3>
    </div>
    <FullCalendar :options="calendarOptions" />
  </template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import esLocale from "@fullcalendar/core/locales/ko";

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptions: {
        plugins: [ dayGridPlugin ],
        initialView: 'dayGridMonth',
        locale: esLocale,
        contentHeight: 600
      }
    }
  }
}
</script>