'use-strict';

const { productModel } = require('../models/product');
const { categoryModel } = require('../models/category');
const { transactionModel } = require('../models/transaction');
const { protransModel } = require('../models/product_transaction');
const { userModel } = require('../models/user');
const Sequelize = require('../../config/connect');

transactionModel.belongsTo(userModel, { foreignKey : 'id_user'});
userModel.hasMany(transactionModel, { foreignKey : 'id' });

protransModel.belongsTo(productModel, { foreignKey : 'product_id'});
productModel.hasMany(protransModel, { foreignKey : 'id' });

exports.getInformationAll = async (req,res) => {
    try{
        const dataUserCount = await userModel.count();
        const dataProductCount = await productModel.count();
        const dataCategoryCount = await categoryModel.count();
        const dataTransactionCount = await transactionModel.count();
        const getTransactionAll = await transactionModel.findAll({
            include : [
                {
                    model  : userModel,
                    require : true
                }
            ]
        });
        const sumTransaction = await transactionModel.findAll({
            attributes:[[Sequelize.fn('MONTH', Sequelize.col('date_add')), 'bulan'],[Sequelize.fn('sum', Sequelize.col('total_transaction')), 'total_transaction']],
            group: [Sequelize.fn('MONTH', Sequelize.col('date_add'))],
            raw: true,
            order : Sequelize.literal('bulan ASC')
        });
        const sumProduct = protransModel.findAll({
            include: [{ model : productModel,require : true}],
            attributes: ['product_id', [Sequelize.fn('sum', Sequelize.col('order_qty')), 'jumlah_terjual']],
            group : ['product_id'],
            raw: true,
            order: Sequelize.literal('jumlah_terjual DESC')
        })
        .then(sumProduct => {
            res.send({
                status : 'success',
                response : {
                    dataProductCount,
                    dataCategoryCount,
                    dataTransactionCount,
                    dataUserCount,
                    sumTransaction,
                    sumProduct,
                    getTransactionAll,
                }
            })
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
    }catch{
        res.json({
            status : 'error',
        });
    }
}