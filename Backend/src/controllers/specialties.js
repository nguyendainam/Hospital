import bcrypt from 'bcryptjs';
import { response } from 'express';
import Specialties from '../services/SpecialtiesService'

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


let getDoctorSpecitalty = async (req, res) => {
    try {
        let data = await Specialties.getDoctorSpecialtyService(req.query.id, req.query.localtion)
        return res.status(200).json({ data })
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Err from getdoctorSpecitalty'
        })
    }
}


let getSpecialtybyId = async (req, res) => {
    try {
        let data = await Specialties.getSpecialtyByIdService(req.query.id)
        return res.status(200).json({ data })
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Err from getdoctorSpecitalty'
        })
    }
}


let getAllCodeSpecialty = async (req, res) => {
    try {
        let data = await Specialties.getAllcodeSpecialtyService()
        return res.status(200).json({ data })

    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Err from getAllCodeSpecialty'
        })
    }
}

let UpdateInformationSpecialty = async (req, res) => {
    try {
        let data = await Specialties.UpdateInformationSpecialtyService(req.body)
        return res.status(200).json(data)

    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Err from getAllCodeSpecialty'
        })
    }
}


module.exports = {
    createNewSpecialty: createNewSpecialty,
    getAllSpecialty: getAllSpecialty,
    getIdNameSpecalty: getIdNameSpecalty,
    getDoctorSpecitalty: getDoctorSpecitalty,
    getSpecialtybyId: getSpecialtybyId,
    getAllCodeSpecialty: getAllCodeSpecialty,
    UpdateInformationSpecialty: UpdateInformationSpecialty
}