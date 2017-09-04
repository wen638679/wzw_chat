/**
 * Created by hasee on 2017/9/1.
 */
import Contrl from '../contrl/user';
const userRoute = (app)=>{
    app.get('/login',(req, res)=>{
        res.render('login.ejs')
    })
    app.post('/login',Contrl.login);
    app.get('/register',(req, res)=>{
        res.render('register.ejs');
    })
    app.post('/register',Contrl.register)
}

export default userRoute;