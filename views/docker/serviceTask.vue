<template>
  <div style="height:100%;padding:20px;">
    <div style="margin-bottom:10px;height:80px;">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>集群列表</el-breadcrumb-item>
                <el-breadcrumb-item> {{ client.name}} </el-breadcrumb-item>
                <el-breadcrumb-item> {{service.name}} </el-breadcrumb-item>
                <el-breadcrumb-item>task 列表</el-breadcrumb-item>
            </el-breadcrumb>
            <h2>{{ service.name}} 的 task</h2>
    </div>

    <div>
        <div style="margin-bottom:10px;">
        <!-- <el-button type="primary" style="background-color: rgb(10,90,190);border:0px;" size="mini" @click="createTask()">新建</el-button>-->
        <el-input
                    v-model="searchText"
                    size="mini"
                    style="width:30%;margin-left: 5px;"
              /> 
        <el-button size="mini" @click="getAllTask()" style="float:right;"><i class="el-icon-refresh-right" style="font-weight:bolder;"></i></el-button>
      </div>
  <el-table
  :data="tableData"
  ref="taskTable"
  height="calc(100vh - 34px)"
  :row-key="row => { return row.taskId}"
  :cell-style="{'padding-top':'6px','padding-bottom':'6px','font-size':'12px'}"
  :header-cell-style="{'font-size':'12px','padding-bottom':'6px','padding-top':'6px','background-color':'rgb(249,249,249)'}"
  style="width: 100%;"
  :expand-row-key="expands"
  @expand-change="clickRow">
  <el-table-column type="expand" width="15">
      <template slot-scope="props">
        <div style="padding-left:15px;">
          <div style="display: inline-block;">
            <div>
              <p style="display: inline-block;width:100px;margin:0px;">taskId</p>
              <p style="display: inline-block;float:right;margin:0px;">{{ props.row.taskId }}</p>
            </div>
          </div>
          
        </div>
        <el-button size="mini" style="margin-left:15px;margin-top:10px;">刷新日志</el-button>
        <el-card style="margin-left:15px;margin-right:15px;margin-top:5px;" :body-style="{'padding':'10px'}">
          <div style="height:300px;overflow:scroll;">
            <pre style="margin:0px;font-size: 10px;">{{task_log}}</pre>
          </div>
        </el-card>
      </template>
  </el-table-column>
  <el-table-column
    label="taskId"
    prop="taskId"
    width="230">
  </el-table-column>
  <el-table-column
    label="Slot"
    prop="slot"
    width="80">
  </el-table-column>
  <el-table-column
    label="节点IP"
    prop="nodeHost"
    width="180">
  </el-table-column>
  <el-table-column
    label="任务状态"
    width=120>
    <template slot-scope="scope">
          {{ scope.row.status}}
      </template>
  </el-table-column>
  <el-table-column
    label="创建时间"
    prop="createTime">
  </el-table-column>
</el-table>
</div>
</div>
</template>

<script>
import { serviceTasks,taskLog } from '../../api/dockerApi';
export default {
  name: 'HelloWorld',
  props: {
    service: Object,
    client:Object
  },
  data: function () {return {
    tableData:[],
    task_log: '',
    expands : []
  }},
  mounted() {
    this.tableData = []
    this.tableData = []
    serviceTasks({
      host:this.$props.client.host,
      service_id:this.$props.service.id
    }).then(
      response=>{
        for(var item of response.data) {
          this.tableData.push(item)
  }})
    },
  methods:{
    clickRow: function(row,expandRows){
      console.log(row)
      this.task_log = ''
      var that = this
      if (expandRows.length>1) {
          that.expands = []
          if (row) {
              that.expands.push(row);
          }
          this.$refs.taskTable.toggleRowExpansion(expandRows[0]);
      } else {
          that.expands = [];
      }
      if  (expandRows.length==0){
        return 
      }
      this.getTaskLog(row)
    },
    getTaskLog: function(row){
      taskLog({host:this.$props.client.host,task_id:row.taskId}).then(response => {
        this.task_log = response.data
      })
    }
  }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->