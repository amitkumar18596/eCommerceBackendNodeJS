
const categoryController = require("../controllers/category.controller")
const authMiddleware = require("../middlewares/auth.middleware")

module.exports = (app) =>{
    app.post("/ecomm/api/v1/auth/categories", [authMiddleware.verifyToken, authMiddleware.isAdmin], categoryController.createCategory)
}