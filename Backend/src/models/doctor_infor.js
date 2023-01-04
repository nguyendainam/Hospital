'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Doctor_infor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

            Doctor_infor.belongsTo(models.Allcode, { foreignKey: "priceId", targetKey: "keyMap", as: "PriceData" })
            Doctor_infor.belongsTo(models.Allcode, { foreignKey: "provinceId", targetKey: "keyMap", as: "ProVinceData" })
            Doctor_infor.belongsTo(models.Allcode, { foreignKey: "paymentId", targetKey: "keyMap", as: "PaymenteData" })
            Doctor_infor.belongsTo(models.User, { foreignKey: "doctorId" })

            Doctor_infor.belongsTo(models.Specialty, { foreignKey: 'specialtyId', targetKey: "id", as: "InforDrSpecialty" })
            Doctor_infor.belongsTo(models.Clinic, { foreignKey: 'clinicId', targetKey: "id", as: "InforDrclinicId" })

        }
    };
    Doctor_infor.init({
        doctorId: DataTypes.INTEGER,
        specialtyId: DataTypes.INTEGER,
        clinicId: DataTypes.INTEGER,
        priceId: DataTypes.STRING,
        provinceId: DataTypes.STRING,
        paymentId: DataTypes.STRING,
        addressClinic: DataTypes.STRING,
        nameClinic: DataTypes.STRING,
        note: DataTypes.STRING,
        count: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Doctor_infor',
    });
    return Doctor_infor;
};