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

</style>
