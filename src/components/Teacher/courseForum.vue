<template>
<div>
  <el-button type="primary" size="mini" @click="createComment">发布新帖</el-button>
  <br><br>
  <el-table
    :data="forumData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline>
          <el-form-item label="帖子内容">
            <span>{{ props.row.commentContent }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      prop="commentId"
      label="帖子ID"
      width="100">
    </el-table-column>
    <el-table-column
      prop="userEmail"
      label="发帖人"
      width="250">
    </el-table-column>
    <el-table-column
      prop="commentTitle"
      label="标题"
      width="200"
    >
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="viewReplies(scope.row.commentId)">查看回帖</el-button>
        <el-button
          size="mini"
          type="success"
          @click="replyForumComment(scope.row.commentId)">回帖</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
    title="发帖"
    :visible.sync="postCommentVisible"
    :before-close="handleClose">
    <el-form :model="postCommentForm" :rules="postCommentRules" ref="postCommentForm" label-width="100px">
      <el-form-item label="发帖人邮箱" prop="userEmail">
        <el-input v-model="postCommentForm.userEmail" :readonly="true"></el-input>
      </el-form-item>
      <el-form-item label="发帖标题" prop="commentTitle">
        <el-input v-model="postCommentForm.commentTitle"></el-input>
      </el-form-item>
      <el-form-item label="发帖内容" prop="commentContent">
        <el-input type="textarea" :rows="2" v-model="postCommentForm.commentContent"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitPostForm('postCommentForm')">发帖</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <el-dialog
    title="查看回帖"
    :visible.sync="viewReplyVisible">
    <el-table
      :data="replyData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline>
            <el-form-item label="帖子内容">
              <span>{{ props.row.commentContent }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="commentId"
        label="帖子ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="userEmail"
        label="发帖人"
        width="250">
      </el-table-column>
      <el-table-column
        prop="commentTitle"
        label="标题"
        width="200"
      >
      </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="viewReplyVisible = false">确 定</el-button>
  </span>
  </el-dialog>
  <el-dialog
  title="回帖"
  :visible.sync="replyCommentVisible"
  :before-close="handleClose">
  <el-form :model="replyCommentForm" :rules="replyCommentRules" ref="replyCommentForm" label-width="100px">
    <el-form-item label="父帖ID" prop="fatherCommentId">
      <el-input v-model="replyCommentForm.fatherCommentId" :readonly="true"></el-input>
    </el-form-item>
    <el-form-item label="发帖人邮箱" prop="userEmail">
      <el-input v-model="replyCommentForm.userEmail" :readonly="true"></el-input>
    </el-form-item>
    <el-form-item label="回帖标题" prop="commentTitle">
      <el-input v-model="replyCommentForm.commentTitle"></el-input>
    </el-form-item>
    <el-form-item label="回帖内容" prop="commentContent">
      <el-input type="textarea" :rows="2" v-model="replyCommentForm.commentContent"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitReplyForm('replyCommentForm')">回帖</el-button>
    </el-form-item>
  </el-form>
</el-dialog>
</div>
</template>

<script>
import { getForumData, getCommentReply, replyComment, postComment } from '../../api/course'
import { readCookie } from '../../lib/cookie'

export default {
  name: 'courseForum',
  mounted: function () {
    let result = getForumData(this, this.$route.query.courseId)
    result.then(function (res) {
      console.log(res)
      this.forumData = res.data
    }.bind(this)).catch(function (err) {
      console.log(err)
    })
  },
  methods: {
    init () {
      console.log('courseForum' + 'init')
    },
    createComment () {
      this.postCommentForm.courseId = this.$route.query.courseId
      this.postCommentForm.userEmail = readCookie('login')
      this.postCommentVisible = true
    },
    viewReplies (id) {
      let result = getCommentReply(this, id)
      result.then(function (res) {
        console.log(res)
        this.replyData = res.data
        this.viewReplyVisible = true
      }.bind(this)).catch(function (err) {
        console.log(err)
      })
    },
    replyForumComment (id) {
      this.replyCommentForm.courseId = this.$route.query.courseId
      this.replyCommentForm.fatherCommentId = id
      this.replyCommentForm.userEmail = readCookie('login')
      this.replyCommentVisible = true
    },
    handleClose (done) {
      this.$confirm('您所做的修改都将丢失，确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    submitPostForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let result = postComment(this, this.$route.query.courseId, this.postCommentForm.userEmail, this.postCommentForm.commentTitle, this.postCommentForm.commentContent)
          result.then(function (res) {
            console.log(res)
            this.$alert('发帖成功！', '发帖成功', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.go(0)
              }
            })
          }.bind(this))
        } else {
          this.showMsg(this, 'error', '请填写完整的信息')
          return false
        }
      })
    },
    submitReplyForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let result = replyComment(this, this.$route.query.courseId, this.replyCommentForm.fatherCommentId, this.replyCommentForm.userEmail, this.replyCommentForm.commentTitle, this.replyCommentForm.commentContent)
          result.then(function (res) {
            console.log(res)
            this.$alert('回帖成功！', '回帖成功', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.go(0)
              }
            })
          }.bind(this))
        } else {
          this.showMsg(this, 'error', '请填写完整的信息')
          return false
        }
      })
    }
  },
  data () {
    return {
      postCommentVisible: false,
      replyCommentVisible: false,
      viewReplyVisible: false,
      forumData: [],
      replyData: [],
      postCommentForm: {
        userEmail: '',
        commentTitle: '',
        commentContent: ''
      },
      replyCommentForm: {
        fatherCommentId: 0,
        userEmail: '',
        commentTitle: '',
        commentContent: ''
      },
      postCommentRules: {
        commentTitle: [
          { required: true, message: '请输入回帖标题', trigger: 'blur' }
        ],
        commentContent: [
          { required: true, message: '请输入回帖内容', trigger: 'blur' }
        ]
      },
      replyCommentRules: {
        commentTitle: [
          { required: true, message: '请输入回帖标题', trigger: 'blur' }
        ],
        commentContent: [
          { required: true, message: '请输入回帖内容', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
