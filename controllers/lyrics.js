const { response } = require('express');

const Lyrics = require('../models').Lyrics;
const Part = require('../models').Part;
const Song = require('../models').Song;

module.exports = {
    getAll: function(req, res, next) {
        try {
            Lyrics.findAll(
                {
                    include: [
                        {
                            model: Part
                        },
                        {
                            model: Song
                        }
                    ]
                }
            ).then((response) => res.status(200).json(response));
        } catch (error) {
            res.json(error.response)
        }
    },
    getOne: function(req, res, next) {
        try {
            if (req.query.lyricsID) {
                Lyrics.findOne(
                    {
                        where: { id: req.query.lyricsID },
                        include: [
                            {
                                model: Part
                            },
                            {
                                model: Song
                            }
                        ]
                    }
                )
                    .then((response) => res.status(200).json(response));
            } else res.status(402).json("Query params 'lyricsID' recquired for lyric update")
        } catch (error) {
            res.status(error.response.status)
            return res.send(error.message);
        }
    },
    bySong: function(req, res, next) {
        try {
            if (req.query.songId) {
                Lyrics.findAll(
                    {
                        where: { songId: req.query.songId },
                        include: [
                            {
                                model: Part
                            },
                            {
                                model: Song
                            }
                        ], 
                        order: [['createdAt', 'ASC']]
                    }
                ).then((response) => res.status(200).json(response));
            } else res.status(402).json("Query parameter recquired : songId")
        } catch (error) {
            return res.json(error)
        }
    },
    create: function(req, res, next) {
        try {
            if (req.body.lyricsContent && req.body.songId && req.body.partId) {
                Lyrics.create({ lyricsContent: req.body.lyricsContent, songId: req.body.songId, partId: req.body.partId })
                    .then(response => res.status(200).json(response))
            } else res.status(402).json("Payload recquired : lyricsContent , songId et partId")
        } catch (error) {
            res.status(error.response.status)
            return res.send(error.message);
        }
    },
    update: function(req, res) {
        try {
            if (req.body.lyricsId) {

                Lyrics.findOne({ where: { id: req.body.lyricsId } })
                    .then(lyric => {

                        if (lyric) {

                            if (req.body.lyricsContent) {
                                lyric.update({ lyricsContent: req.body.lyricsContent, updatedAt: Date.now() })
                                    .then(response => res.status(200).json(response))
                            }

                            if (req.body.songId && req.body.songId != null) {
                                lyric.update({ songId: req.body.songId, updatedAt: Date.now() })
                                    .then(response => res.status(200).json(response))
                            }

                            if (req.body.partId && req.body.partId != null) {
                                lyric.update({ partId: req.body.partId, updatedAt: Date.now() })
                                    .then(response => res.status(200).json(response))
                            }

                        } else res.status(404).json("Lyric not found")
                    })
            } else res.status(402).json("Payload recquired : lyricsId")

        } catch (error) {
            res.status(error.response.status)
            return res.send(error.message);
        }

    },
    delete: function(req, res, next) {
        if (req.query.lyricsId) {
            Lyrics.destroy({
                where: {
                    id: req.query.lyricsId
                }
            }).then(response => {
                res.status(200).json(response);
            })
        }
        else res.status(402).json("Query params 'lyricsId' recquired ")
    },
    deleteBySong: function(req, res, next) {

        if (req.query.songId) {
            Lyrics.destroy({
                where: {
                    songId: req.query.songId
                }
            }).then(response => {
                res.status(200).json(true);
            })
        }
        else res.status(402).json("Query params 'songId' recquired ")
    }


}