// mock.js

// 引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random

Mock.setup({
  timeout: '200-1000'
})

// 导航条数据
const navData = function () {
  let navsList = [
    {
      name: '珠海总部',
      id: 0,
    },
    {
      name: '北京总部',
      id: 1,
    },
    {
      name: '澳门总部',
      id: 2,
    },
  ]
  let countysList = [
    '高新区','朝阳区','北区'
  ]
  navsList.map((it,index)=>{
    it.navItems = []
    for (let i = 0; i < 4; i++) {
      let itemObject = {}
      itemObject.name = countysList[index]+'河豚'+(i+1)+'号'
      itemObject.id = i
      it.navItems.push(itemObject)
    }
  })

  return navsList
}
Mock.mock('/mock/nav', navData)

// 视频列表数据
const videoData = function (params) {
  let data = params.url.split('navId=')[1].split('&')
  let navId = data[0]
  let navItemId = data[1].split('navItemId=')[1]
  if (navId && navItemId) {
    return Random.integer(1,25)
  }
  return null
}
Mock.mock(RegExp('/mock/video?' + ".*"), videoData)


