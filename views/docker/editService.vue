<template>
    <div style="padding:20px;">
        <div style="margin-bottom:10px;height:80px;">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>集群管理</el-breadcrumb-item>
                <el-breadcrumb-item v-if="!service.create">{{service.name}}</el-breadcrumb-item>
                <el-breadcrumb-item v-if="!service.create">修改</el-breadcrumb-item>
                <el-breadcrumb-item v-if="service.create">新建 Service</el-breadcrumb-item>
            </el-breadcrumb>
            <h2 v-if="service.create">新建Service</h2>
            <h2 v-if="!service.create"> 修改 {{service.name}}</h2>
        </div>
        <el-form ref="form" :model="new_service" label-width="120px" size="mini" style="margin:15px;">
            <el-form-item label="ServiceName" >
                <el-input v-model="new_service.name" :disabled="!service.create"></el-input>
            </el-form-item>
            <el-form-item label="Image">
                <el-input v-model="new_service.image">
                    <template slot="prepend">ds-prod/</template></el-input>
            </el-form-item>
            <el-form-item label="SchedulingMode">
                <el-col :span="6">
                    <el-form-item style="margin-bottom: 0px;">
                        <el-switch
                            v-model="new_service.global_mode"
                            active-text="Replicas"
                            inactive-text="Global">
                        </el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="Replicas" v-if="new_service.global_mode" style="margin-bottom: 0px;">
                        <el-input v-model="new_service.replicas" ></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="Command">
                <el-input v-model="new_service.command"></el-input>
            </el-form-item>
            <el-form-item label="EntryPoint">
                <el-input v-model="new_service.entrypoint"></el-input>
            </el-form-item>
            <el-form-item label="Volumns">
                <el-input v-model="new_service.volumns"></el-input>
            </el-form-item>
            <el-form-item label="Constraints">
                <el-tag 
                    :key="tag" 
                    v-for="tag in new_service.constraints" 
                    closable 
                    :disable-transitions="false" 
                    @close="handleClose(tag)"
                    size="small"
                >{{tag}}</el-tag>
                <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="mini"
                    style="width:200px;"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                ></el-input>
                <el-button v-else class="button-new-tag" size="mini" @click="showInput">+ Constraints</el-button>
            </el-form-item>
            <el-form-item size="mini">
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
            </el-form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HelloWorld',
    props: {
      service: Object,
      client:Object
    },
    data() {
        return {
            inputValue:'',
            inputVisible:false,
            new_service: {
                name: '',
                image: '',
                global_mode: true,
                replicas:0,
                command: '',
                entrypoint: '',
                volumns: [],
                constraints: []
        },
        }
    },
    methods:{
        handleClose(tag) {
            this.new_service.constraints.splice(this.new_service.constraints.indexOf(tag), 1);
        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick(r => {
                console.log(r)
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                this.new_service.constraints.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .hello {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  
  </style>
  