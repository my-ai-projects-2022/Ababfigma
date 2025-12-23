# 面包工坊 - 静态 HTML 页面集合

## 📋 目录结构

```
/src/html/
├── README.md                           # 本文档
├── index.html                          # 首页 - 主理人列表
├── baker-detail.html                   # 主理人详情页
├── orders.html                         # 订单页面
├── profile.html                        # 个人中心
├── baker-profile.html                  # 主理人个人中心
├── baker-orders.html                   # 订单管理（主理人）
├── baker-breads.html                   # 面包管理
└── modals/                             # 弹窗组件
    ├── login-modal.html                # 登录提示弹窗
    ├── bread-detail-modal.html         # 面包详情弹窗
    └── checkout-modal.html             # 结算弹窗
```

---

## 📱 用户端页面

### 1. 首页 - 主理人列表 (`index.html`)

**功能**：
- 顶部导航栏（城市选择 + 搜索）
- 视图切换（列表视图 / 地图视图）
- 主理人卡片列表
- 底部导航栏

**设计要点**：
- 卡片包含：头像、店名、营业状态、距离、主营品类、面包缩略图、收藏按钮
- 响应式设计，适配 375px 宽度
- 橙色主题色 (#E67E22)

---

### 2. 主理人详情页 (`baker-detail.html`)

**功能**：
- 自定义顶部导航（返回、分享、备注、收藏）
- 主理人信息卡（橙色渐变背景）
- 面包列表（带数量选择器）
- 购物车底栏

**设计要点**：
- 主理人信息卡采用渐变背景
- 面包卡片横向布局（图片 + 信息）
- 数量选择器实时更新购物车
- 购物车底栏固定在底部

---

### 3. 订单页面 (`orders.html`)

**功能**：
- 视图切换（订单视图 / 面包视图）
- 状态筛选（全部 / 待取货 / 已完成 / 已取消）
- 订单卡片列表
- 订单操作按钮

**设计要点**：
- 订单状态用不同颜色标识
- 支持取消订单、确认取货等操作
- 显示订单号、商品明细、总价

---

### 4. 个人中心 (`profile.html`)

**功能**：
- 用户信息展示（橙色渐变背景）
- 快捷按钮（成为主理人 / 主理人）
- 功能菜单（订单、收藏、喜欢、地址、反馈）
- 设置下拉菜单

**设计要点**：
- 头部采用橙色渐变
- 菜单卡片带图标和箭头
- 设置菜单动画效果
- 包含 JavaScript 交互

---

## 🏪 主理人端页面

### 5. 主理人个人中心 (`baker-profile.html`)

**功能**：
- 店铺信息展示
- 营业状态开关
- 快捷操作（收款码、切换用户、成就）
- 数据看板（4宫格）
- 我的成就入口

**设计要点**：
- 头部橙色渐变背景
- 营业开关带动画效果
- 数据卡片展示关键指标
- 成就卡片特殊样式

---

### 6. 订单管理 (`baker-orders.html`)

**功能**：
- 视图切换（订单视图 / 面包视图）
- 状态筛选（待接单、制作中、待取货等）
- 订单卡片（包含用户信息）
- 订单操作（接单、拒绝、完成制作、确认取货）

**设计要点**：
- 订单状态用不同颜色区分
- 显示用户信息和联系方式
- 备注区域特殊高亮
- 操作按钮颜色对应状态

---

### 7. 面包管理 (`baker-breads.html`)

**功能**：
- 新增面包按钮
- 视图切换（订单视图 / 面包视图）
- 状态筛选（全部 / 在售 / 售罄 / 下架）
- 面包管理卡片
- 编辑和上架/下架操作

**设计要点**：
- 面包状态用颜色标签标识
- 显示销量和库存信息
- 操作按钮区分编辑和状态切换

---

## 🔔 弹窗组件

### 8. 登录提示弹窗 (`modals/login-modal.html`)

**功能**：
- 引导用户登录
- 展示登录后的功能
- 提供登录和取消按钮

**设计要点**：
- 居中弹窗，带遮罩层
- 缩放进入动画
- 功能列表带勾选图标

---

### 9. 面包详情弹窗 (`modals/bread-detail-modal.html`)

**功能**：
- 展示面包大图
- 完整描述信息
- 数量选择器
- 立即购买按钮

**设计要点**：
- 底部抽屉样式
- 上滑进入动画
- 图片 4:3 比例
- 固定底部按钮

---

### 10. 结算弹窗 (`modals/checkout-modal.html`)

**功能**：
- 主理人信息确认
- 订单明细展示
- 备注输入
- 总价显示
- 确认下单按钮

**设计要点**：
- 底部抽屉样式
- 明细区域浅色背景
- 总价大字号橙色显示
- 底部固定提交按钮

---

## 🎨 设计规范

### 颜色系统

```css
/* 主色调 */
--color-primary: #E67E22;           /* 主橙色 */
--color-primary-light: #F39C12;     /* 辅助橙色 */
--color-primary-dark: #D35400;      /* 深橙色 */

/* 功能色 */
--color-success: #27AE60;           /* 成功绿 */
--color-error: #E74C3C;             /* 错误红 */
--color-warning: #F39C12;           /* 警告黄 */
--color-info: #3498DB;              /* 信息蓝 */

/* 文本色 */
--color-text-primary: #2C3E50;      /* 主文本 */
--color-text-secondary: #7F8C8D;    /* 次要文本 */
--color-text-tertiary: #BDC3C7;     /* 三级文本 */

/* 背景色 */
--color-bg: #F9F7F3;                /* 页面背景 */
--color-border: #E8E8E8;            /* 边框色 */
```

### 间距系统

```
4px / 8px / 12px / 16px / 20px / 24px / 32px / 40px / 48px
```

### 圆角系统

```
8px / 12px / 16px / 20px / 24px / 50%
```

### 字体系统

```css
font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Roboto', 
             'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
```

---

## 📐 布局规范

### 屏幕尺寸
- **基准宽度**: 375px (iPhone 13)
- **最小高度**: 812px
- **8pt 网格系统**

### 导航栏高度
- **顶部导航**: 88px (状态栏 44px + 导航栏 44px)
- **底部导航**: 50px

### 卡片规范
- **圆角**: 12px
- **阴影**: `0 2px 8px rgba(0, 0, 0, 0.04)`
- **内边距**: 12px / 16px
- **间距**: 12px

---

## 🎬 动画效果

### 弹窗动画

```css
/* 缩放进入 */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* 上滑进入 */
@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
```

### 按钮交互

```css
button:active {
  transform: scale(0.95);
}
```

---

## 🔧 使用说明

### 1. 直接在浏览器中打开

所有 HTML 文件都是独立的，可以直接在浏览器中打开查看：

```bash
# 打开首页
open index.html

# 或使用浏览器直接访问
file:///path/to/src/html/index.html
```

### 2. 使用本地服务器

推荐使用本地服务器预览，避免跨域问题：

```bash
# 使用 Python
cd src/html
python -m http.server 8000

# 使用 Node.js
npx http-server -p 8000

# 使用 VS Code Live Server 插件
右键 index.html → Open with Live Server
```

### 3. 页面间导航

部分页面包含了导航链接，可以在页面间跳转：

- 底部导航栏：首页 / 订单 / 我的
- 主理人底部导航：订单 / 面包 / 我的

---

## 📝 代码特点

### 1. 纯 HTML + CSS
- 无需构建工具
- 无外部依赖
- 即开即用

### 2. 内联样式
- 所有样式在 `<style>` 标签内
- 方便复制和迁移
- 易于理解和修改

### 3. 响应式设计
- 固定 375px 宽度（移动端基准）
- 使用 flexbox 和 grid 布局
- 适配不同屏幕高度

### 4. 可访问性
- 语义化 HTML 标签
- 合理的颜色对比度
- 适当的触摸目标大小

---

## 🚀 下一步

### 转换为 Uni-App

这些静态页面可以作为参考，转换为 Uni-App + Vue3 项目：

1. **创建 Uni-App 项目**
   ```bash
   npx degit dcloudio/uni-preset-vue#vite-ts my-bread-workshop
   ```

2. **转换 HTML 为 Vue 组件**
   - HTML 结构 → `<template>`
   - CSS 样式 → `<style scoped>`
   - 添加 `<script setup lang="ts">`

3. **使用 rpx 单位**
   - 将 px 转换为 rpx
   - 375px 设计稿: 1px = 2rpx

4. **添加交互逻辑**
   - 使用 Vue3 Composition API
   - 添加状态管理
   - 接入 API

### 添加功能

- [ ] 搜索功能实现
- [ ] 地图视图集成
- [ ] 图片上传组件
- [ ] 表单验证
- [ ] Toast 提示
- [ ] 下拉刷新
- [ ] 上拉加载

---

## 📚 参考文档

- [UI 视觉稿文档](../../UI-EXPORT-VISUAL-SPECS.md)
- [功能交互文档](../../FUNCTIONAL-INTERACTION-SPEC.md)
- [UI 设计规范](../../UI-SPECIFICATION.md)

---

## 📞 联系方式

如有问题或建议，请联系开发团队。

---

**版本**: v1.0.0  
**创建日期**: 2024年12月23日  
**技术栈**: HTML5 + CSS3  
**适用平台**: 移动端浏览器

---

© 2024 面包工坊开发团队
