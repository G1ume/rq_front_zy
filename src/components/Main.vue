<template>

  <el-tabs type="border-card">
    <el-tab-pane label="Question List">
      <QuestionList/>
    </el-tab-pane>
    <el-tab-pane label="Random Question" :disabled="!online">
      <div v-show="online">
        <el-progress
            width="60"
            type="circle"
            :stroke-width="5"
            :percentage="70">
        </el-progress>
      </div>
    </el-tab-pane>
    <el-tab-pane label="Upload Question" :disabled="!online">
      <div v-show="online">
        <p>Role</p>
        <el-upload
            style="width:200px; height:300px;"

            class="upload-demo"
            drag
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            multiple
        >
          <el-icon class="el-icon--upload">
            <upload-filled/>
          </el-icon>
          <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              jpg/png files with a size less than 500kb
            </div>
          </template>
        </el-upload>
      </div>
    </el-tab-pane>
    <el-tab-pane label="Personal Page" :disabled="!online">
      <div v-show="!online">
        <p>请登录后查看</p>
      </div>
      <div v-show="online">
        Task
      </div>
    </el-tab-pane>
  </el-tabs>
  <el-button @click="debug">debug</el-button>
</template>
<script setup>
import {UploadFilled} from '@element-plus/icons-vue'
import QuestionList from "@/components/question-display/QuestionList.vue";

store.commit('getUserName')
store.commit('getAccessToken')
</script>

<script>
import {ElMessage} from "element-plus";
import store from "@/store";
import Cookies from "js-cookie";
import {ref} from "vue";
import qs from "qs";

const dialogVisible = ref(false)
const answerVisible = ref(false)

// eslint-disable-next-line no-unused-vars
let headImgPath = "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Main",
  data() {
    return {
      username: store.state.user_name,
      online: false,
      cur_q: qs.stringify({
        content: '',
        type: '',
        id: 0,
        path: '',
        answer: ''
      }),
      eleNum: 20,
      pageSize: 20,
      headIndex: 0,
      qlist1: [],
      pagenum: 0,
      ms1: '登录',
    }
  },
  created() {
    this.qlistReload()
    this.onlineReload()
  },
  methods: {
    tologin: function () {
      this.$router.push({
        name: "Login"
      }).then(
          this.onlineReload()
      )
    },
    debug: function () {
      store.commit('getUserName')
      console.log(this.online, this.username, Cookies.get('user_name'))
      //console.log(this.qlist1)
      console.log(store.state.access_token)
      this.onlineReload()
    },
    onBack: function () {
      ElMessage.warning("没有上一页")
    },
    toOffLine: function () {
      dialogVisible.value = false
      store.commit('clearUserName')
      store.commit('clearAccessToken')
      store.commit('setAccessToken', false)
      store.commit('clearRefreshToken')
      this.$router.go(0)
    },
    showAnswer: function (cur_q) {
      console.log(cur_q)
      this.cur_q = cur_q
      answerVisible.value = true
      this.curAns = '问题' + qs.parse(this.cur_q).ans + '答案：'
    },
    changePage(val) {
      //this.qlistReload()
      this.pagenum = val
      this.headIndex = (this.pagenum - 1) * 20
      this.eleNum = (this.pagenum) * 20 > this.qlist1.length ? this.qlist1.length - this.headIndex : 20
    },
    async qlistReload() {
      this.qlist1 = []
      for (let i = 0; i < 50; i++) {
        this.qlist1.push(qs.stringify({content: 'q' + i, type: '', id: i + 1, path: '', answer: 'a' + i}))
      }
    },
    async onlineReload() {
      store.commit('getAccessToken')
      this.online = store.state.access_token
      if (this.online) {
        this.ms1 = '注销'
      } else {
        this.ms1 = '登录'
      }
    }
  }
}
</script>

<style scoped>
.example-pagination-block + .example-pagination-block {
  margin-top: 10px;
}

.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}

.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
</style>