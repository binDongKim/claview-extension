var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: String,
    name: String,
    password: String,
    status: String,
    evaluation_date: { type: Date, default: Date.now },
    evaluation_result: String,
    evaluation_opinion: String
});

module.exports = mongoose.model('user', userSchema);
