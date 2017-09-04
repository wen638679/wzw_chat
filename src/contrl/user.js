/**
 * Created by hasee on 2017/9/1.
 */
import {Login, Register} from '../service/user';
const userContrl = {
    async login(req, res){
        let context = {
            request:req,
            response: res
        };
        await Login(context);
    },
    async register(req, res){
        let context = {
            request: req,
            response: res
        };
        await Register(context);
    }
}

export default userContrl;