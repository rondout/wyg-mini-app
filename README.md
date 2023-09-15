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

按照 `uniapp` 官方文档中对于[拦截器](https://uniapp.dcloud.net.cn/api/interceptor.html#addinterceptor)的介绍，我们可以使用 `uni.addInterceptor(STRING, OBJECT)` 这个 api 来设置请求拦截器（也可以使用 `uni.removeInterceptor(STRING)` 这个 API 来删除拦截器），下面是我封装的 http 模块类：

```ts
import { useMemberStore } from '@/stores'

// 小兔鲜后台服务地址
export const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'
// 超时时间 10秒
export const timeout = 10000

const interceptor: UniApp.InterceptorOptions = {
  invoke(options: UniApp.RequestOptions) {
    // 1. 非 http 开头需拼接地址
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    // 设置超时时间
    options.timeout = timeout
    // 设置请求头
    options.header = {
      ...options.header,
      // 后端接口需要知道的请求头
      'source-client': 'miniapp',
    }
    // 4. 添加 token 请求头标识
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      options.header.Authorization = token
    }
  },
}

uni.addInterceptor('request', interceptor)
uni.addInterceptor('upload', interceptor)

export interface BaseResponse<T = any> {
  code: string
  msg: string
  result: T
}

export type UniRequestParams = string | AnyObject | ArrayBuffer | undefined

export class httpService {
  constructor() {}
  /**
   *
   * @param method 请求的类型
   * @param url 请求的URL
   * @param data 请求体
   * @returns {Promise<BaseResponse<T>>} 返回结果
   */
  private sendRequest<T = any, P extends UniRequestParams = UniRequestParams>(
    method: UniApp.RequestOptions['method'],
    url: string,
    data?: P,
  ): Promise<BaseResponse<T>> {
    return new Promise<BaseResponse<T>>((resolve, reject) => {
      uni.request({
        method,
        url,
        data,
        success(res) {
          // 状态码 2xx， axios 就是这样设计的
          if (res.statusCode >= 200 && res.statusCode < 300) {
            // 2.1 提取核心数据 res.data
            resolve(res.data as BaseResponse<T>)
          } else if (res.statusCode === 401) {
            // 401错误  -> 清理用户信息，跳转到登录页
            const memberStore = useMemberStore()
            memberStore.clearProfile()
            uni.navigateTo({ url: '/pages/login/login' })
            reject(res)
          } else {
            // 其他错误 -> 根据后端错误信息轻提示
            uni.showToast({
              icon: 'none',
              title: (res.data as BaseResponse<P>).msg || '请求错误',
            })
            reject(res)
          }
        },
        fail(err) {
          uni.showToast({
            icon: 'none',
            title: '网络错误，换个网络试试',
          })
          reject(err)
        },
      })
    })
  }

  protected get<T = any, P extends UniRequestParams = UniRequestParams>(url: string, data?: P) {
    return this.sendRequest<T>('GET', url, data)
  }
}
```

## 颜色配置

uniapp 提供了 `uni.scss` 这个特殊的文件，里面定义了很多 scss 变量，很多插件比如 uni-ui 就有使用这个 scss 文件，因此比如我们需要改变 `uni-ui` 的主题色，直接在这里面重新声明相关的 `scss` 变量即可：

```scss
$uni-primary: #27ba9b;
```

**注意：改变后需要重启才能生效。**

## 安全区域

因为移动端设备的屏幕千差万别，我们可以使用如下 API 获取屏幕的安全区域：

```ts
const { safeArea } = uni.getSystemInfo()
```

safeArea 返回值说明：

| 参数   | 类型   | 说明                         |
| ------ | ------ | ---------------------------- |
| left   | Number | 安全区域左上角横坐标         |
| right  | Number | 安全区域右下角横坐标         |
| top    | Number | 安全区域左上角纵坐标         |
| bottom | Number | 安全区域右下角纵坐标         |
| width  | Number | 安全区域的宽度，单位逻辑像素 |
| height | Number | 安全区域的高度，单位逻辑像素 |

**注：`uni.getSystemInfo`这个 API 返回值有很多，更多信息看[官网](https://uniapp.dcloud.net.cn/api/system/info.html#safearea)。**

## uni 组件记录

### scroll-view

scroll-view 和 view 的区别是 view 默认是不支持 overflow 的，scroll-view 的具体属性配置请参考[官方文档](https://uniapp.dcloud.net.cn/component/scroll-view.html)，下面只是记录一些我用到的值得记录的一些属性：

| 属性名              | 类型        | 说明                                                                          | 默认值 |
| ------------------- | ----------- | ----------------------------------------------------------------------------- | ------ |
| scroll-y            | boolean     | 是否允许纵向滚动                                                              | false  |
| scroll-x            | boolean     | 是否允许横向滚动                                                              | false  |
| enable-back-to-top  | boolean     | iOS 点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只支持竖向              | false  |
| refresher-enabled   | boolean     | 开启自定义下拉刷新                                                            | false  |
| refresher-triggered | boolean     | 设置当前下拉刷新状态，true 表示下拉刷新已经被触发，false 表示下拉刷新未被触发 | false  |
| @scrolltolower      | EventHandle | 滚动到底部/右边，会触发 scrolltolower 事件                                    |        |
| @refresherrefresh   | EventHandle | 自定义下拉刷新被触发                                                          |        |

## 原项目仓库

### 代码库

[请访问小兔鲜项目原代码仓库](https://gitee.com/Megasu/uniapp-shop-vue3-ts.git)

### 后端 API 接口

[接口地址](https://apifox.com/apidoc/shared-0e6ee326-d646-41bd-9214-29dbf47648fa/api-43426882)
