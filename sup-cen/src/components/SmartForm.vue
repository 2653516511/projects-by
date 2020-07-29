<template>
<!-- 该组件的属性： title、operation[提交表单时调用的异步函数，return Promise]、valid[防止无效时调用] -->
<!-- submit上设置事件监听，prevent组织浏览器的默认行为，即重新加载页面 -->
  <form @submit.prevent="submit">
    <section class="content">
      <h2>{{ title }}</h2>
      <slot />

      <!-- main content -->
      <div class="actions">
        <!-- action button -->
        <slot name="actions" />
      </div>

      <div class="error" v-if="error">{{ error }}</div>
    </section>

    <transition name="fade">
      <!-- expandign over the form -->
      <Loading v-if="busy" class="overlay" />
    </transition>
  </form>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    operation: {
      type: Function,
      required: true,
    },
    valid: {
      type: Boolean,
      required: true,
    },
  },

  data () {
    return {
      error: null,
      // 切换 加载动画的显示
      busy: false,
    }
  },

  methods: {
    async submit () {
      if (this.valid && !this.busy) {
        this.error = null
        this.busy = true
        try {
          await this.operation()
        } catch (e) {
          this.error = e.message
        }
        this.busy = false
      }
    },
  },
}
</script>
