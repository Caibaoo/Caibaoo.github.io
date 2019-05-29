// https://vuex.vuejs.org/en/mutations.html

export default {
  LOGIN () {
    this.state.disabledBtn = true
    this.state.disabledTable = false
    this.state.login = true
  },
  LOGOUT () {
    this.state.disabledBtn = false
    this.state.disabledTable = true
    this.state.login = false
  },
  GET_ARTICLELIST (articleList) {
    this.state.articleList = articleList
  }
}
