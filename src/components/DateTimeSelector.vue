<template>
  <v-row>
    <v-col cols="6">
      <v-menu
        v-model="showdate"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template #activator="{ on }">
          <v-text-field
            :value="dateFormatted"
            :label="`${label}-Datum`"
            :disabled="disabled"
            prepend-icon="mdi-calendar"
            readonly
            v-on="on"
          />
        </template>
        <v-date-picker
          v-model="date"
          :first-day-of-week="1"
          @input="showdate = false"
        />
      </v-menu>
    </v-col>
    <v-col cols="6">
      <v-menu
        v-model="showtime"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template #activator="{ on }">
          <v-text-field
            :value="timeFormatted"
            :label="`${label}-Uhrzeit`"
            :disabled="disabled"
            prepend-icon="mdi-clock-outline"
            readonly
            v-on="on"
          />
        </template>
        <v-time-picker
          v-model="time"
          format="24hr"
          :allowed-minutes="m => m % 5 === 0"
          @input="showtime = false"
        />
      </v-menu>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'DateSelector',

  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    showdate: false,
    showtime: false
  }),

  computed: {
    _date () {
      return (this.value?.split(' ') || [])[0] || ''
    },
    _time () {
      return (this.value?.split(' ') || [])[1] || ''
    },
    dateFormatted () {
      return this.formatDate(this._date)
    },
    timeFormatted () {
      return this.formatTime(this._time)
    },
    date: {
      get () {
        return this._date
      },
      set (val) {
        this.$emit('input', `${val} ${this._time}`)
      }
    },
    time: {
      get () {
        return this._time
      },
      set (val) {
        this.$emit('input', `${this._date} ${val}:00`)
      }
    }
  },

  methods: {
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}.${month}.${year}`
    },
    formatTime (time) {
      if (!time) return null

      const [hour, minute] = time.split(':')
      return `${hour}:${minute}`
    },
    parseDate (date) {
      if (!date) return null

      const [day, month, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
  }
}
</script>

<style scoped>

</style>
