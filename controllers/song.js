const lyrics = require('./lyrics');

const Song = require('../models').Song;
const Lyrics = require('../models').Lyrics;


module.exports = {

    getAll: function(req, res, next) {
        try {
            Song.findAll()
                .then((response) => {
                    res.status(200).json(response);
                });
        } catch (error) {
            res.status(error.response.status)
            return res.send(error.message);
        }
    },
    getOne: function(req, res, next) {
        try {
            if(req.query.songID){
                Song.findOne({ where: { id: req.query.songID },includes:[{model: Lyrics}] }).then((response) => res.status(200).json(response) );
            }else res.status(402).json("Query params 'songID' recquired for a song update")
        } catch (error) {
            res.status(error.response.status)
            return res.send(error.message);
        }
    },
    create: function(req, res, next) {
        try {
            if(req.body.title){
                Song.findOne({where:{title:req.body.title}})
                .then(result=>{
                    if(result) {
                        res.status(409).json({message:"Existe déjà"})
                    }
                    else Song.create({ title: req.body.title }).then(data => res.status(200).json(data))
                })
            }
            else res.status(402).json("Payload 'title' for a song creation")
        } catch (error) {
            res.status(error.response.status)
            return res.send(error.message);
        }
    },
    update: function(req, res, next) {
        try {
            if(req.body.songID && req.body.title){
                Song.findOne({ where: { id: req.body.songID } })
                .then(song => {
                    if (song) {
                        song.update({title: req.body.title, updatedAt: Date.now() }).then(response => { res.status(200).json(response)  })
                    }else res.status(404).json("Song not found")
                })
            }else res.status(402).json("Payload 'title' and query params 'id' recquired for a song update")
        } catch (error) {
            res.status(error.response.status)
            return res.send(error.message);
        }
    },
    delete:function(req,res,next){
        if(req.query.songID){
            Song.destroy({
                where: {
                   id: req.query.songID 
                }
             }).then(response=>{
                 res.status(200).json(response);
             })
        }
        else res.status(402).json("Query params 'songID' recquired ")
    }

}