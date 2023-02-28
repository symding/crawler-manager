<template>
    <div>
        
        <div style="height:400px;">
        <el-table
        ref="data_table"
        :data="tableData.values"
        height="400"
        :row-key="row"
        :cell-style="{'padding-top':'8px','padding-bottom':'8px','font-size':'14px'}"
        :header-cell-style="{'font-size':'14px','padding-bottom':'6px','padding-top':'6px','background-color':'rgb(249,249,249)'}"
        style="width: 100%;"
        >
        <el-table-column v-for="h in checkedHeader" :key="h" :label="h">
            <template slot-scope="scope">
                {{ scope.row[h]}}
            </template>
        </el-table-column>
        </el-table>
    </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HelloWorld',
    props: {
      tableData: Object
    },
    data(){
        return {
            checkAll: true,
            checkedHeader: this.tableData.headers,
            allOption: this.tableData.headers,
            isIndeterminate: true
        }
    },
    methods: {
      
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  