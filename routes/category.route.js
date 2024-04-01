
const categoryController = require("../controllers/category.controller")

module.exports = (app) =>{
    app.post("/ecomm/api/v1/auth/categories", categoryController.createCategory)
}