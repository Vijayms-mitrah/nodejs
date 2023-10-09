const express = require("express");

const app = express();
const sequel = require("../database/sequalize")
const Sequelize = require("sequelize");

const bcrypt = require("bcryptjs");


app.use(express.json());

const adminTable = sequel.define("admins",{

 id:{
 type: Sequelize.INTEGER,
 primaryKey: true
 },
 name:{
 type: Sequelize.STRING
 }
})

// sequel.sync().then(
//  console.log("sync")
// )

const addAdmin = (req, res) =>{
 const user = req.body;
 console.log("user", user);
 adminTable.create(user).then(data => {
 console.log("data",data)
 res.send(data)
 })
}

const adminBulkInsert = (req, res) =>{
 const user = req.body;
 adminTable.bulkCreate(user).then(data => {
 console.log("data",data)
 res.send(data)
 })
}
const getAdminsDetails = async(req, res) =>{
    const salt = bcrypt.genSaltSync(10)
    console.log("test123",salt, "bcrypt",await bcrypt.hash("test123", salt))
    // console.log("bcrypt",await bcrypt.hash("test123", 12), "compare", await bcrypt.compare("test123", "$2a$12$EbOqXMSWRYMymW/LUKDDqu8VDQx2VShzT4d5/gSdaJGipYD0TkAbi"))

    //FindAll
    // adminTable.findAll({}).then(data =>{
    //     res.send(data)
    // })

    //FindOne
    // adminTable.findOne({ where:{ id: 12 }}).then(data =>{
    //     res.send(data)
    // })

    adminTable.update({ name: "Kholi" }, { where: { id: 12 } }).then(data =>{
        res.send(data)
    })
}

const getAdmin = (req, res) =>{
 adminTable.findAll({ 
 where:{ 
 id: req.params.id
 }}).then(data =>{
 res.send(data)
 })
}

const deleteAdmin = (req, res) =>{
 adminTable.destroy({ 
 where:{ 
 id: req.params.id
 }}).then(data =>{
 res.send("Deletion Successful")
 })
}

const allDelete = (req, res)=>{

 adminTable.destroyAll().then(data =>{
 console.log("All data deletion successfully")
 })
}

module.exports = {getAdminsDetails, addAdmin, adminBulkInsert, getAdmin, deleteAdmin, allDelete}
