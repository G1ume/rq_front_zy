<template>
  <el-header>
    <h3><span class="left">chapter selector</span></h3>
    <el-cascader
        v-model="selectInfo"
        :options="chapters"
        :props="{ multiple: true }"
        :show-all-levels="false"
        filterable
        collapse-tags
        collapse-tags-tooltip
        @change="wori"

    />
  </el-header>
  <el-divider/>
  <display-cards :page-size="pageSize" :display_list="qlist" :col-num="1"/>
  <el-divider/>
  <el-button @click="wori">debug_QuestionList</el-button>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import qs from "qs"
import store from "@/store";
import DisplayCards from "@/components/question-display/displayLayout.vue";

export default {
  name: "questionList",
  components: {DisplayCards},
  created() {
    this.pageSize = store.state.pageCfg.size
    /*this.getElemList("getInstance/qlsit",qs.stringify({
      userId:0,
      selectInfo:null,
      offset:null,
      elenum:null,
    }))*/
  },
  data() {
    return {
      pageSize: 0,
      selectInfo: null,
      props: {multiple: true},
      chapters: [
        {
          value: "q",
          label: "new chapter",
          children: [{value: "1", label: "children1", children: []}, {value: "2", label: "children2", children: []}]
        },
        {
          value: "aha",
          label: 'Asia',
          children: [
            {
              value: 2,
              label: 'China',
              children: [
                {value: 3, label: 'Beijing', children: []},
                {value: 4, label: 'Shanghai'},
                {value: 5, label: 'Hangzhou'},
              ],
            },
            {
              value: 6,
              label: 'Japan',
              children: [
                {value: 7, label: 'Tokyo'},
                {value: 8, label: 'Osaka'},
                {value: 9, label: 'Kyoto'},
              ],
            },
            {
              value: 10,
              label: 'Korea',
              children: [
                {value: 11, label: 'Seoul'},
                {value: 12, label: 'Busan'},
                {value: 13, label: 'Taegu'},
              ],
            },
          ],
        },
        {
          value: 14,
          label: 'Europe',
          children: [
            {
              value: 15,
              label: 'France',
              children: [
                {value: 16, label: 'Paris'},
                {value: 17, label: 'Marseille'},
                {value: 18, label: 'Lyon'},
              ],
            },
            {
              value: 19,
              label: 'UK',
              children: [
                {value: 20, label: 'London'},
                {value: 21, label: 'Birmingham'},
                {value: 22, label: 'Manchester'},
              ],
            },
          ],
        },
        {
          value: 23,
          label: 'North America',
          children: [
            {
              value: 24,
              label: 'US',
              children: [
                {value: 25, label: 'New York'},
                {value: 26, label: 'Los Angeles'},
                {value: 27, label: 'Washington'},
              ],
            },
            {
              value: 28,
              label: 'Canada',
              children: [
                {value: 29, label: 'Toronto'},
                {value: 30, label: 'Montreal'},
                {value: 31, label: 'Ottawa'},
              ],
            },
          ],
        },
      ],
      qlist: ["ad", "bc"],
    }
  },
  methods: {
    wori() {

      let str = ""
      for (let i = 0; i < this.selectInfo.length; i++) {
        str = str + this.selectInfo[i].toString() + ";"
      }
      str = str.substring(0, str.length - 1)
      console.log("info", str)
      this.$axios({
        method: "post",
        url: 'test',
        data: qs.stringify({select: str})
      }).then(res => {
        console.log("res", res)
      }).catch(err => {
        console.error(err)
      })
      console.log("qs select", qs.parse(qs.stringify({select: this.selectInfo})).select)
    },
    getElemList(url, data) {
      this.$axios({
        method: "post",
        url: url,
        data: data,
      }).then(res => {
        this._resultProcessing(res)
      }).catch(err => {
        console.error(err)
      })
    },
    _resultProcessing(result) {
      result.data.message
    },
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
.left {
  float: left
}
</style>