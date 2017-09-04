/**
 * Created by hasee on 2017/9/3.
 */
var username;
var password;

function changeUsername(event){
    username = event.target.value;
}

function changePassword(event){
    password = event.target.value;
}

function login(){
    let params = {
        username,
        password
    }
    fetch('/login',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        credentials: "include",
        body:JSON.stringify(params)
    }).then(response=>{
        if(response.status == 200){
            window.location.pathname = '/'
        }else{
            return response.json();
        }
    }).then(result=>{
        console.log(result);
    }).catch(error=>{
        console.log(error);
    })
}
function register(){
    fetch('/register',{
        method:'GET',
        headers:{
            'Content-Type':'text/html;charset=utf-8',
            'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
        }
    }).then(response=>{
        console.log(response);
        if(response.status == 200){
            window.location.pathname = '/register'
        }
    });
}