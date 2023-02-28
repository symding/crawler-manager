<template>
    <div style="width:100%;height:200px;" ref="bar">
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  methods:{
    getOption: function (dt){
        return {
            title: {
                text: dt.name
            },
            xAxis: {
                type: 'time'
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                data: dt.data,
                type: 'line',
                showSymbol:false
                }
            ],
            grid: {
                  left: '3%',
                  right: '7%',
                  bottom: '3%',
                  top:'18%',
                  containLabel: true
                }
            }
    }
  },
  props: {
    chartData: Object
  },
  mounted(){
        let myEcharts = this.$charts.init(this.$refs.bar)
        myEcharts.setOption(this.getOption(this.$props.chartData))
  }
}
</script>
