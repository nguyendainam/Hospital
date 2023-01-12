import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController"
import doctorController from "../controllers/doctorController"
import patientController from "../controllers/patientController"
import specialties from '../controllers/specialties'
import clinicController from '../controllers/clinicController'

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/crud', homeController.getCRUD);


    // post
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);


    // ================== API =======================
    router.post('/api/login', userController.handleLogin)
    router.get('/api/get-all-users', userController.handleGetAllUser);
    router.post('/api/create-new-users', userController.handleCreateNewUser);
    router.put('/api/edit-users', userController.handleEditUser);
    router.delete('/api/delete-users', userController.handleDeleteUser);
    router.get('/api/allcode', userController.getAllCode);

    // =========================DOCTOR=================================
    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);
    router.get('/api/get-all-doctors', doctorController.getAllDoctor);
    router.post('/api/save_infor-doctors', doctorController.postInforDoctor);
    router.get('/api/get-detail-doctor-byid', doctorController.getDetailDoctor);
    router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule)
    router.get('/api/get-schedule-by-day', doctorController.getScheduleByDay);
    router.post('/api/post-infor-cost-doctor', doctorController.postInforCostDoctor)
    router.get('/api/get-infor-cost-doctor-byid', doctorController.getCostInforDoctorByid)
    router.get('/api/get-profile-doctor-by-id', doctorController.getProfileDoctorbyId)

    //===================== Doctor Manage =========================================

    router.get('/api/doctor-getinfor-email', doctorController.getInforDoctorbyEmail)
    router.post('/api/doctor-delete-schedule', doctorController.getDoctorDeleteSchedule)
    router.get('/api/doctor-get-list-patien', doctorController.getListPatientforDoctor)
    router.post('/api/doctor-send-remedy', doctorController.postDoctorsendRemedy)


    // =========================PATIENT=================================

    router.post('/api/patient-book-Appointment', patientController.postBookAppointment);
    router.post('/api/comfirm-verify-book-Appointment', patientController.postVerifyBookAppointment);
    router.post('/api/create-new-users-patient', patientController.handleCreateNewUserPatient);
    router.post('/api/patient-login', patientController.handlePatientLogin)
    router.get('/api/patient-get-schedule', patientController.getPatientGetSchedule)
    router.get('/api/patient-cancel-schedule', patientController.getCancelSchedule)


    // =========================SPECIALTY=================================

    router.post('/api/create-new-speciaties', specialties.createNewSpecialty);
    router.get('/api/get-all-speciaties', specialties.getAllSpecialty);
    router.get('/api/get-id-name-speciaties', specialties.getIdNameSpecalty);
    router.get('/api/get-doctor-specialties', specialties.getDoctorSpecitalty);
    router.get('/api/get-inforspecialty-by-id', specialties.getSpecialtybyId);
    router.get('/api/list-allcode-specialty', specialties.getAllCodeSpecialty)
    router.post('/api/update-information-specialty', specialties.UpdateInformationSpecialty)



    // =========================CLINIC=================================
    router.post('/api/create-new-clinic', clinicController.createNewClinic);
    router.get('/api/get-id-name-clinic', clinicController.getIdNameClinic)
    router.get('/api/get-address-clinic-by-id', clinicController.getAddressClinicById)
    router.get('/api/get-all-clinic', clinicController.getAllClinic)
    router.get('/api/get-doctors-clinics', clinicController.getDoctorsClinic)
    router.post('/api/update-information-clinic', clinicController.UpdateInformationClinic)



    return app.use("/", router);
}

module.exports = initWebRoutes;