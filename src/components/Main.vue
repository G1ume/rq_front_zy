<template>
  <div aria-label="Main Header">
    <el-page-header @back="onBack">
      <template #content>
        <div class="flex items-center">
          <el-avatar
              class="mr-3"
              :size="32"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
          <span class="text-large font-600 mr-3"> 你好 {{ this.username }} </span>
          <span
              class="text-sm mr-2"
              style="color: var(--el-text-color-regular)"
          >
            欢迎回来！
          </span>
        </div>
      </template>
      <template #extra>
        <div class="flex items-center">
          <el-button type="primary" @click="tologin"><span>{{this.online?'切换账号':'登录'}}</span></el-button>
          <el-button class="ml-2"  @click="dialogVisible = true">注销</el-button>
          <el-dialog
              v-model="dialogVisible"
              title="注意"
              width="20%">
            <span>确定要注销吗？</span>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="toOffLine">
                  确认
                </el-button>
              </span>
            </template>
          </el-dialog>
        </div>
      </template>
    </el-page-header>
    <el-divider/>
  </div>
  <el-tabs type="border-card">
    <el-tab-pane label="Question List">
      <div v-show="!this.online">
        <p>请登录后查看</p>
      </div>
      <el-space wrap>
        <el-card v-for="i in pageSize" :key="i" class="box-card" style="width: 250px" v-show="i<=eleNum">
          <template #header>
            <div class="card-header">
              <span>{{ "问题" + (qs.parse(qlist.at(i + offset - 1)).id) }}</span>
              <el-button class="button" type="primary" @click="showAnswer (qlist.at(i+offset-1))" text>查看答案
              </el-button>
              <el-dialog
                  v-model="answerVisible"
                  :title=qs.parse(cur_q).content.toString()
                  width="40%">
                <span>{{ "问题 " + qs.parse(cur_q).id + " 答案是: " + qs.parse(cur_q).answer }}</span>
                <template #footer>
                    <span class="dialog-footer1">
                      <el-button @click="answerVisible = false" type="primary">确定</el-button>
                    </span>
                </template>
              </el-dialog>
            </div>
          </template>
          <div>
            {{ "问题描述: " + qs.parse(qlist.at(i - 1)).content }}
          </div>
        </el-card>
      </el-space>
      <div class="pageChange">
        <el-pagination
            v-model:current-page="page1"
            layout="prev, pager, next"
            :hide-on-single-page=true
            :total=qlist.length
            :page-size=pageSize
            @current-change="changePage"
        />
      </div>
    </el-tab-pane>
    <el-tab-pane label="Random Question" :disabled="this.online">
      <div v-show="!online">
        <p>请登录后查看</p>
      </div>
      <div v-show="online">
        <el-progress
            width="60"
            type="circle"
            :stroke-width="5"
            :percentage="70">
        </el-progress>
      </div>
    </el-tab-pane>
    <el-tab-pane label="Upload Question" :disabled="this.online">
      <div v-show="!online">
        <p>请登录后查看</p>
      </div>
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
    <el-tab-pane label="Personal Page" :disabled="this.online">
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
import qs from "qs";
import {ref} from "vue";
let eleNum = 20
let offset = 0
const pageSize = 20
const qlist = []
const page1 = ref(5)
// eslint-disable-next-line no-unused-vars
const handleCurrentChange = (val) => {
  offset = (val - 1) * 20
  eleNum = (val) * 20 > qlist.length ? qlist.length - offset : pageSize
  console.log(val, offset, eleNum)
}
/*
qlist.push(qs.stringify({content: 'q0',type: '',id: 0,path: '',answer: 'a0'}))
qlist.push(qs.stringify({content: 'q1',type: '',id: 1,path: '',answer: 'a1'}))
qlist.push(qs.stringify({content: 'q2',type: '',id: 2,path: '',answer: 'a2'}))
*/
store.commit('getUserName')
store.commit('getAccessToken')
for (let i = 0; i < 50; i++) {
  qlist.push(qs.stringify({content: 'q' + i, type: '', id: i + 1, path: '', answer: 'a' + i}))
}
//console.log(qlist)
</script>

<script>
import {ElMessage} from "element-plus";
import store from "@/store";
import Cookies from "js-cookie";

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
      online: store.state.access_token,
      cur_q: qs.stringify({
        content: '',
        type: '',
        id: 0,
        path: '',
        answer: ''
      }),
      eleNum: 0,
      pageSize: 20,
      offset: 0,
    }
  },
  methods: {
    tologin: function () {
      this.$router.push({
        name: "Login"
      })
    },
    debug: function () {
      if (store.state.access_token) {
        console.log('OnLine')
      } else {
        console.log('OffLine')
      }
      store.commit('getUserName')
      console.log(this.online, this.username, Cookies.get('user_name'))
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
    changePage: function (val) {

      console.log(val, this.offset, this.eleNum)
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