/**
 * Create a middleware that if request body is proper and correct
 */

const authConfig = require("../config/auth.config")
const user_model = require("../models/user.model")
const jwt = require("jsonwebtoken")

const verifySignupBody = async(req, res, next) => {
    try{

        //check for the name
        if(!req.body.name){
            return res.status(400).send({
                message : "Failed ! Name is not provided in request body"
            })
        }

        //Check for email
        if(!req.body.email){
            return res.status(400).send({
                message : "Failed ! Email is not provided in request body"
            })
        }

        //Check for the user Id
        if(!req.body.userId){
            return res.status(400).send({
                message : "Failed ! User ID is not provided in request body"
            })
        }

        //Check if the user with same user Id is present
        const user = await user_model.findOne({userId : req.body.userId})

        if(user){
            return res.status(400).send({
                message : "Failed ! user is already present with this user Id. Kindly choose a different one."
            })
        }

    }catch(err){
        console.log("Error while validating the request object", err);
        res.status(500).send({
            message : "Internal Server Error"
        })
    }

    next()
}

const verifySignInBody = (req, res, next) =>{
    //Check if User Id is provided 
    if(!req.body.userId){
        return res.status(400).send({
            message : "Provide the User ID"
        })
    }

    //Check if Password is provided
    if(!req.body.password){
        return res.status(400).send({
            message : "Provide the password"
        })
    }

    next()
}

const verifyToken = (req, res, next)=>{
    // Check if token is present in the header
    const token = req.headers['x-access-token']
    if(!token){
        return res.status(403).send({
            message : " No token Found. Unauthorized!!"
        })
    }

    //Check if the token is valid or not
    jwt.verify(token, authConfig.secretKey, async(error, decoded)=>{
        if(error){
            return res.status(401).send({
                message : "Unauthorized!! "
            })
        }

        const user = await user_model.findOne({userId : decoded.id})
        if(!user){
            return res.status(401).send({
                message : "Unauthorized!!, this user for this token doesn't exist "
            })
        }

        //set the user info in the req body
        req.user = user
        next()
    })
}

//check if user is admin or not
const isAdmin = (req, res, next)=>{
    const user = req.user
    if (user && user.userType == "ADMIN")
        next()
    else{
        return res.status(403).send({
            message : "Only ADMIN users are allowed to access this end point"
        })
    }
}

module.exports = {
    verifySignupBody : verifySignupBody,
    verifySignInBody : verifySignInBody,
    verifyToken : verifyToken,
    isAdmin : isAdmin
}