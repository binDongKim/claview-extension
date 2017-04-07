var mongoose = require('mongoose');

var evaluationSchema = mongoose.Schema({
  userId : { type: String, required: true, unique: true },
  date: Date,
  result: String,
  opinion: String
});

// save student's evaluation result, opinion and the date
evaluationSchema.statics.submitEvaluation = function(id, result, opinion) {
  var Evaluation = mongoose.model('Evaluation', evaluationSchema);
  return new Promise(function(resolve, reject) {
    Evaluation.update({ userId: id }, { result: result, opinion: opinion, date: Date.now() }).exec().then(function(data) {
      resolve('Success');
    }, function(err) {
      reject(err);
    });
  });
};

evaluationSchema.statics.getEvaluation = function(id) {
  return new Promise(function(resolve, reject) {
    var Evaluation = mongoose.model('Evaluation', evaluationSchema);
    Evaluation.findOne({ 'userId' : id }).then(function(evaluation) {
      resolve(evaluation);
    }, function(err) {
      reject(err);
    });
  });
};

module.exports = mongoose.model('Evaluation', evaluationSchema);
