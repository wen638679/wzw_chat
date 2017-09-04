/**
 * Created by hasee on 2017/9/1.
 */
import Promise from 'bluebird';
import Joi from 'joi';
import User from '../../module/user';

function validateParams(){
    const schema = Joi.object().keys({
        username:Joi.string().min(1).required(),
        password:Joi.string().min(1).required()
    });
    let params = this.context.request.body;
    let result = Joi.validate(params, schema);
    if(result.error){
        return Promise.reject('请求参数有误');
    }else{
        return ;
    }
}

async function login(){
    try{
        let username = this.context.request.body.username;
        let password = this.context.request.body.password;
        let user = await User.find({username:username});
        console.log(user);
        if(!user || user.length == 0){
            return Promise.reject('用户不存在');
        }
        if(user[0].password != password){
            return Promise.reject('账号密码不正确');
        }
        let loginUser = await User.findOneAndUpdate({username},{isLogin:true,lastLoginDate:Date.now()},{
            new:true,
        });
        return Promise.resolve(loginUser);
    }catch(error){
        return Promise.reject('服务器出错');
    }
}

function loginSuccess(user){
    let response = this.context.response;
    response.status(200);
    response.clearCookie('account');
    response.cookie('account',user.username);
    response.render('index.ejs');
}

function loginFail(error){
    let response = this.context.response;
    let status = 0;
    if(error == '请求参数有误'){
        status = 400;
    }else if(error == '用户不存在'){
        status = 402;
    }else if(error == '账号密码不正确'){
        status = 401;
    }else if(error == '服务器出错'){
        status = 500;
    }
    response.status(status);
    response.json({core:1, error});
}

const Login = (context)=>{
    let dependencies = {
        context:context
    };
    return Promise
        .resolve()
        .bind(dependencies)
        .then(validateParams)
        .then(login)
        .then(loginSuccess)
        .catch(loginFail)
}

export default Login;