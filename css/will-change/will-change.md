 使用will-change，这段代码就是提前告诉渲染引擎 box 元素将要做几何变换和透明度变换操作，这时候渲染引擎会将该元素单独实现一帧，等这些变换发生时，渲染引擎会通过合成线程直接去处理变换，这些变换并没有涉及到主线程，这样就大大提升了渲染的效率。**这也是 CSS 动画比 JavaScript 动画高效的原因**。

## 什么都没加

![images](./images/no-will-change.png)

 

## 增加will-change

``` css
 .box {
     will-change: transform, opacity;
 }
```

![images](./images/will-change.png)

## 对比

两项数据分别是：

``` md
#no-will-change
loader: 17 ms
script: 98 ms
rendering: 260 ms
painting: 30 ms
```

``` md
#will-change
loader: 8 ms
script: 81 ms
rendering: 233 ms
painting: 40 ms
```

可以明显看出至少有10%以上的提升，什么都没加多增加了一轮重绘
在频繁触发动画的情况下，这个数据差距只会更加大
