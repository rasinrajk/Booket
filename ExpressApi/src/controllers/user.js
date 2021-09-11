/**
* Controller - Auth
* Controller for Basic User Functionalities
* @author Sulfikar,Rasinraj
*/

let noxEmailer = require('nox-emailer');
var crypto = require('crypto');
var async = require('async');
const jwt = require('jsonwebtoken')

// let {check,validationResult} = require('express-validator');

/**
 * Access models
 */

let User = require('../models/user');
let tokenModel = require('../models/token')
let secretModel = require('../models/twofasecret')


//let auth = require('../middleware/middleware')

let { data, configuration } = require('../emailTemplate/emailConfiguration')
let emailConfiguration = {
    toAddress: "To Address",
    fromAddress: "Email Service - NetObjex <admin@adminPanel.com>",
    subject: "Welcome Email"
};


/**
 * Create User Registration Instance
 * @route /user
 * @method POST
 */

class UserController {

    /**
        * User Dashboard
        * @route /user/dashboard
        * @method GET
    */

    // View logged in user profile
    async dashBoard(req, res) {
        res.send(req.user)
    }

//     async signup(req, res) {
//         // Create a new user
//         try {
//             const user = new User(req.body);
//             await user.save()

//             // Generate verification token for the verification Mail
//             const newToken = new tokenModel();
//             const verifyToken = await newToken.generateVerificationToken(user._id);

//             /**
//             * Verification Email
//             * @dependency nox-emailer@1.0.3
//             */

//             emailConfiguration.toAddress = user.email;
//             data.receiverName = user.name;
//             data.receiverEmail = user.email;
//             data.mainTitle = "Email Verification";
//             data.buttonLink = "http://localhost:8000/verify/" + verifyToken;
//             res.status(201).send({
//                 status: true,
//                 message: "Registration success.Please activate your account through the confirmation mail send to your mail id"
//             })
//         } catch (error) {
//             res.status(400).send(error)
//             /* Return registration error */
//             if (error.code == 11000) {
//                 return res.send({
//                     status: false,
//                     message: 'Email alredy exists'
//                 })
//             } else if (error.errors.name != null) {
//                 return res.send({
//                     status: false,
//                     message: error.errors.name.message
//                 });
//             } else if (error.errors.password != null) {
//                 return res.send({
//                     status: false,
//                     message: error.errors.password.message
//                 });
//             }
//             res.status(400).send(error)
//         }

//         noxEmailer.template.generateEmailContent(configuration, data)
//             .then(htmlTemplate => {
//                 noxEmailer.mailService.sendEmail(emailConfiguration, htmlTemplate)
//                     .then(response => {
//                     }).catch(error => {
//                         res.status(400).send(error)
//                     });

//             }).catch(error => {
//                 res.status(400).send(error)
//             });
//     }

//     /**
//         * Mail Verification
//         * @route /user/verify/:token
//         * @method GET
//         */


//     async verify(req, res) {

//         try {

//             let token = req.params.token;
//             const checkToken = new tokenModel();
//             const verifyToken = await checkToken.VerifyToken(token, res);


//         } catch (error) {
//             res.status(400).send(error)
//         }
//     }

//     /**
//     * User Authentication
//     * @route /user/login
//     * @method POST
//     */

//     async login(req, res) {
        
//         const secretmodel = new secretModel;
//         try {
//             const { email, password } = req.body
//             //Check the user exists in userSchema and check for right credentials.
//             const user = await User.findByCredentials(email, password);
//             if (!user.error) {
//                 //user credentials are correct. check for Twofactor authentication.
//                 if (user.twofaEnable) {
//                     res.status(200).send({
//                         status: true,
//                         message: "To login enter OTP",
//                         user: user
//                     })

//                 }
//                 else {
                    
//                     let token = await new User().generateAuthToken(user);
//                     await user.updateLoginStatus(user);
//                      res.status(200).send({
//                         status: true,
//                         message: "Login success",
//                         user: user
//                     })
//                 }

//             }
//             else {
                
//                 res.status(400).send({status:false,
//                 message:user.error});
//             }

//         } catch (error) {
//             res.status(400).send({
//                 status: false,
//                 error: error
//             })
//         }
//     }


//     /**
//     * User Authentication with otp
//     * @route /user/loginOtp 
//     * @method POST
//     */

//     async loginOtp(req, res) {
//         const secretmodel = new secretModel;
//         console.log("loginotp")
//         const { userid, otp } = req.body
//         console.log(userid,"and",otp)
//         const user = await User.findById(userid);
//         let verified = await secretmodel.verifyOtp(userid, otp);
//         if (verified) {
//             console.log("in verified")
//             //Generate access token for each login session
//             await user.generateAuthToken(user);
//             await user.updateLoginStatus(user);
//             res.status(200).send({
//                 status: true,
//                 message: "Login success with OTP",
//                 user: user
//             })

//         } else {
//             res.status(500).send({
//                 status: false,
//                 message: "incorrect OTP"
//             })
//         }
//     }





//     /**
//         * User 2fa generate
//         * @route /user/generateqr
//         * @method GET
//     */

//     /*
//      * Enable two factor authentication by a user.
//      * Send api to generate a QR code,used in authenticator app. 
//      */
//     async generateqr(req, res) {
//         const twf = new secretModel();
//         const { userid } = req.body
//         let qrimage = await twf.generateQR(userid)
//         res.send(qrimage);
//     }



//     /*
//     //  Enable two factor authentication by the server. 
//     //  Generate QR code and return to user.  
//     */
//     async enable2fa(req, res) {
//         console.log("3. in enable 2fa")
//         const secretmodel = new secretModel();
//         const accessToken = req.headers.authorization.split(' ')
//         const userId = jwt.verify(accessToken[1], process.env.JWT_KEY)
//         console.log("4. user id: ", userId)
//         let qrimage = await secretmodel.generateQR(userId)
//         res.send(qrimage);
//     }

//     /*
//      //  Enable two factor authentication by the server. 
//      //  Get OTP for the first time and enable it.  
//      */
//     async confirmEnable2fa(req, res) {
//         const secretmodel = new secretModel();
//         const accessToken = req.headers.authorization.split(' ')
//         const userId = jwt.verify(accessToken[1], process.env.JWT_KEY)
        
//         const { otp } = req.body
        
//         if (otp) {
//             let verified = await secretmodel.verifyOtp(userId, otp);
//             if (verified) {
//                 User.findByIdAndUpdate(userId, { '$set': { 'twofaEnable': true } }, function (err, result) {
//                     res.send({
//                         status: true,
//                         message: "Two factor authentication enabled",
//                         result
//                     });
//                 });
//             }
//             else {
//                 res.send({
//                     status: false,
//                     message: "OTP is wrong and two factor authentication not enabled"
//                 });
//             }
//         }

//         else {
//             res.send({
//                 status: false,
//                 message: "otp is not provided and twofa not enabled"
//             })
//         }

//     }


//      /*
//      //  Disable two factor authentication by the server. 
//      //    
//      */
//     async disable2fa(req, res) {
//         const secretmodel = new secretModel();
//         const { userid, otp } = req.body
//         let verified = await secretmodel.verifyOtp(userid, otp)
//         if (verified) {
//             User.findByIdAndUpdate(userid, { '$set': { 'twofaEnable': false } }, function (err, result) {

//                 res.send({
//                     status: true,
//                     message: "Two factor authentication disabled",
//                     result
//                 });
//             });
//         }
//         else {
//             // reject(false)
//             res.send({ status: false, message: "OTP is wrong and two factor authentication not disabled" })
//         }
//     }
//     /**
//     * User 2fa Validate
//     * @route /user/validate
//     * @method GET
// */

//     // validate the token 
//     async validate(req, res) {
//         const twf = new secretModel();
//         await twf.tfaValidate()
//         res.send('validated, token:' + twf.token);
//     }

//     /**
//         * User Dashboard
//         * @route /user/dashboard
//         * @method GET
//     */

//     // View logged in user profile
//     async dashboard(req, res) {
//         res.send(res.user)
//     }

//     /**
//         * User Logout Current device
//         * @route /user/logout
//         * @method POST
//     */

//     //Logout from current Device
//     async logout(req, res) {
//         // Log user out of the application

//         try {
//             req.user.tokens = req.user.tokens.filter((token) => {
//                 return token.token != req.token
//             })
//             await req.user.save()
//             res.send({ message: "logged out from this device successfully" })
//         } catch (error) {
//             res.status(500).send(error)
//         }
//     }

//     /**
//         * User Logout from all devices
//         * @route /user/logoutall
//         * @method POST
//     */

//     async logoutall(req, res) {
//         //Log user out of all devices

//         try {
//             req.user.tokens.splice(0, req.user.tokens.length)
//             let user = req.user
//             await user.updateLogoutStatus(user);
//             await req.user.save()
//             res.send({ message: "logged out from all the devices successfully" })
//         } catch (error) {
//             res.status(500).send(error)
//         }
//     }

//     /**
//         * Forgot password
//         * @route /user/forgot_password
//         * @method POST
//     */

//     async forgotPassword(req, res) {
//         try {
//             async.waterfall([
//                 //generate reset token
//                 function (done) {
//                     crypto.randomBytes(20, (err, buf) => {
//                         var token = buf.toString('hex');
//                         done(err, token);
//                     });
//                 },
//                 function (token, done) {
//                     //check user exists in userSchema with email 
//                     User.findOne({
//                         email: req.body.email
//                     }, (err, user) => {
//                         if (!user) {
//                             res.status(200).send({
//                                 status: false,
//                                 message: 'No account with that email address exists.'
//                             })
//                         }

//                         user.resetPasswordToken = token;
//                         user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

//                         user.save((err) => {
//                             done(err, token, user);
//                         });
//                     });
//                 },
//                 function (token, user) {       //function (token, user, done) {

//                     /**
//                     * Reset password Token is sent to user email
//                     * @dependency nox-emailer@1.0.3
//                     */

//                     emailConfiguration.toAddress = user.email;
//                     data.receiverName = user.name;
//                     data.receiverEmail = user.email;
//                     data.mainTitle = "Password Reset";
//                     data.buttonLink = "http://localhost:8000/reset/" + token;

//                     noxEmailer.template.generateEmailContent(configuration, data)
//                         .then(htmlTemplate => {
//                             noxEmailer.mailService.sendEmail(emailConfiguration, htmlTemplate)
//                                 .then(response => {
//                                     res.status(200).send({
//                                         status: true,
//                                         message: 'An e-mail has been sent to ' + user.email + ' with further instructions.'
//                                     })
//                                 }).catch(error => {
//                                     res.status(400).send(error)
//                                 });

//                         }).catch(error => {
//                             res.status(400).send(error)
//                         });
//                 }
//             ])
//         } catch (error) {
//             res.status(400).send(error)
//         }
//     }

//     /**
//         * reset mail with reset token is sent to this api to change password
//         * @route /user/reset/:token
//         * @method POST
//     */
//     async resetpassword(req, res) {
//         try {
//             let token = req.params.token;
//             async.waterfall([
//                 function () {
//                     User.findOne({
//                         resetPasswordToken: token,
//                         resetPasswordExpires: {
//                             $gt: Date.now()
//                         }
//                     }, async (err, user) => {
//                         if (!user) {
//                             res.send(200, 'Password reset token is invalid or has expired.');
//                             return res.redirect('back');
//                         }

//                         user.password = req.body.password;
//                         user.save((err, user) => {
//                             if (err) {
//                                 res.send({
//                                     status: false,
//                                     message: "password not changed"
//                                 })
//                             }
//                             if (user) {
//                                 return res.status(200).send({
//                                     status: true,
//                                     message: 'Success! Your password has been changed.'
//                                 });
//                             }

//                         });
//                     });
//                 },
//             ])
//         } catch (error) {
//             res.status(400).send(error)
//         }
//     }
 }

module.exports = new UserController();