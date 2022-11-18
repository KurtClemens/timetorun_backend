var Mongo = require('mongodb-legacy');

var User = require('../models/user')
var Run = require('../models/run')
var jwt = require('jwt-simple')
var config = require('../config/dbconfig')

var functions = {
    addRun: function(req, res){
        if ((!req.body.name) || (!req.body.distance)|| (!req.body.location) || (!req.body.date)){
            res.json({success: false, msg: 'Enter all fields'})
        } else{
            var newRun = Run({
                name: req.body.name,
                distance: req.body.distance,
                location: req.body.location,
                date: req.body.date,
                img: ""
            });

            newRun.save(function(err, newRun){
                if (err) {
                    res.json({success: false, msg: 'Failed to save'})
                }
                else {
                    res.json({success: true, msg: 'Successfully saved'})
                }
            })
        }
    },

    getAllRuns: function(req, res, next){
        Run.find({}, function(err, result){
            if (err) return handleError(err);
            res.json(result)
        })
    },


    addNew: function (req, res) {
        if ((!req.body.email) || (!req.body.password)) {
            res.json({success: false, msg: 'Enter all fields'})
        }
        else {
            var newUser = User({
                email: req.body.email,
                password: req.body.password
            });
            newUser.save(function (err, newUser) {
                if (err) {
                    res.json({success: false, msg: 'Failed to save'})
                }
                else {
                    res.json({success: true, msg: 'Successfully saved'})
                }
            })
        }
    },

    addImage: function (req, res) {
        console.log(req.body.name)
        Run.findOne({name: req.body.name},function (err, run) {
            console.log(run);
            //run.name = Run.modelName,
            // run.distance = Run.distance,
            // run.location = Run.location,
            // run.date = Run.date,
             run.img = req.body.img

            // console.log(run.name + run.img);
              run.save((saveErr, saveRun) => {
            //      if(err)
            //          res.send(err);
    
                  res.send(saveRun);
             });
        }
    
        )
    },


    authenticate: function (req, res) {
        User.findOne({
            email: req.body.email
        }, function (err, user) {
                if (err) throw err
                if (!user) {
                    res.status(403).send({success: false, msg: 'Authentication Failed, User not found'})
                }

                else {
                    user.comparePassword(req.body.password, function (err, isMatch) {
                        if (isMatch && !err) {
                            var token = jwt.encode(user, config.secret)
                            res.json({success: true, token: token})
                        }
                        else {
                            return res.status(403).send({success: false, msg: 'Authentication failed, wrong password'})
                        }
                    })
                }
        }
        )
    },
    getinfo: function (req, res) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            var token = req.headers.authorization.split(' ')[1]
            var decodedtoken = jwt.decode(token, config.secret)
            return res.json({success: true, msg: 'Hello ' + decodedtoken.email})
        }
        else {
            return res.json({success: false, msg: 'No Headers'})
        }
    }
}

module.exports = functions