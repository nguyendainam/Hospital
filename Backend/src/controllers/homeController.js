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

let displatGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser()
    console.log('=======================')
    console.log(data)
    console.log('=======================')

    return res.render('test/displayCRUD.ejs', {
        dataTable: data
    })
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displatGetCRUD: displatGetCRUD
}