/**
 * Created by Heart on 2016/2/16.
 */
function getOrigin() {
    return location.protocol + '//'+ location.hostname;
}

$(function(){
    //创建socket
    var socket = io.connect(getOrigin());
    var userInfo;

    var member = $( '.member' );
    var chatCon = $( '#chat-content');

    (function(){
        $('[data-toggle="tooltip"]').tooltip();

        //模态框
        $('#modal-user').modal({
            backdrop: 'static',
            keyboard: false
        });

        //注册头像切换
        var oldNum;
        function random(){
            var num = Math.floor( Math.random()*28 );
            if( num != oldNum ){
                return oldNum = num;
            }else{
                return random();
            }
        }
        $( '.create-user img').click(function(){
            $(this).attr( 'src', '/img/'+ random() +'.jpg' );
        }).click();

        //注册与信息同步
        var username = $('#init-username');
        var hint = $('#no-init-username-hint');

        socket.on( 'onCreateSelf', function( data ){
            if( data.status ){
                $('#modal-user').modal('hide');
                userInfo = data.info;
                updateUserOnline( userInfo, true );
                $('#wellcome').append('欢迎您！<b>'+userInfo.username+'</b>');
            }else{
                username.focus();
                hint.removeClass('hidden').html( '昵称已经被占用了┗( T﹏T )┛' );
            }
        });

        $('#init-username-form').submit(function () {
            if( username.val().trim() ){
                socket.emit( 'createSelf', {
                    username: username.val(),
                    avatarNum: oldNum
                });
            }else{
                username.focus();
                hint.removeClass('hidden').html('来一个风一样的昵称吧(～￣▽￣)～');
            }
            return false;
        });
    })();

    //用户上线信息同步
    function updateUserOnline( data, isSelf ){
        var method = 'append';
        var style = '';
        if( isSelf ){
            method = 'prepend';
            style = ' style="color:red"';
        }
        createOnlineHint( data.username );
        member[method]('<li class="ellipsis" data-id="'+data.id+'"><img src="/img/'+data.avatarNum+'.jpg" alt="'+data.username+'"><b'+style+'>'+data.username+'</b></li>');
        $('#cur-user-num').html( parseInt($('#cur-user-num').text())+1 );
    }
    //用户上线提示
    function createOnlineHint( username ){
        chatCon.append(
            '<div class="text-center"><span><i id="clear-online-hint" class="pull-right">×</i>'+username+'上线了，快找TA一起Hight吧~~\\(^o^)/~</span></div>'
        ).scrollTop( chatCon[0].scrollHeight );
    }
    //创建对话消息
    function createMsg( msg ){
        chatCon.append( msg ).scrollTop( chatCon[0].scrollHeight );
    }
    //创建自己的对话
    function createSelfMsg( info ){
        createMsg(
            '<div class="self">' +
                '<img class="pull-right" src="/img/'+ info.avatarNum +'.jpg" alt="'+info.username+'">' +
                '<div class="msg">' +
                    '<span>' + info.msg + '</span>' +
                '</div>' +
            '</div>'
        );
    }
    //创建他人的对话
    function createFriendsMsg( info ){
        createMsg(
            '<div class="friends">' +
                '<img class="pull-left" src="/img/'+ info.avatarNum +'.jpg" alt="'+ info.username +'">' +
                '<p>'+ info.username +'</p>' +
                '<div class="msg">' +
                    '<span>'+ info.msg +'</span>' +
                '</div>' +
            '</div>'
        );
    }

    //清除新用户上线提示
    $( document).on( 'click', '#clear-online-hint', function(){
        $(this).parent().parent().remove();
    });

    //接收他人下线信息
    socket.on( 'onOffline', function ( data ) {
        if( typeof data !== 'undefined' ){
            member.find( '[data-id='+ data +']').remove();
            $('#cur-user-num').html( parseInt($('#cur-user-num').text())-1 );
        }
    });

    //接收他人上线信息并更新
    socket.on( 'onFriendsOnline', function ( data ) {
        updateUserOnline( data );
    });

    //接收他人消息
    socket.on( 'onFriendsMsg', function( data ){
        createFriendsMsg( data );
    });

    //接收自己的消息
    socket.on( 'onSendMsg', function ( data ) {
        if( data.status === 700 ){
            createSelfMsg({
                username: data.info.username,
                avatarNum: data.info.avatarNum,
                msg: data.info.msg
            });
            $('#send-msg .form-control').val( '' );
        }
    });
    //发送自己的消息到服务器
    $('#send-msg form').submit(function () {
        socket.emit( 'sendMsg', {
            username: userInfo.username,
            msg: $(this).find('.form-control').val().trim()
        });
        return false;
    });
});