<template>
  <main class="not-found">
    <h1>This page can't be found</h1>
    <p class="more-info">
      Sorry, there not have page you're finding.<br>
      It may be moved or deleted.<br>
      Check your spelling or return to the home page.
    </p>
    <div class="actions">
      <router-link tag="button" :to="{name: 'home'}">Return to home</router-link>
    </div>
  </main>
</template>

<style lang="stylus" scoped>
.more-info {
  text-align: center;
}
</style>
