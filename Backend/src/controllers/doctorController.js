import DoctorServices from '../services/DoctorServices'

let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit
    if (!limit) limit = 10;
    try {
        let doctors = await DoctorServices.getTopDoctorHomeServices(+limit)
        return res.status(200).json(doctors)

    } catch (error) {
        console.log("Err from get doctor Controller: ", error)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server....'
        })
    }
}


module.exports = {
    getTopDoctorHome: getTopDoctorHome
}