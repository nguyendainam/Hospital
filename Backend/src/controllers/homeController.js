import db from '../models/index'
import CRUDService from '../services/CRUDServices'


let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll()
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });

    } catch (e) {
        console.log(e)
    }

    return res.render('homepage.ejs')
}

let getCRUD = (req, res) => {
    return res.render('test/crud.ejs')
}
let postCRUD = async (req, res) => {

    let message = await CRUDService.createNewUser(req.body)
    console.log(message)
    return res.send('post crud')

}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser()
    console.log('=======================')
    console.log(data)
    console.log('=======================')

    return res.render('test/displayCRUD.ejs', {
        dataTable: data
    })
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    console.log(userId)
    if (userId) {
        let userData = await CRUDService.getUserInforById(userId)
     
        return res.render('test/editCRUD.ejs' ,{
            userData: userData 
        })
    }
    else {
        return res.send("User not found")
    }



}


let putCRUD = async(req,res) => {
 let data = req.body;
 let allUsers = await CRUDService.updateUserData(data);
 return res.render('test/displayCRUD.ejs', {
    dataTable: allUsers
})
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD:putCRUD
}