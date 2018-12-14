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
import store from '@/store'

// Need to declare this function outside, cause beforeRouteEnter Vue-Router In-Component Guards
// can't access "this"
function getPageEvents(routeTo, next) {
  let currentPage = parseInt(routeTo.query.page) || 1
  store.dispatch('event/fetchEvents', currentPage).then(() => {
    routeTo.params.page = currentPage
    next()
  })
}

export default {
  components: {
    EventCard
  },
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  computed: {
    ...mapState({
      events: state => state.event.events,
      eventsTotal: state => state.event.eventsTotal
    }),
    hasNextPage() {
      return this.page != Math.ceil(this.eventsTotal / this.perPage)
    }
  },
  created() {
    this.fetchEvents({
      page: this.page
    })
  },
  methods: {
    ...mapActions('event', ['fetchEvents'])
  }
}
</script>

<style scoped></style>
