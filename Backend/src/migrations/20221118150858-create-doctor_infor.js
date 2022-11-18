'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Doctor_infors', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            // doctorId: DataTypes.INTEGER,
            // priceId: DataTypes.STRING,
            // provinceId: DataTypes.STRING,
            // paymentId: DataTypes.STRING,
            // addressClinic: DataTypes.STRING,
            // nameClinic: DataTypes.STRING,
            // note: DataTypes.STRING,
            // count: DataTypes.STRING,

            doctorId: {
                type: Sequelize.INTEGER
            },
            priceId: {
                type: Sequelize.STRING
            },
            provinceId: {
                type: Sequelize.STRING
            },
            paymentId: {
                type: Sequelize.STRING
            },
            paymentId: {
                type: Sequelize.STRING
            },
            addressClinic: {
                type: Sequelize.STRING
            },
            note: {
                type: Sequelize.STRING
            },
            count: {
                type: Sequelize.STRING
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Doctor_infors');
    }
};