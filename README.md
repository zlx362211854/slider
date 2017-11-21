# 1.引入
```$xslt
<script src="./slider.js"></script>
```
# 2.设置容器

```$xslt
<div id="container" style="border: 1px solid #d8d8d8"></div>
```

# 3.初始化

```$xslt
var slider = new Slider();
slider.init({root: "container", width: 800, height: 500})
        .setImages(['./image/1.jpg', './image/2.jpg', './image/3.jpg', './image/4.jpg'])
        .start({speed: 3000, animateSpeed: 700});
```

# 4.参数

```$xslt
root: 容器元素的id | string
width: 容器元素宽 | number
height: 容器元素高 | number
images: 图片的地址集合 | Array[String]
speed: 轮播间隔时间毫秒 | number
animateSpeed： 图片切换动画时长 | number 
```

# 5.效果

![example](./a.gif)