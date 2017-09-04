/**
 * Created by hasee on 2017/9/1.
 */
import mongoose from 'mongoose';
import DBConfig from '../config/dbConfig';

mongoose.connect(DBConfig.mongodb.url);
const mongoosePool = mongoose.connection;
mongoosePool.on('error',()=>{
    console.error('mongodb error');
});

mongoosePool.on('connected',()=>{
    console.error('mongodb connected');
});

mongoosePool.on('open',()=>{
    console.error('mongodb open');
});

mongoosePool.on('disconnected',()=>{
    console.error('mongodb disconnected');
});

mongoosePool.on('reconnected',()=>{
    console.error('mongodb reconnected');
});

export default mongoose;