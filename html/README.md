# 面包工坊 HTML 页面

本目录包含了从 React 应用转换而来的所有页面和弹窗的 HTML 版本。

## 文件列表

### 用户端页面

1. **index.html** - 首页（主理人列表）
   - 支持列表视图和地图视图切换
   - 支持搜索功能
   - 底部导航栏

2. **baker-detail.html** - 主理人详情页
   - 显示主理人信息
   - 面包列表展示
   - 购物车功能
   - 支持添加到购物车、收藏、分享、备注等功能

3. **orders.html** - 订单页面
   - 支持按订单维度和按主理人维度查看
   - 订单状态管理
   - 评价功能

4. **profile.html** - 个人中心
   - 用户信息展示
   - 功能菜单
   - 设置菜单
   - 成为主理人入口

5. **favorites.html** - 我的收藏
   - 收藏的主理人列表

6. **address-list.html** - 地址列表
   - 地址管理
   - 添加、编辑、删除地址

7. **address-edit.html** - 地址编辑
   - 新建/编辑地址表单

8. **feedback.html** - 问题反馈
   - 反馈提交
   - 历史反馈查看

9. **edit-profile.html** - 编辑资料
   - 用户信息编辑

### 主理人端页面

10. **baker-profile.html** - 主理人个人中心
    - 数据看板
    - 营业状态切换
    - 快捷操作

11. **baker-orders.html** - 订单管理
    - 订单维度视图
    - 面包维度视图
    - 订单状态管理

12. **baker-breads.html** - 面包管理
    - 面包列表
    - 上架/下架切换
    - 添加/编辑面包

### 弹窗页面

13. **bread-detail-modal.html** - 面包详情弹窗
    - 面包详细信息
    - 添加到购物车

14. **cart-modal.html** - 购物车弹窗
    - 购物车商品列表
    - 数量调整
    - 清空购物车

15. **checkout-modal.html** - 结算弹窗
    - 付款二维码
    - 备注功能
    - 付款完成

16. **share-modal.html** - 分享弹窗
    - 分享文案
    - 分享链接
    - 二维码分享

17. **note-modal.html** - 备注弹窗
    - 添加备注信息

18. **become-baker-modal.html** - 成为主理人弹窗
    - 主理人信息填写
    - 面包类型选择

19. **review-modal.html** - 评价弹窗
    - 订单评价
    - 评分和评论

20. **payment-qrcode-modal.html** - 收款码弹窗
    - 收款码设置

21. **bread-edit-modal.html** - 编辑面包弹窗
    - 面包信息编辑
    - 删除面包

22. **login-modal.html** - 登录弹窗
    - 登录提示
    - 功能说明

23. **edit-baker-info-modal.html** - 编辑主理人信息弹窗
    - 主理人信息编辑

24. **update-orders-modal.html** - 批量更新订单弹窗
    - 订单进度更新
    - 完成状态标记

## 使用方法

1. 所有文件都引用了 `common.css` 通用样式文件
2. 使用原生 JavaScript 实现交互功能
3. 页面间通过 `window.location.href` 进行跳转
4. 弹窗通过 URL 参数传递数据

## 功能说明

- ✅ 所有页面 UI 与原始 React 应用保持一致
- ✅ 使用原生 JavaScript 实现交互
- ✅ 支持弹窗显示/隐藏
- ✅ 支持状态更改（如收藏、购物车数量等）
- ✅ 支持表单提交和验证
- ✅ 支持搜索和筛选

## 注意事项

- 图片使用外部 URL（Unsplash），实际使用时需要替换为实际图片地址
- 部分功能（如地图、文件上传）需要实际的后端支持
- 数据存储在页面内的 JavaScript 变量中，刷新页面会重置

