/**
* Model for User access token
* @author Sulfikar,Rasinraj
*/

let mongoose = require('mongoose');
var crypto = require('crypto');
var User = require('../models/user');
const tokenSchema = mongoose.Schema({
    _userId: {
         type: mongoose.Schema.Types.ObjectId, 
         required: true, 
         ref: 'User' 
        },
    token: { 
        type: String, 
        required: true },
    createdAt: { 
        type: Date, 
        required: true, 
        default: Date.now, 
        expires: 43200 }
});

    // Generate an auth token for the user
tokenSchema.methods.generateVerificationToken = async function(userid) {
    var verificationtoken = new Token({ _userId: userid, token: crypto.randomBytes(16).toString('hex') });
    await verificationtoken.save()
    return verificationtoken.token;
}

//verify token for login and session control
tokenSchema.methods.VerifyToken = async function (token, res) {
    Token.findOne({
        token: token
    }, function (err, token) {
        if (!token) return res.status(400).send({
            type: 'not-verified',
            msg: 'We were unable to find a valid token. Your token my have expired.'
        });

        // Find a corresponding user with the given token

        User.findOne({
            _id: token._userId
        }, function (err, user) {
            if (!user) return res.status(400).send({
                msg: 'We were unable to find a user for this token.'
            });
            if (user.isVerified) return res.status(400).send({
                type: 'already-verified',
                msg: 'This user has already been verified.'
            });

            // Verify and save the user
            user.isVerified = true;
            user.save(function (err) {
                if (err) {
                    return res.status(500).send({
                        msg: err.message
                    });
                }
                res.status(200).send("The account has been verified. Please log in.");
            });
        });
    });
}

let Token = mongoose.model('token', tokenSchema)

module.exports = Token;
