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

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser
}
