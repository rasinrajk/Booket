/**
 * Controller - Auth
 * Controller for Basic Authentication Functionalities
 * @author Sulfikar,Rasinraj
 */

var crypto = require('crypto');
var async = require('async');
const jwt = require('jsonwebtoken');
const baseURL=`${process.env.BaseURL}`;
/**
 * Access models
 */
const CONSTANTS = require('../constants/index');

const RESPONSE = CONSTANTS.response.responseConstants;
const Email = CONSTANTS.email.emailConstants;
const HTTP_STATUS = CONSTANTS.http.httpStatus

let User = require('../models/user');
let tokenModel = require('../models/token');
let secretModel = require('../models/twofasecret');


const utils = require('../utils/index');

/**
 * Create Registration Instance
 * @route /signup
 * @method POST
 * 
 */

class AuthController {
    async signup(req, res) {
      
        let response = {};
        // Create a new user
        try {
            const user = new User(req.body);
            
            const userCounter = await User.countByEmail(user.email);
            if (userCounter > 0) {
                response = {
                    status: false,
                    message: RESPONSE.REGISTER.info,
                };
                return res.status(HTTP_STATUS.BAD_REQUEST.code).json(response)
            }

            await user.save()
            // Generate verification toke for the verification Mail
            const newToken = new tokenModel();
            const verifyToken = await newToken.generateVerificationToken(user._id);
            const emailConstants = Email.VERIFICATION_EMAIL

            const data = {
                subject: emailConstants.subject,
                receiverName: user.name,
                receiverEmail: user.email,
                subTitle: emailConstants.subTitle,
                mainTitle: emailConstants.mainTitle,
                mailContent: emailConstants.mailContent,
                buttonLink: `${emailConstants.buttonLink}/${verifyToken}`,
                buttonText: emailConstants.buttonText,
            };

            utils.Emailer.sendEmail(data);

            response = {
                status: true,
                message: RESPONSE.REGISTER.success,
            };

            return res.status(HTTP_STATUS.OK.code).json(response)

        } catch (error) {
           
            
            if (error.errors.email != null) {
                response = {
                    status: false,
                    message: error.errors.email.message
                }
            } else if (error.errors.name != null) {
                response = {
                    status: false,
                    message: error.errors.name.message
                };
            } else if (error.errors.password != null) {
                response = {
                    status: false,
                    message: error.errors.password.message
                };
            }
            // res.status(400).send(error)
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json(response)
        }

    }

    /**
     * Mail Verification
     * @route /mailverify/:token
     * @method GET
     */;

    async mailverify(req, res) {
        try {
            let token = req.params.token;
            const checkToken = new tokenModel();
            const verifyToken = await checkToken.VerifyToken(token, res);

            res.redirect(baseURL+'/login?status=' + verifyToken);
        } catch (error) {
            res.status(400).send(error)
        }
    }

    /**
     * Authentication
     * @route /login
     * @method POST
     */

    async login(req, res) {
        let response = {};
        try {
            const {
                email,
                password
            } = req.body
            console.log(req.body)
            if (!email || !password){
                
                    response = {
                        status: false,
                        message: "Please enter your credentials yar",
                    };
                    return res.status(HTTP_STATUS.BAD_REQUEST.code).json(response)
                
            }
            
            // Check the user exists in userSchema and check for right credentials.
            const user = await User.findByCredentials(email, password);
            if (!user.error) {
                // user credentials are correct. check for Twofactor authentication.
                if (user.twofaEnable) {
                    response = {
                        status: true,
                        message: RESPONSE.LOGIN.enterOTP,
                        user: user
                    }

                    return res.status(HTTP_STATUS.OK.code).json(response)

                } else {
                    let token = await new User().generateAuthToken(user);
                    await user.updateLoginStatus(user);
                    response = {
                        status: true,
                        message: RESPONSE.LOGIN.success,
                        user: user
                    }
                    return res.status(HTTP_STATUS.OK.code).json(response)
                }
            } else {
                response = {
                    status: false,
                    message: user.error,
                };
                return res.status(HTTP_STATUS.BAD_REQUEST.code).json(response)
            }

        } catch (error) {
            console.log(error)            
            response = {
                status: false,
                error: error
            }
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json(response)
        }
    }

