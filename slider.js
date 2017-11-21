/**
 * @Author zlx
 * @Date 2017/11/21 下午1:38
 */
var Slider = function () {
    this.slideNum = 0; // 轮播次数
    // 初始化
    this.init = function (options) {
        var id = options.root, width = options.width, height = options.height;
        var root = document.getElementById(id);
        this.root = root;
        this.height = height;
        this.width = width;
        var _this = this;
        root.addEventListener('mouseover', function () {
            return _this.hover()
        });
        root.addEventListener('mouseleave', function () {
            return _this.leave()
        });
        // 切换浏览器窗口后，保持当前图片
        document.addEventListener("visibilitychange", function() {
            if (document.visibilityState === 'visible') {
                return _this.leave()
            } else if (document.visibilityState === 'hidden') {
                return _this.hover()
            }
        });
        root.style.width = width + "px";
        root.style.height = height + "px";
        root.style.overflow = 'hidden';
        root.style.position = 'relative';
        return this;
    };
    // 添加图片
    this.setImages = function (images) {
        var root = this.root, width = this.width, height = this.height;
        var imagesList = document.createElement('div');
        var imageListWidth = width * images.length, imageListHeight = height;
        imagesList.style.height = imageListHeight + "px";
        imagesList.style.width = imageListWidth + "px";
        imagesList.style.position = "absolute";
        imagesList.style.overflowX = "auto";
        imagesList.style.overflowY = "hidden";
        images && images.forEach(function (item) {
            var img = document.createElement('img');

            img.setAttribute('src', item);
            img.style.width = "" + width + "px";
            img.style.height = "" + height + "px";

            imagesList.appendChild(img);
        });
        root.appendChild(imagesList);

        this.imagesList = imagesList;
        this.imageListWidth = imageListWidth;
        this.imageListHeight = imageListHeight;

        return this;
    };
    // 开始轮播
    this.start = function (options) {
        this.startOptions = options;
        if (this.startOptions) {
            var params = this.startOptions;
            this.runStart(params)
        }
        return this;
    };
    // 执行轮播
    this.runStart = function (options) {
        var speed = options.speed, animateSpeed = options.animateSpeed;
        var _this = this;
        var timer = setInterval(function () {
            return _this.slide()
        }, speed);
        this.speed = speed;
        this.animateSpeed = animateSpeed;
        this.timer = timer;
    }

};

Slider.prototype.slide = function () {
    var imageList = this.imagesList,
        slideNum = this.slideNum,
        animateSpeed = this.animateSpeed,
        width = this.width,
        imageListWidth = this.imageListWidth;
    var offset = width * (slideNum + 1 ), animateTimer = null;
    if (offset < imageListWidth) {
        var animateOffset = 0;
        clearInterval(animateTimer);
        animateTimer = setInterval(function () {
            animateOffset = width * (30 / animateSpeed) + animateOffset;
            if (animateOffset > width) {
                imageList.style.left = "-" + (width * (slideNum + 1)) + "px";
                animateOffset = 0;
                clearInterval(animateTimer)
            } else {
                imageList.style.left = "-" + (animateOffset + (width * slideNum)) + "px";
            }
        }, 30);
        this.slideNum++;
    } else {
        var animateOffset = 0;
        var endTimer = setInterval(function () {
            if (animateOffset < imageListWidth) {
                animateOffset = imageListWidth * (30 / animateSpeed) + animateOffset;
                imageList.style.left = "-" + (imageListWidth - animateOffset > 0 ? imageListWidth - animateOffset : 0) + "px";
            } else {
                clearInterval(endTimer)
            }
        }, 30);
        this.slideNum = 0;
    }
};
// 鼠标移入 移除定时器
Slider.prototype.hover = function () {
    clearInterval(this.timer);
};
// 鼠标移除 开始定时器
Slider.prototype.leave = function () {
    var params = this.startOptions;
    if (params) {
        this.runStart(params);
    }
};
