$(function(){
    // 发起请求
    getUserInfo()
    // 获得询问框对象
    var layer = layui.layer
    console.log(layer);
    $('#btnLogout').on('click',function(){
        layer.confirm('确定要退出登录?', {icon: 3, title:'提示'}, function(index){
            localStorage.removeItem('token')
            window.location = '/login.html'
            layer.close(index);
        });
    })
})
function getUserInfo(){
    $.ajax({
        method:'get',
        url:'/my/userinfo',
        success:function(res){
            console.log(res);
            // 调用渲染用户图像函数
            renderAvatar(res.data)
        }
    })
}
// 渲染用户图像
function renderAvatar(user){
    console.log(user);
    // 昵称优先级 没有昵称才渲染用户名
    let name = user.nickname || user.username;
    $('#welcome').html('欢迎' + name)
    // 判断是否有图像 无图像才会渲染用户首字母
    if(user.user_pic){
        $('.layui-nav-img').show().attr('src',user.user_pic)
    } else {
        $('.text-avatar').show().html(name[0].toUpperCase())
    }
}