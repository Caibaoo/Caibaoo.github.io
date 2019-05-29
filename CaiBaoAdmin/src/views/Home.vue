<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout wrap>
      <v-flex
        md12
        sm12
        lg6
      >
        <material-chart-card
          :data="dailySalesChart.data"
          :options="dailySalesChart.options"
          color="info"
          type="Line"
        >
          <h4 class="title font-weight-light">本周启事发布数</h4>
          <p class="category d-inline-flex font-weight-light">
            <v-icon
              color="green"
              small
            >
              mdi-arrow-up
            </v-icon>
            <span class="green--text">55%</span>&nbsp;
            今天增加的启事发布数
          </p>

          <template slot="actions">
            <v-icon
              class="mr-2"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light">4分钟前更新</span>
          </template>
        </material-chart-card>
      </v-flex>
      <v-flex
        md12
        sm12
        lg6
      >
        <material-chart-card
          :data="emailsSubscriptionChart.data"
          :options="emailsSubscriptionChart.options"
          :responsive-options="emailsSubscriptionChart.responsiveOptions"
          color="red"
          type="Bar"
        >
          <h4 class="title font-weight-light">本年度启事发布数</h4>
          <p class="category d-inline-flex font-weight-light"></p>

          <template slot="actions">
            <v-icon
              class="mr-2"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light">10分钟前更新</span>
          </template>
        </material-chart-card>
      </v-flex>
      <v-flex
        sm6
        xs12
        md6
        lg3
      >
        <material-stats-card
          color="green"
          icon="mdi-store"
          title="启事总数"
          v-model="homeInfo.noticeSum"
          sub-icon="mdi-calendar"
          sub-text="刚刚更新"
        />
      </v-flex>
      <v-flex
        sm6
        xs12
        md6
        lg3
      >
        <material-stats-card
          color="orange"
          icon="mdi-content-copy"
          title="Used Space"
          value="6.9/40"
          small-value="GB"
          sub-icon="mdi-update"
          sub-text="空间还挺充足的"
          sub-text-color="text-primary"
        />
      </v-flex>
      <v-flex
        sm6
        xs12
        md6
        lg3
      >
        <material-stats-card
          v-if="ECSInfo.usedmemBL < 75"
          color="green"
          icon="mdi-information-outline"
          title="内存使用率"
          v-model="ECSInfo.usedmemBLM"
          sub-icon="mdi-tag"
          sub-text="运行正常"
        />
        <material-stats-card
          v-else
          color="red"
          icon="mdi-information-outline"
          title="内存使用率"
          v-model="ECSInfo.usedmemBLM"
          sub-icon="mdi-tag"
          sub-text="可用内存不多"
        />
      </v-flex>
      <v-flex
        sm6
        xs12
        md6
        lg3
      >
        <material-stats-card
          color="info"
          icon="mdi-twitter"
          title="用户数"
          v-model="homeInfo.userSum"
          sub-icon="mdi-update"
          sub-text="刚刚更新"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {
  mapState
} from 'vuex'
export default {
  data () {
    return {
      // 站点启事统计信息
      homeInfo: {
        noticeSum: '',
        userSum: ''
      },
      // 服务器状态信息
      ECSInfo: {
        freemem:'',
        totalmem:'',
        usedmemBL:'',
        usedmemBLM:'',
        cpu:''
      },
      dailySalesChart: {
        data: {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [
            [12, 17, 7, 17, 23, 18, 38]
          ]
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 50,
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      dataCompletedTasksChart: {
        data: {
          labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
          series: [
            [230, 750, 450, 300, 280, 240, 200, 190]
          ]
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      emailsSubscriptionChart: {
        data: {
          labels: ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De'],
          series: [
            [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

          ]
        },
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
          }
        },
        responsiveOptions: [
          ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0]
              }
            }
          }]
        ]
      },
      tabs: 0,
      list: {
        0: false,
        1: false,
        2: false
      }
    }
  },
  computed: {
    ...mapState({
      login: state => state.login
    })
  },
  methods: {
    complete (index) {
      this.list[index] = !this.list[index]
    }
  },
  created () {
    var that = this
    that.axios.post('/api/getHomeInfo')
      .then(function (res) {
        that.homeInfo.userSum = res.data[1][0].userSum
        that.homeInfo.noticeSum = res.data[0][0].noticeSum
        console.log(that.homeInfo.userSum,that.homeInfo.noticeSum)
      }).catch(function (res) {
      console.log(res)
    })
    that.axios.post('/api/getECSInfo')
      .then(function (res) {
        that.ECSInfo = res.data
        console.log(that.ECSInfo)
      }).catch(function (res) {
        console.log(res)
      })
    if (this.login) {
    } else {
      this.$router.push('/admin')
    }
  }
}
</script>
