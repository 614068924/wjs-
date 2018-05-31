/**
 * Created by 弹指一挥间 on 18-4-11.
 */
$(function(){
    function resize(){
        //获取屏幕的宽度
        var windownWidth = $(window).width();
        //判断屏幕是大还是小
        var isSmallScreen =windownWidth<768;
        $("#main_ad>.carousel-inner>.item").each(function(i,item){
            //因为拿到的是dom对象所以需要进行转换
            var $item = $(item);
            // var imgSrc = $item.data(isSmallScreen ? 'image-xs' : 'image-lg');
            //   $element.data()  是一个函数  专门取元素的自定义属性（data-xxx）函数的参数 我们要取得属性名称

            var imgSrc = isSmallScreen ? $item.data('image-xs') : $item.data('image-lg');
            $item.css('backgroundImage','url("'+imgSrc+'")');
            if (isSmallScreen) {
                $item.html('<img src="' + imgSrc + '" alt="" />');
            } else {
                $item.empty();
            }

        });

    }
    //判断屏幕是大还是小，然后根据屏幕大小来选择相应的图片适配屏幕
$(window).on('resize',resize).trigger('resize');
    $('[data-toggle="tooltip"]').tooltip();

    //控制标签页的标签宽度
    var $ulContainer = $('.nav-tabs');
    var width = 20;
   $ulContainer.children().each(function(index,ele){
       width+=ele.clientWidth;
   });
    //这个是获得他的宽度

    if (width > $(window).width()) {

        $ulContainer.css('width', width);
        $ulContainer.parent().css('overflow-x','scroll');
    }
    //点击注册事件
    var $newtitle = $('.news-text');
    var $title = $('#news .nav-pills a').on('click',function(){
        //获取当前点击的元素
        //获取对于的title值
        //将title放到的位置
        var $this = $(this);
        var title = $this.data('title');
        $newtitle.text(title);
    });
//获取界面上面的容器,获取起始和结束时候x坐标的位置
    var offset = 50;

    var startX;
    var endX;
    $carousels = $('.carousel');
    $carousels.on('touchstart', function(e) {
        // 手指触摸开始时记录一下手指所在的坐标X
        startX = e.originalEvent.touches[0].clientX;
         console.log(startX);
    });
    $carousels.on('touchmove', function(e) {
        // 变量重复赋值
        endX = e.originalEvent.touches[0].clientX;
    });
    //最后也要放在一个鼠标结束的时候计算，使之可以获取到他的数据  不然会undefined
    $carousels.on('touchend', function(e) {
        var distance = Math.abs(startX - endX);
        if (distance > offset) {
            // 有方向变化
            // console.log(startX > endX ? '←' : '→');
            // 2. 根据获得到的方向选择上一张或者下一张
            //     - $('a').click();
            //     - 原生的carousel方法实现 http://v3.bootcss.com/javascript/#carousel-methods
            //这个是原生的carousel方法实现
            $(this).carousel(startX > endX ? 'next' : 'prev');
        }
    });

});