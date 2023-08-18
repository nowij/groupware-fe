<template>
  <div>
    <h4 class="card-hedaer">근무시간 입력</h4>
  </div>
  <div id="workingDayArea">
    <FullCalendar ref="fullCalendar" :options="calendarOptions" />
  </div>
</template>

<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import googleCalendarPlugin from '@fullcalendar/google-calendar'
import { onMounted, ref } from 'vue'
import { useAuthStore, useAlertStore } from '@/stores'
import { storeToRefs } from 'pinia'
import axios from 'axios'
import $ from 'jquery'

const fullCalendar = ref(null)
const date = new Date()
const alertStore = useAlertStore()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const holiday = []
const apiKey = 'AIzaSyA3CdSUz-R3AStzjv4WRjER8Ulw59FwBIc'
const day = date.getDate()
const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
const year = date.getFullYear()

onMounted(() => {
  getHoilDay(year, month)
  setDisableBtn(day)
})

const calendarOptions = {
  plugins: [googleCalendarPlugin, dayGridPlugin],
  googleCalendarApiKey: apiKey,
  initialView: 'dayGridMonth',
  contentHeight: 450,
  eventSources: // 한국 기념일 ko.south_korea 추가
    [{ googleCalendarId: 'nowijdl@gmail.com' }
      , {
      googleCalendarId: 'ko.south_korea#holiday@group.v.calendar.google.com'
      , className: 'ko_event'
      , display: 'background'
    }],
  weekends: false,
  customButtons: {
    workingDay: {
      text: '근무시간입력',
      click: function () {
        if (day <= 17 && day > 15) {
          setFirstWorkDay(year, month, day)
        } else if (day <= 3) {
          // 16
          setSecondWorkDay(year, month, day)
        } else {
          alertStore.error('입력 기간이 아닙니다')
        }
      },
    },
    save: {
      text: '저장',
      click: function() {
        $(".fc-approve-button").show()
      }
    },
    approve: {
      text: '승인요청',
    }
  },
  headerToolbar: {
    left: 'prev next',
    center: 'title',
    right: 'today workingDay save approve'
  }
}

// methods
const setDisableBtn = (d) => {
  const isDisable = d <= 3 ? true : (d <= 17 && d > 15 ? true : false)

  if (!isDisable) {
    $(".fc-workingDay-button").attr('disabled', true)
    $(".fc-save-button").attr('disabled', true)
  } else {
    $(".fc-workingDay-button").attr('disabled', false)
    $(".fc-save-button").attr('disabled', false)
  }
  $(".fc-approve-button").hide()
}

const setFirstWorkDay = (y, m, d) => {
  const date = `${y}${m}${d}`
  const calendarApi = fullCalendar.value.getApi()

  for (let i = 1; i < 16; i++) {
    if (i < 10) {
      i = `0${i}`
    }
    // 공휴일은 추가 안 되게
    if (!holiday.includes(String(i))) {
      calendarApi.addEvent(
        {
          id: `${user.value.employeeId}_${date}_${i}`,
          title: `${y}${m} ${user.value.userName} 근무`,
          start: `${y}-${m}-${i}`,
          color: '#005b96'
        }
      )
    }
  }
}

const setSecondWorkDay = (y, m, d) => {
  const date = `${y}${m}${d}`
  const calendarApi = fullCalendar.value.getApi()
  for (let i = 16; i < 32; i++) {
    if (i < 10) {
      i = `0${i}`
    }
    calendarApi.addEvent(
      {
        id: `${user.value.employeeId}_${date}_${i}`,
        title: `${y}${m} 근무`,
        start: `${y}-${m}-${i}`,
        color: '#005b96'
      }
    )
  }
}

const getHoilDay = (y, m) => {
  const url = `https://cors-anywhere.herokuapp.com/https://www.googleapis.com/calendar/v3/calendars/ko.south_korea%23holiday%40group.v.calendar.google.com/events?key=${apiKey}&orderBy=startTime&singleEvents=true&timeMin=${y}-${m}-01T00:00:00Z&timeMax=${y}-${m}-31T00:00:00Z`
  axios.get(url).then(res => {
    const resData = res.data
    for (let i = 0; i < resData.items.length; i++) {
      // 일자만 넣기
      holiday.push(resData.items[i].start.date.substr(-2))
    }
    console.log(holiday)
  }).catch(err => {
    console.log(err)
  })
}
</script>