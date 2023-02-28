<template>
    <div style="padding:20px;height: 100%;overflow: scroll;">
        <div style="padding-right:20px;margin-bottom:10px;height:80px;">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item >定时任务</el-breadcrumb-item>
                <el-breadcrumb-item >修改</el-breadcrumb-item>
            </el-breadcrumb>
            <h2 v-if="taskName!=''">修改 {{taskName}}</h2>
            <h2 v-if="taskName==''">新建定时任务</h2>
        </div>
        <el-form ref="form" :model="function_info" label-width="60px">
            <el-form-item label="Name" style="margin-bottom:5px;">
                <el-input size="mini" v-model="function_info.name"></el-input>
            </el-form-item>
            <el-form-item label="Crontab" style="margin-bottom:5px;">
                <el-input size="mini" v-model="function_info.cron"></el-input>
            </el-form-item>
            <el-form-item label="Tag" style="margin-bottom:5px;">
                <el-tag :key="tag" v-for="tag in function_info.tag" style="margin-right:5px;" closable
                    :disable-transitions="false" @close="handleClose(tag)">
                    {{ tag }}
                </el-tag>
                <el-input class="input-new-tag" style="width:100px;" v-if="inputVisible" v-model="inputValue"
                    ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </el-form-item>
            <el-form-item id="editor" style="margin-bottom:5px;">
                <el-switch v-model="diff" active-text="diff code" active-color="#13ce66"
                    inactive-color="#ff4949" :disabled="true">
                </el-switch>
                <div id="meditor" class="edit" style="height:460px;border:1px;" v-show="!diff"></div>
                <div id="mdiffeditor" class="edit" v-show="diff"></div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" style="background-color: rgb(10,90,190);border:0px;" @click="onSubmit">立即创建</el-button>
                <el-button size="small" @click="pressEsc" >取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import * as monaco from 'monaco-editor'
import { cronTaskDetail,modifyTask } from '../api/cronTaskApi'

export default {
    name: 'CreateTask',
    data() {
        return {
            function_info: {
                name: "",
                cron: "",
                tag: [],
                code: ''
            },
            inputVisible: false,
            inputValue: '',
            diff: false,
            diffEditor: null
        }
    },
    props: {
        taskName: String
    },
    mounted() {
        this.initEditors()
        if (this.$props.taskName != '') {
            cronTaskDetail({ "task_name": this.$props.taskName })
                .then((response) => {
                    this.function_info.name = response.data.Name
                    for (let i = 0; i < response.data.Tag.length; i++) {
                        this.function_info.tag.push(response.data.Tag[i])
                    }
                    this.function_info.cron = response.data.Cron
                    this.function_info.code = response.data.taskFunc
                    this.editor.setValue(response.data.taskFunc)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },
    methods: {
        initEditors() {
            this.editor = monaco.editor.create(document.getElementById('meditor'), {
                value: "", // 编辑器的值
                theme: 'vs', // 编辑器主题：vs, hc-black, or vs-dark，更多选择详见官网
                autoIndent: true,
                language: "python",
                scrollBeyondLastLine: false,
            })
        },
        handleClose(tag) {
            this.function_info.tag.splice(this.function_info.tag.indexOf(tag), 1);
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
                this.function_info.tag.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },

        onSubmit() {
            this.function_info.code = this.editor.getValue()
            // let data = new FormData()
            // data.append('name', this.function_info.name)
            // data.append('cron', this.function_info.cron)
            // data.append('tag', JSON.stringify(this.function_info.tag))
            // data.append('code', this.editor.getValue())
            let param = {
                name:this.function_info.name,
                cron:this.function_info.cron,
                tag:JSON.stringify(this.function_info.tag),
                code:this.function_info.code,
            }
            console.log(param)
            modifyTask(param).then(
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
<style scoped>
.edit {
    width: 100%;
    height: 400px;
}
</style>