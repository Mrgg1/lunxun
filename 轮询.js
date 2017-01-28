(function(e, f) {
    if (!e) return f;
    var n = function() {      //初始化
            this.el = f;      //实例容器
            this.items = f;   //li的集合对象
            this.sizes = [];  //每个li的尺寸，宽高
            this.max = [0,0]; //容器的尺寸
            this.current = 0; //计数
            this.interval = f;
            this.opts = {
                speed : 500,  //动画速度
                delay :  2000, //停留时间
                keys : !f,     //键盘默认可用
                dots : f,      //指示器默认不可用
                fluid : f      //响应式默认不支持
            };
            var n = this;
            this.init = function(t, n) {
                this.el = t;
                this.ul = t.children('ul');
                this.max = [t.outerWidth(), t.outerHeight()];
                this.items = this.ul.children('li').each(this.licontent);
                this.opts = e.extend(this.opts, n);
                this.setup();
                return this
            };
            //设置每个li属性 容器与li的关系
            this.licontent = function(t) {
                var r = e(this),
                    i = r.outerWidth(),
                    s = r.outerHeight();
                n.sizes[t] = [i, s];
                n.max[0] = i;//容器与li尺寸相同
                n.max[1] = s
            };


            //开始
            this.setup = function() { 
                this.el.css({
                    overflow: 'hidden',
                    width: n.max[0],
                    height: n.max[1]
                });
                this.ul.css({
                    width: this.items.length * 100 + "%",
                    // height: n.max[1],
                    position: "relative"
                });
                this.items.css("width", 100 / this.items.length + "%");
                if(this.opts.delay !== f) {  //有停留时间则执行
                    this.start();
                    this.el.hover(this.stop, this.start)
                }

                //键盘事件
                this.opts.keys && e(document).keydown(this.keys);
                //指示器
                this.opts.dots && this.dots();
                //响应式
                if(this.opts.fluid) {
                    var r = function() {
                        n.el.css('width', Math.min(Math.round(n.max[0] / n.el.parent().outerWidth() * 100),100) + "%")

                    };
                    r();
                    e(window).resize(r)
                }


            };
            //具体的切换
            this.move = function(t, r) {
                if (t> this.items.length - 1) t = 0;
                if (t< 0) t = this.items.length - 1;
                var i = this.items.eq(t);
                var s = {
                    height: i.outerHeight()
                };
                
                var o = r ? 5 : this.opts.speed;   //切换的速度o为后面的数字
                n.el.find(".dot:eq(" + t + ")").addClass("active").siblings().removeClass("active");
                this.ul.animate(e.extend({ 
                    left: "-" + t + "00%"
                }, s),o);
                   
                    n.current = t;
            }


            //开始
            this.start = function() {
                n.interval = setInterval(function() {
                    n.move(n.current + 1)
                }, n.opts.delay)
                return n
            };
            //停止
            this.stop = function() {
                n.interval = clearInterval(n.interval);
                return n
            }



            //键盘事件
            this.keys = function(e) {
                var r = e.which;
                var i = {
                    37: n.prev,
                    39: n.next,
                    27: n.stop
                };
                if(e.isFunction(i[r])) {//判断i[r]是否为函数，即对应的按钮是否有函数
                    i[r]()//如i[37]=n.prev();
                }

            }

            //下一张
            this.next = function() {
                return n.stop().move(n.current + 1)
            };
            //上一张
            this.prev = function() {
                return n.stop().move(n.current - 1)
            };
            //指示器
            this.dots = function() {
                var t = '<ol class="dots">';
                this.items.each(function(e){
                    t += '<li class="dot' + (e < 1 ? " active " : "") + '">' + (e + 1) + "</li>"
                });
                t += "</ol>";
                this.el.addClass("has-dots").append(t).find(".dot").click(function(){
                    n.move(e(this).index())
                })

            }
    };
    e.fn.unslider = function(t) {
        return this.each(function(i) {
            var s = e(this);
            var u = (new n).init(s, t);
            s.data("unslider" ,u)
        })
    }

})(window.jQuery, false)