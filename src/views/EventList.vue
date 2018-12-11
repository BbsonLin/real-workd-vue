<template>
  <div>
    <h1>Event List</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <router-link :to="{ name: 'event-show', params: { id: 2 } }"
      >Show Event #2</router-link
    >
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService'

export default {
  components: {
    EventCard
  },
  data() {
    return {
      events: []
    }
  },
  created() {
    EventService.getEvents()
      .then(resp => {
        this.events = resp.data
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style scoped></style>
