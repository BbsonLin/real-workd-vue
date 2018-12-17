<template>
  <div>
    <h1>Uh-Oh!</h1>
    <h3>
      It looks you're experiencing some network issues, please click the back
      button and try again.
    </h3>
    <RouterLink :to="{ name: 'event-list' }"
      >Or go back to the event list</RouterLink
    >
  </div>
</template>

<script>
export default {}
</script>

<style scoped></style>
