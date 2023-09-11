# uniapp 学习记录

## 安装 VSCode 插件

想用 VSCode 开发小程序，有想要有 HBuilderX 那样的对 `uniapp` 的支持，可以在 VSCode 中安装一些插件，来获得更好的小程序开发体验。

- uni-helper
- uni-create-view
- uni-app-snippets
- uni-highlight

## 配置小程序的 appid

如果是开发小程序，则需要配置小程序的 appid，这个 appid 在[微信小程序平台](https://mp.weixin.qq.com/wxamp/devprofile/get_profile?token=366032452&lang=zh_CN)里面点击->开发->开发设置->开发者 ID，即可查到 AppID。然后将 appid 配置到 `manifest.json` 中的 `mp-weixin.appid中`：

```json
{
  ///
  "mp-weixin": {
    "appid": "wx398054d8379566de",
    "setting": {
      "urlCheck": false
    },
    "usingComponents": true
  }
  ///
}
```

## 安装 ts 包

安装 ts 类型包并且配置到 `tsconfig.json`

```json
{
  "extends": "@vue/tsconfig/tsconfig.json",
  "compilerOptions": {
    "allowJs": true,
    "sourceMap": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "lib": ["esnext", "dom"],
    "types": ["@dcloudio/types", "miniprogram-api-typings", "@uni-helper/uni-app-types"]
  },
  "vueCompilerOptions": {
    // experimentalRuntimeMode 已废弃，现调整为 nativeTags，请升级 Volar 插件至最新版本
    "nativeTags": ["block", "component", "template", "slot"]
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

## 安装 uni-ui

### 安装

按照 [官方文档](https://uniapp.dcloud.net.cn/component/uniui/quickstart.html#npm%E5%AE%89%E8%A3%85) 的介绍直接安装即可

```bash
npm i @dcloudio/uni-ui
```

### 自动导入

在 `pages.json` 里面配置组建的自动导入

```json
{
  ///
  // 组件的自动导入规则
  "easycom": {
    "autoscan": true,
    "custom": {
      // uni-ui 规则如下配置 $1是替换符号
      "^uni-(.*)": "@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue"
    }
  }
  ///
}
```

### uni-ui 的 TS 类型声明

由于 `uni-ui` 的官方组件爱你是用 `js` 写的，因此是没有 TS 类型的，但是好在 uni 的生态足够强大，我们可以使用 [`@uni-helper/uni-ui-types`](https://www.npmjs.com/package/@uni-helper/uni-ui-types) 这个类型包为 `uni-ui` 添加类型声明。

#### 安装 @uni-helper/uni-ui-types

```bash
pnpm i -D @uni-helper/uni-ui-types
```

#### 使用和配置

在 `tsconfig.json` 中将这个类型包加入到 `typs` 属性里面：

```json
{
  ///
  "types": [
    "@dcloudio/types",
    "miniprogram-api-typings",
    "@uni-helper/uni-app-types",
    "@uni-helper/uni-ui-types"
  ]
  ///
}
```

然后我们在页面中使用 `uni-ui` 的时候就会有对应的编辑器语法以及注释提示。

## 持久化 pinia

我们用 [`pinia`](https://pinia.vuejs.org/zh/) 来做状态管理，如果我们用状态持久化选项(persist)，那么我们不能像在 web 端那样直接配置 `persist:true`，因为小程序是不能使用 `localStorage`的，因此按照 [`pinia持久化存储文档`](https://prazdevs.github.io/pinia-plugin-persistedstate/)，我们可以按照持久化存储的官方文档来配置。
在 web 端我们可以直接将 `persist` 配置为 true，因为该插件默认以浏览器的 `localStorage` 进行存储，而我们不想（不能）用 `localStorage` 的时候就需要自定义配置，因此在微信小程序中我们可以利用微信小程序的 `getStorageSync 和 setStorageSync` 来实现 pinia 状态的持久化存储。因此我们可以这样配置：

```ts
  {
    // persist: true,
    persist: {
      storage: {
        getItem(key) {
          return uni.getStorageSync(key)
        },
        setItem(key, value) {
          uni.setStorageSync(key, value)
        },
      },
    },
  },
```

这样就实现了利用微信小程序的存储来对 pinia 的持久化存储。

## 请求拦截器配置

按照 `uniapp` 官方文档中对于[拦截器](https://uniapp.dcloud.net.cn/api/interceptor.html#addinterceptor)的介绍，我们可以使用 `uni.addInterceptor(STRING, OBJECT)` 这个 api 来设置请求拦截器（也可以使用 `uni.removeInterceptor(STRING)` 这个 API 来删除拦截器），
