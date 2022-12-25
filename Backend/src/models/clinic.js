'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Clinic extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Clinic.hasMany(models.Doctor_infor, { foreignKey: 'clinicId', as: 'InforDrclinicId' })
        }
    };
    Clinic.init({
        address: DataTypes.STRING,
        province: DataTypes.STRING,
        description: DataTypes.TEXT('long'),
        descriptionHTML: DataTypes.TEXT('long'),
        image: DataTypes.BLOB('long'),
        nameVi: DataTypes.STRING,
        nameEn: DataTypes.STRING,





    }, {
        sequelize,
        modelName: 'Clinic',
    });
    return Clinic;
};