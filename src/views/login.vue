<template>
  <div class="loginBack">
    <transition name="el-fade-in-linear">
      <el-tabs v-show="loginShow" v-model="loginTabs" type="card" style="padding-right: 50px;" class="loginMain">
        <el-tab-pane label="登陆" name="loginTab">
          <h2>MyCourses课程管理系统</h2>
          <el-form :model="loginForm" :rules="loginRule" ref="loginForm" label-width="100px">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="loginForm.email"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="loginForm.password" type="password" :clearable="true"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitLoginForm">登陆</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="registryTab">
          <h2>MyCourses课程管理系统</h2>
          <el-form :model="registryForm" :rules="registryRule" ref="registryForm" label-width="100px">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="registryForm.email"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="registryForm.password" type="password" :clearable="true"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="repeatPassword">
              <el-input v-model="registryForm.repeatPassword" type="password" :clearable="true"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="verificationCode">
              <el-input v-model="registryForm.verificationCode">
                <el-button slot="append" :disabled="buttonDisabled" @click="sendVerificationCode">{{buttonName}}</el-button>
              </el-input>
            </el-form-item>
            <el-form-item style="text-align: left">
              <el-radio v-model="userType" label="student" border>注册为学生</el-radio>
              <el-radio v-model="userType" label="teacher" border>注册为教师</el-radio>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitRegistryForm">注册</el-button>
            </el-form-item>
          </el-form>
          <router-view name="dia"></router-view>
        </el-tab-pane>
      </el-tabs>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'login',
  mounted: function () {
    this.loginShow = true
    console.log('mounted' + this.name)
  },
  methods: {
    init () {
      console.log('init')
    },
    submitLoginForm () {
      this.axios({
        method: 'post',
        url: '/user/12345',
        data: {
          firstName: 'Fred',
          lastName: 'Stone'
        }
      })
    },
    submitRegistryForm () {
      this.axios({
        method: 'post',
        url: '/user/12345',
        data: {
          firstName: 'Fred',
          lastName: 'Stone'
        }
      })
    },
    sendVerificationCode () {
      let that = this
      this.buttonDisabled = true
      let interval = window.setInterval(function () {
        that.buttonName = that.disableTime
        --that.disableTime
        if (that.time < 0) {
          that.buttonName = '发送验证码'
          that.disableTime = 60
          that.buttonDisabled = false
          window.clearInterval(interval)
        }
      }, 1000)
      /**
      this.axios({
        method: 'post',
        url: '/user/12345',
        data: {
          firstName: 'Fred',
          lastName: 'Stone'
        }
      })
       **/
      this.$alert('验证码已发送至您的邮箱: ' + this.registryForm.email + ' ,请注意查收', '验证码已发送', {
        confirmButtonText: '确定'
      })
    }
  },

  data () {
    var validatePassword = (rule, value, cb) => {
      var blank = /^\S*$/
      var pattern = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)[0-9A-Za-z]{8,20}$/g
      if (!pattern.test(value) || !blank.test(value)) {
        cb(new Error('请输入8-20个非空白字符，且至少包括数字和大小写字符中的两种'))
      } else {
        if (this.registryForm.repeatPassword !== '') {
          this.$refs.registryForm.validateField('repeatPassword')
        }
        cb()
      }
    }
    var validateRepeatPassword = (rule, value, cb) => {
      if (value !== this.registryForm.password) {
        cb(new Error('两次输入密码不一致!'))
      } else {
        cb()
      }
    }
    var validateEmail = (rule, value, cb) => {
      if (value.endsWith('nju.edu.cn')) {
        cb()
      } else {
        cb(new Error('请使用南大邮箱注册'))
      }
    }
    var validateVerificationCode = (rule, value, cb) => {
      if (value === this.verificationCode && this.verificationCode !== '') {
        cb()
      } else {
        cb(new Error('验证码不正确,或您尚未获取验证码'))
      }
    }
    return {
      dialogVisible: false,
      loginShow: false,
      loginTabs: 'loginTab',
      userType: 'student',
      buttonName: '发送验证码',
      buttonDisabled: false,
      disableTime: 60,
      verificationCode: '',
      loginForm: {
        email: '',
        password: ''
      },
      loginRule: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入格式正确的邮箱地址', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      registryForm: {
        email: '',
        password: '',
        repeatPassword: '',
        verificationCode: ''
      },
      registryRule: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入格式正确的邮箱地址', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' }
        ],
        repeatPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validateRepeatPassword, trigger: 'blur' }
        ],
        verificationCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { validator: validateVerificationCode, trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style scoped>
  .loginBack {
    height: 100%;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    overflow-y: scroll;
    overflow-x: hidden;
    background: url("../assets/background.png") no-repeat;
  }
  .loginMain {
    text-align: center;
    width: 500px;
    height: 400px;
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
  }
  .el-tabs {
    transition: 1s;
  }
</style>
