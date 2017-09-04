/**
 * Created by hasee on 2017/9/1.
 */
import path from 'path';
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import socket from 'socket.io';
import userRoute from './src/route/user';
import appSocket from './src/socket';
import './src/service/dbPool';
const app = express();
const server = http.Server(app);
const io = socket(server);
app.set('port',8088);
app.set('appName','simple_chat');
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/',(req, res)=>{
    if(req.cookies.account){
        res.render('index.ejs');
    }else {
        res.redirect('/login');
    }
})
userRoute(app);

appSocket(io);

server.listen(app.get('port'),()=>{
    console.log('listener');
});