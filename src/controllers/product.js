'use-strict';

const { productModel } = require('../models/product');
const { categoryModel } = require('../models/category');
productModel.belongsTo(categoryModel, { foreignKey : 'id_category'});
categoryModel.hasMany(productModel, { foreignKey : 'id' });

exports.getProductAll = async (req, res) => {
    try{
        const getProductAllData = await productModel.findAll({
            include:[
                {
                    model : categoryModel,
                    require : true
                }
            ]
        });
        if(getProductAllData){
            res.json({
                status : 'success',
                response : getProductAllData
            })
        }
    }catch(error){
        res.json({
            status: 'error',
            response : error
        })
    }
}

exports.getProductById = async (req,res) => {
    try{
        const id = req.params.id;

        const ProductDataById = await productModel.findOne({
            where : { id },
            include:[
                {
                    model : categoryModel,
                    require : true
                }
            ]
        })
        if(ProductDataById){
            res.json({
                status : 'success',
                response : ProductDataById,
            })
        }else{
            res.json({
                status : 'error',
                response : 'Product not found'
            })
        }
    }catch(error){
        res.json({
            status : 'error',
            response : error
        })
    }
}

exports.postProduct = async (req,res) => {
    try{
        const name_product = req.body.name_product;
        const desc_product = req.body.desc_product;
        const image_product = req.body.image_product;
        const id_category = req.body.id_category;
        const price_product = req.body.price_product;
        const quantity_product = req.body.quantity_product;

        if (name_product === "" || name_product === null || name_product === undefined) {
            return res.json({
              status: "error",
              response: "Name product cant be empty"
            });
        }

        const checkNameProduct = await productModel.findOne({
            where : {name_product}
        })
        if(checkNameProduct){
           return res.json({
                status: 'error',
                response : 'Name Product is exist'
            })
        }

        if (id_category === "" || id_category === null || id_category === undefined) {
            return res.json({
              status: "error",
              response: "Id category cant be empty"
            });
        }

        if (price_product === "" || price_product === null || price_product === undefined) {
            return res.json({
              status: "error",
              response: "Price product cant be empty"
            });
        }

        if (quantity_product === "" || quantity_product === null || quantity_product === undefined) {
            return res.json({
              status: "error",
              response: "Quantity product cant be empty"
            });
        }

        const newProduct = await productModel.create({
            name_product : name_product,
            desc_product : desc_product,
            image_product : image_product,
            id_category : id_category,
            price_product : price_product,
            quantity_product : quantity_product
        })
        if(newProduct){
            const newProductData = await productModel.findOne({
                where : { name_product },
                include:[
                    {
                        model : categoryModel,
                        require : true
                    }
                ]
            })
            if(newProductData){
                res.json({
                    status : 'success',
                    message : 'Add new Product Successfully',
                    response : newProductData
                })
            }
        }else{
            res.json({
                status : 'error',
                response : 'Failed add product'
            })
        }
    }catch(error){
        res.json({
            status : 'error',
            response : error
        })
    }
}

exports.updateProduct = async (req,res) => {
    try {
        const id = req.params.id;
        const name_product = req.body.name_product;
        const desc_product = req.body.desc_product;
        const image_product = req.body.image_product;
        const id_category = req.body.id_category;
        const price_product = req.body.price_product;
        const quantity_product = req.body.quantity_product;

        const checkProduct = await productModel.findOne({
            where : { id }
        })

        if(checkProduct){
            if(name_product==='' || name_product=== null || name_product===undefined){
                const updateProduct = await productModel.update({
                    desc_product : desc_product,
                    image_product : image_product,
                    id_category : id_category,
                    price_product : price_product,
                    quantity_product : quantity_product
                },{
                    where : { id }
                })
                if(updateProduct){
                    const updateProductData = await productModel.findOne({
                        where : { id },
                        include:[
                            {
                                model : categoryModel,
                                require : true
                            }
                        ]
                    })
                    res.json({
                        status: 'success',
                        message : 'Update Successfully',
                        response : updateProductData
                    })
                }
            }else{
                const checkNameProduct = await productModel.findOne({
                    where : {name_product}
                })
                if(checkNameProduct){
                    if(id == checkNameProduct.id){
                        const updateProduct = await productModel.update({
                            desc_product : desc_product,
                            image_product : image_product,
                            id_category : id_category,
                            price_product : price_product,
                            quantity_product : quantity_product
                        },{
                            where : { id }
                        })
                        if(updateProduct){
                            const updateProductData = await productModel.findOne({
                                where : { id },
                                include:[
                                    {
                                        model : categoryModel,
                                        require : true
                                    }
                                ]
                            })
                            res.json({
                                status: 'success',
                                message : 'Update Successfully',
                                response : updateProductData
                            })
                        }
                    }else{
                        res.json({
                            status: 'error',
                            response : 'Name Product is exist'
                        })
                    }
                }else{
                    const updateProduct = await productModel.update({
                        desc_product : desc_product,
                        image_product : image_product,
                        id_category : id_category,
                        price_product : price_product,
                        quantity_product : quantity_product
                    },{
                        where : { id }
                    })
                    if(updateProduct){
                        const updateProductData = await productModel.findOne({
                            where : { id },
                            include:[
                                {
                                    model : categoryModel,
                                    require : true
                                }
                            ]
                        })
                        res.json({
                            status: 'success',
                            message : 'Update Successfully',
                            response : updateProductData
                        })
                    }
                }
            }
        }else{
            res.json({
                status : 'error',
                response : 'Product not found'
            })
        }     
    }catch(error){
        res.status(400).json({
            status : 'error',
            response : error
        })
    }
}

exports.deleteProduct = async (req,res) => {
    try{
        const id = req.params.id;

        const checkProduct = await productModel.findOne({
            where : {id}
        })
        if(checkProduct){
            const deleteProduct = await productModel.destroy({
                where : { id }
            })
            if(deleteProduct){
                res.json({
                    status : 'success',
                    message : 'Delete Successfully',
                    response : checkProduct
                })
            }
        }else{
            res.json({
                status : 'error',
                response : error
            })
        }
    }catch{
        res.status(400).json({
            status : 'error',
            response : error
        })
    }
}