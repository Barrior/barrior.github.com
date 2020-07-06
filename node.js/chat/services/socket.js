const socketIO = require('socket.io');

const startSocketIO = (server) => {
    if (startSocketIO.io) {
        return startSocketIO.io;
    }
    const io = startSocketIO.io = socketIO(server);
    io.on('connection', (socket) => {
        socket.on('createAccount', (data) => {
            socket.emit('createAccount', {
                code: 0,
                data
            });
        });
    });
};

//机器人自动消息
const autoMsgManage = {
  user: null,
  msg: [
    '你若安好，便是晴天',
    '人生若只如初见，何事秋风悲画扇。 —— 纳兰性德《木兰词·拟古决绝词柬友》',
    '夜来风雨声，花落知多少。 —— 孟浩然《春晓》',
    '<div class="text-center">《垓下歌》<br>力拔山兮气盖世。时不利兮骓不逝。<br>骓不逝兮可奈何！虞兮虞兮奈若何！</div>',
    '三更灯火五更鸡，正是男儿读书时。 —— 颜真卿《劝学诗》',
    '枯藤老树昏鸦，小桥流水人家，古道西风瘦马。 —— 马致远《天净沙·秋思》',
    '千山鸟飞绝，万径人踪灭。',
    '两情若是久长时，又岂在朝朝暮暮。 —— 秦观《鹊桥仙·纤云弄巧》',
    '月上柳梢头，人约黄昏后。 —— 欧阳修《生查子·元夕》',
    '昨夜雨疏风骤，浓睡不消残酒。 —— 李清照《如梦令·昨夜雨疏风骤》',
    '别紧张,我不是什么好人……',
    '我不下地狱，谁爱下谁下',
    '猜一句英文：「ABABBBAAAAAABBBABAAAABBBBAABBBAAAAA」？〈答案：Long time no C〉',
    '人不犯我，我不犯人；人若犯我，礼让三分；人再犯我，我还一针；人还犯我，斩草除根。',
    '为什么离婚的人越来越多？ —— 答案: 因为结婚的越来越多',
    '第一次世界大战是在何时发生？ —— 答案: 亚当与夏娃打架的时候',
    '一个数去掉首位是13，去掉末位是40。请问这个数是几? —— 答案: 四十三'
  ]
};

function autoChat(){
  setTimeout(function () {
    var user = autoMsgManage.user[ Math.random() > .5 ? 1 : 0 ];
    var msg = autoMsgManage.msg;
    socketGather.forEach(function ( v ) {
      v.emit( 'onFriendsMsg', {
        username: user.username,
        avatarNum: user.avatarNum,
        msg: msg[ Math.floor(Math.random() * msg.length) ]
      });
    });
    autoChat();
  }, Math.floor( Math.random()*50000 + 10000 ) );
}

module.exports = startSocketIO;
