/**
* Controller - Auth
* Controller for Admin specific Functionalities.
* @author Sulfikar,Rasinraj
*/

/**
 * Access models
 */

let User = require('../models/user');
//let router = express.Router();

/**
 * Create User Registration Instance
 * @route /user
 * @method POST
 */

class AdminController {

    async dashboard(req,res) {
        res.status(200).send("Admin Dashboard") 
    }

    async check(req,res) {
        res.status(200).send("Admin Check") 
    }

    //function to delete a user with its id
    async deleteUser(req,res) {
        let {userid}=req.body
        User.findByIdAndDelete(userid)
        .then (user=> {
                return res.status(200).send({
                status:true,
                message: " user record deleted"
        })
    })
        .catch(err=> {                    
            return res.status(500).send({
            status:false,
            message: "An error occured"

            })

    })
}
    
}

module.exports = new AdminController();
