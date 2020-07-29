<template>
  <main class="login">
    <h1>Please login</h1>
    <SmartForm
      class="form"
      :title="title"
      :operation="operation"
      :valid="valid">
      <!-- TODO -->
        <!-- <form> -->
      <!-- name 属性，让浏览器自动补全，那么是密码呢？？？？？？？？？？？？ -->
      <FormInput
        name="username"
        v-model="username"
        placeholder="Username" />
      <FormInput
        name="password"
        type="password"
        v-model="password"
        placeholder="Password" />
      <template v-if="mode === 'signup'">
        <FormInput
          name="verify-password"
          type="password"
          v-model="password2"
          placeholder="Retype Password"
          :invalid="retypePasswordError" />
        <FormInput
          name="email"
          type="email"
          v-model="email"
          placeholder="Email" />
      </template>

      <template slot="actions">
        <template v-if="mode === 'login'">
          <button
            type="button"
            class="secondary"
            @click="mode = 'signup'">
            Sign up
          </button>
          <button
            type="submit"
            :disabled="!valid">
            Login
          </button>
        </template>
        <template v-else-if="mode === 'signup'">
          <button
            type="button"
            class="secondary"
            @click="mode = 'login'">
            Back to login
          </button>
          <button
            type="submit"
            :disabled="!valid">
            Create account
          </button>
        </template>
      </template>
      <!-- </form> -->
    </SmartForm>
  </main>
</template>

<script>
export default {
  data () {
    return {
      mode: 'login',
      username: '',
      password: '',
      password2: '',
      email: '',
    }
  },

  computed: {
    // change the title according mode
    title () {
      switch (this.mode) {
        case 'login': return 'Login'
        case 'signup': return 'Create a new account'
      }
    },

    // exam if p equals p2
    retypePasswordError () {
      return !!this.password2 && this.password !== this.password2
    },

    signupValid () {
      return !!this.password2 && !!this.email && !this.retypePasswordError
    },

    valid () {
      return !!this.username && !!this.password &&
      (this.mode !== 'signup' || this.signupValid)
    },
  },

  methods: {
    // await this[this.mode] ()
    async operation() {
      await this[this.mode]()
    },

    async login () {
      this.$state.user = await this.$fetch('login', {
        method: 'POST',
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      })
      // 在浏览器历史记录中添加新条目
      // this.$router.push({name: 'home'})
      // different from up one is: 替换历是记录中的当前条目
      this.$router.replace(this.$route.params.wantedRoute || { name: 'home' })
    },

    async signup () {
      await this.$fetch('signup', {
        method: 'POST',
        body: JSON.stringify({
          username: this.username,
          password: this.password,
          email: this.email,
        }),
      })
      this.mode = 'login'
    },
  },
}
</script>

<style lang="stylus" scoped>
.form {
  >>> .content {
    max-width: 400px;
  }
}
</style>
