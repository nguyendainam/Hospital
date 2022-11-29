import db from '../models/index'
import bcrypt, { hash } from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

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
                    attributes: ['email', 'password', 'roleId', 'firstName', 'lastName'],
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
                userData.errMessage = `Your's email isn't exits in your system. Please try other Email`

            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })


}

// ====================FINISH  CHECK EMAIL USER ========================

// ============================== get all or single user=================

let GetAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }

                })
            } if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: {
                        id: userId
                    },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        } catch (error) {
            reject(error)
        }
    });
}


// ============================== finish get all or single user=================

// ========================= create new user ===============================
let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            // check email 
            let check = await checkUserEmail(data.email)
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already in use , Please try other Email'
                })
            } else {
                let hashPasswordFromBycrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBycrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phonenumber,
                    gender: data.gender === '1' ? true : false,
                    roleId: data.roleId,

                })
                resolve({
                    errCode: 0,
                    errMessage: "Create new User successfull"
                })
            }

        } catch (e) {
            reject(e)
        }
    })


}
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }


    })
}
// ========================= finish create new user ===============================


// ========================= delete user ===============================

let deleteUserById = (userid) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({
            where: { id: userid }
        })

        if (!user) {
            resolve({
                errCode: 2,
                errMessage: "User not found"
            })
        }
        await db.User.destroy({
            where: { id: userid }
        })
        resolve({
            errCode: 0,
            errMessage: "Delete User success full"
        })
    })


}
// ========================= delete user ===============================

// ========================= edit user ===============================
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                return resolve({
                    errCode: 2,
                    message: "Missing required parameters"
                })
            }
            let user = await db.User.findOne({
                where: {
                    id: data.id
                },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address
                user.phoneNumber = data.phonenumber
                user.gender = data.gender
                user.image = data.image

                await user.save();


                resolve({
                    errCode: 0,
                    message: "Update User successfull"
                }) // tra ve
            } else {
                resolve()
            }
        } catch (e) {
            reject(e)
        }
    })
}




// ========================= end user ===============================

module.exports = {
    handleUserLogin: handleUserLogin,
    GetAllUsers: GetAllUsers,
    createNewUser: createNewUser,
    deleteUserById: deleteUserById,
    updateUserData: updateUserData
}