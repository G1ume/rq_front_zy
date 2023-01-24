<template>
  <el-container>
    <el-main>
      <el-row :gutter="10" v-for="lineNum in eleNum" :key="lineNum" justify="center">
        <el-col :span="6"  v-for="columnNum in 4" :key="columnNum">
          行,列{{lineNum}}{{columnNum}} <show-cards :questionID="15"/>
        </el-col>
      </el-row>
<!--      <el-space wrap>-->
<!--        <ShowCards   class="box-card" style="width: 250px"-->
<!--                    :questionID="getQuestionInstance()"-->
<!--        />-->
<!--      </el-space>-->
    </el-main>
    <el-footer>
      <div class="pageChange">
        <el-pagination
            v-model:current-page="pageNum"
            layout="prev, pager, next"
            :hide-on-single-page=true
            :total=display_list.length
            :page-size=pageSize
            @current-change="changePage"
        />
      </div>
    </el-footer>
  </el-container>

</template>

<script>
import ShowCards from "@/components/question-display/showCards.vue";

export default {
  name: "displayCards",
  data(){
    return{
      eleNum:15,
      pageNum:0,
    }
  },
  components: {ShowCards},
  props:["display_list","pageSize"],
  methods:{
    getQuestionInstance(curIndex){
      return curIndex
    },
    changePage(val) {
      //this.qlistReload()
      this.pageNum = val
      let headIndex = (this.pagenum - 1) * this.pageSize
      this.eleNum = (this.pagenum) * this.pageSize > this.display_list.length ? this.display_list.length - headIndex : this.pageSize
    },
  }
}
</script>

<style scoped>

</style>