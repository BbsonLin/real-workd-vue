<template>
  <div>
    <h1>EventCreate</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        v-model="event.category"
        label="Select a category"
        :options="categories"
      />
      <h3>Name & describe your event</h3>
      <div class="field">
        <BaseInput
          v-model="event.title"
          label="Title"
          type="text"
          placeholder="Add an event title"
        />
      </div>
      <div class="field">
        <BaseInput
          v-model="event.description"
          label="Description"
          type="text"
          placeholder="Add a description"
        />
      </div>
      <h3>Where is your event?</h3>
      <div class="field">
        <BaseInput
          v-model="event.location"
          label="Location"
          type="text"
          placeholder="Add a location"
        />
      </div>
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <Datepicker v-model="event.date" placeholder="Select a date" />
      </div>
      <div class="field">
        <BaseSelect
          v-model="event.time"
          label="Select a time"
          :options="times"
        />
      </div>
      <!-- <input type="submit" class="button -fill-gradient" value="Submit" /> -->
      <BaseButton type="submit" button-class="-fill-gradient"
        >Submit</BaseButton
      >
    </form>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import { mapState } from 'vuex'
import NProgress from 'nprogress'

export default {
  components: {
    Datepicker
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      times,
      event: this.createFreshEventObject()
    }
  },
  computed: {
    ...mapState(['categories'])
  },
  methods: {
    createEvent() {
      NProgress.start()
      this.$store
        .dispatch('event/createEvent', this.event)
        .then(() => {
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id }
          })
          this.event = this.createFreshEventObject()
        })
        .catch(err => {
          console.error(err)
          NProgress.done()
        })
    },
    createFreshEventObject() {
      const user = this.$store.state.user.user
      const id = Math.floor(Math.random() * 10000000)

      return {
        id: id,
        user: user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    },
    sendMessage() {
      console.log('sendMessage')
    }
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
