<template>
    <div >
        <div style="margin-bottom:10px;height:80px;">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>集群管理</el-breadcrumb-item>
                <el-breadcrumb-item>集群列表</el-breadcrumb-item>
            </el-breadcrumb>
            <h2>集群列表</h2>
        </div>

        <div>
            <div style="margin-bottom:10px;">
            <el-button type="primary" style="background-color: rgb(10,90,190);border:0px;" size="mini" @click="createClient()">新建</el-button>
            <el-input
                        v-model="searchText"
                        size="mini"
                        style="width:30%;margin-left: 5px;"
                        />
            <el-button size="mini" @click="getCientInfo()" style="float:right;"><i class="el-icon-refresh-right" style="font-weight:bolder;"></i></el-button>
        </div>
        <el-table 
            :data="docker_clients"
            height="590"
            :cell-style="{'padding-top':'6px','padding-bottom':'6px','font-size':'12px'}"
            :header-cell-style="{'font-size':'12px','padding-bottom':'6px','padding-top':'6px','background-color':'rgb(249,249,249)'}"
            style="width: 100%;"
            >
            <el-table-column prop="Name" label="任务名" width="200" sortable>
                <template slot-scope="scope">
                    <a style="font-size:14px;color:rgb(65,125,205);" @click="editClient(scope.row,false)">{{ scope.row.name}}</a>
                    <p style="font-size:8px;margin:0px;">{{ scope.row.host}}</p>
                </template>
            </el-table-column>
            <el-table-column label="Node" width="200" sortable>
                <template slot-scope="scope">
                    <a style="color:rgb(65,125,205);" @click="getClientNode(scope.row.name,scope.row.host)">{{ scope.row.node_alive_count}}/{{ scope.row.node_total_count}}</a>
                </template>
            </el-table-column>
            <el-table-column  label="Service" sortable>
                <template slot-scope="scope">
                    <a style="color:rgb(65,125,205);" @click="getClientService(scope.row.name,scope.row.host)">{{ scope.row.service_count}}</a>
                </template>
            </el-table-column>
            <el-table-column  label="Container" sortable>
                <template slot-scope="scope">
                    <p style="color:rgb(65,125,205);">{{ scope.row.container_count}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="ErrorLog" label="操作" width="160">
                <template slot-scope="scope">
                    <el-popconfirm
                        @confirm="operateTask(scope.row.Name,'stop')"
                        title="确定停止？"
                        >
                    <el-button 
                        slot="reference" 
                        size="mini" 
                        v-if="scope.row.State == 'Active'"
                        style="margin-right: 5px;">停止</el-button>
                    </el-popconfirm>
                    <el-popconfirm
                        title="是否启动？"
                        @confirm="operateTask(scope.row.Name,'active')"
                        >
                    <el-button slot="reference" size="mini" v-if="scope.row.State != 'Active'"
                        style="margin-right: 5px;">启动</el-button>
                    </el-popconfirm>
                    <el-popconfirm
                        @confirm="operateTask(scope.row.Name,'delete')"
                        title="确认删除？"
                        >
                        <el-button size="mini"
                        slot="reference"
                            style="margin-right: 5px;">删除</el-button>
                    </el-popconfirm>
                    
                </template>
            </el-table-column>
        </el-table>
        </div>
        <!-- <el-row style="margin-bottom:10px;" >
            <el-card class="box-card" :body-style="{ padding: '5px','height':'100px'}" >
                <i class="el-icon-plus"></i>
            </el-card>
        </el-row> -->
        <el-drawer
            title="client"
            :visible.sync="client_drawer"
            :with-header="false"
            :destroy-on-close="true"
            @closed="getCientInfo"
            size="80%">
            <edit-client :client="selectClient"></edit-client>
        </el-drawer>
        <el-drawer
            title="service"
            :visible.sync="service_drawler"
            :with-header="false"
            :destroy-on-close="true"
            size="80%">
            <docker-service :client="selectClient"></docker-service>
        </el-drawer>
        <el-drawer
            title="node"
            :visible.sync="node_drawler"
            :with-header="false"
            :destroy-on-close="true"
            size="80%">
            <docker-node :client="selectClient"></docker-node>
        </el-drawer>
        <!-- <el-drawer
            title="container"
            :visible.sync="container_drawler"
            :with-header="false"
            :destroy-on-close="true"
            size="80%">
            <docker-service :client="selectClient"></docker-service>
        </el-drawer> -->
    </div>
    
  </template>
  
  <script>
  import { dockerClientInfo } from '../../api/dockerApi';
  import dockerService from "./dockerService.vue"
  import dockerNode from "./dockerNode.vue"
  import editClient from './editClient.vue'
  export default {
    name: 'docker-info',
    components: {
        dockerService,
        dockerNode,
        editClient
    },
    data: function () {return {
        docker_clients:[],
        service_drawler:false,
        node_drawler:false,
        container_drawler:false,
        client_drawer:false,
        selectClient: {},
        searchText:""
  }},
    mounted() {
        this.getCientInfo()
        }
    ,
    methods: {
        getClientNode: function(name,host){
            this.selectClient['host'] = host
            this.selectClient['name'] = name
            this.node_drawler = true
        },
        getClientService: function(name,host){
            this.selectClient['host'] = host
            this.selectClient['name'] = name
            this.service_drawler = true
        },
        editClient: function(client,create){
            this.selectClient = client
            this.selectClient['create'] = create
            this.client_drawer = true
            },
        createClient:function(){
            this.editClient({},true)
        },
        getCientInfo(){
            dockerClientInfo({}).then((response) => {
                this.docker_clients = []
                for(var item of response.data) {
                this.docker_clients.push(item)
            }})
        }
    },
  }
  </script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.data-title {
    margin: 5px;
    font-size: 14px;
    text-align: center;
    color: gray;
}
.data-value {
    margin: 4px;
    font-size: 20px;
    text-align: center;
    color: black;
}

.edit_text {
    display: inline;
    font-weight: bold;
    font-size: 14px;
    border-radius: 3px;
    float: right;margin-left: 3px;
    margin-top:4px;
    color: aliceblue;
    border:0px;
}
</style>