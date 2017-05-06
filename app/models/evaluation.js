var mongoose = require('mongoose');

var evaluationSchema = mongoose.Schema({
  userId : String,
  date: String,
  result: String,
  opinion: String
});

// save student's evaluation result, opinion and the date
evaluationSchema.statics.submitEvaluation = function(id, result, opinion) {
  return new Promise(function(resolve, reject) {
    var Evaluation = mongoose.model('Evaluation', evaluationSchema);
    var newEvaluation = new Evaluation();
    newEvaluation.userId = id;
    newEvaluation.date = new Date().toISOString().slice(0,10);
    newEvaluation.result = result;
    newEvaluation.opinion = opinion;
    newEvaluation.save().then(function() {
      resolve('Success');
    }, function(err) {
      reject(err);
    });
  });
};

// get the evaluation of today with userId
evaluationSchema.statics.getEvaluation = function(id) {
  return new Promise(function(resolve, reject) {
    var Evaluation = mongoose.model('Evaluation', evaluationSchema);
    Evaluation.findOne({ 'userId': id, date: new Date().toISOString().slice(0,10) }).then(function(evaluation) {
      resolve(evaluation);
    }, function(err) {
      reject(err);
    });
  });
};

// get the good evaluation of today with userId
evaluationSchema.statics.getGoodEvaluation = function(id) {
  return new Promise(function(resolve, reject) {
    var Evaluation = mongoose.model('Evaluation', evaluationSchema);
    Evaluation.findOne({ 'userId': id, date: new Date().toISOString().slice(0,10), result: 'good' }).then(function(evaluation) {
      if(evaluation === null) {
        resolve(new Evaluation());
      }
      resolve(evaluation);
    }, function(err) {
      reject(err);
    });
  });
};

// get the bad evaluation of today with userId
evaluationSchema.statics.getBadEvaluation = function(id) {
  return new Promise(function(resolve, reject) {
    var Evaluation = mongoose.model('Evaluation', evaluationSchema);
    Evaluation.findOne({ 'userId': id, date: new Date().toISOString().slice(0,10), result: 'bad' }).then(function(evaluation) {
      if(evaluation === null) {
        resolve(new Evaluation());
      }
      resolve(evaluation);
    }, function(err) {
      reject(err);
    });
  });
};

// get 'good' evaluations of today
evaluationSchema.statics.getGoodEvaluations = function() {
  return new Promise(function(resolve, reject) {
    var Evaluation = mongoose.model('Evaluation', evaluationSchema);
    Evaluation.find({ date: new Date().toISOString().slice(0,10), result: 'good' }, { _id: 0, result: 1, opinion: 1 }).exec().then(function(evaluations) {
      resolve(evaluations);
    }, function(err) {
      reject(err);
    });
  });
};

// get 'bad' evaluations of today
evaluationSchema.statics.getBadEvaluations = function() {
  return new Promise(function(resolve, reject) {
    var Evaluation = mongoose.model('Evaluation', evaluationSchema);
    Evaluation.find({ date: new Date().toISOString().slice(0,10), result: 'bad' }, { _id: 0, result: 1, opinion: 1 }).exec().then(function(evaluations) {
      resolve(evaluations);
    }, function(err) {
      reject(err);
    });
  });
};

module.exports = mongoose.model('Evaluation', evaluationSchema);
