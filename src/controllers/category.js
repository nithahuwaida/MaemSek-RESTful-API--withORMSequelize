'use-strict';

const { categoryModel } = require('../models/category');

exports.getCategoryAll = async (req,res) => {
    try{
        const dataCategoryAll = await categoryModel.findAll();
        res.json({
            status : 'success',
            response : dataCategoryAll
        });
    }catch{
        res.json({
            status : 'error',
            response : error
        });
    }
}

exports.getCategoryById = async (req,res) => {
    try{
        const id = req.params.id

        const getCategoryById= await categoryModel.findOne({
            where : { id }
        })
        if(getCategoryById){
            res.json({
                status: 'success',
                response : getCategoryById
            });
        }else{
            res.json({
                status : 'error',
                response : 'User not found'
            });
        }
    }catch(error){
        res.status(400).json({
            status: "error",
            response: error
        });
    }
}

exports.postCategory = async (req,res) => {
    try{
        const name_category = req.body.name_category;
        
        if(name_category === "" || name_category === null || name_category === undefined){
            return res.json({
                status: 'error',
                response : 'Name category cant be empty'
            })
        }
        const checkName = await categoryModel.findOne({
            where : {name_category}
        })
        if(checkName){
            return res.json({
                status : 'error',
                response : 'Category is exist'
            })
        }else{
            const newCategory = await categoryModel.create({
                name_category : name_category
            })
            if(newCategory){
                const newCategoryData = await categoryModel.findOne({
                    where : {name_category}
                })
                res.json({
                    status: 'success',
                    message: 'Add successfully',
                    response : newCategoryData
                })
            }
        }
    }catch(error){
        res.status(400).json({
            status : 'error',
            response : error
        })
    }
}

exports.updateCategory = async (req,res) => {
    try{
        const id = req.params.id;
        const name_category = req.body.name_category;
        
        if(name_category === "" || name_category === null || name_category === undefined){
            return res.json({
                status: 'error',
                response : 'Name category cant be empty'
            })
        }

        const checkCategory = await categoryModel.findOne({
            where : { id }
        })

        if(checkCategory){
            const checkName = await categoryModel.findOne({
                where : { name_category }
            })
            if(checkName){
                if(checkName.id===checkCategory.id){
                    const updateCategory = await categoryModel.update({
                        name_category : name_category
                    },{
                        where : { id }
                    })
                    if(updateCategory){
                        const updateCategoryData = await categoryModel.findOne({
                            where : { id }
                        })
                        res.json({
                            status : 'success',
                            message : 'Update successfully',
                            response : updateCategoryData
                        })
                    }
                }else{
                    res.json({
                        status: 'error',
                        response : 'Name category is exist'
                    })
                }
            }else{
                const updateCategory = await categoryModel.update({
                    name_category : name_category
                },{
                    where : { id }
                })
                if(updateCategory){
                    const updateCategoryData = await categoryModel.findOne({
                        where : { id }
                    })
                    res.json({
                        status : 'success',
                        message : 'Update successfully',
                        response : updateCategoryData
                    })
                }
            }
        }else{
            res.json({
                status : 'error',
                response : 'Category not found'
            })
        }
    }catch(error){
        res.status(400).json({
            status: 'error',
            response : error
        })
    }
}

exports.deleteCategory = async (req,res) => {
    try{
        const id = req.params.id;

        const checkCategory = await categoryModel.findOne({
            where : { id }
        })
        if(checkCategory){
            const deleteCategory = await categoryModel.destroy({
                where : { id }
            })
            if(deleteCategory){
                res.json({
                    status: 'success',
                    message: 'Delete successfully',
                    response : checkCategory
                })
            }
        }else{
            res.json({
                status: 'error',
                response : 'Category not found'
            })
        }
    }catch(error){
        res.status(400).json({
            status : 'error',
            response : error
        })
    }
}