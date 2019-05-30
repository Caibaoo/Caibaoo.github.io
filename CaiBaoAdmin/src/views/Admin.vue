<template>
  <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        xs12
        md8
      >
        <material-card
          color="green"
          title="登录"
          text="请输入您的账号密码以登录"
        >
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex
                  xs12
                  md4
                >
                  <v-icon>mdi-account</v-icon>
                  <v-text-field
                    v-model="adminLoginInfo.adminNo"
                    :disabled="disabledBtn"
                    class="purple-input"
                    label="账号"/>
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                  <v-icon>mdi-lock</v-icon>
                  <v-text-field
                    v-model="adminLoginInfo.adminPW"
                    :disabled="disabledBtn"
                    class="purple-input"
                    label="密码"
                  />
                </v-flex>
                <v-flex
                  xs12
                  text-xs-right
                >
                  <v-btn
                    v-if="!login"
                    class="mx-0 font-weight-light"
                    color="info"
                    @click="adminLogin()"
                  >
                    登录
                  </v-btn>
                  <v-btn
                    v-else
                    class="mx-0 font-weight-light"
                    color="warning"
                    @click="logOut()"
                  >
                    退出登录
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {
  mapMutations,
  mapState
} from 'vuex'
export default {
  data: () => ({
    adminLoginInfo: {
      adminNo: '',
      adminPW: ''
    }
  }),
  methods: {
    test () {},
    logOut () {
      localStorage.clear()
      this.$store.commit('LOGOUT')
    },
    adminLogin () {
      var that = this
      var adminNo = that.adminLoginInfo.adminNo
      var adminPW = that.adminLoginInfo.adminPW
      that.axios.post('/api/adminLogin', {
        adminNo,
        adminPW
      }).then(function (res) {
        if (res.data[0].admin !=null ) {
          console.log(res.data)
          that.$store.state.userInfo = res.data[0]
          localStorage.setItem('adminInfo', JSON.stringify(res.data[0]))
          localStorage.setItem('login', true)
          that.$store.commit('LOGIN')
          that.$message({
            type: 'success',
            message: '登录成功'
          })
        }
      }).catch(function (res) {
        that.$message.error("请检查用户和密码！");
      })
    }
  },
  computed: {
    ...mapState({
      disabledBtn: state => state.disabledBtn,
      disabledTable: state => state.disabledTable,
      login: state => state.login
    })
  },
  created () {
    var tmp = localStorage.getItem('login')
    if (tmp) {
      this.$store.commit('LOGIN')
    }
  }
}
</script>
