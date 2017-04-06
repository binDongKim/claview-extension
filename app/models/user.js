var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String, required: true },
  // evaluation_date: { type: Date, default: Date.now },
  evaluation_result: String,
  evaluation_opinion: String
});

// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password); // compare hash value
};

// save user's evaluation result
userSchema.statics.saveResult = function(id, result, opinion) {
  var User = mongoose.model('User', userSchema);
  return new Promise(function(resolve, reject) {
    User.findByIdAndUpdate(id, { evaluation_result: result, evaluation_opinion: opinion }, { new: true }).exec().then(function(updatedUser) {
      return resolve(updatedUser);
    }, function(err) {
      return reject(err);
    });
  });
};

module.exports = mongoose.model('User', userSchema);
