const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const SALT_FACTOR = 10;

let userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },

    password: {
        type: String,
        require: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    displayName: {
        type: String
    },

    bio: {
        type: String
    }
});

userSchema.pre('save', function(done) {
    let user = this;

    if ( !user.isModified('password') ) {
        return done();
    }

    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {

        if (err) {
            return done(err);
        }

        bcrypt.hash(
            user.password, 
            salt, 
            () => {}, 
            (err, hashedPassword) => {
                
                if (err) {
                    return done(err);
                }

                user.password = hashedPassword;
                done();
        });
    });
});

userSchema.methods.name = function() {
    return this.displayName || this.username;
};

userSchema.methods.checkPassword = function(guess, done) {
    bcrypt.compare(guess, this.password, (err, isMatch) => {
        done(err, isMatch);
    });
};

let User = mongoose.model('User', userSchema);

module.exports = User;