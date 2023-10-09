
const express = require('express')
const router = express.Router()

const { getCricketersDetails, onBulkInsert, getCricketer, onHandleUpdateUsingFunction, onHandleUpdate, onHandleDeleteUsingProcedure, onHandleDelete, onInsertUsingFunction, onInsert } = require('../controller/cricketers_table')
const {getAdminsDetails, addAdmin, adminBulkInsert, getAdmin, deleteAdmin, allDelete} = require('../sequalize/index')
const { registration, login, getCricketers, authCheck } = require('../controller/userregistration')

const routes = (app, client) => {

    //user-Auth
    router.post('/registration', registration)
    router.get("/login", login);
    router.get('/cricketers', authCheck, getCricketers)



    router.get("/index", getCricketersDetails);
    router.post("/insert", onInsert);
    // router.get("/insert", onInsertUsingFunction);
    router.delete("/user/:id", onHandleDelete);
    // router.delete("/user/:id", onHandleDeleteUsingProcedure);
    router.put("/user/update", onHandleUpdate);
    // router.get("/user/update", onHandleUpdateUsingFunction);
    router.get("/user/:id", getCricketer);
    router.get("/users", onBulkInsert);


    router.get("/admins", getAdminsDetails);
    router.post("/admin/create", addAdmin);
    router.post("/admin/bulkInsert", adminBulkInsert);
    router.get("/admins/:id", getAdmin);
    router.delete("/admins/delete/:id", deleteAdmin);
    router.delete("/admins/alldelete", allDelete);

    

    app.use(router);
}

module.exports = routes