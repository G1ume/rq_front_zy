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
          <span class="text-large font-600 mr-3"> 你好 {{ username }} </span>
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
          <el-button type="primary" v-show="!online" @click="tologin">登录</el-button>
          <el-button class="ml-2" v-show="online" @click="dialogVisible = true">注销</el-button>
          <el-dialog
              v-model="dialogVisible"
              title="注意"
              width="20%"
          >
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
      <div>
        <el-space wrap>
          <el-card v-for="i in 30" :key="i" class="box-card" style="width: 250px">
            <template #header>
              <div class="card-header">
                <span>{{ "问题" + i }}</span>
                <el-button class="button" type="primary" text>查看答案</el-button>
              </div>
            </template>
            <div>
              {{ "问题描述" }}
            </div>
          </el-card>
        </el-space>
        <el-pagination :hide-on-single-page=true layout="prev, pager, next" :total="50"/>
      </div>
    </el-tab-pane>
    <el-tab-pane label="Random Question"><p>Config</p>
      <el-progress
          width="60"
          type="circle"
          :stroke-width="5"
          :percentage="70">
      </el-progress>
    </el-tab-pane>
    <el-tab-pane label="Upload Question">
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
    </el-tab-pane>
    <el-tab-pane label="Personal Page">Task</el-tab-pane>
  </el-tabs>
  <el-button @click="checkLoginInfo" disabled>debug</el-button>
</template>
<script setup>
import {UploadFilled} from '@element-plus/icons-vue'
</script>
<script>
import {ref} from 'vue'
import {ElMessage} from "element-plus";
import store from "@/store";

const dialogVisible = ref(false)
// eslint-disable-next-line no-unused-vars
let headImgPath = "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Main",
  data() {
    return {
      username: store.state.user_name,
      online: store.state.access_token,
    }
  },
  methods: {
    tologin: function () {
      this.$router.push({
        name: "Login"
      })
    },
    checkLoginInfo: function () {
      if (store.state.access_token) {
        console.log('OnLine')
      } else {
        console.log('OffLine')
      }
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