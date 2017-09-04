/**
 * Created by hasee on 2017/9/1.
 */
import mongoose from '../service/dbPool';
const Schema = mongoose.Schema;

const userShemat = new Schema({
    username:{type:String, require:true,unique:true},
    password:{type:String, require:true},
    isLogin:{type:Boolean, default:false},
    createDate:{type:Date, require:true},
    lastLoginDate:{type:Date}
});

const User = mongoose.model('user',userShemat);

export default User;