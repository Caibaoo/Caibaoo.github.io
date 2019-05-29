<template>
  <v-container
    fluid
    grid-list-xl
    fill-height>
    <v-layout
      row
      wrap>
      <v-flex md12>
        <material-card
          color="green"
          title="待审核列表"
          text="">
          <v-data-table
            :headers="headers"
            :items="list"
            hide-actions>
            <template>
              <span
                class="subheading font-weight-light text-success text--darken-3"
              />
            </template>
            <template
              v-if="item.noticeStatus == '2'"
              slot="items"
              slot-scope="{ item }">
              <td>{{ item.noticeID }}</td>
              <td>{{ item.userNo }}</td>
              <td>{{ noticeType[item.noticeType].name }}</td>
              <td>{{ articleNo[item.articleNo].label }}</td>
              <td>{{ item.place }}</td>
              <td>{{ item.time|moment("YYYY-MM-DD") }}</td>
              <td>{{ item.depositPlace }}</td>
              <td>{{ item.phone }}</td>
              <td>{{ item.loseNo }}</td>
              <td>{{ item.noticeTime|moment("YYYY-MM-DD") }}</td>
              <td class="text-xs-center">
                <v-menu offset-y>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      color="green"
                      dark
                      v-on="on">待审核</v-btn>
                  </template>
                  <v-list>
                    <v-list-tile
                      v-for="(item2, index) in statusList"
                      :key="index">
                      <v-btn
                        v-if="item2.value=='0'"
                        color="green"
                        @click="changeNoticeStatus(item.noticeID, '0')"
                      >{{ item2.status }}</v-btn>
                      <v-btn
                        v-else
                        color="blue-grey"
                        @click="changeNoticeStatus(item.noticeID, '3')"
                      >{{ item2.status }}</v-btn>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </td>
              <td class="text-xs-right">
                <el-popover
                  placement="right"
                  width="400"
                  trigger="click">
                  <p>{{ item.note }}</p>
                  <v-img :src ='item.uploadImg'></v-img>
                  <el-button slot="reference">详情</el-button>
                </el-popover>
              </td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
      <v-flex md12>
        <material-card
          color="blue-grey"
          title="未通过列表"
          text="">
          <v-data-table
            :headers="headers"
            :items="list"
            hide-actions>
            <template>
              <span
                class="subheading font-weight-light text-success text--darken-3"
              />
            </template>
            <template
              v-if="item.noticeStatus == '3'"
              slot="items"
              slot-scope="{ item }">
              <td>{{ item.noticeID }}</td>
              <td>{{ item.userNo }}</td>
              <td>{{ noticeType[item.noticeType].name }}</td>
              <td>{{ articleNo[item.articleNo].label }}</td>
              <td>{{ item.place }}</td>
              <td>{{ item.time|moment("YYYY-MM-DD") }}</td>
              <td>{{ item.depositPlace }}</td>
              <td>{{ item.phone }}</td>
              <td>{{ item.loseNo }}</td>
              <td>{{ item.noticeTime|moment("YYYY-MM-DD") }}</td>
              <td class="text-xs-center">
                <v-menu offset-y>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      v-if="item.noticeStatus == '3'"
                      color="blue-grey"
                      dark
                      v-on="on">未通过</v-btn>
                  </template>
                  <v-list>
                    <v-list-tile>
                      <v-btn
                        color="green"
                        @click="changeNoticeStatus(item.noticeID, '0')"
                      >可通过</v-btn>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </td>
              <td class="text-xs-right">
                <el-popover
                  placement="right"
                  width="400"
                  trigger="click">
                  <p>{{ item.note }}</p>
                  <v-img :src ='item.uploadImg'></v-img>
                  <el-button slot="reference">详情</el-button>
                </el-popover>
              </td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {
  mapState
} from 'vuex'
export default {
  data: () => ({
    sNoticeType: '0',
    sArticleNo: '0',
    sText: '',
    list: '',
    // 启事类型
    noticeType: [
      { name: '全部', index: '0', showTemporary: false },
      { name: '丢失', index: '1', showTemporary: false },
      { name: '拾到', index: '2', showTemporary: true }
    ],
    // 启事状态选项列表
    statusList: [
      { value: '0', status: '通  过', color: 'info' },
      { value: '1', status: '不通过', color: '' }
    ],
    // 物品类型
    articleNo: [
      {
        value: '0',
        label: '全部',
        loseNoShow: true
      },
      {
        value: "1",
        label: "校园卡",
        loseNoShow:true
      },
      {
        value: "2",
        label: "雨伞",
        loseNoShow:false
      },
      {
        value: "3",
        label: "U盘",
        loseNoShow:false
      },
      {
        value: "4",
        label: "水杯",
        loseNoShow:false
      },
      {
        value: "5",
        label: "耳机",
        loseNoShow:false
      },
      {
        value: "6",
        label: "钥匙",
        loseNoShow:false
      },
      {
        value: "7",
        label: "眼镜",
        loseNoShow:false
      },
      {
        value: "8",
        label: "其他",
        loseNoShow:false
      }
    ],
    // 拾到头部
    headers: [
      {
        sortable: false,
        text: 'ID',
        value: 'noticeID'
      },
      {
        sortable: false,
        text: '发布者',
        value: 'userNo'
      },
      {
        sortable: false,
        text: '启事类型',
        value: 'noticeType'
      },
      {
        sortable: false,
        text: '物品类型',
        value: 'articleNo'
      },
      {
        sortable: false,
        text: '地点',
        value: 'place'
      },
      {
        sortable: false,
        text: '时间',
        value: 'time'
      },
      {
        sortable: false,
        text: '寄存点',
        value: 'depositPlace'
      },
      {
        sortable: false,
        text: '电话',
        value: 'phone'
      },
      {
        sortable: false,
        text: '失者学号',
        value: 'loseNo'
      },
      {
        sortable: false,
        text: '发布时间',
        value: 'noticeTime'
      },
      {
        sortable: false,
        text: '状态',
        value: 'noticeStatus'
      },
      {
        sortable: false,
        text: '备注',
        value: 'note',
        align: 'right'
      }
    ]
  }),

  methods: {
    changeNoticeStatus (noticeID, noticeStatus) {
      var that = this
      that.axios.post('/api/changeNoticeStatus', {
        noticeID,
        noticeStatus
      }).then(function (res) {
        if (res.data === '0000') {
          that.$router.push('/n-refresh')
        }
      }).catch(function (res) {
        console.log(res)
      })
      // this.search(this.sNoticeType, this.sArticleNo, this.sText)
    }
  },
  computed: {
    ...mapState({
      login: state => state.login
    })
  },
  created () {
    var that = this
    var sNoticeType = that.sNoticeType
    var sArticleNo = that.sArticleNo
    var sText = that.sText
    var sType = 1
    that.axios.post('/api/getSearchList', {
      sNoticeType,
      sArticleNo,
      sText,
      sType
    }).then(function (res) {
      that.list = res.data
    }).catch(function (res) {
      console.log(res)
    })
    if (that.login) {
    } else {
      that.$router.push('/admin')
    }
  }
}
</script>
