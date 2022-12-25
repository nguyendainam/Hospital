import bcrypt from 'bcryptjs';
import { response } from 'express';
import Specialties from '../services/Specialties'

let createNewSpecialty = async (req, res) => {

    try {

        let data = await Specialties.createNewSpecialties(req.body)

        return res.status(200).json({
            data
        })

    } catch (e) {
        {
            console.log('get all code error', e)
            return res.status(200).json({
                errCode: -1,
                errMessage: "Error from server"
            })
        }

    }


}


let getAllSpecialty = async (req, res) => {

    try {

        let data = await Specialties.getAllSpecialtyService()
        return res.status(200).json({
            data
        })

    } catch (e) {
        console.log('get all code error', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}


let getIdNameSpecalty = async (req, res) => {
    try {
        let data = await Specialties.getIdNameSpecaltyService()
        return res.status(200).json({
            data
        })

    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'err From get Id and Name Specialties '
        })
    }
}


module.exports = {
    createNewSpecialty: createNewSpecialty,
    getAllSpecialty: getAllSpecialty,
    getIdNameSpecalty: getIdNameSpecalty
}