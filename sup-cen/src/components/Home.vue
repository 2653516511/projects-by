<template>
  <main class="home">
    <h1>this is home page</h1>
    <p>
      you can go to  <router-link :to="{name: 'faq'}"> questions page</router-link>
      to find the answer to your question, if you don't find, please<router-link :to="{name: 'tickets'}"> send ticket!</router-link>
    </p>
  </main>
</template>
