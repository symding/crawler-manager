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
                <el-breadcrumb-item> Node 列表 </el-breadcrumb-item>
            </el-breadcrumb>
            <h2>集群 {{ client.name}} 的 Node</h2>
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
  :data="tableData"
  height="650"
  :cell-style="{'padding-top':'6px','padding-bottom':'6px','font-size':'12px',}"
  :header-cell-style="{'font-size':'12px','padding-bottom':'6px','padding-top':'6px','background-color':'rgb(249,249,249)'}"
  style="width: 100%;">
  <el-table-column
    label="NodeId"
    width="230"
    prop="id"
    sortable>
  </el-table-column>
  <el-table-column
    label="Hostname"
    prop="hostName"
    width="200"
    sortable>
  </el-table-column>
  <el-table-column
    prop="role"
    label="Role"
    sortable>
  </el-table-column>
  <el-table-column
    label="IP地址/状态"
    sortable
    prop="addr"
    width=150>
    <template slot-scope="scope">
      <el-tooltip style="font-size: 8px;" effect="light" :content="scope.row.state" placement="left-end">
        <div class="green_dot"  v-if="scope.row.state=='ready'"></div>
        <div class="red_dot" v-if="scope.row.state!='ready'"></div>
      </el-tooltip>
        {{ scope.row.addr }}
      </template>
  </el-table-column>
  <el-table-column
    label="系统信息"
    width=240
    >
    <template slot-scope="scope">
      <el-tag v-for="i in scope.row.systemInfo" type="info" size="mini" style="margin-right:5px;" :key="i">{{ i }}</el-tag>
    </template>
  </el-table-column>
  <el-table-column
    label="Labels"
    width=200>
    <template slot-scope="scope">
        <p style="font-size:10px;margin:0px;color: black;display: inline;background-color:grey;border-radius: 4px;font-weight: bold;color: whitesmoke;margin-right: 1px;" v-for="i in scope.row.labels" :key="i" >&nbsp;{{i}}&nbsp;</p>
      </template>
  </el-table-column>
</el-table>
</div>
</div>
</template>

<script>
import { clientNodes } from '../../api/dockerApi';
export default {
  name: 'HelloWorld',
  props: {
    client: Object
  },
  data: function () {return {
    tableData:[]
  }},
  mounted() {
    clientNodes({"host":this.client.host}).then(response => {for(var item of response.data) {
          this.tableData.push(item)
  }})
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->