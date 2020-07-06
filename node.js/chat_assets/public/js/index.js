/**
 * Created by Heart on 2016/2/16.
 */

$(function(){
    (function(){
        //模态框
        $('#modal-user').modal({
            backdrop: 'static',
            keyboard: false
        });

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
            $(this).attr( 'src', '../public/img/'+ random() +'.jpg' );
        }).click();

        var username = $('#init-username')
            hint = $('#no-init-username-hint');
        $('[data-close-modal]').click(function () {
            if( username.val() ){
                $.ajax({
                    url: '/initUserName',
                    data: {
                        username: username.val(),
                        avatarNum: oldNum
                    }
                })
                .done(function ( msg ) {
                    if( msg == 1 ){
                        $('#modal-user').modal('hide');
                    }else{
                        hint.removeClass('hidden').html( '昵称已经被占用了┗( T﹏T )┛' );
                    }
                })
            }else{
                hint.removeClass('hidden').html('来一个风一样的昵称吧(～￣▽￣)～');
            }
        })
    })();

    //清除上线提示
    $( document).on( 'click', '#clear-online-hint', function(){
        $(this).parent().parent().remove();
    });

    //WebSocket
    var ws = (function(){
        var ws = new WebSocket( 'ws://127.0.0.1:8080' );
        return {
            open: function( fn ){
                ws.onopen = fn.bind( this );
                return this;
            },
            msg: function( fn ){
                var that = this;
                ws.onmessage = function( e ){
                    fn.call( that, JSON.parse( e.data ) );
                };
                return that;
            },
            err: function( fn ){
                ws.onerror = fn.bind( this );
                return this;
            },
            close: function( fn ){
                ws.onclose = fn.bind( this );
                return this;
            },
            send: function( data ){
                ws.send( JSON.stringify( data ) );
                return this;
            }
        };
    }());


    /*ws.open(function(){})
    console.log( ws )

        ws.send( 'string msg || josn msg' );
        ws.open(function(){

        })
        .msg(function(){

        })
        .err(function(){

        })
        .close(function(){

        });
    */

    var chatCon = $( '#chat-content');

    function createMsg( msg ){
        chatCon.append( msg ).scrollTop( chatCon[0].scrollHeight );
    }

    function createSelfMsg( info ){
        createMsg(
            '<div class="self">' +
                '<img class="pull-right" src="'+ info.avatarUrl +'" alt="'+info.nickname+'">' +
                '<div class="msg">' +
                    '<span>' + info.msg + '</span>' +
                '</div>' +
            '</div>'
        );
    }

    function createFriendsMsg( info ){
        createMsg(
            '<div class="friends">' +
                '<img class="pull-left" src="'+ info.avatarUrl +'" alt="'+ info.nickname +'">' +
                '<p>'+ info.nickname +'</p>' +
                '<div class="msg">' +
                    '<span>'+ info.msg +'</span>' +
                '</div>' +
            '</div>'
        );
    }

    function formatText( text ){
        return text.replace( /<|>|\s/g, function( val ){
            switch ( val ){
                case '<':
                    return '&lt;';
                case '>':
                    return '&gt;';
                case ' ':
                    return '&nbsp;';
            }
        });
    }

    $('#send-msg form').submit(function () {

        if( Math.random() > .5 ){
            var li = $( '.member li');
            var member = li.eq( Math.floor(Math.random()*(li.length-1)) + 1 );
            createFriendsMsg({
                nickname: member.find( 'b').text(),
                avatarUrl: member.find( 'img').attr( 'src' ),
                msg: formatText( $(this).find('.form-control').val() )
            });
        }else{
            var member = $( '.member li:first' );
            createSelfMsg({
                nickname: member.find( 'b').text(),
                avatarUrl: member.find( 'img').attr( 'src' ),
                msg: formatText( $(this).find('.form-control').val() )
            });
        }

        $(this).find('.form-control').val( '' );

        /*$.ajax({
            url: '/sendMsg',
            data: {
                username: ,
                msg: $(this).find('.form-control').val()
            },
            dataType: 'json'
        })
        .done(function( msg ){
            if( msg.status === 700 ){
                createSelfMsg(  );
            }
        });*/

        return false;
    });

    var member = $( '.member' );

    function offline( id ){
        member.find( '[data-id='+ id +']').remove();
    }

    setTimeout(function(){
        offline( Math.floor( Math.random() * 3 )+1 )
    }, 5000 );
});