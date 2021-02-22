$(function() {
    // 监听点击规则
    $('.rules_text').click(function() {
        $('.rule').stop().fadeIn(100);
    });

    // 监听关闭按钮
    $('.rule a').click(function() {
        $('.rule').stop().fadeOut(100);
    });

    // 监听开始按钮
    $('.start').click(function() {
        // 关闭开始按钮
        $(this).stop().fadeOut(100);

        // 调用时间进度条缩短的方法 progressHandler()
        progressHandler();

        // 调用随机出现灰太狼的方法，开始动画 stopWolfAnimation()
        startWolfAnimation();
    });

    // 监听重新开始按钮
    $('.reStart').click(function() {
        // .mask界面淡出
        $('.mask').stop().fadeOut(100);
        // 再次执行时间进度条函数
        progressHandler();
        // 重新开始游戏,调用开始动画方法
        startWolfAnimation();
        // 重新开始分数归零
        $('.score').text(0);
    });

    // 声明一个处理时间进度条的函数progressHandler()
    function progressHandler() {
        // 获取进度条的宽度
        var progressWidth = $('.progress').width();
        // 每次调用函数需要重新设置width为180px
        progressWidth = 180;
        // 开启定时器
        var timer = setInterval(() => {
            // 每隔100,进度条宽度减10
            progressWidth -= 1;
            // 返回到进度条中给.css()宽度
            $('.progress').css({
                width: progressWidth
            });
            // 判断当进度条宽度<=0，定时器关闭， .mask淡出
            if (progressWidth <= 0) {
                clearInterval(timer);
                $('.mask').stop().fadeIn(100);
                // 停止灰太狼的动画
                stopWolfAnimation();
            };
        }, 100);
    }

    // 定义一个跳转定时器标志
    var wolfTimer;
    // 声明一个随机出现灰太狼的函数
    function startWolfAnimation() {
        // 将灰太狼的图片地址放在一个数组中
        var wolf_1 = ['images/h0.png', 'images/h1.png', 'images/h2.png', 'images/h3.png', 'images/h4.png', 'images/h5.png', 'images/h6.png', 'images/h7.png', 'images/h8.png', 'images/h9.png'];
        // 将小灰灰的图片地址放在一个数组中
        var wolf_2 = ['images/x0.png', 'images/x1.png', 'images/x2.png', 'images/x3.png', 'images/x4.png', 'images/x5.png', 'images/x6.png', 'images/x7.png', 'images/x8.png', 'images/x9.png'];
        // 定义一个数组保存所有可能出现的位置
        var arrPos = [
            { left: "100px", top: "115px" },
            { left: "20px", top: "160px" },
            { left: "190px", top: "142px" },
            { left: "105px", top: "193px" },
            { left: "19px", top: "221px" },
            { left: "202px", top: "212px" },
            { left: "120px", top: "275px" },
            { left: "30px", top: "295px" },
            { left: "209px", top: "297px" }
        ];
        // 定义一个图片对象
        var $wolfImage = $('<img src="" class="wolfImage">');
        // 定义一个0~8的随机数
        var posIndex = Math.round(Math.random() * 8);
        // 设置图片对象的css样式
        $wolfImage.css({
            position: 'absolute',
            // 在位置数组中，根据随机数索引设置在容器中的位置
            top: arrPos[posIndex].top,
            left: arrPos[posIndex].left
        });
        // 定义一个图片地址，判断这个随机数0-1，当为0则为wolf_1[5] ，否则则为wolf_2[5] 
        var wolfType = Math.round(Math.random()) == 0 ? wolf_1 : wolf_2;
        // 设置一个定时器，图片自动跳转
        // 把索引变成一个全局变量
        // 在未改变索引号之前实现0-5图片之间的跳转
        window.wolfIndex = 0;
        window.wolfIndexEnd = 5;
        wolfTimer = setInterval(() => {
            if (wolfIndex <= wolfIndexEnd) {
                // .attr()设置图片对象的属性，图片地址
                $wolfImage.attr('src', wolfType[wolfIndex]);
                wolfIndex++;
            } else {
                $wolfImage.remove();
                clearInterval(wolfTimer);
                // 回调这个函数，让动画不断的执行下去
                startWolfAnimation();
            }
        }, 200);
        // 修改定时器出来动画的事件间隔改变游戏难度

        // 将这个图片对象放在容器中
        $('.container').append($wolfImage);
        //调用游戏规则的方法
        gameRules($wolfImage);
    }

    // 声明游戏规则的函数
    function gameRules($wolfImage) {
        $wolfImage.one('click', function() {
            // 点击是修改全局变量的索引号 ，实现5-9之间的跳转
            wolfIndex = 5;
            wolfIndexEnd = 9;
            // 使用.attr()返回图片src属性的图片地址，判断图片地址字符串里面有没有h字符
            var flag = $(this).attr('src').indexOf('h') > 1;
            if (flag) {
                $('.score').text(parseInt($('.score').text()) + 10);
            } else {
                $('.score').text(parseInt($('.score').text()) - 10);
            }
        })
    }
    // 声明一个停止动画的函数
    function stopWolfAnimation() {
        $('.wolfImage').remove();
        clearInterval(wolfTimer);
    }
})