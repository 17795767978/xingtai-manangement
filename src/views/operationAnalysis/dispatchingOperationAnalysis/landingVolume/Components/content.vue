<template>
  <div class="content-wrapper">
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      :row-key="getRowKeys"
      show-summary
      >
      <!-- <el-table-column
        align="center"
        type="expand"
        >
      </el-table-column> -->
      <el-table-column
        align="center"
        prop="date"
        label="日期"
        >
      </el-table-column>
      <el-table-column
        align="center"
        v-for="(item, index) in stations"
        :key="index"
        :label="item">
        <template slot-scope="scope">
          {{scope.row.stations[index]}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="合计">
        <template slot-scope="scope">
          {{totel(scope.row)}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      stations: ['南门', '钟楼', '北大街'],
      tableData: [{
        id: '1',
        date: '2019-05-10',
        stations: [1, 2, 3],
        children: [{
            date: '8时',
            stations: [1, 2, 3]
          },
          {
            date: '9时',
            stations: [1, 2, 3]
          }
        ]
      },
      {
        id: '2',
        date: '2019-05-10',
        stations: [1, 2, 3],
        children: [{
            id: 32,
            date: '8时',
            stations: [1, 2, 3]
          },
          {
            id: 33,
            date: '9时',
            stations: [1, 2, 3]
          }
        ]
      },
      {
        id: '3',
        date: '2019-05-10',
        stations: [1, 2, 3],
        children: [{
            date: '8时',
            stations: [1, 2, 3]
          },
          {
            date: '9时',
            stations: [1, 2, 3]
          }
        ]
      },
      {
        id: '4',
        date: '2019-05-10',
        stations: [1, 2, 3],
        children: [{
            date: '8时',
            stations: [1, 2, 3]
          },
          {
            date: '9时',
            stations: [1, 2, 3]
          }
        ]
      }
      ],
      getRowKeys(row) {
        console.log(row.id);
        return row.id;
      },
      expands: []
    };
  },
  components: {
  },
  computed: {
  },
  created () {},
  mounted () {
    this.expands.push(this.tableData[3].id);
  },
  methods: {
    totel (row) {
      let num = 0;
      row.stations.forEach((item) => {
        num += item;
      });
      return num;
    }
    // getSummaries(param) {
    //   const { columns, data } = param;
    //   console.log(columns);
    //   const sums = [];
    //   columns.forEach((column, index) => {
    //     if (index === 0) {
    //       sums[index] = '总数';
    //       return;
    //     }
        // const values = data[index].stations.map(item => Number(item[column.property]));
        // const values = stations.map(item => Number(item[column.property]));
        // console.log(column.property);
        // const values = stations.map(station => Number(station[]));
    //     console.log(values);
    //     if (!values.every(value => isNaN(value))) {
    //       sums[index] = values.reduce((prev, curr) => {
    //         const value = Number(curr);
    //         if (!isNaN(value)) {
    //           return prev + curr;
    //         } else {
    //           return prev;
    //         }
    //       }, 0);
    //       sums[index] += ' 元';
    //     } else {
    //       sums[index] = 'N/A';
    //     }
    //   });

    //   return sums;
    // }
  }
};
</script>

<style lang="scss" scoped>
.content-wrapper {
  width: 100%;
  padding: 20px 20px;
  box-sizing: border-box;
}
</style>
