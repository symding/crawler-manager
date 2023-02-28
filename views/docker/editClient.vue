<template>
    <div style="padding:20px;">
        <div style="margin-bottom:10px;height:80px;">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>集群管理</el-breadcrumb-item>
                <el-breadcrumb-item v-if="!client.create">{{client.name}}</el-breadcrumb-item>
                <el-breadcrumb-item v-if="!client.create">修改</el-breadcrumb-item>
                <el-breadcrumb-item v-if="client.create">新建 Client</el-breadcrumb-item>
            </el-breadcrumb>
            <h2 v-if="client.create">新建 Client</h2>
            <h2 v-if="!client.create"> 修改 {{client.name}}</h2>
        </div>
        <el-form ref="form" :model="new_client" label-width="140px" size="mini" style="margin:15px;font-size: 12px;">
            <el-form-item label="集群名" >
                <el-input v-model="new_client.name" :disabled="!client.create"></el-input>
            </el-form-item>
            <el-form-item label="主节点地址" >
                <el-input v-model="new_client.host"></el-input>
            </el-form-item>
            <el-form-item label="节点数量" >
                <el-input v-model="new_client.node_num"></el-input>
            </el-form-item>
            <el-form-item label="scaling group name" >
                <el-input v-model="new_client.group_name"></el-input>
            </el-form-item>
            <el-form-item label="scaling group id" >
                <el-input v-model="new_client.group_id"></el-input>
            </el-form-item>
            <el-form-item label="access_key_id" >
                <el-input v-model="new_client.api_key"></el-input>
            </el-form-item>
            <el-form-item label="access_key_secret" >
                <el-input v-model="new_client.api_access"></el-input>
            </el-form-item>
            </el-form>
            <el-button type="primary" style="background-color: rgb(10,90,190);border:0px;" size="mini" @click="submitData()">提交</el-button>
            <el-button size="mini" @click="pressEsc()">取消</el-button>
    </div>
  </template>
  <script>
  import { editClient } from '../../api/dockerApi';
  export default {
    name: 'HelloWorld',
    props: {
      client:Object
    },
    
    data() {
        return {
            new_client: {
                name: this.client.name,
                host: this.client.host,
                node_num: this.client.node_total_count,
                group_name: this.client.group_name,
                group_id: this.client.group_id,
                api_key: this.client.api_key,
                api_access: this.client.api_access,
        },
        }
    },
    methods:{
        submitData(){
            let param = this.new_client
            console.log(param)
            editClient(param).then(
                function (resp) { if (resp.data.Status == 'success') { this.$message('更新成功') } }).catch(
                    function (error) { console.log(error) })
            this.pressEsc()
        },
        pressEsc(){
            document.body.dispatchEvent(new KeyboardEvent('keydown', {
                bubbles: true, cancelable: true, keyCode: 27
            }));
        }
    }
  }
  </script>
  
  