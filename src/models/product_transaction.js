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
        sub_total:{
            type: DataTypes.INTEGER
        },
        product_id:{
            type: DataTypes.INTEGER
        },
        id_transaction:{
            type: DataTypes.STRING
        },
        // order_qty:{
        //     type: DataTypes.ARRAY(DataTypes.INTEGER)
        // },
        // price_product:{
        //     type: DataTypes.ARRAY(DataTypes.INTEGER)
        // },
        // subtotal_product:{
        //     type: DataTypes.ARRAY(DataTypes.INTEGER)
        // },
        // id_product:{
        //     type: DataTypes.ARRAY(DataTypes.INTEGER)
        // },
        // id_transaction:{
        //     type: DataTypes.ARRAY(DataTypes.STRING)
        // },
        // date_add: {
        //     type: "TIMESTAMP",
        //     defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        //     allowNull: false
        // }

        // id: { 
        //     type: DataTypes.INTEGER,
        //     primaryKey:true,
        //     get: function() {
        //         return JSON.parse(this.getDataValue('id'));
        //     }, 
        //     set: function(val) {
        //         return this.setDataValue('id', JSON.stringify(val));
        //     }
        // },
        // order_qty: { 
        //     type: DataTypes.ARRAY(DataTypes.INTEGER),
        //     defaultValue:'[]',
        //     get: function() {
        //         return JSON.parse(this.getDataValue('arrayOrderQty'));
        //     }, 
        //     set: function(val) {
        //         return this.setDataValue('order_qty', JSON.stringify(val));
        //     }
        // },
        // price_product: { 
        //     type: DataTypes.ARRAY(DataTypes.INTEGER),
        //     defaultValue:'[]',
        //     get: function() {
        //         return JSON.parse(this.getDataValue('arrayPriceProduct'));
        //     }, 
        //     set: function(val) {
        //         return this.setDataValue('price_product', JSON.stringify(val));
        //     }
        // },
        // subtotal_product: { 
        //     type: DataTypes.ARRAY(DataTypes.INTEGER),
        //     defaultValue:'[]',
        //     get: function() {
        //         return JSON.parse(this.getDataValue('arraySubTotal'));
        //     }, 
        //     set: function(val) {
        //         return this.setDataValue('subtotal_product', JSON.stringify(val));
        //     }
        // },
        // id_product: { 
        //     type: DataTypes.ARRAY(DataTypes.INTEGER),
        //     defaultValue:'[]',
        //     get: function() {
        //         return JSON.parse(this.getDataValue('arrayIdProduct'));
        //     }, 
        //     set: function(val) {
        //         return this.setDataValue('id_product', JSON.stringify(val));
        //     }
        // },
        // id_transaction: { 
        //     type: DataTypes.ARRAY(DataTypes.STRING),
        //     defaultValue:'[]',
        //     get: function() {
        //         return JSON.parse(this.getDataValue('arrayIdTransaction'));
        //     }, 
        //     set: function(val) {
        //         return this.setDataValue('id_transaction', JSON.stringify(val));
        //     }
        // },
        // date_add: { 
        //     type: "TIMESTAMP",
        //     defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        //     allowNull: false
        // }
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

