import bcrypt from 'bcryptjs';
import { response } from 'express';
import UserService from '../services/UserServices'


// check dữ liệu truyền vào 

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password


    if (!email || !password) {

        return res.status(500).json({
            errCode: 1,
            message: 'Please enter full information'
        })
    }

    // hàm trả kết quả
    let userData = await UserService.handleUserLogin(email, password)

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })


}

let handleGetAllUser = async (req, res) => {
    let id = req.query.id; // ALL OR id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing require parameter',

        })
    }
    let users = await UserService.GetAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'oke',
        users
    })
}

let handleCreateNewUser = async (req, res) => {
    let message = await UserService.createNewUser(req.body)
    return res.status(200).json(message)


}
let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "User not found"
        })
    }
    let message = await UserService.deleteUserById(req.body.id)
    return res.status(200).json(message)
}

let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await UserService.updateUserData(data);
    return res.status(200).json({
        message
    })
}

let getAllCode = async (req, res) => {
    try {

        setTimeout(async () => {
            let data = await UserService.getAllCodeService(req.query.type)
            return res.status(200).json(data)
        }, 4000)


    } catch (e) {
        console.log('get all code error', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}


module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    getAllCode: getAllCode,
}
