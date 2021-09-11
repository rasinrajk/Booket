/**
* Model for two factor authentication
* @author Sulfikar,Rasinraj
*/

let mongoose = require('mongoose');
var User = require('../models/user');
let speakeasy = require('speakeasy');
var qrCode = require('qrcode');

const secretSchema = mongoose.Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    
    secret: {
        type: String,
        required: true
    },
    qrbase64: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    }
});
// Generate a qr code with user secret

secretSchema.methods.generateQR = async function (userid) {
    
    let user = await User.findOne({ _id:userid })
    if (user) {   
        
        let userqr = await TwoFaSecret.findOne({ _userId:userid })
        if (userqr) {
            return({qr:userqr.qrbase64});            
        }
        else {
            
            var secretKey = speakeasy.generateSecret({ length: 20 });
            let qrimagecode = await qrCode.toDataURL(secretKey.otpauth_url) 
            const secretObject = new TwoFaSecret({ _userId: userid, secret: secretKey.base32, qrbase64: qrimagecode })
            // Save this value to your DB for the user
            let qrbase64 = await secretObject.save()
            //enable twofa flag in user schema
            user.twofaEnable = true
            
            return ({ qr:qrbase64.qrbase64,secret:secretKey});
        }

    }
    else { 
        return ("no user in user schema")
         }
}



secretSchema.methods.verifyOtp = function (userid, otp) {
    let verified = false
    return new Promise(function (resolve, reject) {
        TwoFaSecret.findOne({ _userId: userid }, async (err, user) => {
            if (user) {
                let secretcode = user.secret
                verified = await speakeasy.totp.verify({
                secret: secretcode,
                encoding: 'base32',
                token: otp
            });
            resolve(verified);
            }
            else {                 
                reject(verified);
                }
        });
    })
}


let TwoFaSecret = mongoose.model('secret', secretSchema)

module.exports = TwoFaSecret;
