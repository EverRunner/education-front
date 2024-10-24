# client_pc

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

```

client_pc
├─ 📁dist                 // 打包后的目录
├─ 📁public               // 公共配置及入口
├─ 📁node_modules         // node依赖
├─ 📁src                  // 核心目录
│  ├─ 📁api               // api管理目录
│  ├─ 📁assets            // 资源目录（图片、字体、样式）
│  ├─ 📁components        // 公共的组件文件
│  ├─ 📁router            // 路由文件
│  ├─ 📁store             // vuex
│  ├─ 📁theme             // 主题css调整
│  ├─ 📁utils             // 工具函数
│  ├─ 📁views             // 模板目录
│  │  ├─ 📁account        // 个人中心
│  │  ├─ 📁article        // 文章 
│  │  ├─ 📁blog           // 博客
│  │  ├─ 📁common         // 公共的目录
│  │  ├─ 📁course         // 课程
│  │  ├─ 📁layout         // 布局
│  │  ├─ 📁order          // 订单
│  │  └─ 📁pass           // 通过后
│  ├─ 📄App.vue           // 模板入口
│  ├─ 📄config.js         // 配置信息
│  ├─ 📄main.js           // 主入口
│  ├─ 📄permission.js     // 权限验证
│  └─ 📄visit.js          // 访问记录
├─ 📄package.json         // 依赖目录
├─ 📄vue.config.js        // 开发环境配置

```