var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var taskSchema = new Schema({

    username: { type: String,  required: [true, 'Full name must be provided'] },
    title: {type: String, required: [true, 'Title must be provided']},
    body: {type: String},
    done: {type: Boolean},
    dueDate: {type: Date},

});

module.exports = mongoose.model('Tasks', taskSchema);