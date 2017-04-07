var mongoose = require('mongoose');

var evaluationSchema = mongoose.Schema({
  userId : { type: String, required: true, unique: true },
  date: String,
  result: String,
  opinion: String
});

// save student's evaluation result, opinion and the date
evaluationSchema.statics.submitEvaluation = function(id, result, opinion) {
  return new Promise(function(resolve, reject) {
    var Evaluation = mongoose.model('Evaluation', evaluationSchema);
    Evaluation.update({ userId: id }, { result: result, opinion: opinion, date: new Date().toISOString().slice(0,10) }).exec().then(function(data) {
      resolve('Success');
    }, function(err) {
      reject(err);
    });
  });
};

// get an evaluation with userId
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

// get all evaluations of today
evaluationSchema.statics.getEvaluations = function() {
  return new Promise(function(resolve, reject) {
    var Evaluation = mongoose.model('Evaluation', evaluationSchema);
    Evaluation.find({ date: new Date().toISOString().slice(0,10) }).exec().then(function(evaluations) {
      resolve(evaluations);
    }, function(err) {
      reject(err);
    });
  });
};

module.exports = mongoose.model('Evaluation', evaluationSchema);
