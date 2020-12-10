window.loadlock = false;
window.nsInitFun = new Array();
window.nsInit = function (obj) {
    window.nsInitFun.push(obj);
};
$(document).ready(function (e) {
    main();
    $(window).load(function (e) {
        //调用其它页面特定的初始化方法
        for (var i = 0; i < window.nsInitFun.length; i++) {
            window.nsInitFun[i]();
        }
    });
});
function main() {

    //焦点图切换
    (function () {

        $(".focus").each(function (index, element) {
            var thisObj = this;
            var len = $(this).find(".list").length;
            var current = 0;
            var time = 5000;
            var m;
            if (len > 0) {
                $(thisObj).find(".list:eq(0)").fadeIn(400);
            }
            if (len > 1) {
                //创建按钮 
                var html = "";
                for (i = 0; i < len; i++) {
                    if (i == 0) {
                        html += '<a href="javascript:void(0);" class="current"></a>';
                    } else {
                        html += '<a href="javascript:void(0);"></a>';
                    }
                }
                $(thisObj).find(".btns").html(html);
                $(thisObj).find(".btns a").on("click", function () {
                    var index = $(this).index();
                    if (current != index) {
                        clearTimeout(m);
                        m = setInterval(auto, time);
                        current = index;
                        move();
                    }
                    return false;
                });
                m = setInterval(auto, time);
            }

            function auto() {
                if (current != len - 1) {
                    current++;
                } else {
                    current = 0;
                }
                move();
            }

            function move() {
                $(thisObj).find(".list").fadeOut(400);
                $(thisObj).find(".list:eq(" + current + ")").fadeIn(400);
                $(thisObj).find(".btns a").removeClass("current");
                $(thisObj).find(".btns a:eq(" + current + ")").addClass("current");
            }

        });
    })();

    //返回顶部
    (function () {
        $(window).scroll(function () {
            if ($(window).scrollTop() > 100) {
                $(".back-btn").show();
            } else {
                $(".back-btn").hide();
            }
            return false;
        });
        $(".back-btn").click(function () {
            $(window).scrollTop(0);
            return false;
        });
    })();

    //处理滚动, 加current, 启动动画
    (function () {
        //检测浏览器, 直接加上动画
        if ($.browser.msie && parseInt($.browser.version) <= 9) {
            $(".has-animate").addClass("current");
            return;
        }

        $(".has-animate").each(function (index, element) {

            var thisObj = this;
            if ("yes" == $(thisObj).attr("data-noanimate")) {
                return;
            }

            $(window).scroll(function (e) {
                setCurrent();
            });
            setCurrent();
            function setCurrent() {

                if ($(thisObj).parents(".main-item").css("display") == "none") {
                    return;
                }

                var wh = $(window).height();
                var st = $(window).scrollTop();
                var t = $(thisObj).offset().top;

                if (st + wh >= $(document).height() - 200) {
                    //已经到底
                    $(".has-animate").addClass("current");
                    return;
                }

                if (st >= t - (wh * (2 / 3))) {
                    $(thisObj).addClass("current");
                }
                else {
                    $(thisObj).removeClass("current");
                }

            }

        });

    })();

    //直接加动画
    (function () {
        $(".add-animate").addClass("current");
    })();

    //自动选择
    (function () {
        $(".auto-select").each(function () {
            var id = $(this).attr("data-id");
            if ($(this).find("a[data-id='" + id + "']").length > 0) {
                $(this).find("a[data-id='" + id + "']").addClass("current");
            } else {
                $(this).find("a:eq(0)").addClass("current");
            }
        });
    })();

    //js-back
    (function () {
        $(".js-back")
            .on("click",
                function () {
                    if (window.history.length == 0) {
                        window.location.href = $(this).attr("href");
                    } else {
                        window.history.go(-1);
                    }
                    return false;
                });
    })();

    //Index-Banner处理
    (function () {

        var len = $(".main-banner .list").length;
        var time = 8000;
        var current = 0;
        var m;
        var thisObj = $(".main-banner").get(0);
        var prev = 0;

        function setPos() {
            //var h = $(".nums").height();
            //var t = (contentHeight - h) / 2;
            //$(thisObj).find(".nums").css("top", t);
        }

        if (len > 1) {
            var html = "";
            for (var i = 0; i < len; i++) {
                if (i == 0) {
                    html += '<a href="javascript:void(0);" class="btn current"></a>';
                }
                else {
                    html += '<a href="javascript:void(0);" class="btn"></a>';
                }
            }

            $(thisObj).find(".btns").html(html);
            $(thisObj).find(".btns a").click(function (e) {
                var index = $(this).index();
                if (current != index) {
                    current = index;
                    move();
                    clearInterval(m);
                    m = setInterval(auto, time);
                }
                return false;
            });
            setPos();
            m = setInterval(auto, time);
        }

        function auto() {
            prev = current;
            if (current != len - 1) {
                current++;
            }
            else {
                current = 0;
            }
            move();
        }

        function move(isfirst) {
            if (!isfirst) {
                $(thisObj).find(".list:eq(" + prev + ")").stop().animate({ top: -855, opacity: 0 }, 600, null, function () {
                    $(this).css("display", "none");
                    $(this).css("opacity", 1);
                    $(this).css("top", 0);
                });
                $(thisObj)
                    .find(".list:eq(" + current + ")")
                    .fadeIn(600,
                        function () {
                            $(thisObj).find(".list").removeClass("current");
                            $(this).addClass("current");
                        });
            } else {
                $(thisObj)
                   .find(".list:eq(" + current + ")")
                   .fadeIn(0,
                       function () {
                           $(this).addClass("current");
                       });
            }


            $(thisObj).find(".btns a").removeClass("current");
            $(thisObj).find(".btns a:eq(" + current + ")").addClass("current");
        }

        move(true);
    })();

    //处理二维码
    (function () {
        $(".weixin").each(function () {
            var thisObj = this;
            function setPos() {
                var t = $(thisObj).offset().top;
                var l = $(thisObj).offset().left;
                if ($(thisObj).hasClass("attop")) {
                    $(".qrcode").css("top", t - 180).css("left", l - 60).fadeIn(200);
                } else {
                    $(".qrcode").css("top", t).css("left", l - 151).fadeIn(200);
                }
            }

            $(thisObj).hover(function () {
                setPos();
                $(window).bind("scroll", setPos);
            }, function () {
                $(".qrcode").fadeOut(200);
                $(window).unbind("scroll", setPos);
            });
        });
    })();


    //顺序处理z-index
    (function () {
        var zindex = 99;
        $(".main-item").each(function (index, element) {
            $(this).css("z-index", zindex--);
        });
    })();

    //处理自定义滚动
    (function () {
        try {
            $(".scrolling").mCustomScrollbar({
                theme: "minimal-dark"
            });
        }
        catch (e) {
        }
    })();

    //处理自定义滚动横向
    (function () {
        $(".scrolling-horizontal").each(function () {
            var width = $(this).attr("data-width");
            var len = $(this).find(".list").length;
            $(this).find(".max").width(len * width + 10);
        });
        try {
            $(".scrolling-horizontal").mCustomScrollbar({
                theme: "minimal-dark",
                axis: "x"
            });
        }
        catch (e) {
        }
    })();

    //处理提示
    (function () {
        $(".hint").on("focus", function (e) {
            if (this.value == this.defaultValue) {
                this.value = "";
            }
        }).on("blur", function (e) {
            if (this.value == "") {
                this.value = this.defaultValue;
            }
        });
    })();


    //弹出视频播放窗口
    $(document).ready(function (e) {
        $(".play-video").click(function (e) {
            var src = $(this).attr("data-src");
            var img = $(this).attr("data-img");
            var bh = $(document).height();
            $("body").append('<div class="ns-video"><div class="ns-video-c mlAuto"><div class="close"></div><div class="ns-video-content"><div id="my-video"></div></div></div></div>');
            setSize();
            $(window).unbind("resize").resize(function (e) {
                setSize();
            });
            $(".ns-video .close").click(function (e) {
                $(".ns-video").remove();
                return false;
            });
            jwplayer("my-video")
                .setup({
                    file: src,
                    autostart: false,
                    width: 1000,
                    height: 560,
                    image: img
                });
            function setSize() {
                var h = $(".main").height();
                var w = $(".main").width();
                var t = ($(window).height() - 600) / 2 + $(window).scrollTop();
                $(".ns-video").width(w).height(h);
                $(".ns-video").find(".ns-video-c").css("margin-top", t);
            }

            return false;
        });
    });
    //视频中心, 视频文字位置
    (function () {
        $(".video .list").each(function () {
            var t = ($(this).height() - $(this).find(".t").height()) / 2;
            $(this).find(".t").css("top", t);
        });
    })();
    //历年展会页面列表高度
    (function () {
        function setListPos() {
            $(".exhibition .list").each(function () {
                var thisObj = this;
                var h = $(this).find(".main-item").height();
                $(this).find(".line").css("top", (h - 2) / 2);
                $(this).find(".date").css("top", (h - $(this).find(".date").height()) / 2);
                $(this).find(".text").css("padding-top", (h - $(this).find(".text").height()) / 2);
            });
        }

        setListPos();
        $(window).resize(function () {
            setListPos();
        });
    })();
    //自动行高100%;
    (function () {
        $(window).resize(function () {
            setLineHeight();
        });
        setLineHeight();
        function setLineHeight() {
            $(".auto-line-height").each(function () {
                $(this).css("line-height", $(this).height() + "px");
            });
        }
    })();
    //处理展厅页面
    (function () {
        $(document).on("mouseover", ".show-list .item .img,.case .item .img", function (e) {
            var w = $(this).width();
            var h = $(this).height();
            $(this).find(".mask-c").width(w - 4 - 54);
            $(this).find(".mask-c").height(h - 4 - 60);
        });
    })();
    //menu-btn
    (function () {
        $(".menu-btn").click(function () {
            $(".menu").show();
            setPos();
            $("body").addClass("ovh");
            return false;
        });
        //setPos();
        function setPos() {
            //alert($(".menu-c").height());
            var t = $(window).scrollTop() + ($(window).height() - $(".menu-c").height()) / 2;
            var zoom = $(window).height() / 600;
            $(".menu-c").css("top", t).css("transform", "scale(" + zoom + "," + zoom + ")");
            $(".mlogo").css("top", ($(window).scrollTop() + 30));

        }

        $(window).resize(function () {
            setPos();
        });

    })();

    //处理内部的banner切换
    (function () {

        window.regInnerBanner = function (obj) {

            //往下处理内部滑动问题
            $(obj).find(".list").each(function () {

                //检测是否注册
                var isreg = $(this).attr("data-reg");
                if ("1" == isreg) {
                    return;
                } else {
                    $(this).attr("data-reg", "1");
                }


                var innerLen = $(this).find(".list-img").length;
                var innerCurrent = 0;
                //var innerM;
                var innerObj = this;

                if (innerLen > 1) {
                    //创建按钮
                    var html = "";
                    for (var i = 0; i < innerLen; i++) {
                        if (i == 0) {
                            html += '<a href="javascript:void(0);" class="btn current"></a>';
                        }
                        else {
                            html += '<a href="javascript:void(0);" class="btn"></a>';
                        }
                    }
                    $(innerObj).find(".btns").html(html);
                    //innerM = setInterval(auto, 5000);
                    $(innerObj).find(".btns a").click(function (e) {
                        var index = $(this).index();
                        if (index != innerCurrent) {
                            //clearInterval(innerM);
                            //innerM = setInterval(auto, 5000);
                            innerCurrent = index;
                            move();
                        }
                        return false;
                    });
                }

                function auto() {
                    if (innerCurrent != innerLen - 1) {
                        innerCurrent++;
                    } else {
                        innerCurrent = 0;
                    }
                    move();
                }


                function move() {
                    var pos = 0 - innerCurrent * 780;
                    $(innerObj).find(".list-max").stop().animate({ marginLeft: pos }, 500);
                    $(innerObj).find(".btns a").removeClass("current");
                    $(innerObj).find(".btns a:eq(" + innerCurrent + ")").addClass("current");
                }

            });

        }

        $(".detail-banner").each(function () {
            var thisObj = this;
            var current = 0;
            var len = $(thisObj).find(".list").length;
            $(thisObj).find(".max").width(830 * len + 50);
            var def = $(this).attr("data-sort");
            var isfirst = false;
            var islast = false;

            if (len <= 0) {
                $(thisObj).remove();
                return;
            }

            if (len == 1) {
                current = 0;
                move(true);
            }


            if (len > 1) {

                var index = $(thisObj).find(".list[data-sort='" + def + "']").index();
                if (index >= 0) {
                    current = index;
                    move(true);
                } else {
                    current = 1;
                    move(true);
                }
                $(thisObj).find(".lbtn").on("click", function () {
                    //console.log(current);
                    if (current != 0) {
                        current--;
                        //每次移动都要去检测是否到了开头,  然后准备新数据
                        if (current < 2 && !isfirst) {
                            //这种情况是,已经到了开头极限.前面还俩, 准备加载数据
                            var id = $(thisObj).find(".list:first").attr("data-id");
                            $.get("/Product/GetPrevs/?id=" + id,
                                null,
                                function (d, t, x) {
                                    if (d == "") {
                                        isfirst = true;
                                        move();
                                        return;
                                    }
                                    $(thisObj).find(".max").find(".list:first").before(d);
                                    var oldlen = len;
                                    len = $(thisObj).find(".list").length;
                                    $(thisObj).find(".max").width(830 * len + 50);

                                    current = current + len - oldlen + 1;
                                    move(true);

                                    current--;
                                    move();

                                    window.regInnerBanner(thisObj);
                                    if (regNphoto) {
                                        regNphoto();
                                    }
                                });
                        } else {
                            move();
                        }
                        /*setTimeout(function() {
                            
                        },100);*/
                    }
                    return false;
                });
                $(thisObj).find(".rbtn").on("click", function () {
                    if (current != len - 1) {
                        current++;
                        //每次移动都要去检测是否到了结尾,  然后准备新数据
                        if (current >= len - 2 && !islast) {
                            //这种情况是,已经到了末尾极限.后面还俩, 准备加载数据
                            var id = $(thisObj).find(".list:last").attr("data-id");
                            $.get("/Product/GetNexts/?id=" + id + "&t=" + new Date().getTime(), null, function (d, t, x) {
                                if (d == "") {
                                    islast = true;
                                    return;
                                }
                                $(thisObj).find(".max").append(d);
                                len = $(thisObj).find(".list").length;
                                $(thisObj).find(".max").width(830 * len + 50);
                                window.regInnerBanner(thisObj);
                                if (regNphoto) {
                                    regNphoto();
                                }
                            });
                        }
                        move();

                    }
                    return false;
                });
            }

            $(window).resize(function () {
                move();
            });

            function move(first) {
                var pos = 0 - current * (780 + 50) + ($(thisObj).width() - 780) / 2;
                if (first) {
                    $(thisObj).find(".max").css("margin-left", pos);
                }
                else {
                    $(thisObj).find(".max").stop().animate({ marginLeft: pos }, 500);
                }
                if (len == 1) {
                    $(thisObj).find(".lbtn").hide();
                    $(thisObj).find(".rbtn").hide();
                } else {
                    if (current == 0) {
                        $(thisObj).find(".lbtn").hide();
                    }
                    else {
                        $(thisObj).find(".lbtn").show();
                    }
                    if (current == len - 1) {
                        $(thisObj).find(".rbtn").hide();
                    }
                    else {
                        $(thisObj).find(".rbtn").show();
                    }
                }
                //$(thisObj).find(".btns a").removeClass("current");
                //$(thisObj).find(".btns a:eq(" + current + ")").addClass("current");
                //更新标题
                $(thisObj).prev(".main-title").find(".cn").html($(thisObj).find(".list:eq(" + current + ")").attr("data-title"));
            }

            window.regInnerBanner(this);
        });




    })();
    //inner-auto-width
    (function () {
        $(".inner-auto-width").each(function () {
            var len = parseInt($(this).attr("data-width"));
            var margin = parseInt($(this).attr("data-margin"));
            var thisObj = this;
            setSize();

            function setSize() {
                var w = ($(thisObj).width() - margin * (len - 1)) / len;
                $(thisObj).find(".auto-list").width(w);
                $(thisObj).find(".max").width((w + margin) * len + 20);
            }

            $(window).resize(function () {
                setSize();
            });
        });
    })();
    //tab-nav
    (function () {
        $(".tab-nav").each(function () {
            var len = $(this).find(".tlist").length;
            var bfb = (100 / len) + "%";
            $(this).find(".tlist").css("width", bfb);
        });
    })();

    //gotop
    (function () {
        $(".gotop").click(function () {
            $(window).scrollTop(0);
            return false;
        });
    })();


    //逐一进入
    //$(".opacity-animate").css("opacity", 0);
    $(".opacity-animate").each(function (index, element) {
        var obj = this;
        setTimeout(function () {
            //$(obj).animate({ opacity: 1 }, 400);
            $(obj).addClass("opacity-current");
        }, index * 100);
    });
}