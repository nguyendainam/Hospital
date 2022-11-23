import db from '../models/index'
import bcrypt, { hash } from 'bcryptjs';


// ====================CHECK EMAIL USER ========================

// kiểm tra email 
let checkUserEmail = (userEmail) => {

    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                // neu email đúng trả về giá trị cho userEmail
                resolve(true)
            } else {
                resolve(false)
            }

        } catch (e) {
            reject(e)
        }
    })
}



let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                //da ton tai nguoi dung
                //kiem tra pass
                let user = await db.User.findOne({
                    attributes: ['email', 'password', 'roleId'],
                    where: { email: email },
                    raw: true, // trả biến user thành dạng object

                })
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password)
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = "Success";

                        delete user.password;
                        userData.user = user
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = "Wrong Password"
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User not found`
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = `Your's email isn't exits in your system. Please try othe Email`

            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })


}

// ====================FINISH  CHECK EMAIL USER ========================



module.exports = {
    handleUserLogin: handleUserLogin
}