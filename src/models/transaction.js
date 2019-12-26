'use-strict';

const { DataTypes } = require('sequelize');
const Sequelize = require('../../config/connect');

exports.transactionModel = Sequelize.define(
    'transactions',
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        id_transaction:{
            type: DataTypes.INTEGER,
        },
        total_transaction:{
            type: DataTypes.INTEGER
        },
        id_user:{
            type: DataTypes.INTEGER
        },
        date_add: {
            type: "TIMESTAMP",
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);