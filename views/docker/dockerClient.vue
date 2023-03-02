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
            :data="dockerClients"
            height="590"
            :cell-style="{'padding-top':'6px','padding-bottom':'6px','font-size':'12px'}"
            :header-cell-style="{'font-size':'12px','padding-bottom':'6px','padding-top':'6px','background-color':'rgb(249,249,249)'}"
            style="width: 100%;"
            >
            <el-table-column prop="Name" label="集群名称" width="200" sortable>
                <template slot-scope="scope">
                    <div  class="cell_click" @click="editClient(scope.row,false)">
                        <p style="font-size:14px;color:rgb(65,125,205);margin:0px;">{{ scope.row.name}}</p>
                        <p style="font-size:8px;margin:0px;margin:0px;">{{ scope.row.host}}</p>
                    </div>
                </template>

            </el-table-column>
            <el-table-column label="Node" width="200" sortable>
                <template slot-scope="scope">
                    <div  class="cell_click" @click="getClientNode(scope.row)">
                        <p style="color:rgb(65,125,205);">{{ scope.row.node_alive_count}}/{{ scope.row.node_total_count}}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column  label="Service" sortable>
                <template slot-scope="scope">
                    <div  class="cell_click" @click="getClientService(scope.row)">
                    <a style="color:rgb(65,125,205);">{{ scope.row.service_count}}</a>
                    </div>
                </template>
            </el-table-column>
            <el-table-column  label="Container" sortable>
                <template slot-scope="scope">
                    <p style="color:rgb(65,125,205);">{{ scope.row.container_count}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="ErrorLog" label="操作" width="160">
                <template slot-scope="scope">
                    <el-button slot="reference" size="mini" @click="editClient(scope.row,false)"
                        style="margin-right: 5px;">修改</el-button>
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
            :visible.sync="drawler"
            :with-header="false"
            :destroy-on-close="true"
            @closed="getCientInfo"
            size="80%">
            <edit-client :client="activeClient" v-if="activeComponent=='client'"></edit-client>
            <docker-service :client="activeClient" v-if="activeComponent=='service'"></docker-service>
            <docker-node :client="activeClient" v-if="activeComponent=='node'"></docker-node>
        </el-drawer>
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
        editClient,
    },
    data: function () {return {
        dockerClients:[],
        drawler:false,
        selectClient: {},
        searchText:"",
        activeClient:{},
        activeComponent: ''
  }},
    mounted() {
        this.getCientInfo()
        }
    ,
    methods: {
        // clientInspect(client){
        //     console.log(client)
        //     this.inspect_data = client.inspect
        //     this.inspect_drawler = true
        // },
        getClientNode: function(client){
            this.activeClient = client
            this.activeComponent = "node"
            this.drawler = true
        },
        getClientService: function(client){
            this.activeClient = client
            this.activeComponent = "service"
            this.drawler = true
        },
        editClient: function(client,create){
            this.activeClient = client
            this.activeComponent = "client"
            this.activeClient['create'] = create
            this.drawler = true
            },
        createClient:function(){
            this.editClient({},true)
        },
        getCientInfo(){
            dockerClientInfo({}).then((response) => {
                this.dockerClients = []
                for(var item of response.data) {
                this.dockerClients.push(item)
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