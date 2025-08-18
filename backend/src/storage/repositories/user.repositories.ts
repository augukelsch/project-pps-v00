import { CreateUserDto } from "src/modules/dto/user.dto";
import { user_list } from "../schemas/user.schema";
import mongoose from 'mongoose';

const userModel = mongoose.model('User', user_list);

export async function createUser(createUser: CreateUserDto) {
    mongoose.model('User', user_list);
    if(createUser.username.length < 5 || createUser.email.indexOf('@') == -1 || createUser.password.length < 5){
        console.log(createUser.username.length)
        console.log(createUser.email)
        console.log(createUser.password.length)
        console.log('ERROR!')
        return "ERROR Creating User!"
    }
    const user = new userModel({
        username: createUser.username,
        email: createUser.email,
        password: createUser.password,
        createdAt: new Date(),
        updatedAt: new Date(),
        hidden: createUser.hidden,
    });
    try {
        const result = await user.save()
        return result
    } catch (err) {
        console.log('ERROR!',err)
        return "ERROR! cod must be unique"
    }
}
export async function readAllUser() {
    const query = await userModel.find()
    return query;
}

export async function readOneById(id) {
    const query = await userModel.findById(id)
    if (!query) {
        return "This Item ID does not Exist, try a different ID!"
    }
    return query;
}
export async function readOneByEmail(email) {
    const query = await userModel.find({ email: email }).exec()
    return query;
}
export async function readOneByUsername(username) {
    const query = await userModel.find({ username: username }).exec()
    return query[0];
}

export async function readUserCount() {
    const query = await userModel.countDocuments().exec()
    return query;
}

export async function readOneByDesc(description) {
    const query = await userModel.find({ description: description }).exec()
    return query;
}
export async function deleteOneById(id) {
    const query = await userModel.deleteOne({ _id: id }).exec()
    if (query.deletedCount == 0) {
        return "This Item ID does not Exist, try a different ID!"
    }
    return query;
}
export async function deleteOneByUsername(username) {
    const query = await userModel.deleteOne({ username: username }).exec()
    if (query.deletedCount == 0) {
        return "This Username does not Exist, try a different Username!"
    }
    return query;
}
export async function updateOneById(id, updateUserDto) {
    let query = await userModel.findById(id).exec();
    if(updateUserDto.email != query?.email || query?.username != updateUserDto.username){
       return "This field cannot be Changed!"
    }

    if (!query) {
        return "This Item ID does not Exist, try a different ID!"
    }
    query.username = updateUserDto.username
    query.email = updateUserDto.email
    query.password = updateUserDto.password
    query.updatedAt = new Date()
    query.hidden = updateUserDto.hidden || false;
    await query.save()
    return query
}
