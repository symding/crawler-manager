<template>
  <div  style="padding:20px;height: 100%;">
    <div style="margin-bottom:10px;height:80px;">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>集群列表</el-breadcrumb-item>
                <el-breadcrumb-item > {{ client.Name}} </el-breadcrumb-item>
                <el-breadcrumb-item> Service列表 </el-breadcrumb-item>
            </el-breadcrumb>
            <h2>集群 {{ client.Name}} 的 Service</h2>
    </div>

    <div>
        <div style="margin-bottom:10px;">
        <el-button type="primary" style="background-color: rgb(10,90,190);border:0px;" size="mini" @click="createService()">新建</el-button>
        <el-input
                    v-model="searchText"
                    size="mini"
                    style="width:200px;margin-left: 5px;"
                    />
        <el-button size="mini" @click="getService()" style="float:right;"><i class="el-icon-refresh-right" style="font-weight:bolder;"></i></el-button>
      </div>
        <el-table
        :data="tableData"
        height="calc(100vh - 200px)"
        :row-key="(row) => { return row.ID}"
        :cell-style="{'padding-top':'6px','padding-bottom':'6px','font-size':'12px'}"
        :header-cell-style="{'font-size':'12px','padding-bottom':'6px','padding-top':'6px','background-color':'rgb(249,249,249)'}"
        style="width: 100%;"
        @selection-change="handleSelectionChange"
            >
        <el-table-column
          type="selection"
          :reserve-selection="true"
          width="45">
        </el-table-column>
        <el-table-column
          label="Name"
          prop="Name"
          sortable
          width="400">
          <template slot-scope="scope">
            <div  class="cell_click" @click="inspectService(scope.row.ID)">
              <p style="color:rgb(65,125,205);margin:0px;">{{ scope.row.Name}}</p>
            </div>
            </template>
        </el-table-column>
        <el-table-column
          label="Rep"
          prop="Task"
          sortable>
          <template slot-scope="scope">
            <div  class="cell_click" @click="showServiceTasks(scope.row.ID)">
              <p style="color:rgb(65,125,205);margin:0px;" v-if="scope.row.Task!=-1">{{ scope.row.Task}}</p>
              <p style="color:rgb(65,125,205);margin:0px;" v-if="scope.row.Task==-1">Global</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          sortable
          width="100">
          <template>
            <div class="green_dot" ></div> active
            <!-- <div class="red_dot"  v-if="red_status.indexOf(scope.row.status)>-1"></div> -->
          </template>
        </el-table-column>
        <el-table-column
          label="image"
          prop="Image"
          width="210"
          sortable>
        </el-table-column>
        <el-table-column
          label="约束条件"
          width="180">
          <template slot-scope="scope">
            <el-tag v-for="t in scope.row.Constraints" type="info" size="mini" style="margin-right:5px;" :key="t">{{ t }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column
          label="文件系统映射"
          width="260"
          >
          <template slot-scope="scope">
            <el-tag v-for="t in scope.row.Mounted" size="mini"  type="info" style="margin-right:5px;" :key="t.Type">{{ t }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button style="color:rgb(65,125,205);padding:0px;" type="text" size="small">启动</el-button>
            <el-button style="color:rgb(65,125,205);padding:0px;" type="text" size="small">暂停</el-button>
            <el-button style="color:rgb(65,125,205);padding:0px;" type="text" size="small" @click="editService(scope.row.ID)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="margin-top:10px;">
      <el-tooltip style="font-size: 5px;" effect="light" content="暂停选中的Service,已暂停的不受影响." placement="top">
        <el-button size="mini" style="margin-right: 5px;margin-left:0px;" @click="getAllTask()" :disabled="selectedService.length==0">暂停</el-button>
      </el-tooltip>
      <el-tooltip style="font-size: 5px;" effect="light" content="启动选中的Service,已启动的不受影响." placement="top">
        <el-button size="mini" style="margin-right: 5px;margin-left:0px;" @click="getAllTask()" :disabled="selectedService.length==0">启动</el-button>
      </el-tooltip>
      <el-tooltip style="font-size: 5px;" effect="light" content="删除选中的Service." placement="top">
        <el-button size="mini" style="margin-right: 5px;margin-left:0px;" @click="getAllTask()" :disabled="selectedService.length==0">删除</el-button>
      </el-tooltip>
      <el-tooltip style="font-size: 5px;" effect="light" content="同步Service配置至数据库以持久化." placement="top">
        <el-button size="mini"  style="margin-right: 5px;margin-left:0px;" @click="syncService()" :disabled="selectedService.length==0">同步</el-button>
      </el-tooltip>
      </div>
    
    <el-drawer
        title="我是里面的"
        size="60%"
        :with-header="false"
        :visible.sync="drawer"
        :append-to-body="true"
        :destroy-on-close="true"
        >
        <service-task :service="activeService" :client="client" v-if="activeComponent=='task'"></service-task>
        <edit-service :service="activeService" :client="client" v-if="activeComponent=='edit'"></edit-service>
        <div v-if="activeComponent=='inspect'">
          <json-viewer :value="activeService" :expand-depth=3></json-viewer>
        </div>
      </el-drawer>
    </div>
</template>

<script>
import { clientServices,saveService } from '../../api/dockerApi';
import ServiceClass from '../../api/data/dockerServiceClass'
import ServiceTask from './serviceTask.vue';
import EditService from './editService.vue';
export default {
  name: 'DockerService',
  components: {
    ServiceTask,
    EditService
    },
  props:{
    client: Object
  },
  data: function () {return {
    tableData: [],
    drawer: false,
    activeService:{},
    searchText:"",
    activeComponent:"",
    selectedService:[]
  }},
  mounted(){
    for(var item of this.client.Service){
      let s = new ServiceClass(item)
      this.tableData.push(s.table_data())
    }
  },
  methods: {
    inspectService(serviceId){
      for (var item of this.client.Service){
        if (item.ID == serviceId){
          this.activeService = item
        }
      }
      this.activeComponent = "inspect"
      this.drawer = true
    },
    showServiceTasks:function(serviceId) {
      for (var item of this.client.Service){
        if (item.ID == serviceId){
          this.activeService = item
        }
      }
      this.activeComponent = "task"
      this.drawer = true
    },
    editService: function(serviceId,create){
      this.activeComponent = "edit"
      if (!create){
        for (var item of this.client.Service){
          if (item.ID == serviceId){
            this.activeService = item
            console.log(item)
          }
        }
      }else{
        this.activeService = {
          create: true
        }
      }
      this.drawer = true
    },
    createService:function(){
      this.editService('',true)
    },
    handleSelectionChange(val){
      console.log(val)
      this.selectedService = val

    },
    syncService(){
      var serviceid = Array()
      this.selectedService.forEach( s=> {
        serviceid.push(s.id)
      });
      var param = {
        "host":this.client.host,
        "client_name":this.client.name,
        "services":JSON.stringify(serviceid)

      }
      saveService(param).then(
        function (resp) {
          console.log(resp)
        }).catch(function (error) {
                        console.log(error) })
    },
    getService() {
        this.tableData = []
        clientServices({"host":this.client.Host}).then(response => {for(var item of response.data) {
          this.tableData.push(item)
      }})
    }
  }
  }
</script>