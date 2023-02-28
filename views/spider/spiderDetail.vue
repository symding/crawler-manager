<template>
  <div >
    <el-row :gutter="20">
        <el-col :span="12" v-for="s in chart_data" :key="s.name" style="margin-bottom:20px;">
            <el-card class="box-card" :body-style="{ padding: '5px'}" >
                <spider-chart :chartData="s"></spider-chart>
            </el-card>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import { getSpiderSpeed } from '../../api/spiderApi';
import spiderChart from "../../src/components/spiderSpeedChart.vue"
export default {
  name: 'spider-info',
  components:{
    spiderChart
  },
  data: function () {return {
        spider_speed:[],
        chart_data:[
        ]
  }},
  mounted(){
    getSpiderSpeed()
        .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                this.chart_data.push(response.data[i])
            }
        })
        .catch(function (error) {
            console.log(error);
        });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
