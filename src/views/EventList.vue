<template>
  <div>
    <h1>Event List</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <template v-if="page != 1">
      <RouterLink
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        >Prev Page</RouterLink
      >
    </template>
    <template v-if="(page != 1) & hasNextPage">
      |
    </template>
    <template v-if="hasNextPage">
      <RouterLink
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
        >Next Page</RouterLink
      >
    </template>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    EventCard
  },
  data() {
    return {
      perPage: 3
    }
  },
  computed: {
    ...mapState({
      events: state => state.event.events,
      eventsTotal: state => state.event.eventsTotal
    }),
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    hasNextPage() {
      return this.page != Math.ceil(this.eventsTotal / this.perPage)
    }
  },
  created() {
    this.fetchEvents({
      perPage: this.perPage,
      page: this.page
    })
  },
  methods: {
    ...mapActions('event', ['fetchEvents'])
  }
}
</script>

<style scoped></style>
