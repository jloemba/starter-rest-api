const { response } = require('express');

module.exports = {
    check: function(req, res, next) {
        res.status(200).json("good");
    }
}