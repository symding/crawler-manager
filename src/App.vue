<template>
  <div id="app">
        <el-header><router-link to="/">Crawler-Manager</router-link></el-header>
        <el-container>
            <el-aside width="250px">
                <navi-gation></navi-gation>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
  </div>
</template>

<script>
import NaviGation from './components/NaviGation.vue'

export default {
  name: 'App',
  components: {
    NaviGation
  }
}
</script>

<style>
body {
  margin:0px;
}
.el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
.el-aside {
  color: #333;
  height: calc(100vh - 60px);
  border:1px;
}

.el-main {
  color: #333;
  /* text-align: center; */
  height: calc(100vh - 60px);
  padding: 10px;
}
* {
  font-family: "monaco";
}
pre {
  font-family: monospace;
}

[class^="mtk"] {
  font-family: Menlo, Monaco, "Courier New", monospace;
}

.green_dot {
  position: absolute;
  top: 50%;
  margin-left: -5px;
  margin-top: -4px;
  width: 8px;
  height: 8px;
  border-radius: 100%;
  left:4px;
  display: inline;
  background: #ffff;
  background-color: rgb(30,173,30);
}

.red_dot {
  position: absolute;
  top: 50%;
  margin-left: -5px;
  margin-top: -4px;
  width: 8px;
  height: 8px;
  border-radius: 100%;
  left:4px;
  display: inline;
  background: #ffff;
  background-color: rgb(253,96,33);
}

.red_dot {
  position: absolute;
  top: 50%;
  margin-left: -5px;
  margin-top: -4px;
  width: 8px;
  height: 8px;
  border-radius: 100%;
  left:4px;
  display: inline;
  background: #ffff;
  background-color: rgb(253,96,33);
}
.blue_dot {
  position: absolute;
  top: 50%;
  margin-left: -5px;
  margin-top: -4px;
  width: 8px;
  height: 8px;
  border-radius: 100%;
  left:5px;
  display: inline;
  background: #ffff;
  background-color: rgb(52, 137, 255);
}
.cell_click:hover {
  background-color: rgb(210, 221, 235);
  border-radius: 4px;
}
.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  border-color: rgb(65,125,205) !important;
  background-color: rgb(65,125,205) !important;
}
.el-checkbox__input.is-checked+.el-checkbox__label{
color: rgb(65,125,205) !important;
}
.el-checkbox__inner:hover{
border-color: rgb(65,125,205) !important;
}
.el-checkbox__input.is-focus .el-checkbox__inner {
border-color: rgb(65,125,205) !important;
}
</style>
