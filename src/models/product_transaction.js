'use-strict';

const { DataTypes } = require('sequelize');
const Sequelize = require('../../config/connect');

exports.protransModel = Sequelize.define(
    'products_transactions',
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        order_qty:{
            type: DataTypes.INTEGER
        },
        price_product:{
            type: DataTypes.INTEGER
        },
        subtotal_product:{
            type: DataTypes.INTEGER
        },
        id_product:{
            type: DataTypes.INTEGER
        },
        id_transaction:{
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