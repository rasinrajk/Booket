let express = require('express');
let router = express.Router();
let auth = require('../middleware/middleware');
AuthController = require('../controllers/authentication');
const Usercontroller = require('../controllers/user');
const AdminController =require("../controllers/admin");
const SuperAdminController =require("../controllers/superadmin");
const cors = require('cors')

//FOR COMMON POST
router.post('/login',AuthController.login);
router.post('/login-otp',AuthController.loginOtp);
router.post('/signup', cors(),AuthController.signup);
router.post('/logout', auth,AuthController.logout);
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset/:token', AuthController.resetpassword);
router.post('/confirm-enable-2fa',auth,AuthController.confirmEnable2fa);
//router.options('/options-response',auth,AuthController.confirmEnable2fa);


//FOR COMMON GET
router.get('/verify/:token',AuthController.mailverify);
router.get('/generate-qr',AuthController.generateqr);
router.get('/validate',AuthController.validate);
router.get('/enable-2fa',auth,AuthController.enable2fa);
router.post('/disable-2fa',AuthController.disable2fa);

router.get('/list-user',auth,SuperAdminController.listUser);
// router.get('/listuser',auth,SuperAdminController.listUser);

// FOR USER GET
router.get('/dash-board',auth,Usercontroller.dashBoard);

// FOR ADMIN GET
router.get('/admin/dash-board',auth,AdminController.dashboard);
router.get('/check',auth,AdminController.check);
router.post('/delete-user',auth,AdminController.deleteUser);

// FOR SUPER ADMIN GET
router.get('/list-admin',auth,SuperAdminController.listAdmin);
router.get('/super-admin/dash-board',auth,SuperAdminController.dashboard);
router.get('/verified-user-number',auth,SuperAdminController.verifiedUserNumber);
router.get('/total-user-number',auth,SuperAdminController.totalUserNumber);
router.get('/loggedin-user-number',auth,SuperAdminController.loggedinUserNumber);
router.get('/verified-admin-number',auth,SuperAdminController.verifiedAdminNumber);
router.get('/total-admin-number',auth,SuperAdminController.totalAdminNumber);
router.get('/loggedin-admin-number',auth,SuperAdminController.loggedinAdminNumber);



// FOR SUPER ADMIN POST
router.post('/toggle-role',auth,SuperAdminController.ToggleRole);
router.post('/delete-admin',auth,SuperAdminController.deleteAdmin);
router.post('/fetch-user',SuperAdminController.fetchUser);
router.post('/fetch-admin',SuperAdminController.fetchAdmin);


module.exports = router;

