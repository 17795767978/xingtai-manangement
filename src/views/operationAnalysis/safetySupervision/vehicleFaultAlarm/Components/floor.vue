<template>
  <div class="floor">
    <div class="content">
      <p class="font">特别说明:根据中华人民共和国交通部颁布的《汽车运输业车辆技术管理规定》，车辆技术状况的等级按照下列条件划分：</p>
      <p class="font">① 一级，完好车：新车行驶到第一次定额大修间隔里程的三分之二和第二次定额大修间隔里程的三分之二以前，汽车各主要总成的基础件和主要零部件坚固可靠，技术性能良好；发动机运转稳定，无异响，动力性能良好，燃润料消耗不超过定额指标，废气排放，噪音符合国家标准；各项装备齐全、完好，在运行中午任何保留条件；</p>
      <p class="font">② 二级，基本完好车：车辆主要技术性能喝状况或行驶里程低于完好车要求，但符合GB7258-2004的规定，能随时参加运输；</p>
      <p class="font">③ 三级， 需修车：送大修前最后一次二级维护后的车辆和正在大修或待更新尚在行驶的车辆；</p>
      <p class="font">④ 四级，停驶车：预计在短期内不能修复或无修复价值的车辆</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
    };
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.floor {
  box-sizing: border-box;
  border: 1px solid #eee;
  border-radius: 6px;
  .font {
    font-weight: 600;
    font-size: 12px;
    line-height: 1.5;
  }
}
</style>
