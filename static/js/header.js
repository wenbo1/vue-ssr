var login_idx = null;
var register_idx = null;
function login(){
    login_idx = layer.open({
        type: 1,
        title: '登录',
        area: ['460px', '420px'],
        skin: 'layui-layer-blue',
        shadeClose: true,
        content:  $('#login')
    });
    layer.close(register_idx);
}

function register(){
    register_idx = layer.open({
        type: 1,
        title: '注册',
        area: ['460px', '500px'],
        skin: 'layui-layer-blue',
        shadeClose: true,
        content:  $('#register')
    });
    layer.close(login_idx);
}

function tab_load(obj){
    var lis = obj.find('li');
    lis.click(function(){
        var me = $(this),tab = me.data('tab'),fun = tab + '_tab()';
        me.addClass('on').siblings().removeClass('on');
        $('div[data-tab]').hide();
        $('div[data-tab='+tab + ']').fadeIn();
        eval(fun);
    });
    lis.eq(0).click();
}
function mobile_tab(){
    $('.mobile-cnt').show();
    $('.email-cnt').hide();
}
function email_tab(){
    $('.mobile-cnt').hide();
    $('.email-cnt').show();
}
