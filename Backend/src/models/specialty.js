'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Specialty extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Specialty.hasMany(models.Doctor_infor, { foreignKey: 'specialtyId', as: 'InforDrSpecialty' })
        }
    };
    Specialty.init({
        description: DataTypes.TEXT('long'),
        image: DataTypes.BLOB('long'),
        nameVi: DataTypes.STRING,
        nameEn: DataTypes.STRING,
        contentHTML: DataTypes.TEXT('long'),

    }, {
        sequelize,
        modelName: 'Specialty',
    });
    return Specialty;
};