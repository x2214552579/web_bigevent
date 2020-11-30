$(function(){
    // 登录 点击去注册
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
        
    })
    // 注册表单 点击去登录
    $('#link_login').on('click',function(){
        $('.login-box').show();
        $('.reg-box').hide();
    })
    // 自定义表单验证
    var form = layui.form
    var layer = layui.layer
    console.log(form);
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd:function(value){
            let pwd = $('.reg-box [name=password]').val();
            if(pwd !== value){
                return "两次密码不一致"
            }
        }

    })
    // 注册请求
    $('#form_reg').on('submit',function(){
        $.post('/api/reguser',$('#form_reg').serialize(),function(res){
            if(res.status !== 0){
                return layer.msg(res.message)
            }
            layer.msg(res.message)
            $('#link_login').click()
        })
        // 在jquery中可以阻止默认行为
        return false;
    })
    // 登录请求
    $('#form_login').on('submit',function(){
        // console.log($('#form_login').serialize());
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data:$('#form_login').serialize(),
            success:function(res){
                console.log(res);
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                layer.msg('登录成功')
                localStorage.setItem('token',res.token)
                window.location = 'index.html'
            }
        })
        return false;
    })
})