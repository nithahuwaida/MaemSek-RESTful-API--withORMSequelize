'use-strict';

const { transactionModel } = require('../models/transaction');
const { protransModel } = require('../models/product_transaction');
const { userModel } = require('../models/user');
const { productModel } = require('../models/product');

protransModel.belongsTo(transactionModel, { foreignKey : 'id_transaction'});
transactionModel.hasMany(protransModel, { foreignKey : 'id' });

protransModel.belongsTo(productModel, { foreignKey : 'id_product'});
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
    const order_qty = data.order_qty;
    const id_product = data.id_product;

    const getProduct = await productModel.findOne({
        where : {id : id_product}
    })
    const newQty = parseInt(getProduct.quantity_product) - parseInt(order_qty);
    await productModel.update({
        quantity_product : newQty
    },{
        where : { id : id_product}
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
        const id = makeTransactionId(8);
        const total = req.body.total_transaction;
        const id_user = req.body.id_user;
        const order_qty = req.body.order_qty;
        const price_product = req.body.price_product;
        const subtotal = req.body.subtotal_product;
        const id_product = req.body.id_product;

        if(id==='' || id===null || id===undefined){
            return res.json({
                status : 'error',
                response : 'No invoice cant be empty'
            })
        }

        const checkId = await transactionModel.findOne({
            where : { id }
        })
        if(checkId){
            return this.postTransaction(req,res);
        }

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

        const checkProduct = await productModel.findOne({
            where : {id : id_product}
        })
        if(!checkProduct){
            return res.json({
                status : 'error',
                response : 'Product not found'
            })
        }

        if(id_product==='' || id_product===null || id_product===undefined){
            return res.json({
                status : 'error',
                response : 'Id product cant empty'
            })
        }

        if(order_qty==='' || order_qty===null || order_qty===undefined){
            return res.json({
                status : 'error',
                response : 'Quantity product cant be empty'
            })
        }

        if(parseInt(checkProduct.quantity_product)<parseInt(order_qty)){
            return res.json({
                status : 'error',
                response : `Quantity product not enough only ${parseInt(checkProduct.quantity_product)}`
            })
        }
        
        if(price_product==='' || price_product===null || price_product===undefined){
            return res.json({
                status : 'error',
                response : 'Price product cant be empty'
            })
        }

        if(parseInt(price_product)!=checkProduct.price_product){
            return res.json({
                status : 'error',
                response: 'Price product is wrong'
            })
        }

        if(subtotal==='' || subtotal===null || subtotal===undefined){
            return res.json({
                status: 'error',
                response : 'Subtotal cant be empty'
            })
        }

        const newTransaction = await transactionModel.create({
            id : id,
            total_transaction : total,
            id_user : id_user,
        })
        if(newTransaction){
            const newProdTrans = await protransModel.create({
                id_transaction : id,
                order_qty : order_qty,
                price_product : price_product,
                subtotal_product : subtotal,
                id_product : id_product
            })
            if(newProdTrans){
                this.reduceQuantity(req.body);
                const newProdTransData = await protransModel.findOne({
                    where : { id_transaction : id },
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
                if(newProdTransData){
                    res.json({
                        status : 'success',
                        message : 'Transaction Successfully',
                        response : newProdTransData
                    })
                }
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