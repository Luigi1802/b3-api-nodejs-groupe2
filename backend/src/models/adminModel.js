import mongoose from 'mongoose';

const { Schema } = mongoose;

const AdminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    }
}, { _id: false });


const Admin = mongoose.model('Admin', AdminSchema,'Admin');

export default Admin;