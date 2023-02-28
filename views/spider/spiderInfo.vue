<template>
  <div >
    <div style="margin-bottom:10px;height:80px;">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>爬虫管理</el-breadcrumb-item>
            </el-breadcrumb>
            <h2>爬虫管理</h2>
        </div>
        <div>
            <el-row :gutter="20">
                <el-col :span="12"><h4>Redis</h4>
            <el-table 
                :data="redis"
                :cell-style="{'padding-top':'6px','padding-bottom':'6px','font-size':'12px'}"
                :header-cell-style="{'font-size':'12px','padding-bottom':'6px','padding-top':'6px','background-color':'rgb(249,249,249)'}"
                style="width: 100%;"
                >
                <el-table-column prop="name" label="Name"></el-table-column>
                <el-table-column prop="host" label="Hots"></el-table-column>
                <el-table-column prop="memory" label="Max Memory"></el-table-column>
                <el-table-column prop="used_memory" label="Used Memory"></el-table-column>
            </el-table></el-col>
                <el-col :span="12"><h4>Kafka</h4>
            <el-table 
                :cell-style="{'padding-top':'6px','padding-bottom':'6px','font-size':'12px'}"
                :header-cell-style="{'font-size':'12px','padding-bottom':'6px','padding-top':'6px','background-color':'rgb(249,249,249)'}"
                style="width: 100%;"
                >
                <el-table-column label="Name"></el-table-column>
                <el-table-column label="Host"></el-table-column>
                <el-table-column label="Max Memory"></el-table-column>
                <el-table-column label="Used Memory"></el-table-column>
            </el-table></el-col>
            <el-col :span="24"><h4>Spider</h4>
            <el-table 
                :data="redis"
                :cell-style="{'padding-top':'6px','padding-bottom':'6px','font-size':'12px'}"
                :header-cell-style="{'font-size':'12px','padding-bottom':'6px','padding-top':'6px','background-color':'rgb(249,249,249)'}"
                style="width: 100%;"
                >
                <el-table-column prop="name" label="Name"></el-table-column>
                <el-table-column prop="host" label="Hots"></el-table-column>
                <el-table-column prop="memory" label="Max Memory"></el-table-column>
                <el-table-column prop="used_memory" label="Used Memory"></el-table-column>
            </el-table></el-col>
            </el-row>
        </div>
  </div>
</template>

<script>
export default {
  name: 'spider-info',
  data: function () {return {
        redis:[{
            "name":"spider_task",
            "host":"127.0.0.1",
            "memory": 7.6,
            "used_memory":2.4,
            },
            {"name":"data_cache",
            "host":"127.0.0.1",
            "memory": 7.6,
            "used_memory":2.4,
            }],
        allType:["redis","kafka","spider"]
  }}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-card__header {
    padding:10px;
}
</style>
