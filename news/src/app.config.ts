export default defineAppConfig({
  pages: [
    "pages/RecommendPage/index",
    "pages/FollowPage/index",
    "pages/SearchPage/index",
    "pages/ProfilePage/index",
    "pages/NewsDetailPage/index",
    "pages/AIChatPage/index",
    "pages/TagManagementPage/index",
    "pages/TagListPage/index",
    "pages/RenewPage/index",
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  "tabBar": {
    "color": "#999", // 默认文字颜色
    "selectedColor": "#3377FF", // 选中时的文字颜色
    "backgroundColor": "#ffffff", // 背景颜色
    "borderStyle": "black", // 边框样式
    "list": [
      {
        "pagePath": "pages/RecommendPage/index",
        "text": "推荐",
        "iconPath": "assets/icons/recommend.png",
        "selectedIconPath": "assets/icons/recommend_active.png",
      },
      {
        "pagePath": "pages/FollowPage/index",
        "text": "关注",
        "iconPath": "assets/icons/follow.png",
        "selectedIconPath": "assets/icons/follow_active.png",
      },
      {
        "pagePath": "pages/SearchPage/index",
        "text": "搜索",
        "iconPath": "assets/icons/search.png",
        "selectedIconPath": "assets/icons/search_active.png",
      },
      {
        "pagePath": "pages/ProfilePage/index",
        "text": "我的",
        "iconPath": "assets/icons/mine.png",
        "selectedIconPath": "assets/icons/mine_active.png",
      }
    ]
  }
})
