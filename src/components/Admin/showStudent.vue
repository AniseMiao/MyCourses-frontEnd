<template>
  <div>
    <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>
    <br/>
    <el-table
      :data="studentData"
      style="width: 100%">
      <el-table-column
        prop="userEmail"
        label="邮箱"
        width="300">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="姓名"
        width="250">
      </el-table-column>
      <el-table-column
        prop="userNumber"
        label="学号/工号"
        width="250">
      </el-table-column>
      <el-table-column
        prop="isClosed"
        label="是否注销"
        width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAllUser } from '../../api/user'

export default {
  name: 'showStudent',
  mounted: function () {
    let result = getAllUser(this)
    result.then(function (res) {
      console.log(res)
      let reallyRawData = res.data
      reallyRawData.forEach(v => {
        if (v.userType === 'Student') {
          this.rawData.push(v)
          this.studentData.push(v)
        }
      })
    }.bind(this)).catch(function (err) {
      console.log(err)
    })
  },
  methods: {
    init () {
      console.log('init')
    },
    search () {
      if (this.input !== '') {
        this.studentData = []
        this.rawData.forEach(v => {
          if (!(v.userName.indexOf(this.input))) {
            this.studentData.push(v)
          }
        })
      } else {
        this.studentData = this.rawData
      }
    }
  },
  data () {
    return {
      input: '',
      rawData: [],
      studentData: []
    }
  }
}
</script>

<style scoped>

</style>
