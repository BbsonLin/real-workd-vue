<template>
  <div>
    <h1>EventCreate</h1>
    <p>{{ user.id }} {{ user.name }}</p>
    <p>{{ catLength }}</p>
    <ul>
      <li v-for="cat in categories" :key="cat">{{ cat }}</li>
    </ul>
    <p>{{ getEvent(1) }}</p>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState(['user', 'categories']),
    ...mapGetters({
      catCount: 'catLength',
      getEvent: 'getEventById'
    })
  }
}
</script>

<style scoped></style>
