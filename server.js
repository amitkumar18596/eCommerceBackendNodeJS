/**
 * this will be the starting file of the project
 */

const express = require("express")
const mongoose  = require("mongoose")
const app = express()
const server_config = require("./config/server.config")
const db_config = require("./config/db.config")
const user_model = require("./models/user.model")
const bcrypt = require("bcryptjs")

app.use(express.json())

/**
 * Create an admin usewr at the starting of the application
 * if not already present
 */
//Connection with Mongo DB
mongoose.connect(db_config.DB_URL)

const db = mongoose.connection

db.on("error", ()=>{
    console.log("Error while connecting to Mongo DB");
})

db.once("open", ()=>{
    console.log("Connected to Mongo DB");
    init()
})

async function init(){
    try{
        let user  = await user_model.findOne({userId : "admin"})

       if(user){
          console.log("Admin is already present")
          return
        }

    }catch(err){
        console.log("Error while reading the data", err)
    }

    try{
        user = await user_model.create({
            name : "Amit",
            userId : "admin",
            email : "maharana.amit96@gmail.com",
            userType : "ADMIN",
            password : bcrypt.hashSync("amitkumar", 8)
        })

        console.log("Admin Created", user);
    }catch(err){
        console.log("Error while creating Admin", err);
    }
}

/**
 * Stitch the route to the server
 */

require("./routes/auth.route")(app)

/**
 * Start the server
 */

app.listen(server_config.PORT, () =>{
    console.log("Server started at port number: ", server_config.PORT);
})