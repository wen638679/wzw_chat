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
        return  Promise.reject('请求参数有误');
    }else{
        return;
    }
}

async function register(){
    try{
        let params = this.context.request.body;
        params.createDate = Date.now();
        let user = await User.create(params);
        if(!user){
            return Promise.reject('注册不成功');
        }
        return Promise.resolve(user);
    }catch(error){
        return Promise.reject('服务器出错');
    }
}

function registerSuccess(user){
    let response = this.context.response;
    response.status(200);
    response.render('register.ejs')
}

function registerFail(error){
    let response = this.context.response;
    let status = 0;
    if(error == '请求参数有误'){
        status = 400;
    }else if(error == '注册不成功'){
        status = 401;
    }else if(error == '服务器出错'){
        status = 500;
    }
    response.status(status);
    response.json({core:1, error});
}

const Register = (context)=>{
    let dependencies = {
        context:context
    };
    return Promise
        .resolve()
        .bind(dependencies)
        .then(validateParams)
        .then(register)
        .then(registerSuccess)
        .catch(registerFail)
}

export default Register;