'use-strict';

const Sequelize = require('../../config/connect');
const { transactionModel } = require('../models/transaction');
const { protransModel } = require('../models/product_transaction');
const { userModel } = require('../models/user');
const { productModel } = require('../models/product');
const { categoryModel } = require('../models/category');

productModel.belongsTo(categoryModel, { foreignKey : 'id_category'});
categoryModel.hasMany(productModel, { foreignKey : 'id' });

protransModel.belongsTo(transactionModel, { foreignKey : 'id_transaction'});
transactionModel.hasMany(protransModel, { foreignKey : 'id_transaction' });

protransModel.belongsTo(productModel, { foreignKey : 'product_id'});
productModel.hasMany(protransModel, { foreignKey : 'id' });

transactionModel.belongsTo(userModel, { foreignKey : 'id_user'});
userModel.hasMany(transactionModel, { foreignKey : 'id' });

function makeTransactionId(length) {
    var result = "";
    var characters = "0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return 'MS'+ result;
}

exports.reduceQuantity = async (data, res) => {
    data.map( async (item)=>{
        const order_qty = item.order_qty;
        const id_product = item.product_id;

        const getProduct = await productModel.findOne({
            where : {id : id_product}
        })
        const newQty = parseInt(getProduct.quantity_product) - parseInt(order_qty);
        await productModel.update({
            quantity_product : newQty
        },{
            where : { id : id_product}
        })
    })
}

exports.getTransactionAll = async (req,res) => {
    try{
        const getTransactionAll = await protransModel.findAll({
            include : [
                {
                    model : transactionModel,
                    require : true,
                    include:[
                        {
                            model  : userModel,
                            require : true
                        }
                    ]
                },
                {
                    model : productModel,
                    require : true
                }
            ]
        });
        if(getTransactionAll){
            res.json({
                status: 'success',
                response : getTransactionAll
            })
        }
    }catch(error){
        res.status(400).json({
            status : 'error',
            response : error
        })
    }
}

exports.getTransactionById = async (req,res) => {
    try{
        const id = req.params.id;

        const getTransactionById = await protransModel.findAll({
            where : { id_transaction : id },
            include : [
                {
                    model : transactionModel,
                    require : true,
                    include : [
                        {
                            model : userModel,
                            require : true
                        }
                    ]
                },
                {
                    model : productModel,
                    require : true
                }
            ]
        })
        if(getTransactionById){
            res.json({
                status : 'succes',
                response : getTransactionById
            })
        }else{
            res.json({
                status : 'error',
                response : 'Transaction not found'
            })
        }
    }catch(error){
        res.status(400).json({
            status : 'error',
            response : error
        })
    }
}

