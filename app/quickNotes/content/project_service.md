# 项目网络层 TS 类型支持

## 引入

前端项目与服务器交流中存在一个网络层，其中囊括了接口表和接口调用函数两个部分。本文旨在为接口表和接口调用函数提供完善的 TS 类型支持。

本文中使用到的 TS 类型

```tsx
// typing.d.ts
// 返回值类型
type Response<T> = {
	retCode: number;
	retValue: T | null;
	success: boolean;
}
// 用户信息类型
type UsrInfoType = { name: string; uid: number }
// 接口路径类型
type UrlType = `${'' | 'POST '}${string}`
```

## 方案一

已默认导出对象或命名导出的方式定义接口表，并在 Dva Model 中消费。

### 接口调用函数

函数定义

传入`url`并返回一个接口`fetch`，该接口传入`payload`并返回一个`promise`。

```tsx
type FetchType<Return, Payload extends object | undefined = undefined> = (params?: Payload) => Promise<Response<Return>>;
// type B = object
/**
 * request<Return, Payload> 用于定义请求
 * Return - 返回值类型
 * Payload - 请求参数类型
 * @param url 请求地址
 */
declare function request<Return = any, Payload extends object | undefined = any>(url: UrlType): FetchType<Return, Payload>;
```

使用案例

```tsx
// 这是一个调用用户信息的接口
// 其返回值为 Response<UsrInfoType> 类型的一个对象, 不需要传递参数
const getUsrInfo = request<UsrInfoType>('/api/getUsrInfo')
```

### 接口表

接口表定义

```tsx
import type { UsrInfoType } from '../typing.d.ts'
// 查询用户信息
export const getUsrInfo = request<UsrInfoType>('/api/getUsrInfo')

export default {
	getUsrInfo
}
```

使用案例

```tsx
// 引入
import { getUsrInfo } from './service'
// 或
import service from './service'
const { getUsrInfo } = service
```

```tsx
// 使用
{
	// ... model 内部
	effects: {
		* getUsrInfo({ payload }, { call}) {
			const result = yield call(getUsrInfo, payload)	
			// ...
		}
	}
}
```

## 方案二

将接口定义为 TS 类，并默认导出类实例化后的对象，并在 Dva Model 中消费。并通过使用 TS 5.0 新的提案[装饰器](https://juejin.cn/post/7211151196329115704?searchId=20230823210853E7456FEF711C995B624E)来扩展接口功能，例如日志和数据mock等。

### 接口调用函数

函数定义

传入 `url` 和`payload`返回一个`Promise`。

```tsx
/**
 * @description fetch 请求
 * @param payload 载荷
 * @param url 请求地址
 * @returns
 */
declare function request<Return = any, Payload = void>( url: UrlType, payload?: Payload) => Promise<Response<Return>>
```

### 接口表

接口表定义

```tsx
import { request } from './utils'
import type { UsrInfoType } from './typing.d.ts'
class Service {
	@log('查询用户信息')
	@mock({ name: 'jjblau', uid: 2021 }) // 装饰器
	getUsrInfo(): UsrInfoType {
		return request('/api/getUsrInfo')
	}
	// ...
}

export default new Service()
```

### 装饰器

使用装饰器的好处在于，可以方便的为部分接口提供增强功能。例如在调试阶段使用的日志装饰器和数据模拟装饰器。

日志装饰器

```tsx
/**
 * @description 打印日志
 * @param desc 日志描述
 * @returns
 */
export function log(desc: string) {
  return function <T extends (...props: any[]) => any>(
    originalMethod: T,
    { name }: any
  ) {
    function replacementMethod(
      this: any,
      ...args: Parameters<T>
    ): ReturnType<T> {
      const logInfos = { apiName: name, desc, payload: args[0] };
      console.log("> %clogInfos", "color: #218eff", " - ", logInfos);
      return originalMethod.call(this, ...args);
    }
    return replacementMethod;
  };
}
```

数据模拟装饰器

```tsx
/**
 * @description 模拟请求
 * @param data mock 数据
 * @param wait 延迟时间
 * @returns
 */
export function mock<D>(data: D, wait = 1000) {
  return function <T extends any[]>(
    // originalMethod: (...props: T) => Promise<D>,
    // { name }: any
  ) {
    function replacementMethod(this: any, ...args: T): Promise<D> {
      // const result = originalMethod.call(this, ...args);
      // return result;
      return new Promise((resolve) => setTimeout(resolve, wait, data));
    }
    return replacementMethod;
  };
}
```

- 在开发环境打开装饰器，而在生产环境则关闭装饰器, 并且装饰器将以注释的形式存在，后续使用时只要再打开一次就能正常使用。

```tsx
import { request } from './utils'
import type { UsrInfoType } from './typing.d.ts'
// 生产环境关闭不需要的装饰器
class Service {
	// @log('查询用户信息')
	// @mock({ name: 'jjblau', uid: 2021 }) 
	getUsrInfo(): UsrInfoType {
		return request('/api/getUsrInfo')
	}
	// ...
}

export default new Service()
```

## 参考文献

[TypeScript 5.0 正式发布！ - 掘金](https://juejin.cn/post/7211151196329115704?searchId=20230823210853E7456FEF711C995B624E)