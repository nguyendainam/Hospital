import UserService from '../services/UserServices'


// check dữ liệu truyền vào 

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password

    if (!email || !password) {

        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter'
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



module.exports = {
    handleLogin: handleLogin
}
