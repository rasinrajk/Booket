/**
* Model for Users and credentials
* @author Sulfikar,Rasinraj
*/

// let express = require('express');
let mongoose = require('mongoose');
let validator = require('validator');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

const CONSTANTS = require('../constants/index');

const RESPONSE = CONSTANTS.response.responseConstants;



const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        validate: value => {
            if (!validator.isAlpha(value)){
                throw new Error('Name Must be Alphabet only')
            }
            else if(value.length<3){
                throw new Error('Name Must be atleast 3 charecters')
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)){
                throw new Error('Invalid Email address')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        validate: value => {
            //console.log(value)
            if(value.length<7){
                throw new Error('Password length should be more than 7')
            }
        }
    },
    isVerified: { 
        type: Boolean, 
        default: false 
    },
    twofaEnable: { 
        type: Boolean, 
        default: false
    }, 
    role: {
        type: String,
        default:"user"
    },
    last_login_date: {
        type: Date
    },
    isLoggedIn: { 
        type: Boolean, 
        default: false 
    },

    resetPasswordToken: String,
    resetPasswordExpires: Date,

    tokens:[{
        token:{
            type: String,
            required: true,
        },
        createdAt: { 
            type: Date, 
            required: true, 
            default:Date.now
        }
    }]
})

//encrypt the password before saving the user model
userSchema.pre('save',async function (next){
        let user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

/**
* countByEmail - To count a user by email
* @params email
* @return promise {resolve/reject}
*/

userSchema.statics.countByEmail = async function (email) {
	const user = this;
	return new Promise(async (resolve, reject) => {
		try {
			user.countDocuments({ email }, (error, count) => {
				if (error) {
					//utils.Logger.log(error);
					reject(new Error(false));
					return;
				}
				resolve(count);
			});
		} catch (e) {
			reject(e);
		}
	});
};

//Generate JWT token for login and session control

//Generate JWT token for login and session control
userSchema.methods.generateAuthToken = async function(user) {
    // Generate an auth token for the user    
    const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_KEY)    
    user.tokens = user.tokens.concat({token})        
    await user.save()
    return token
}

userSchema.methods.updateLoginStatus = async function(user) {
    user.isLoggedIn = true;
    user.last_login_date=Date.now()
    await user.save()

}

userSchema.methods.updateLogoutStatus = async function(user) {
    user.isLoggedIn = false;
    await user.save()
    return
}


//Search for a user by email and password. Verified users are given access.
userSchema.statics.findByCredentials = async (email,password) => {
    let response = {};
    let user = await User.findOne({ email })
    if(!user){         
        // return {error:'User not found'}
        return response = {
            error:RESPONSE.LOGIN.invalidEmail,
        }        
    }
    let ispasswordMatch = await bcrypt.compare(password,user.password)
    if(!ispasswordMatch){
        return response = {
            error:RESPONSE.LOGIN.invaliPassword,
        }
    }
    // Make sure the user has been verified
    if (!user.isVerified) {
       return response = {
            error:RESPONSE.LOGIN.info,
        }
    }
    return user
}
let User = mongoose.model('user', userSchema);

module.exports = User;