    async loginOtp(req, res) {
        const secretmodel = new secretModel;
        let response = {};
       try {
            const {
            userid,
            otp
        } = req.body
        if (!userid || !otp){
                
            response = {
                status: false,
                message: "Please send user id and otp",
            };
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json(response)
        
    }
    // Check the user exists in userSchema and verify otp.
        const user = await User.findById(userid);
        let verified = await secretmodel.verifyOtp(userid, otp);
        if (verified) {
            // Generate access token for each login session
            await user.generateAuthToken(user);
            await user.updateLoginStatus(user);
            response = {
                status: true,
                message: RESPONSE.LOGIN_OTP.success,
                user: user
            }
            return res.status(HTTP_STATUS.OK.code).json(response)
        } else {
            response = {
                status: false,
                message: RESPONSE.LOGIN_OTP.invalidOTP,
            }
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json(response)
        }
    }
    catch (error) {
        console.log(error)            
        response = {
            status: false,
            error: error
        }
        return res.status(HTTP_STATUS.BAD_REQUEST.code).json(response)
    }
}


    // async loginOtp(req, res) {
    //     const secretmodel = new secretModel;
    //     let response = {};
    //     const {
    //         userid,
    //         otp
    //     } = req.body
    //     const user = await User.findById(userid);
    //     let verified = await secretmodel.verifyOtp(userid, otp);
    //     if (verified) {
    //         // Generate access token for each login session
    //         await user.generateAuthToken(user);
    //         await user.updateLoginStatus(user);
    //         response = {
    //             status: true,
    //             message: RESPONSE.LOGIN_OTP.success,
    //             user: user
    //         }
    //         return res.status(HTTP_STATUS.OK.code).json(response)
    //     } else {
    //         response = {
    //             status: false,
    //             message: RESPONSE.LOGIN_OTP.invalidOTP,
    //         }
    //         return res.status(HTTP_STATUS.BAD_REQUEST.code).json(response)
    //     }
    // }

    /**
     * User 2fa generate
     * @route /generateqr
     * @method GET
     * Enable two factor authentication by a user.
     * Send api to generate a QR code,used in authenticator app. 
     */
    async generateqr(req, res) {
        const twf = new secretModel();
        const {
            userid
        } = req.body
        let qrimage = await twf.generateQR(userid)
        res.send(qrimage);
    }

    /* 
     * enable2fa
     * @route /enable2fa
     * @method GET
    //  Enable two factor authentication by the server. 
    //  Generate QR code and return to user.
    */

    async enable2fa(req, res) {
       
        const secretmodel = new secretModel();
        const accessToken = req.headers.authorization.split(' ')
        const userId = jwt.verify(accessToken[1], process.env.JWT_KEY)
        let qrimage = await secretmodel.generateQR(userId)
        res.send(qrimage);
    }

    /* 
     * confirmEnable2fa
     * @route /confirmEnable2fa
     * @method POST
     * Enable two factor authentication by the server.  
     * Get OTP for the first time and enable it. 
     */

    async confirmEnable2fa(req, res) {
        
        let response = {};
        const secretmodel = new secretModel();
        const accessToken = req.headers.authorization.split(' ')
        const userId = jwt.verify(accessToken[1], process.env.JWT_KEY)
        
        const {
            otp
        } = req.body
        if (otp) {
            let verified = await secretmodel.verifyOtp(userId, otp);
            
            if (verified) {
                User.findByIdAndUpdate(userId, {
                    '$set': {
                        'twofaEnable': true
                    }
                }, function (err, result) {
                    response = {
                        status: true,
                        message: RESPONSE.ENABLE_2FA.success,
                        result
                    }
                    return res.status(HTTP_STATUS.OK.code).json(response)
                });
            } else {
                response = {
                    status: false,
                    message: RESPONSE.ENABLE_2FA.invalidOTP,
                }
                return res.status(HTTP_STATUS.BAD_REQUEST.code).json(response)
            }
        } else {
            response = {
                status: false,
                message: RESPONSE.ENABLE_2FA.error
            }
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json(response)
        }
    }
    async disable2fa(req, res) {

        let response = {};
        const secretmodel = new secretModel();
        const {
            userid,
            otp
        } = req.body

        let verified = await secretmodel.verifyOtp(userid, otp)

        if (verified) {
            User.findByIdAndUpdate(userid, {
                    '$set': {
                        'twofaEnable': false
                    }
                },
                function (err, result) {

                    response = {
                        status: true,
                        message: RESPONSE.DISABLE_2FA.success,
                        result
                    }
                    return res.status(HTTP_STATUS.OK.code).json(response)
                });
        } else {

            response = {
                status: false,
                message: RESPONSE.DISABLE_2FA.error
            }
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json(response)
        }
    }
    /**
     * User 2fa Validate
     * @route /user/validate
     * @method GET
     */

