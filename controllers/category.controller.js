/**
 * Controller for Creating category
 */
const categoryModel = require("../models/category.model")

exports.createCategory = async(req, res)=>{
    //read the request body
    // create the category object

    const categoryData = {
        name : req.body.name,
        description : req.body.description
    }

    try{
        //insert into mongo db
        const createdCategory = await categoryModel.create(categoryData)
        return res.status(201).send(createdCategory)
    }catch(err){
        console.log("Error while creating new category", err);
        return res.status(500).send({
            message : "Internal server error"
        })
    }
}