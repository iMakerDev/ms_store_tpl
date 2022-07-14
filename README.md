# YESMK app
## 功能列表：
- 与 WooCommerce 完全集成
- 在 iOs 和 Android 上都得到很好的支持。
- 通过 facebook 进行社交登录
- 轻松定制您的品牌。
- 通过 OneSignal 推送通知
- 多语言支持，支持 WPML 插件和 RTL
- 支持运输和优惠券
- 通过配置文件灵活运输
- 带有 99% 支付网关的 Word，与您的网站上相同。
- 愿望清单和跨设备同步
- 我的订单跟踪，还支持订单备注。
- 产品变体
- Wordpress 集成以显示博客/新闻
- 动态显示产品变体：颜色、尺寸、重量或任何类型的变体……
- 产品库可以是 Pin & zoom Image
- 流畅的 UX 结帐：购物车/送货/付款/我的订单/退货/退款订单
- Firebase 同步
- 即时搜索
- 灵活的搜索过滤器
- 支持按类别、标签和定价过滤 - 支持左侧菜单中的快速类别过滤器
- 搜索历史和清理
- 在应用程序上管理帐单地址
- 强大的用户配置文件：更改货币、语言、各种设置……
- 通过更改常用文件轻松制作白色标签应用程序
- 灵活的主页配置并支持多种布局
- Admob & Facebook 广告
- 灵活的自定义页面显示
- 令人敬畏的演练动画
- 标题动画（Apple 风格）
- 左侧菜单侧动态配置和 4 种菜单支持
- 通过配置文件设置配置文件 UI
- ListView 的 +8 项目布局支持
- 深色主题和易于更改其他浅色主题
- 类别页面的差异类型
- 默认货币和国家配置
- 启用通过配置文件隐藏购物车结帐
- 支持通过 Expo 或 react-native-cli 构建应用程序
- 定期功能更新和免费错误修复
- 能够在深色和浅色主题之间切换
- 易于配置超过 9 种不同类型主页布局。
- 按定价/标签/类别页面过滤
- 使用 Facebook 帐户工具包短信登录
- 支持联盟业务
  
## 项目结构
### 公用组件（scr/common）

    Config.js：应用程序的主要配置变量
    Colors.js：为应用配置主题颜色
    Constants.js：配置 wordpress URL、图标、类别...
    Images.js：应用程序使用的所有图像的列表
    Languages.js：主要语言文件配置
    Layout.js：用于配置主弹性主页。

### 工具：常用功能

    src/Components : 可以多次使用的常用组件，可以是自定义按钮、评论组件、图标输入...
    src/Containers： 应用程序的大部分组件都放在这里，您可以通过匹配您自己的项目设计来更改或重新构造。
    src/Expo : 包装博览会功能
    src/Services：应用程序的 Wordpress Api。如果您想为应用程序添加更多功能，您可以参考Wordpress API并自定义您自己的功能。
    src/Redux : 主要动作和reducer
    src/Navigation：react-navigation v2.0 的包装函数



### TIPS

#### 2022.7.7
- Cart/index.js 第三方组件react-native-scrollable-tab-view node包需要修改：移除index.js的getNode()调用。
- 图标库使用了@expo的兼容包


#### 2022.7.13

- 修复网络环境异常导致分类页面FC崩溃bug
- 修复网络异常导致我的订单页面FC崩溃bug
- 
