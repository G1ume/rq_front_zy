<template>
<el-card shadow="hover">
  <template #header>
    <h1>我是你爹{{questionID}}</h1>
  </template>
  <el-button @click="getInstance(0)"></el-button>
</el-card>
</template>

<script>
import qs from "qs"
import store from "@/store";
export default {
  name: "showCards",
  props:["questionID","postUrl"],
  data(){
    return{
      question:'',
    }
  },
  created() {
    this.question={name:"Loading",id:0,state:'loading'}
  },
  methods:{
    getInstance(key){
      this.$axios({
        method:"post",
        url:this.postUrl,
        data:qs.stringify({
          key:key,
          user:store.state.user_info.user_id,
        })
      }).then(res=>{
        this._resultProcessing(res)
      }).catch(err=>{
        console.error(err)
      })
    },
    _resultProcessing(result){
      if (result.data.result === 1){
        this.question=result.data.data.instance
      }else if (result.data.result!==1){
        this.question.state='failed'
      }
    },
  }
}
</script>

<style scoped>

</style>