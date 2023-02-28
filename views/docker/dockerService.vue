<template>
  <div  style="padding:20px;height: 100%;">
    <!-- <div style="margin-left:10px;margin-right:10px;height:50px;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 5px;">
        <el-breadcrumb-item style="font-weight:bold;">{{ client.name}}</el-breadcrumb-item>
        <el-breadcrumb-item style="font-weight:bold;"> Service </el-breadcrumb-item>
      </el-breadcrumb>
      <el-button size="mini" @click="createService">新增</el-button>
      <el-button size="mini">刷新</el-button>
    </div> -->
    <div style="margin-bottom:10px;height:80px;">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>集群列表</el-breadcrumb-item>
                <el-breadcrumb-item > {{ client.name}} </el-breadcrumb-item>
                <el-breadcrumb-item> Service列表 </el-breadcrumb-item>
            </el-breadcrumb>
            <h2>集群 {{ client.name}} 的 Service</h2>
    </div>

    <div>
        <div style="margin-bottom:10px;">
        <el-button type="primary" style="background-color: rgb(10,90,190);border:0px;" size="mini" @click="createService()">新建</el-button>
        <el-input
                    v-model="searchText"
                    size="mini"
                    style="width:30%;margin-left: 5px;"
                    />
        <el-button size="mini" @click="getAllTask()" style="float:right;"><i class="el-icon-refresh-right" style="font-weight:bolder;"></i></el-button>
      </div>
        <el-table
        :data="tableData.filter(data => data.name.toLowerCase().includes(searchText.toLowerCase()))"
        height="650"
        :row-key="row => { return row.id}"
        :cell-style="{'padding-top':'6px','padding-bottom':'6px','font-size':'12px'}"
        :header-cell-style="{'font-size':'12px','padding-bottom':'6px','padding-top':'6px','background-color':'rgb(249,249,249)'}"
        style="width: 100%;"
            >
        <el-table-column
          label="Name"
          sortable
          prop="name"
          width="400">
          <template slot-scope="scope">
            <a style="color:rgb(65,125,205);" @click="editService(scope.row)">{{ scope.row.name}}</a>
            </template>
        </el-table-column>
        <el-table-column
          label="Rep"
          prop="replicas"
          sortable>
          <template slot-scope="scope">
            <a style="color:rgb(65,125,205);;" @click="showServiceTasks(scope.row)">{{ scope.row.replicas}}</a>
          </template>
        </el-table-column>
        <el-table-column
          label="image"
          prop="image"
          width="210"
          sortable>
        </el-table-column>
        <el-table-column
          label="约束条件"
          width="180">
          <template slot-scope="scope">
            <el-tag v-for="t in scope.row.constraints" type="info" size="mini" style="margin-right:5px;" :key="t">{{ t }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column
          label="文件系统映射"
          width="260"
          >
          <template slot-scope="scope">
            <el-tag v-for="t in scope.row.mounted" size="mini"  type="info" style="margin-right:5px;" :key="t">{{ t }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
    <el-drawer
        title="我是里面的"
        size="60%"
        :with-header="false"
        :visible.sync="taskDrawer"
        :append-to-body="true"
        :destroy-on-close="true"
        >
        <service-task :service="selectedService" :client="client"></service-task>
      </el-drawer>
      <el-drawer
        title="我是里面的"
        size="60%"
        :with-header="false"
        :visible.sync="editDrawer"
        :append-to-body="true"
        :destroy-on-close="true"
        >
        <edit-service :service="selectedService" :client="client"></edit-service>
      </el-drawer>
    </div>
</template>

<script>
import { clientServices } from '../../api/dockerApi';
import ServiceTask from './serviceTask.vue';
import EditService from './editService.vue';
export default {
  name: 'HelloWorld',
  components: {
    ServiceTask,
    EditService
    },
  props:{
    client: Object
  },
  data: function () {return {
    tableData:[],
    taskDrawer: false,
    editDrawer:false,
    selectedService:{
    },
    searchText:""
  }},
  mounted() {
    clientServices({"host":this.client.host}).then(response => {for(var item of response.data) {
          this.tableData.push(item)
  }})
    },
  methods: {
    showServiceTasks:function(service) {
      this.selectedService = service
      this.taskDrawer = true
    },
    editService: function(service,create){
      if (!create){
        this.selectedService = service
        
      }
      this.selectedService['create'] = create
      this.editDrawer = true
    },
    createService:function(){
      this.editService({},true)
    }
  }
  }
</script>