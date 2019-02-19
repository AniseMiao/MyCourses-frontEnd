<template>
  <p>欢迎您，管理员{{username}}</p>
</template>

<script>
export default {
  name: 'home',
  mounted: function () {
    console.log('mounted')
  },
  methods: {
    init () {
      console.log('init')
    }
  },
  data () {
    return {
      username: 'Admin'
    }
  }
}
</script>

<style scoped>

</style>
