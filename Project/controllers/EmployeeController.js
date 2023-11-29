const { response } = require('express')
const Employee = require('../models/Employee')

//Show list of employees
const index = async (req, res, next) => {
    try {
        const result = await Employee.find({})

        if (!result) {
            return res.status(400).json({
                message: "Couldn't fetch employee data"
            })
        }

        return res.status(200).json({
            result
        })
    } catch (error) {
        console.error("Error while fetching employee data:", error)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const show = (req, res, next) => {
    let employeeID = req.body.employeeID
    Employee.findById(employeeID)
        .then(response => {
            res.json({
                response
            })
        })

        .catch(error => {
            res.json({
                message: "An error occured!"
            })
        })
}

//Adding employee to database
const store = (req, res, next) => {
    let employee = new Employee({
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    })

    employee.save()
        //A promise to check if the employee is saved successfully
        .then(response => {
            res.json({
                message: "Employee added successfully!"
            })
        })

        .catch(error => {
            res.json({
                message: "An error occured!"
            })
        })
}

//Updating an employee using EID
const update = (req, res, next) => {
    let employeeID = req.body.employeeID    //ID of the employee to be updated

    let updatedData = {   //Changed data
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    }

    Employee.findByIdAndUpdate(employeeID, { $set: updatedData })
        .then(() => {
            res.json({
                message: "Employee update successful!"
            })
        })

        .catch(error => {
            res.json({
                message: "An error occured!"
            })
        })
}

//Deleting an employee
const destroy = (req, res, next) => {
    let employeeID = req.body.employeeID

    Employee.findOneAndDelete(employeeID)
        .then(() => {
            res.json({
                message: 'Employee delete successful!'
            })
        })

        .catch(error => {
            res.json({
                message: "An error occured!"
            })
        })
}

//Exporting functions
module.exports = {
    index, show, store, update, destroy
}