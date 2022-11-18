var mongoose = require('mongoose')
var db = require('../config/db')
var Schema = mongoose.Schema;
var runSchema = new Schema({
    name: {
        type: String,
        require: true
    }, 
    distance: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true
    },
    img:{
        type: String,
        require: false
    }
});


runSchema.pre('save', function (next) {
    var run = this;
    return next()

})

module.exports = mongoose.model('runs', runSchema)
