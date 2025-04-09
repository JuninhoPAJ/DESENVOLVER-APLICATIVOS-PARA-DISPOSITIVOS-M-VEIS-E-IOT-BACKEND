import mongoose from "mongoose";
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true, default: 'client'},
    cpf: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}, 
    updatedAt: {type: Date, default: Date.now},
});

const UserModel = mongoose.model("User", schema);
export default UserModel;