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
          <el-button type="primary" @click="tologin" v-show="!online"><span>登录</span></el-button>
          <el-button class="ml-2" @click="dialogVisible = true" v-show="online">注销</el-button>
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
</template>

<script>
export default {
  name: "PageHead"
}
</script>

<style scoped>

</style>