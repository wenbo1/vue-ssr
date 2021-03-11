var curl = window.location.pathname + window.location.search;

function _url(){return encodeURIComponent(curl);}

function go2page(url,back){
    if(back != undefined){
        url += (url.indexOf('?') > -1 ? '&' : '?') + 'url=' + _url();
    }
}

function go2url(o){
    location.href = 'http://huazi.gmweb.com/' + o.data('key') + '.html'
}

var navkey = null;
function nav_load(o){
    o.find('.nav-item').each(function(){
        var key = $(this).data('key');
        if(navkey == key || curl.indexOf(key) > -1){
            $(this).addClass('on');
            return false;
        }
    });
}

function tab_on(o){
    var lis = o.find('li');
    lis.click(function(){
        var me = $(this),
            id = me.attr('data-id');
        $('#'+id).show().siblings('ul').hide();
        me.addClass('on').siblings().removeClass('on');
    });
}

function drop_down(o){
    var tar = o.find('#txt'), drop = o.find('.drop-box');
    tar.click(function (e) {
        e.stopPropagation();
        if(tar.data('stat') == 0){
            tar.data('stat', 1);
            drop.show();
            tar.closest('.choose').siblings().find('.drop-box').hide();
        }else{
            tar.data('stat', 0);
            drop.hide();
        }

    });
    drop.find('li').click(function () {
        var opt = $(this), id = opt.data('val'), txt = opt.text();
        opt.addClass('on').siblings().removeClass('on');
        o.find('input:hidden').val(id);
        o.find('span').html(txt);
        tar.data('stat',0);
        drop.hide();
    });
    drop.find('li.on').click();
    $(document).on('click',function(){
        $('.drop-box').hide();
    });
}

function playVid(o){
    var vid = o.get(0);
    var btn = o.next('button');
    vid.play();
    vid.controls = true;
    btn.hide();
}

/*图片交换*/
var switchImages = function(ele){
    var box = $('.img-preview_big');
    var image = $('#preview_thumb');
    var btn = image.find('li');
    var btn_prev = $('.img-preview_prev');
    var btn_next = $('.img-preview_next');
    var len = btn.length ;
    var ul = image.find('ul');
    return{
        init:function(){
            var me = this ;
            var i = 0 ;
            ul.css('width',len*138);
            btn_prev.click(function(e){
                if(i<=0){
                    $(this).addClass('color-gray');
                    return false;
                }
                btn_next.removeClass('color-gray');
                $(this).removeClass('color-gray');
                i--;
                me.scroll(i);
                e.preventDefault();
            });
            btn_next.click(function(e){
                if(i>= parseInt((len - 1)/5) || len<=5 ){
                    $(this).addClass('color-gray');
                    return false;
                }
                btn_prev.removeClass('color-gray');
                $(this).removeClass('color-gray');
                i++;
                me.scroll(i);
                e.preventDefault();
            });
            btn.each(function(index){
                $(this).mouseenter(function(e){
                    index = i;
                    me.addbk(i);
                    me.loadimg(i);
                    e.preventDefault();
                })
            });
        },
        loadimg:function(i){
            var csrc = btn.eq(i).find('img').data('src');
            box.find('#maginfiy_img').attr('src',csrc);
        },
        addbk:function(i){
            var me = btn.eq(i);
            me.addClass('on').siblings().removeClass('on');
        },
        scroll:function(i){
            ul.stop().animate({marginLeft: -168*5*i },300);
        }
    }
};
/*放大镜*/
function magnifying(ele){
    var me = $(ele),
        imgCnt = me.find('.magnifying-img_cnt'),//正常图片容器
        img = me.find('#maginfiy_img'),//正常图片容器
        drag = me.find('.magnifying-drag'),//拖动滑动容器
        showCnt = me.find('.magnifying-show_cnt'),//放大镜显示区域
        showImg = showCnt.find('img');//放大镜图片

    imgCnt.mouseover(function(e){
        drag.css('display','block');
        showCnt.css('display','block');
        var csrc = img.attr('src');
        showImg.attr('src',csrc);
        var iX = e.pageX - $(this).offset().left - drag.width()/2,
            iY = e.pageY - $(this).offset().top - drag.height()/2,
            MaxX = imgCnt.width()- drag.width(),
            MaxY = imgCnt.height()- drag.height();

        iX = iX > 0 ? iX : 0;
        iX = iX < MaxX ? iX : MaxX;
        iY = iY > 0 ? iY : 0;
        iY = iY < MaxY ? iY : MaxY;
        drag.css({left:(iX)+'px',top:iY+'px'});
        showImg.css({marginLeft:-1.28*iX+'px',marginTop:-1.28*iY+'px'});
    });
    imgCnt.mouseout(function(){
        drag.css('display','none');
        showCnt.css('display','none');
    });
}
function fixed_backtop(o){
    o.click(function(){
        $('body,html').animate({scrollTop:0},300);
    });
    $(window).scroll(function(){
        var top = $(window).scrollTop();
        if(top > 720){
            o.fadeIn();
        }else{
            o.fadeOut();
        }
    });
}
function clearStorage(){
    window.sessionStorage.clear();
    // window.location.href = _url();
}
function set_cookie(n, v){
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = n +"="+ escape(v) +";expires="+ exp.toGMTString();
}
function get_cookie(n){
    var arr,reg = new RegExp("(^| )"+ n +"=([^;]*)(;|$)");
    if(arr = document.cookie.match(reg)){
        return unescape(arr[2]);
    }
    return null;
}
function del_cookie(n){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var v = get_cookie(n);
    if(v != null){
        document.cookie = n +"="+ v +";expires="+ exp.toGMTString();
    }
}
function page_call_load(){
    var o = $(this);
    var act = o.attr('data-load').split(',');
    $(act).each(function(){
        if(this != ''){
            eval(this+'(o)');
        }
    });
}
function page_call_act(){
    var o = $(this);
    var act = o.attr('data-act');
    eval(act+'(o)');
}
$(document).ready(function(){
    $('[data-load]').each(page_call_load);
    if(/[?&]act=([^&]*)(&|$)/.test(curl)){
        var act = RegExp.$1;
        set_cookie('sync.act', act);
        curl = curl.replace(/[?&]act=([^&]*)(&|$)/, '');
        go2page(curl);
    }else{
        var act = get_cookie('sync.act');
        if(act != null){
            del_cookie('sync.act');
            $('[data-act='+ act +']').click();
        }
    }
}).on('click','[data-act]',page_call_act);