<template>
  <div  style="padding:20px;height: 100%;">
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
                    style="width:200px;margin-left: 5px;"
                    />
        <el-button size="mini" @click="getAllTask()" style="float:right;"><i class="el-icon-refresh-right" style="font-weight:bolder;"></i></el-button>
      </div>
        <el-table
        :data="tableData.filter(data => data.name.toLowerCase().includes(searchText.toLowerCase()))"
        height="calc(100vh - 200px)"
        :row-key="row => { return row.id}"
        :cell-style="{'padding-top':'6px','padding-bottom':'6px','font-size':'12px'}"
        :header-cell-style="{'font-size':'12px','padding-bottom':'6px','padding-top':'6px','background-color':'rgb(249,249,249)'}"
        style="width: 100%;"
            >
        <el-table-column
          type="selection"
          width="45">
        </el-table-column>
        <el-table-column
          label="Name"
          sortable
          prop="name"
          width="400">
          <template slot-scope="scope">
            <div  class="cell_click" @click="editService(scope.row)">
              <p style="color:rgb(65,125,205);margin:0px;">{{ scope.row.name}}</p>
            </div>
            
            </template>
        </el-table-column>
        <el-table-column
          label="Rep"
          prop="replicas"
          sortable>
          <template slot-scope="scope">
            <div  class="cell_click" @click="showServiceTasks(scope.row)">
              <p style="color:rgb(65,125,205);margin:0px;">{{ scope.row.replicas}}</p>
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
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template>
            <el-button style="color:rgb(65,125,205);padding:0px;" type="text" size="small">启动</el-button>
            <el-button style="color:rgb(65,125,205);padding:0px;" type="text" size="small">暂停</el-button>
            <el-button style="color:rgb(65,125,205);padding:0px;" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="margin-top:10px;">
        <el-button size="mini" @click="getAllTask()" >暂停</el-button>
        <el-button size="mini" @click="getAllTask()" >删除</el-button>
        <el-button size="mini" @click="getAllTask()" >启动</el-button>
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
    drawer: false,
    activeService:{
    },
    searchText:"",
    activeComponent:""
  }},
  mounted() {
    clientServices({"host":this.client.host}).then(response => {for(var item of response.data) {
          this.tableData.push(item)
  }})
    },
  methods: {
    showServiceTasks:function(service) {
      this.activeService = service
      this.activeComponent = "task"
      this.drawer = true
    },
    editService: function(service,create){
      this.activeComponent = "edit"
      if (!create){
        this.activeService = service
      }
      this.activeService['create'] = create
      this.drawer = true
    },
    createService:function(){
      this.editService({},true)
    }
  }
  }
</script>