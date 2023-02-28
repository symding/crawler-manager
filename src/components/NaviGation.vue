<template>
    <div style="border:1px;height:100%;width:100%;">
    <el-menu
        default-active="2"
        :router="true">
        <el-menu-item v-for="item in noChildren" :index="item.path" :key="item.path">
                <i :class="item.icon"></i>
                <span slot="title">{{ item.name }}</span>
        </el-menu-item>
        <el-submenu v-for="item in hasChildren" :index="item.path" :key="item.path">
            <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.name }}</span>
            </template>
            <el-menu-item-group>
                <el-menu-item v-for="subitem in item.children" :index="subitem.path"  :key="subitem.path">
                    <i :class="subitem.icon"></i>
                    <span>{{ subitem.name }}</span>
                </el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
    </div>
</template>

<script>
export default {
  name: 'NaviGation',
  data() {
      return {
          menu: [
              {
                  path: "/cron-task",
                  name: "定时任务",
                  label: "Crontask",
                  icon: "el-icon-time",
              },
              {
                  path: "/spider-info",
                  name: "爬虫管理",
                  label: "crawler",
                  icon: "el-icon-bangzhu",
              },
              {
                  name: "集群管理",
                  label: "docker",
                  icon: "el-icon-bangzhu",
                  path: "/docker-clients"
              },
              {
                  path: "lab",
                  name: "小玩意儿",
                  label: "lab",
                  icon: "el-icon-bangzhu",
                  children:[
                    {
                        path: "/es-to-csv",
                        name: "Elasticsearch数据表格化",
                        label: "estocsv",
                        icon: "el-icon-view",
                    }
                  ]
              }
          ]
      };
  },
  computed: {
    hasChildren() {
        return this.menu.filter(item => item.children)
    },
    noChildren() {
        return this.menu.filter(item => !item.children)
    }

    }
}
</script>

