# 面包工坊 (Bread Workshop)

移动端优先的本地面包订购管理工具

## 技术栈

- Uni-App
- Vue 3
- TypeScript
- Vite

## 项目结构

```
bread-workshop/
├── components/          # 组件目录
│   ├── TopNav.vue      # 顶部导航
│   ├── ViewToggle.vue  # 视图切换
│   ├── BakerCard.vue   # 主理人卡片
│   └── BottomNav.vue   # 底部导航
├── pages/              # 页面目录
│   ├── index/          # 首页
│   ├── orders/         # 订单页
│   └── profile/        # 我的页面
├── styles/             # 样式目录
│   └── globals.css     # 全局样式
├── App.vue            # 应用入口
├── main.ts            # 主入口文件
├── pages.json         # 页面配置
├── manifest.json      # 应用配置
├── vite.config.ts     # Vite 配置
└── tsconfig.json      # TypeScript 配置
```

## 开发说明

### 安装依赖
```bash
npm install
```

### 运行项目

H5 端开发:
```bash
npm run dev:h5
```

微信小程序开发:
```bash
npm run dev:mp-weixin
```

### 构建项目

H5 端构建:
```bash
npm run build:h5
```

微信小程序构建:
```bash
npm run build:mp-weixin
```

## 设计规范

- 设备尺寸：375×812pt (iPhone 13)
- 网格系统：8pt 网格系统
- 主色调：#E67E22 (橙色)
- 背景色：#F9F7F3 (米白)

## 功能特性

- ✅ 附近主理人列表
- ✅ 搜索面包/主理人
- ✅ 列表/地图视图切换
- ✅ 营业状态显示
- 🚧 订单管理 (开发中)
- 🚧 个人中心 (开发中)
