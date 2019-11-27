'use-strict';

const { DataTypes } = require('sequelize');
const Sequelize = require('../../config/connect');

exports.categoryModel = Sequelize.define(
    'categories',
    {
        id:{
            type : DataTypes.INTEGER,
            primaryKey: true
        },
        name_category:{
            type: DataTypes.STRING(25)
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