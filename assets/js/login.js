$(function () {
    $('.login-box a').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('.reg-box a').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })
    var form = layui.form
    var layer = layui.layer
    var date = {
        username: $('#form_Registration [name=username]').val(),
        password: $('#form_Registration [name=password]').val()
    }
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd:function(value){
            var pwd=$('#form_Registration [name=password]').val()
            if(pwd!==value){
                return '两次密码不一致'
            }
        }
    });
    //监听注册表单提交事件
    $('#form_Registration').on('submit', function (e) {
        e.preventDefault()
        $.post('http://ajax.frontend.itheima.net/api/reguser', date ,
            function (res) {
                if (res.status !== 0) {
                    
                    return layer.msg(res.message)
                }
                alert(1)
                layer.msg('注册成功')
                $('.reg-box a').click();
            })
    })
    //监听登录表单提交事件
    $('#form_Login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败!')
                }
                layer.msg('登录成功!')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})