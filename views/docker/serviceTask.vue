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
        <el-checkbox-group v-model="checkStatus" style="display:inline-block">
          <el-checkbox v-for="i in status_set" :key="i" :label="i"></el-checkbox>
        </el-checkbox-group>
        <el-button size="mini" @click="getAllTask()" style="float:right;"><i class="el-icon-refresh-right" style="font-weight:bolder;"></i></el-button>
      </div>
  <el-table
  :data="tableData.filter(data => checkStatus.indexOf(data.status)>-1)"
  ref="taskTable"
  height="660"
  :row-key="row => { return row.taskId}"
  :cell-style="{'padding-top':'6px','padding-bottom':'6px','font-size':'12px'}"
  :header-cell-style="{'font-size':'12px','padding-bottom':'6px','padding-top':'6px','background-color':'rgb(249,249,249)'}"
  style="width: 100%;"
  :expand-row-key="expands"
  @expand-change="clickRow">
  <el-table-column type="expand" width="15">
      <template slot-scope="props">
        <div style="padding-left:10px;padding-right:10px;">
          <div style="margin-bottom:10px;">
            <div style="display: inline-block">
              <p style="display: inline-block;width:100px;margin:0px;">taskId</p>
              <p style="display: inline-block;float:right;margin:0px;">{{ props.row.taskId }}</p>
            </div>
          </div>
        <div>
          日志行数：
          <el-input placeholder="请输入内容" v-model="lineCount" size="mini" style="width:100px;">
          </el-input>
        <el-button size="mini" style="float:right;margin-bottom: 5px;">刷新日志</el-button>
        </div>
        <div style="height:300px;overflow:scroll;width:100%;border: 1px solid grey;border-radius: 4px;padding: 10px;">
          <pre style="margin:0px;font-size: 10px;">{{task_log}}</pre>
        </div>
        </div>
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
    width="80"
    sortable>
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
      <div class="green_dot"  v-if="scope.row.status=='running'"></div>
      <div class="red_dot"  v-if="red_status.indexOf(scope.row.status)>-1"></div>
      <div class="blue_dot"  v-if="blue_status.indexOf(scope.row.status)>-1"></div>
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
    expands : [],
    status_set: [],
    lineCount:100,
    checkStatus:["running"],
    blue_status: ["new","allocated", "pending" ,"assigned", "accepted", "preparing", "ready","starting","complete"],
    red_status: ["shutdown", "failed", "rejected" ,"remove" ,"orphaned"],
  }},
  mounted() {
    this.getAllTask()
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
    },
    getAllTask(){
      this.tableData = []
      serviceTasks({
        host:this.$props.client.host,
        service_id:this.$props.service.id
      }).then(
        response=>{
          for(var item of response.data) {
            this.tableData.push(item)
            console.log(item.status)
            console.log(this.status_set.indexOf(item.status))
            if (this.status_set.indexOf(item.status)==-1){
              this.status_set.push(item.status)
            }
    }})
    }
  }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->