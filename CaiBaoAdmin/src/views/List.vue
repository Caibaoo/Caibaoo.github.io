<template>
  <v-app>
    <v-container
      fluid
      grid-list-xl
      fill-height>
      <v-layout
        row
        wrap>
        <v-flex xs6>
          <el-form label-position="right">
            <el-form-item label="启事类型">
              <el-select
                v-model="sNoticeType"
                placeholder="请选择">
                <el-option
                  v-for="item in noticeType"
                  :key="item.index"
                  :label="item.name"
                  :value="item.index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </v-flex>
        <v-flex xs6>
          <el-form label-position="right">
            <el-form-item label="物品类型">
              <el-select
                v-model="sArticleNo"
                placeholder="请选择">
                <el-option
                  v-for="item in articleNo"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </v-flex>
        <v-flex xs6>
          <el-form label-position="right">
            <el-form-item label="搜关键词">
              <el-input
                v-model="sText"
                placeholder="搜索关键字"
                style="width:200px"></el-input>
            </el-form-item>
          </el-form>
        </v-flex>
        <v-flex xs6>
          <el-button
            style="center"
            size="medium"
            type="warning"
            @click="search(sNoticeType, sArticleNo, sText)"
          >搜索</el-button>
        </v-flex>
        <v-flex md12>
          <material-card
            color="green"
            title="拾到信息列表"
            text="">
            <v-data-table
              :headers="pHeaders"
              :items="pickPageList"
              hide-actions>
              <template>
                <span
                  class="subheading font-weight-light text-success text--darken-3"
                />
              </template>
              <template
                v-if="item.noticeType == '2'"
                slot="items"
                slot-scope="{ item }">
                <td>{{ item.noticeID }}</td>
                <td>{{ item.userNo }}</td>
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
                        v-if="item.noticeStatus == '0'"
                        color="green"
                        dark
                        v-on="on">发布中</v-btn>
                      <v-btn
                        v-else
                        color="blue-grey"
                        dark
                        v-on="on">已关闭</v-btn>
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
                          @click="changeNoticeStatus(item.noticeID, '1')"
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
          <div
            class="text-xs-center"
            @click="pickPage(page.pick)"
          >
            <v-pagination
              v-model="page.pick"
              :length="maxPage.pick"
              :total-visible="7"
            ></v-pagination>
          </div>
        </v-flex>
        <v-flex md12>
          <material-card
            color="green"
            title="丢失信息列表"
            text="">
            <v-data-table
              :headers="lHeaders"
              :items="losePageList"
              hide-actions>
              <template>
                <span
                  class="subheading font-weight-light text-success text--darken-3"
                />
              </template>
              <template
                v-if="item.noticeType == '1'"
                slot="items"
                slot-scope="{ item }">
                <td>{{ item.noticeID }}</td>
                <td>{{ item.userNo }}</td>
                <td>{{ articleNo[item.articleNo].label }}</td>
                <td>{{ item.place }}</td>
                <td>{{ item.time|moment("YYYY-MM-DD") }}</td>
                <td>{{ item.phone }}</td>
                <td>{{ item.loseNo }}</td>
                <td>{{ item.noticeTime|moment("YYYY-MM-DD") }}</td>
                <td class="text-xs-center">
                  <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        v-if="item.noticeStatus == '0'"
                        color="green"
                        dark
                        v-on="on">发布中</v-btn>
                      <v-btn
                        v-else
                        color="blue-grey"
                        dark
                        v-on="on">已关闭</v-btn>
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
                          @click="changeNoticeStatus(item.noticeID, '1')"
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
          <div
            class="text-xs-center"
            @click="losePage(page.lose)"
          >
            <v-pagination
              v-model="page.lose"
              :length="maxPage.lose"
              :total-visible="7"
            ></v-pagination>
          </div>
        </v-flex>
      </v-layout>
      <!-- <router-view></router-view> -->
    </v-container>
  </v-app>
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex'
export default {
  data: () => ({
    sNoticeType: '0',
    sArticleNo: '0',
    sText: '',
    list: '',
    pickList: [],
    loseList: [],
    pickPageList: [],
    losePageList: [],
    // 当前页
    page: {
      pick: '',
      lose: ''
    },
    // 最大页数
    maxPage: {
      pick: '',
      lose: ''
    },
    // 启事类型
    noticeType: [
      { name: '全部', index: '0', showTemporary: false },
      { name: '丢失', index: '1', showTemporary: false },
      { name: '拾到', index: '2', showTemporary: true }
    ],
    // 启事状态选项列表
    statusList: [
      { value: '0', status: '发布中', color: 'info' },
      { value: '1', status: '已关闭', color: '' }
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
    pHeaders: [
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
    ],
    // 丢失头部
    lHeaders: [
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
    // 调整分页显示的列表
    pickPage (page) {
        this.pickPageList = []
        var start = page*10 - 10
        var end = start + 10
        for( var i = start; i < end; i++){
          if( this.pickList[i] != undefined ){
            this.pickPageList.push(this.pickList[i])
          } else {
            break
          }
        }
    },
    losePage (page) {
      this.losePageList = []
      var start = page*10 - 10
      var end = start + 10
      for( var i = start; i < end; i++){
        if( this.loseList[i] != undefined ){
          this.losePageList.push(this.loseList[i])
        } else {
          break
        }
      }
    },
    ...mapActions({
      getArticleList: 'GET_ARTICLELIST'
    }),
    test () {
      console.log(this.articleList)
    },
    // 搜索指定启事
    search (sNoticeType, sArticleNo, sText) {
      console.log(sNoticeType, sArticleNo, sText)
      var that = this
      var sType = 0
      that.axios.post('/api/getSearchList', {
        sNoticeType,
        sArticleNo,
        sText,
        sType
      }).then(function (res) {
        that.loseList = []
        that.pickList = []
        that.losePageList = []
        that.pickPageList = []
        for( var i = 0; i < res.data.length; i++){
          if( res.data[i].noticeType == 1 ) {
            that.loseList.push(res.data[i])
          } else {
            that.pickList.push(res.data[i])            
          }
        }
        that.maxPage.pick = Math.ceil(that.loseList.length/10)
        that.maxPage.lose = Math.ceil(that.pickList.length/10)
        that.list = res.data
        that.pickPage(1)
        that.losePage(1)
      }).catch(function (res) {
        console.log(res)
      })
    },
    // 改变启事状态
    changeNoticeStatus (noticeID, noticeStatus) {
      console.log(noticeID, noticeStatus)
      var that = this
      that.axios.post('/api/changeNoticeStatus', {
        noticeID,
        noticeStatus
      }).then(function (res) {
        if (res.data === '0000') {
          that.$router.push('/l-refresh')
        }
      }).catch(function (res) {
        console.log(res)
      })
      // this.search(this.sNoticeType, this.sArticleNo, this.sText)
    }
  },
  computed: {
    ...mapState({
      login: state => state.login,
      testList: state => state.articleList
    })
  },
  created () {
    var that = this
    that.axios.post('/api/getArticleList')
      .then(function (res) {
        if (res.data) {
          that.$store.state.articleList = res.data
        }
      }).catch(function (res) {
        console.log(res)
      })
    if (that.login) {
      that.search(that.sNoticeType, that.sArticleNo, that.sText)
    } else {
      that.$router.push('/admin')
    }
  }
}
</script>
<style lang="scss">
.tim-note {
  bottom: 10px;
  color: #c0c1c2;
  display: block;
  font-weight: 400;
  font-size: 13px;
  line-height: 13px;
  left: 0;
  margin-left: 20px;
  width: 260px;
}
</style>