    // validate the token 
    async validate(req, res) {
        const twf = new secretModel();
        await twf.tfaValidate()
        res.send('validated, token:' + twf.token);
    }

    /**
     * User Dashboard
     * @route /user/dashboard
     * @method GET
     */

    // View logged in user profile
    async dashboard(req, res) {


        res.send(res.user)
    }

    /**
     * Logout from all devices
     * @route logoutall
     * @method POST
     */

    async logout(req, res) {

        let response = {}
        // Log user out of all devices
        try {
            req.user.tokens.splice(0, req.user.tokens.length)
            let user = req.user
            await user.updateLogoutStatus(user);
            await req.user.save()
            response = {
                status: true,
                messsage: RESPONSE.LOGOUT.success,
            }
            return res.status(HTTP_STATUS.OK.code).json(response)

        } catch (error) {
            // res.status(500).send(error)
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).send(error)
        }
    }

    /**
     * Forgot password
     * @route /user/forgot_password
     * @method POST
     */

    async forgotPassword(req, res) {
        let response = {}
        try {
            async.waterfall([
                // generate reset token
                function (done) {
                    crypto.randomBytes(20, (err, buf) => {
                        var token = buf.toString('hex');
                        done(err, token);
                    });
                },
                function (token, done) {
                    // check user exists in userSchema with email 
                    User.findOne({
                        email: req.body.email
                    }, (err, user) => {
                        if (!user) {
                            response = {
                                status: false,
                                message: RESPONSE.PASSWORD_RESET_EMAIL.info
                            }
                            return res.status(HTTP_STATUS.BAD_REQUEST.code).json(response)
                        } else {
                            user.resetPasswordToken = token;
                            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
                            user.save((err) => {
                                done(err, token, user);
                            });
                        }
                    });
                },
                function (token, user) {

                    /**
                     * Reset password Token is sent to user email
                     * @dependency nox-emailer@1.0.3
                     */
                    const emailConstants = Email.PASSWORD_RESET_EMAIL

                    const data = {
                        subject: emailConstants.subject,
                        receiverName: user.name,
                        receiverEmail: user.email,
                        subTitle: emailConstants.subTitle,
                        mainTitle: emailConstants.mainTitle,
                        mailContent: emailConstants.mailContent,
                        buttonLink: `${emailConstants.buttonLink}${token}`,
                        buttonText: emailConstants.buttonText,
                    };
                    utils.Emailer.sendEmail(data);
                    response = {
                        status: true,
                        message: RESPONSE.PASSWORD_RESET_EMAIL.success
                    };
                    res.status(HTTP_STATUS.OK.code).json(response)
                }
            ])
        } catch (error) {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).send(error)
        }
    }

    

    /**
     * reset mail with reset token is sent to this api to change password
     * @route /user/reset/:token
     * @method POST
     */
    async resetpassword(req, res) {

       
        let response = {};
        try {
            let token = req.params.token;
            
            async.waterfall([
                function () {
                    User.findOne({
                        resetPasswordToken: token,
                        resetPasswordExpires: {
                            $gt: Date.now()
                        }
                    }, async (err, user) => {
                        if (!user) {
                            
                            
                            //res.send(200, 'Password reset token is invalid or has expired.');
                            response = {
                                status: false,
                                message: RESPONSE.PASSWORD_UPDATE.expired
                            }
                            //return res.redirect('back');
                            return res.status(HTTP_STATUS.BAD_REQUEST.code).json(response)
                        }

                        user.password = req.body.password;
                        user.save((err, user) => {
                            if (err) {
                                response = {
                                    status: false,
                                    message: RESPONSE.PASSWORD_UPDATE.error
                                }
                                return res.status(HTTP_STATUS.BAD_REQUEST.code).json(response)
                            }
                            if (user) {
                                console.log("success")
                                response = {
                                    status: false,
                                    message: RESPONSE.PASSWORD_UPDATE.success
                                }
                                return res.status(HTTP_STATUS.OK.code).json(response)
                                //return res.status(200).send('Success! Your password has been changed.');
                            }

                        });
                    });
                },
            ])
        } catch (error) {}
    }
}

module.exports = new AuthController();