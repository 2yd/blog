---
title: '不要再用url.parse()了！'
pubDate: 2023-10-04
description: '在Node.js早期版本中,处理URL主要依赖url.parse()方法。但这种方式存在安全和性能隐患,已被官方标记为废弃。从Node.js 7.0.0版本开始,url模块引入了全新的WHATWG URL标准API,包括URL和URLSearchParams类。新API提供了更现代、安全、高效的URL解析和操作能力。'
author: Zhuge'
image:
   url: 'https://docs.astro.build/assets/full-logo-light.png'
   alt: 'The full Astro logo.'
tags: ['programming', 'frontend', 'javascript']
---

> 以 [localhost:4396/test?id=234](http://localhost:4396/test?id=234) 为例

```js
const url = require('url')

const server = http.createServer((req, res) => {
   const { query, pathname } = url.parse(req.url, true)
   console.log(query)
   console.log(pathname)
   ...
```

输出结果：

```
[Object: null prototype] { id: '234' }
/test
```

可以看到 query 是一个没有原型的对象，意味着不存在`toString()`这种内置方法，除此之外也可能埋藏意料之外的隐患，总而言之这都是开发过程中需要避免的。

查阅一下[Node.js 文档](https://nodejs.org/docs/latest/api/url.html#urlparseurlstring-parsequerystring-slashesdenotehost)，发现`url.parse()`被标记 Deprecated（已废弃），意味着除了安全问题，性能方面也难以保证。所以与其考虑解决方法，不如考虑其替代品。

# [WHATWG URL API](https://nodejs.org/docs/latest/api/url.html#the-whatwg-url-api)

自 Node.js 7.0.0 起，url 库就提供了更现代的，符合[WHATWG](https://developer.mozilla.org/en-US/docs/Glossary/WHATWG) URL 标准的 API。

url 库提供了 URL 类，包含了替代原有的 api 的属性和方法，从 v10.0.0 起，URL 类就被添加为全局对象，不需要引入模块。如上面的代码就可以替换成

```js
const {URL} = require('url') //可以省略

const server = http.createServer((req, res) => {
   const myURL = new URL(req.url, `http://${req.headers.host}`)
   const query = myURL.searchParams
   const pathname = myURL.pathname
   console.log(query)
   console.log(pathname)
   ...
```

输出结果

```
URLSearchParams { 'id' => '234' }
/test
```

其中`URLSearchParams`是一个可以处理 url 查询的类，比如最简单的`query.get('id')`就可以获取名为`id`的参数，非常方便，更多的使用方法可以阅读[文档](https://nodejs.org/docs/latest/api/url.html#class-urlsearchparams)

# 总结

现在很多的教程还在用`url.parse()`处理 url，可见编程光靠看教程是不够的，多查阅文档，多上 StackOverflow，多读一些 blog，提高获取和提取信息的能力才是提升水平的必由之路。
