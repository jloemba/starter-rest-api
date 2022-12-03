const Part = require('../models').Part;
const bcrypt = require('bcrypt');
const { response } = require('express');
const jwt = require('jsonwebtoken');

module.exports = {

    getAll: function(req, res, next) {
        try {
            Part.findAll()
            .then((response) =>  res.status(200).json(response));
        } catch (error) {
            res.status(error.response.status)
            return res.send(error.message);
        }
    },
    getOne: function(req, res, next) {
        try {
            if(req.query.partID){
                Part.findOne({ where: { id: req.query.partID } }).then((response) => res.status(200).json(response) );
            }else res.status(402).json("Query params 'partID' recquired for a part update")
        } catch (error) {
            res.status(error.response.status)
            return res.send(error.message);
        }
    },
    create: function(req, res, next) {
        try {
            Part.create({ label: req.body.label }).then(data => res.status(200).json(data))
        } catch (error) {
            res.status(error.response.status)
            return res.send(error.message);
        }
    },
    update: function(req, res, next) {
        try {
            if(req.body.id && req.body.label){

            Part.findOne({ where: { id: req.body.id } })
                .then(project => {
                    if (project) {
                        project.update({label: req.body.label, updatedAt: Date.now() })
                        .then(response => { res.status(200).json(response)  })
                    } else res.status(404).json("Part not found")
                })
            }
            else res.status(402).json("Payload 'label' and query params 'id' recquired ")
        } catch (error) {
            res.status(error.response.status)
            return res.send(error.message);
        }
    },
    delete:function(req,res,next){
        if(req.query.partID){
            Part.destroy({
                where: {
                   id: req.query.partID 
                }
             }).then(response=>{
                 res.status(200).json(response);
             })
        }
        else res.status(402).json("Query params 'partID' recquired ")
    }
}