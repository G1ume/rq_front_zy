<template>
  <el-divider/>
  <display-cards :page-size="pageSize"  :display_list="qlist1" />
  <el-divider/>
  <el-space wrap>
    <el-card v-for="i in pageSize" :key="i" class="box-card" style="width: 250px" v-show="i<=this.eleNum">
      <template #header>
        <div class="card-header">
          <span>{{ "问题" + (qs.parse(qlist1.at(i + this.headIndex - 1)).id) }}</span>
          <el-button class="button" type="primary" @click="showAnswer (qlist1.at(i+this.headIndex-1))" text>查看答案
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
        {{ "问题描述: " + qs.parse(qlist1.at(i - 1)).content }}
      </div>
    </el-card>
  </el-space>
  <div class="pageChange">
    <el-pagination
        v-model:current-page="pagenum"
        layout="prev, pager, next"
        :hide-on-single-page=true
        :total=qlist1.length
        :page-size=pageSize
        @current-change="changePage"
    />
  </div>
</template>

<script>

import store from "@/store";
import DisplayCards from "@/components/question-display/displayLayout.vue";
export default {
  name: "questionList",
  components: {DisplayCards},
  created() {
    this.pageSize = store.state.pageCfg.size
  },
  data(){
    return{
      pageSize:0,
      qlist1:[],
    }
  },
  method:{
    changePage(val) {
      //this.qlistReload()
      this.pagenum = val
      this.headIndex = (this.pagenum - 1) * 20
      this.eleNum = (this.pagenum) * 20 > this.qlist1.length ? this.qlist1.length - this.headIndex : 20
    },
  }
}
</script>

<style scoped>

</style>