'use-strict';

const { DataTypes } = require('sequelize');
const Sequelize  = require('../../config/connect');

exports.userModel = Sequelize.define(
    'users',
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        fullname:{
            type: DataTypes.STRING(50)
        },
        username:{
            type: DataTypes.STRING(25)
        },
        email:{
            type: DataTypes.STRING(50)
        },
        password:{
            type: DataTypes.TEXT
        },
        date_add: {
            type: "TIMESTAMP",
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            allowNull: false
        },
        date_update: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false
        }
    },
    {
        timestamps: false
    }
);