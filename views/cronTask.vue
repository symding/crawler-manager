<template>
    <div>
        <div style="margin-bottom:10px;height:80px;">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>定时任务</el-breadcrumb-item>
            </el-breadcrumb>
            <h2>定时任务</h2>
        </div>
        <div>
            <div style="margin-bottom:10px;">
            <el-button type="primary" style="background-color: rgb(10,90,190);border:0px;" size="mini" @click="createTask()">新建</el-button>
            <el-input
                        v-model="taskSearchText"
                        size="mini"
                        style="width:30%;margin-left: 5px;"
                        />
            <el-button size="mini" @click="getAllTask()" style="float:right;"><i class="el-icon-refresh-right" style="font-weight:bolder;"></i></el-button>
            </div>
        <el-table 
            :data="tableData.filter(data => data.Name.toLowerCase().includes(taskSearchText.toLowerCase()) && handleIncludes(checkTag,data.Tag)&&  (checkState.length==0 ||checkState.includes(data.State)))"
            height="590"
            :cell-style="{'padding-top':'6px','padding-bottom':'6px','font-size':'12px'}"
            :header-cell-style="{'font-size':'12px','padding-bottom':'6px','padding-top':'6px','background-color':'rgb(249,249,249)'}"
            style="width: 100%;"
            >
            <el-table-column prop="Name" label="任务名" width="320" sortable>
                <template slot-scope="scope">
                    <a style="font-size:12px;color:rgb(65,125,205);" @click="modifyTask(scope.row.Name)">{{ scope.row.Name}}</a>
                </template>
            </el-table-column>
            <el-table-column prop="Cron" label="cron">
            </el-table-column>
            <el-table-column prop="State" label="任务状态" width="120" sortable>
                <template slot-scope="scope">
                    <i class="el-icon-check" style="color: rgb(30,173,30);font-weight:900;" v-if="scope.row.State == 'Active'"></i> 
                    <i class="el-icon-close" style="color:red;font-weight:900;" v-if="scope.row.State == 'Stopped'"></i>
                    <i class="el-icon-close" style="color:red;font-weight:900;" v-if="scope.row.State == 'Accepted'"></i>
                    &nbsp;{{ scope.row.State }}
                </template>
            </el-table-column>
            <el-table-column prop="Tag" label="标签" width="250" >
                <template slot-scope="scope">
                    <el-tag v-for="t in scope.row.Tag" size="mini" type="info" style="margin-right:5px;" :key="t">{{ t }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="ExecInfo" label="执行时间" width="180" sortable>
                <template slot-scope="scope">
                    <el-popover  placement="bottom" trigger="click">
                        <el-descriptions class="margin-top" title="最后一次执行信息" :column="1"  border size="mini">
                            <el-descriptions-item>
                                <template slot="label">
                                    <i class="el-icon-user"></i>
                                    最后执行时间
                                </template>
                                {{ scope.row.ExecTime }}
                            </el-descriptions-item>
                            <el-descriptions-item style="padding:0px;" contentStyle="{'height':'200px;'}">
                                <template slot="label">
                                    <i class="el-icon-user"></i>
                                    执行日志
                                </template>
                                <div style="max-height:200px;overflow: auto;">
                                    <p v-for="l in scope.row.ExecLog" :key="l" style="line-height:14px;">{{ l }}</p>
                                </div>
                            </el-descriptions-item>
                            <el-descriptions-item >
                                <template slot="label">
                                    <i class="el-icon-user"></i>错误日志
                                </template>
                                <p v-for="l in scope.row.ErrorLog" :key="l">{{ l }}</p>
                            </el-descriptions-item>
                        </el-descriptions>
                            <i slot="reference" class="el-icon-loading name-wrapper" v-if="scope.row.Executing" style="color:dodgerblue"></i>
                            <i slot="reference" class="el-icon-warning name-wrapper" v-if="scope.row.ErrorLog != null && !scope.row.Executing" style="color:brown"></i>
                            <i slot="reference" class="el-icon-success" v-if="scope.row.ErrorLog == null && scope.row.ExecLog!=null  && !scope.row.Executing" style="color:darkcyan"></i>
                    </el-popover>
                    <span>{{ timeInterval(scope.row.ExecTime) }}</span>
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
        <el-drawer
            :visible.sync="dialogVisible" 
            :key="selectTask" 
            @closed="getAllTask()" 
            title="service"
            :with-header="false"
            :destroy-on-close="true"
            size="80%">
            <create-task :taskName="selectTask"></create-task>
        </el-drawer>
    </div>
</template>

<script>
import { getAllCronTask,operateCronTask } from '../api/cronTaskApi'
import createTask from "../views/createTask.vue"

export default {
    name: 'App',
    components: {
        createTask
    },
    mounted() {
        this.getAllTask()
    },
    data: function () {
        return {
            taskSearchText: '',
            tableData: [],
            dialogVisible: false,
            selectTask: "",
            checkState:[],
            checkTag:[],
            tagList:[],
            stateList:[]
        }
    },
    methods: {
        addCheckTag: function(t){
            if (this.checkTag.indexOf(t)==-1){
                this.checkTag.push(t)
            }
        },
        handleIncludes: function (childArr, fatherArr) {
            return childArr.every(v => fatherArr.includes(v));
            },
        taskLevel:function (state){
            var state_map = {
                Active: "success",
                Accepted: "primary",
                Stopped:"danger"
            }
            return state_map[state]
        },
        getAllTask: function () {
            this.selectTask = ""
            this.tableData = []
            this.stateList = []
            this.tagList = []
            this.checkState = []
            this.checkTag = []

            getAllCronTask()
            .then((response) => {
                for (let i = 0; i < response.data.length; i++) {
                    this.tableData.push(response.data[i])
                    let state =  response.data[i].State
                    let tags = response.data[i].Tag
                    if (this.stateList.indexOf(state)==-1){
                        this.stateList.push(state)
                    }
                    for (let t=0;t<tags.length;t++){
                        if (this.tagList.indexOf(tags[t])==-1){
                            this.tagList.push(tags[t])
                    }
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        modifyTask: function (taskName) {
            this.selectTask = taskName
            this.dialogVisible = true
        },
        createTask: function () {
            this.selectTask = ""
            this.dialogVisible = true
        },
        operateTask: function(taskName,operate){
            operateCronTask({"task_name":taskName,"operation":operate})
                .then((response) => {
                    console.log(response.data)
                    this.$message({
                        message:`${operate} [${taskName}]  ${response.data.Status}`,
                        type: 'success'
                        });
                    this.getAllTask()
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        timeInterval(t){
            var str = ''
            var date3 = new Date() - new Date(t).getTime();   //时间差的毫秒数      
            //计算出相差天数
            var days=Math.floor(date3/(24*3600*1000))
            if (days > 0){
                str = str + days+"天 "
            }
            //计算出小时数
            var leave1=date3%(24*3600*1000)    //计算天数后剩余的毫秒数
            var hours=Math.floor(leave1/(3600*1000))
            if (hours > 0){
                str = str + hours+"时 "
            }
            //计算相差分钟数
            var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
            var minutes=Math.floor(leave2/(60*1000))
            str = str + minutes+"分钟前"
            return str
        }

    }
}
</script>
<style scoped>
</style>