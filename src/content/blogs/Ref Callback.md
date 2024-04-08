---
title: 'ref callback——ref不止可以传入ref对象'
pubDate: 2024-04-02
description: 'ref callback是一种更灵活且的使用 ref 的方式。组件的ref属性不仅可以传入ref对象（如useRef的返回值）为 ref 属性传递一个函数，这个函数会在组件挂载后立即被执行，函数的参数就是这个组件的 DOM 节点或组件实例。'
author: 'Zhuge'
tags: ['programming', 'frontend', 'react']
---

## ref 不止可以传入 ref 对象'

一般而言，平时使用`ref`属性都是这样的写法：

```jsx
import { useRef } from 'react'

export default function Form() {
   const inputRef = useRef(null)

   function handleClick() {
      inputRef.current.focus()
   }

   return (
      <>
         <input ref={inputRef} />
         <button onClick={handleClick}>Focus the input</button>
      </>
   )
}
```

但是除了可以传入一个 ref 对象，还可以传入一个 callback 函数。此时这个 callback 就叫做`ref callback`，虽然使用的频率不高，但功能不可谓不强大。

```jsx
function App() {
   const [show, setShow] = useState(false)
   return (
      <>
         {show && <h1 ref={node => console.dir(node)}>hello world!</h1>}
         <button onClick={() => setShow(!show)}>
            {show ? 'Hide h1' : 'Show h1'}
         </button>
      </>
   )
}
```

当组件挂载后可以在控制台看到（组件销毁后会控制台输出 null，防止篇幅过大就没有截图）：

![Result](/assets/img/ref-callback-01.png)

> 以下摘录并翻译自 [React 官方文档](https://react.dev/reference/react-dom/components/common#ref-callback)<br/>
> 当 `<div>` 的 DOM 节点被添加到屏幕时，React 将会调用你的 ref 回调函数，并将 DOM 节点作为参数。当那个 `<div>` 的 DOM 节点被移除时，React 将会调用你的 ref 回调函数并传入 null。<br/>
> 每当你传递一个不同的 ref 回调函数时，React 也会调用你的 ref 回调函数。在上述例子中，(node) => { ... } 在每次渲染时都是一个不同的函数。当你的组件重新渲染时，之前的函数将会被调用并传入 null 作为参数，下一个函数将会被调用并传入 DOM 节点。

## 有什么用——处理组件列表挂载 ref

有时候会遇到如下的使用场景：你在使用`map`创建一系列组件，而且这些组件都需要分别挂载`ref`，但是这种方法是行不通的

```jsx
<ul>
   {items.map(item => {
      const ref = useRef(null) //不行！
      return <li ref={ref} />
   })}
</ul>
```

这是因为**hook 只能在组件的顶部进行调用**，而不能在循环、条件判断又或者是`map`中调用。

其中一个解决方法是获取其父元素的`ref`，然后使用如`querySelectorAll`这样的 DOM 操作方法来“查找”单独的子节点。然而，这种方式健壮性很差，并且如果你的 DOM 结构发生改变，它就可能会失效。

更好的解决方法是使用`ref callback`。当需要挂载`ref`的时候，React 传入 DOM 节点调用你的`ref`回调，当需要清除它的时候，会传入`null`来调用。这让你可以维护你自己的数组或者一个映射，并通过它的索引或者某种 ID 来访问任意的 ref。

核心代码如下

```jsx
export default function Cats() {
  const itemsRef = useRef(new Map());
  ...
  return (
    ...
        <ul>
          {catList.map(cat => (
            <li
              key={cat.id}
              ref={(node) => {
                if (node) {
                  itemsRef.current.set(cat.id, node);
                } else {
                  itemsRef.current.delete(cat.id);
                }
              }}
            >
            </li>
          ))}
        </ul>
    ...
  );
}

```

以下是借助这个方法实现的小玩具：

<iframe src="https://codesandbox.io/embed/6lrmgd?view=Editor+%2B+Preview&module=%2Fsrc%2FApp.js"
     style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
     title="react.dev (forked)"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