exports.postTransaction = async (req,res) => {
    try{
        const { user_id, total_price, detail_order } = req.body;
        const id_trans = makeTransactionId(8);

        // const arrayIdTransaction = [];
        // const arrayOrderQty = [];
        // const arrayIdProduct = [];
        // const arraySubTotal = [];
        // const arrayPriceProduct = [];
        // detail_order.map(item => detail_order.push({id_transaction:id_trans}));

        // detail_order.map(item => arrayIdTransaction.push(id_transaction));
        // detail_order.map(item => arrayOrderQty.push(item.order_qty));
        // detail_order.map(item => arrayIdProduct.push(item.id_product));
        // detail_order.map(item => arraySubTotal.push(item.subtotal));
        // detail_order.map(item => arrayPriceProduct.push(item.price_product));

        // var point = { type: 'Point', coordinates: arrayIdTransaction}

        // const values = detail_order.map(item => [id_transaction, item.id_product, item.order_qty, item.price_product, item.subtotal]);
        // // console.log(req.body)
        // console.log('values',values)
        // console.log('arrayIdTransaction',arrayIdTransaction)
        // console.log('arrayIdProduct',arrayIdProduct)
        // console.log('arrayOrderQty',arrayOrderQty)
        // console.log('arrayPriceProduct',arrayPriceProduct)
        // console.log('arraySubTotal',arraySubTotal)

        if(id_trans==='' || id_trans===null || id_trans===undefined){
            return res.json({
                status : 'error',
                response : 'No invoice cant be empty'
            })
        }

        const checkId = await transactionModel.findOne({
            where : { id_transaction: id_trans }
        })
        if(checkId){
            return this.postTransaction(req,res);
        }

        let id_transaction;
        let updateDetailOrder = detail_order.map(item =>({...item, id_transaction :id_trans}));


        console.log('id_transaction',id_transaction)
        console.log('id_user',user_id)
        console.log('total_price',parseInt(total_price))
        console.log('detail_order',detail_order)
        console.log('updateDetailOrder',updateDetailOrder)
        const total = total_price;
        const id_user = user_id;

        if(id_user==='' || id_user===null || id_user===undefined){
            return res.json({
                status: 'error',
                response : 'User cant be empty'
            })
        }

        const checkUser = await userModel.findOne({
            where : {id : id_user}
        })
        if(!checkUser){
            return res.json({
                status : 'error',
                response : 'User not found'
            })
        }

        // const checkProduct = await productModel.findOne({
        //     where : {id : id_product}
        // })
        // if(!checkProduct){
        //     return res.json({
        //         status : 'error',
        //         response : 'Product not found'
        //     })
        // }

        // if(id_product==='' || id_product===null || id_product===undefined){
        //     return res.json({
        //         status : 'error',
        //         response : 'Id product cant empty'
        //     })
        // }

        // if(order_qty==='' || order_qty===null || order_qty===undefined){
        //     return res.json({
        //         status : 'error',
        //         response : 'Quantity product cant be empty'
        //     })
        // }

        // if(parseInt(checkProduct.quantity_product)<parseInt(order_qty)){
        //     return res.json({
        //         status : 'error',
        //         response : `Quantity product not enough only ${parseInt(checkProduct.quantity_product)}`
        //     })
        // }
        
        // if(price_product==='' || price_product===null || price_product===undefined){
        //     return res.json({
        //         status : 'error',
        //         response : 'Price product cant be empty'
        //     })
        // }

        // if(parseInt(price_product)!=checkProduct.price_product){
        //     return res.json({
        //         status : 'error',
        //         response: 'Price product is wrong'
        //     })
        // }

        // if(subtotal==='' || subtotal===null || subtotal===undefined){
        //     return res.json({
        //         status: 'error',
        //         response : 'Subtotal cant be empty'
        //     })
        // }

        const newTransaction = await transactionModel.create({
            id_transaction : id_trans,
            total_transaction : total,
            id_user : id_user,
        })
        if(newTransaction){
            const newProdTrans = await protransModel.bulkCreate(updateDetailOrder, { validate: true })
            if(newProdTrans){
                const reduceQty = updateDetailOrder.map( async (item)=>{
                    const order_qty = item.order_qty;
                    const id_product = item.product_id;

                    const getProduct = await productModel.findOne({
                        where : {id : id_product}
                    })
                    const newQty = parseInt(getProduct.quantity_product) - parseInt(order_qty);
                    await productModel.update({
                        quantity_product : newQty
                    },{
                        where : { id : id_product}
                    })
                    if(reduceQty){
                        const newProdTransData = await protransModel.findAll({
                            where : { id_transaction : id_trans },
                            include: [
                                {
                                    model : transactionModel,
                                    include : [
                                        {
                                            model : userModel,
                                            require : true
                                        }
                                    ]
                                },{
                                    model : productModel,
                                    require : true
                                }
                            ]
                        })
                        const updateProduct = await productModel.findAll({
                          include:[
                                {
                                    model : categoryModel,
                                    require : true
                                }
                            ]
                        });
                        if(newProdTransData && updateProduct){
                            res.json({
                                status : 'success',
                                message : 'Transaction Successfully',
                                response : {newProdTransData, updateProduct}
                            })
                        }
                    }
                })
            }
        }else{
            res.json({
                status : 'error',
                response : 'Transaction failed'
            })
        }
    }catch(error){
        res.status(400).json({
            status : 'error',
            response : error
        })
    }
}