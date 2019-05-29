/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: '/u-refresh',
    view: 'RefreshU'
  },
  {
    path: '/n-refresh',
    view: 'RefreshN'
  },
  {
    path: '/l-refresh',
    view: 'RefreshL'
  },
  {
    path: '/home',
    name: '首页',
    view: 'Home'
  },
  {
    path: '/admin',
    name: '管理员信息',
    view: 'Admin'
  },
  {
    path: '/user-list',
    name: '用户管理',
    view: 'UserList'
  },
  {
    path: '/list',
    name: '信息管理',
    view: 'List'
  },
  {
    path: '/notifications',
    name: '审核管理',
    view: 'Notifications'
  }
]
