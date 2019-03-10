<template>
  <p>欢迎您， {{username}}同学 </p>

</template>

<script>
import { getUser } from '../../api/user'
import { readCookie } from '../../lib/cookie'

export default {
  name: 'StudentHome',
  mounted: function () {
    let result = getUser(this, readCookie('login'))
    result.then(function (res) {
      console.log(res)
      this.username = res.data.userName
    }.bind(this)).catch(function (err) {
      console.log(err)
    })
    console.log('home' + 'mounted')
  },
  methods: {
    init () {
      console.log('home' + 'init')
    }
  },
  data () {
    return {
      username: ''
    }
  }
}
</script>

<style scoped>

</style>
