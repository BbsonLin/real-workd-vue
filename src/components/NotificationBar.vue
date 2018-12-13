<template>
  <div class="notification-bar -shadow" :class="notificationTypeClass">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      timeout: null
    }
  },
  computed: {
    notificationTypeClass() {
      return `-text-${this.notification.type}`
    }
  },
  mounted() {
    this.timeout = setTimeout(() => {
      this.remove(this.notification)
    }, 3000)
  },
  beforeDestroy() {
    clearTimeout(this.timeout)
  },
  methods: {
    ...mapActions('notification', ['remove'])
  }
}
</script>

<style scoped>
.notification-bar {
  margin: 1rem 0 1rem;
  padding: 0.25rem;
}
</style>
