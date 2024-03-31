/**
 * POSt ocalhost:8888/ecomm/api/v1/auth/signup
 * 
 * Need to intercept this
 *  */

authController = require("../controllers/auth.controller")
authMiddleware = require("../middlewares/auth.middleware")

module.exports = (app) =>{
    app.post("/ecomm/api/v1/auth/signup",[authMiddleware.verifySignupBody], authController.signup)
}