<template>
  <main class="faq">
    <h1> Questions </h1>

        <!-- <div class='error' v-if="error">
            can't load the questions
        </div> -->
        <div class='error' v-if="hasRemoteErrors">
            can't load the questions
        </div>

        <!-- <Loading v-if="loading" /> -->
        <!-- <Loading v-if="remoteDataBusy" /> -->
        <section class="list">
            <article v-for="question of questionList" :key="question.id">
                <h2 v-html="question.title"></h2>
                <p v-html="question.content"></p>
            </article>    
        </section>

  </main>
</template>

<script>
import RemoteData from '../mixins/RemoteData'

export default {
  mixins: [
    RemoteData({
      questionList: 'questions',
    }),
  ],

  /* data () {
    return {
      questions: [],
      error: null,
      loading: false,
      $remoteDataLoading: 42,
    }
  },

  async created () {
    try {
      this.questions = await this.$fetch('questions')
    } catch (e) {
      this.error = e
    }
  }, */
  
    // async created () {
    //     // this.loading = true
    //     try {
    //         this.questions = await this.$fetch('questions')
    //         // console.log('try', this.questions)
    //     } catch (e) {
    //         // console.log('e', e)
    //         this.error = e
    //     }
    //     // this.loading = false
    // },

    // mixins: [
    //     RemoteData({
    //         questionList: 'questions',
    //     })
    // ],
    // 当路由匹配时，请求将在组件创建后立即在内部生成
    // created() {
    //     this.loading = true
    //     fetch('http://localhost:3000/questions').then(response => {
    //         if(response.ok) {
    //             return response.json()
    //         } else {
    //             return Promise.reject('error')
    //         }
    //     }).then(result => {
    //         this.questions = result
    //     }).catch (e => {
    //         this.error = e
    //     })
    //     this.loading = false
    // },
    // async created () {
    //     this.loading = true //loading animation
    //     try {
    //         const response = await fetch('http://localhost:3000/questions')
    //         if (response.ok) {
    //             this.questions = await response.json()
    //         } else {
    //             throw new Error('error')
    //         }
    //     } catch (e) {
    //         this.error = e
    //     }
    //     this.loading = false
    // },
    
    // async created () {
    //     // this.loading = true
    //     try {
    //         this.questions = await this.$fetch('http://localhost: 3000/questions')
            
    //     } catch (e) {
    //         this.error = e
    //     }
    //     // this.loading = false

    //     for (const key in resources) {
    //         let url = resources[key]
    //         this.fetchResource(key, url)
    //     }
    // },
    // computed: {
    //     remoteDataBusy () {
    //         return this.$data.remoteDataLoading !== 0
    //     },
    //     hasRemoteErrors () {
    //         // >= 1个错误， 返回true
    //         return Object.keys(this.$data.remoteError).some (
    //             key => this.$data.remoteError[key]
    //         )
    //     }
    // },

    // methods: {
        // 获取一个资源，然后更新数据属性的返回值
        // async fetchResource (key, url) {
        //     this.$data.remoteDataLoading ++
        //     // 重新置错误
        //     this.$data.remoteError[key] = null
        //     try {
        //         this.$data[key] = await this.$fetch(url)
        //     } catch (e) {
        //         console.error(e)
        //         this.$data.remoteError[key] = e
        //     }
        //     this.$data.remoteDataLoading --
        // },
    // },
}
</script>
