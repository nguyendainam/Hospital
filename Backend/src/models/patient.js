'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Patient extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Patient.belongsTo(models.Allcode, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderPatient' })
            Patient.hasMany(models.Booking, { foreignKey: 'patientId', as: 'PatientData' })


        }
    };
    Patient.init({
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        fullname: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        gender: DataTypes.STRING,
        address: DataTypes.STRING,
        birthDay: DataTypes.STRING,
        roleId: DataTypes.STRING,
        image: DataTypes.STRING,


    }, {
        sequelize,
        modelName: 'Patient',
    });
    return Patient;
};