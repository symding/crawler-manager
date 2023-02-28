<template>
  <div>
        <div style="padding-right:20px;margin-bottom:10px;height:80px;">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item >实验室</el-breadcrumb-item>
                <el-breadcrumb-item >Elasticsearch数据表格化</el-breadcrumb-item>
            </el-breadcrumb>
            <h2>Elasticsearch数据表格化</h2>
        </div>  
        <el-row :gutter="24" style="height:200px;">
                <el-col :span="11" style="height:200px;">
                  <el-input v-model="index_name" size="mini" placeholder="Index Name" style="margin-bottom:5px;"></el-input>
                  <div id="meditor" class="edit" style="height: 160px;border:1px solid grey;border-radius: 5px;"></div>
                </el-col>
                <el-col :span="2">
                  <el-button type="primary" style="background-color: rgb(10,90,190);border:0px;margin-top:80px;height: 40px;" size="mini" @click="submitquery()">Run</el-button>
                  <!-- <el-button size="mini" @click="refresh()" style="float:right;"><i class="el-icon-refresh-right" style="font-weight:bolder;"></i></el-button> -->
                </el-col>
                <el-col :span="11" style="height:200px;margin-bottom: 10px;">
                  <div>
                  <el-radio-group v-model="tableData" @change="changeData">
                    <el-radio v-for="data in result" :key="data.name" :label="data">{{ data.name }}</el-radio>
                  </el-radio-group>
                </div>
                <div style="height:150px;overflow: scroll;">
                  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                  <div style="margin: 5px 0;"></div>
                  <el-checkbox-group v-model="checkedHeader" @change="handleCheckedCitiesChange">
                      <el-checkbox v-for="h in allOption" :label="h" :key="h">{{h}}</el-checkbox>
                  </el-checkbox-group>
                </div>
                </el-col>
        </el-row>
        <el-table
          ref="data_table"
          :data="tableData.values"
          height="420"
          :row-key="row"
          :cell-style="{'padding-top':'6px','padding-bottom':'6px','font-size':'12px'}"
          :header-cell-style="{'font-size':'12px','padding-bottom':'6px','padding-top':'6px','background-color':'rgb(249,249,249)'}"
          style="width: 100%;"
          >
          <el-table-column v-for="h in checkedHeader" :key="h" :label="h">
              <template slot-scope="scope">
                  {{ scope.row[h]}}
              </template>
          </el-table-column>
        </el-table>
  </div>
</template>

<script>
import * as monaco from 'monaco-editor'
import { submitDsl } from '../../api/spiderApi'
export default {
  name: 'HelloWorld',
  data () {
    return {
      activeNames: ['1'],
      query:'{}',
      result:[],
      index_name: "",
      tableData:{
        headers:[],
        values:[]
      },
      checkAll: true,
      checkedHeader: [],
      allOption: [],
      isIndeterminate: true
    }
  },
  mounted() {
    this.initEditors()
  },
  methods: {
      initEditors() {
          this.editor = monaco.editor.create(document.getElementById('meditor'), {
              value: this.query, // 编辑器的值
              theme: 'vs', // 编辑器主题：vs, hc-black, or vs-dark，更多选择详见官网
              autoIndent: true,
              language: "json",
              scrollBeyondLastLine: false
          })
      },
      changeData(val){
        this.tableData = val,
        this.checkedHeader = val.headers
        this.allOption = val.headers
      },
      submitquery(){
        this.query = this.editor.getValue()
        this.dialogVisible = false
        submitDsl({index:this.index_name,query:this.query}).then(
              resp => {
                this.result=resp.data})
      },
      handleCheckAllChange(val) {
        this.checkedHeader = val ? this.allOption : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.allOption.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.allOption.length;
        this.$refs.data_table.doLayout()
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
