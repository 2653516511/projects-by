export default function (id, fields) {
  return {
    // 组件创建时恢复值
    created () {
      for (const field of fields) {
        const savedValue = localStorage.getItem(`${id}.${field}`)
        if (savedValue !== null) {
          this.$data[field] = JSON.parse(savedValue)
        }
      }
    },

    watch: fields.reduce((obj, field) => {
      // watch deal function
      obj[field] = function (val) {
        localStorage.setItem(`${id}.${field}`, JSON.stringify(val))
      }
      return obj
    }, {}),

    methods: {
      saveAllPersistantData () {
        for (const field of fields) {
          localStorage.setItem(`${id}.${field}`, JSON.stringify(this.$data[field]))
        }
      },
    },

    // 组件被销毁时保存字段
    beforeDestroy () {
      this.saveAllPersistantData()
    },
  }
}
