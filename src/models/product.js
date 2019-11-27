'use-strict';

const { DataTypes } = require('sequelize');
const Sequelize = require('../../config/connect');

exports.productModel = Sequelize.define(
    'products',
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name_product:{
            type: DataTypes.STRING(25)
        },
        desc_product:{
            type: DataTypes.TEXT
        },
        image_product:{
            type: DataTypes.TEXT
        },
        id_category:{
            type: DataTypes.INTEGER
        },
        price_product:{
            type: DataTypes.INTEGER
        },
        quantity_product:{
            type: DataTypes.INTEGER(5)
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