const express = require('express')
const studentsRoutes = express.Router();

let StudentModel = require('../models/Studen');

studentsRoutes.route('/').get((req, res, next) => {
    StudentModel.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Create
studentsRoutes.route('/create-student').post((req, res, next)=>{
    StudentModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        }else{
            res.json(data);
        }
    })
})

// Edit
studentsRoutes.route('/edit-student/:id').get((req, res, next) => {
    StudentModel.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// update
studentsRoutes.route('/update-student/:id').put((req, res, next) => {
    StudentModel.findByIdAndUpdate(req.params.id,{
        $set: req.body
    }, (error, data) =>{
        if(error){
            return next(error);
        }else{
            res.json(data);
            console.log('Student successfully updated')
        }
    })
})

//delete
studentsRoutes.route('/delete-student/:id').delete((req, res, next) =>{
    StudentModel.findByIdAndDelete(req.params.id, (error, data) =>{
        if(error){
            return next(error)
        }else{
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = studentsRoutes;