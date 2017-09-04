/**
 * Created by hasee on 2017/9/3.
 */
var username;
var password;
var confirm_password;

function changeUsername(event){
    username = event.target.value;
}

function changePassword(event){
    password = event.target.value;
}

function changeConfirm(event){
    confirm_password = event.target.value;
}

function register(){
    if(!username || !password || !confirm_password){
        alert('请输入完整信息');
        return;
    }

    if(password != confirm_password){
        alert('两次密码不一致');
        return;
    }

    let params = {
        username,
        password
    }
    fetch('/register',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body:JSON.stringify(params)
    }).then(response=>{
        if(response.status == 200){
            window.location.pathname = '/login';
        }else{
            return response.json()
        }
    }).then(result=>{
        console.log(result);
    }).catch(error=>{
        console.log(error);
    })
}