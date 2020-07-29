<template>
  <main class="tickets-layout">
    <h1>tickets</h1>

    <!-- <Tickets /> -->
    
        <!--  TODO -->
    <!-- <router-link :to="{ name: 'tickets'}">
        support tickets
    </router-link> -->
    <div class="actions">
      <router-link v-if="$route.name !== 'tickets'" tag="button" class="secondary" :to="{name: 'tickets'}">all tickets</router-link>
      <router-link v-if="$route.name !== 'new-ticket'" tag="button" :to="{name: 'new-ticket'}">new added ticket</router-link>
    </div>

    <router-view />
  </main>
</template>

<!-- <script>
import Tickets from './Tickets.vue'

export default {
  components: {
    Tickets,
  }
}
</script> -->

<style lang="stylus" scoped>
.actions {
  margin-bottom: 32px;
}
</style>
