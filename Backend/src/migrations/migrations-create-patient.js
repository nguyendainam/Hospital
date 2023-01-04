'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Patients', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },


            email: {
                allowNull: false,
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            },
            fullname: {
                type: Sequelize.STRING
            },
            phoneNumber: {
                type: Sequelize.STRING
            },

            address: {
                type: Sequelize.STRING
            },

            gender: {
                type: Sequelize.STRING
            },
            birthDay: {
                type: Sequelize.STRING
            },
            roleId: {
                type: Sequelize.STRING
            },
            image: {
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
        await queryInterface.dropTable('Patients');
    }
};