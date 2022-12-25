import { reject } from 'lodash'
import db from '../models/index'

let createNewSpecialties = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !data.nameVi
                || !data.nameEn
                || !data.image
                || !data.descriptionMarkdown
                || !data.contentHTML) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required'
                })
            } else {
                await db.Specialty.create({
                    image: data.image,
                    nameVi: data.nameVi,
                    nameEn: data.nameEn,
                    description: data.descriptionMarkdown,
                    contentHTML: data.contentHTML
                })

                resolve({
                    errCode: 0,
                    errMessage: "Create new specialty success!!!"
                })
            }



        } catch (e) {
            reject(e)
        }
    })
}

let getAllSpecialtyService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll()
            resolve({
                errCode: 0,
                data
            })


        } catch (e) {
            reject(e)
        }
    })
}

let getIdNameSpecaltyService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll({
                attributes: {
                    exclude: ['description', 'image', 'contentHTML', 'createdAt', 'updatedAt']


                },
            })
            resolve({
                errCode: 0,
                data
            })

        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    createNewSpecialties: createNewSpecialties,
    getAllSpecialtyService: getAllSpecialtyService,
    getIdNameSpecaltyService: getIdNameSpecaltyService
}