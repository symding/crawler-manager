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
  left:5px;
  display: inline;
  background: #ffff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .2);
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
  left:5px;
  display: inline;
  background: #ffff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .2);
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
  left:5px;
  display: inline;
  background: #ffff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .2);
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
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .2);
  background-color: rgb(52, 137, 255);
}


</style>
