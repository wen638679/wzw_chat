/**
 * Created by hasee on 2017/9/4.
 */
var onlineUser = {};
const rooms = {
    '大厅':[],
}
const appSocket = (io)=>{
    io.sockets.on('connection',(socket)=>{
        socket.on('online',(account)=>{
            console.log(account)
            socket.user = account;
            if(onlineUser.hasOwnProperty(socket.user)){
                onlineUser[socket.user] = socket;
                socket.emit('online','用户已登录');
                return;
            }
            Object.keys(onlineUser).forEach(value=>{
                onlineUser[value].emit('online',account+'加入聊天室');
            })
            socket.emit('online','欢迎您加入聊天室');
            onlineUser[socket.user]  = socket;
        });
        socket.on('send_msg',(message)=>{
            if(!(onlineUser.hasOwnProperty(socket.user))){
                socket.emit('send_msg','用户已退出聊天室');
                return;
            }
            let content = {
                account:socket.user,
                message:message,
                time:Date.now()
            }
            io.emit('send_msg',content);
        });
        socket.on('disconnect',(value)=>{
            if(onlineUser.hasOwnProperty(socket.user)){
                console.log(socket.id, value);
                delete onlineUser[socket.user];
                console.log(socket.user);
                io.emit('disconnect',socket.user+'退出聊天室');

            }

        })
    });
}

export default appSocket;