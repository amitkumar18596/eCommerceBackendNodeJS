/**
 * Need to write the controller / logic to register a user
 */
const bcrypt = require("bcryptjs")
user_model = require("../models/user.model")

exports.signup = async(req, res) =>{
    /**
     * Logic to create the user
     */

    //1. Read the request body
    const request_body = req.body

    //2. Insert the data in the user collection in Mongo DB
    const userObj = {
        name : request_body.name,
        userId : request_body.userId,
        email : request_body.email,
        userType : request_body.userType,
        password : bcrypt.hashSync(request_body.password, 8)
    }

    try{
        const user_created = await user_model.create(userObj)
        /**
         * return this user
         */
        const res_obj = {
            name : user_created.name,
            userId : user_created.userId,
            email : user_created.email,
            userType : user_created.userType,
            createdAt : user_created.createdAt,
            updatedAt : user_created.updateAt
        }

        res.status(201).send(res_obj)
    }catch(err){
        console.log("Error while registering the user", err);
        res.status(500).send({
            message : "Some error happened while registering the user"
        })
    }

    //3. Return the response back to the user
}