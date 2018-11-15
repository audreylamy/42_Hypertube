const Comment = require('../models/comment.model');

exports.comment = async (req, res) => {
    console.log("REQ", req.body)
    const toAddInDb = new Comment({imdbid: req.body.imdbid, username: req.username, message: req.body.message, date: Date.now()});
        toAddInDb.save(err => {
            if (err) {
                console.log("error not added in db", err)
                res.status(400).json({msg: "failed to add in db"})
            } else {
                console.log("added in db")
                res.status(200).json(toAddInDb)
            }
        })
}

exports.allComment = async (req, res) => {
    console.log("IMI", req.body.imdbid)
    Comment.find({imdbid: req.body.imdbid}, function(err, comments) {
        if (!err){ 
            console.log(comments);
            res.status(200).json(comments)
        } else {console.log(err);
            res.status(400).json("ERROR ")
        }
    });
    
    
}