<template>
  <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout
      justify-center
      wrap>
      <v-flex
        xs6
        class="text-xs-right">
        <el-form label-position="right">
          <el-form-item label="">
            <el-input
              v-model="sUserInfo"
              placeholder="搜索关键字"
              style="width:200px"
            ></el-input>
          </el-form-item>
        </el-form>
      </v-flex>
      <v-flex
        xs6
        class="text-xs-center">
        <el-button
          style="center"
          size="medium"
          type="warning"
          @click="getSearchUserInfo(sUserInfo)"
        >搜索</el-button>
      </v-flex>
      <v-flex md12>
        <material-card
          color="green"
          title="用户信息列表"
          text="">
          <v-data-table
            :headers="headers"
            :items="userInfoListPage"
            hide-actions>
            <template>
              <span
                class="subheading font-weight-light text-success text--darken-3"
              />
            </template>
            <template
              slot="items"
              slot-scope="{ item }">
              <td>{{ item.userID }}</td>
              <td>{{ item.realName }}</td>
              <td>{{ item.userNo }}</td>
              <td>{{ item.userName }}</td>
              <td>{{ item.phone }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.password }}</td>
              <td class="text-xs-right">
                <v-menu offset-y>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      v-if="item.status=='000'"
                      color="green"
                      dark
                      v-on="on">正常</v-btn>
                    <v-btn
                      v-else-if="item.status=='100'"
                      color="orange"
                      dark
                      v-on="on">警告</v-btn>
                    <v-btn
                      v-else
                      color="red"
                      dark
                      v-on="on">已封</v-btn>
                  </template>
                  <v-list>
                    <v-list-tile
                      v-for="(item2, index) in statusList"
                      :key="index">
                      <v-btn
                        v-if="item2.value=='000'"
                        color="green"
                        @click="changeUserStatus(item.userID, '000')"
                      >{{ item2.status }}</v-btn>
                      <v-btn
                        v-else-if="item2.value=='100'"
                        color="orange"
                        @click="changeUserStatus(item.userID, '100')"
                      >{{ item2.status }}</v-btn>
                      <v-btn
                        v-else
                        color="red"
                        @click="changeUserStatus(item.userID, '200')"
                      >{{ item2.status }}</v-btn>
                    </v-list-tile>
                  </v-list>
                </v-menu>
                <!-- <v-btn
                  v-if="item.status == '000'"
                  color="green"
                  dark
                  @click="changeUserStatus(item.userID)"
                  v-on="on"
                >正常
                </v-btn>
                <v-btn
                  v-else-if="item.status == '100'"
                  color="orange"
                  dark
                  v-on="on"
                >警告</v-btn>
                <v-btn
                  v-else
                  color="red"
                  dark
                  v-on="on"
                >已封</v-btn>-->
              </td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
      <div
        class="text-xs-center"
        @click="listPage(page)"
      >
        <v-pagination
          v-model="page"
          :length="maxPage"
          :total-visible="7"
        ></v-pagination>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import {
  mapState
} from 'vuex'
export default {
  data: () => ({
    // 用于列表 分页的page
    page: 1,
    // 用户列表 表格头部
    headers: [
      {
        sortable: false,
        text: 'ID',
        value: 'userID'
      },
      {
        sortable: false,
        text: '姓名',
        value: 'realName'
      },
      {
        sortable: false,
        text: '学号',
        value: 'userNo'
      },
      {
        sortable: false,
        text: '昵称',
        value: 'userName'
      },
      {
        sortable: false,
        text: '电话',
        value: 'phone'
      },
      {
        sortable: false,
        text: '邮箱',
        value: 'email'
      },
      {
        sortable: false,
        text: '密码',
        value: 'password'
      },
      {
        sortable: false,
        text: '状态',
        value: 'status',
        align: 'right'
      }
    ],
    // 本页面的 用户信息列表
    userInfoList: [],
    // 本页面 当前分页的用户信息列表
    userInfoListPage: [],
    // 用户状态选项列表
    statusList: [
      { value: '000', status: '正常', color: 'green' },
      { value: '100', status: '警告', color: 'orange' },
      { value: '200', status: '已封', color: 'red' }
    ],
    // 搜索的用户关键词
    sUserInfo: '',
  }),
  methods: {
    test () {
      console.log('hh')
    },
    listPage (page) {
      this.userInfoListPage = []
      console.log(page)
      var start = page*20 - 20
      var end = start + 20
      for( var i = start; i < end; i++){
        if( this.userInfoList[i] != undefined ){
          this.userInfoListPage.push(this.userInfoList[i])
        } else {
          break
        }
      }
      console.log(this.userInfoListPage)
    },
    // 改变指定用户的状态
    changeUserStatus (userID, status) {
      console.log(userID, status)
      var that = this
      that.axios
        .post('/api/changeUserStatus', {
          userID,
          status
        })
        .then(function (res) {
          if (res.data === '0000') {
            that.$router.push('/u-refresh')
          }
        })
        .catch(function (res) {
          console.log(res)
        })
    },
    // 得到用户信息列表
    getSearchUserInfo (sUserInfo) {
      var that = this
      // 获取用户信息并存储在本地仓库
      this.axios
        .post('/api/getSearchUserInfo', {
          sUserInfo
        }).then(function (res) {
          that.$store.state.userInfoList = res.data
          that.userInfoList = res.data
          that.maxPage = Math.ceil(res.data.length/20)
          // 再次搜索请求时，将原有的清空
          that.userInfoListPage = []
          for( var i = 0; i < 20; i++){
            if( that.userInfoList[i] != undefined ){
              that.userInfoListPage.push(that.userInfoList[i])
            } else {
              break
            }
          }
          console.log(that.userInfoListPage)
        })
        .catch(function (res) {
          console.log(res)
        })
    }
  },
  computed: {
    ...mapState({
      login: state => state.login
    })
  },
  created () {
    if (this.login) {
      var that = this
      that.getSearchUserInfo(that.sUserInfo)
    } else {
      this.$router.push('/admin')
    }
  }
}
</script>
