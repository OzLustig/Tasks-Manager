var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({

    username: { type: String,  required: [true, 'Full name must be provided'] },

    email:    {
        type: String,
        Required:  'Email address cannot be left blank.',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        index: {unique: true, dropDups: true}
    },

    password: { type: String , required: [true,  'Password cannot be left blank']},


});

userSchema.methods.checkPassword = function(password) {
    return (password) === this.password;
};

module.exports = mongoose.model('Users', userSchema);