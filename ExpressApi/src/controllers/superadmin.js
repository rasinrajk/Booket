/**
* Controller - Auth
* Controller for super admin Functionalities
* @author Sulfikar,Rasinraj
*/

/**
 * Access models
 */
let User = require('../models/user');


class SuperAdminController {

    async dashboard(req, res) {
        res.status(200).send("Admin Dashboard ")
    }

    async check(req, res) {
        res.status(200).send("Admin Check ")
    }


    /**
    Function to list all the users with role user
    */
    async listUser(req, res) {

        let { listLength, pageIndex } = req.body

        if (!listLength || !pageIndex) {
            listLength = 10
            pageIndex = 1
        } else {
            if (listLength < 0) {
                listLength = 10
            }
            if (pageIndex < 0) {
                pageIndex = 1
            }
        }
        User.find({ role: "user" }).limit(parseInt(listLength)).skip(listLength * (pageIndex - 1))
            .then(user => {

                if (user.length > 0) {

                    return res.status(200).send({
                        status: true,
                        pagination: {
                            "total": user.length,
                            "limit": listLength

                        },
                        userList: user

                    });
                }

                else {
                    return res.status(500).send({
                        status: false,
                        message: "there is no user record found"
                    });
                }

            }).catch(err => {
                if (err) {  //if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        status: false,
                        message: "An error occured",
                        error: err
                    });
                }
                return res.status(500).send({
                    status: false,
                    message: "there is no user record found"
                });
            });


    }

    // function to list all the admins in record in blocks of 10 entries

    async listAdmin(req, res) {

        let { listLength, pageIndex } = req.body

        if (!listLength || !pageIndex) {
            listLength = 10
            pageIndex = 1
        } else {
            if (listLength < 0) {
                listLength = 10
            }
            if (pageIndex < 0) {
                pageIndex = 1
            }
        }

        User.find({ role: "admin" }).limit(parseInt(listLength)).skip(listLength * (pageIndex - 1))
            .then(admin => {

                if (admin.length > 0) {

                    return res.status(200).send({
                        status: true,
                        pagination: {
                            "total": admin.length,
                            "limit": listLength
                        },
                        adminList: admin

                    });
                }

                else {
                    return res.status(500).send({
                        status: false,
                        message: "there is no admin record found"
                    });
                }

            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        status: false,
                        message: "An error occured",
                        error: err
                    });
                }
                return res.status(500).send({
                    status: false,
                    message: "there is no admin record found"
                });
            });
    }

    /**
    Function to toggle the role of user to admin and vice versa
    send userId  to change the role 
    */
    async ToggleRole(req, res) {
        User.findById(req.body.userid)
            .then(user => {
                if (user.role == "user") {
                    user.role = "admin";
                    user.save()
                    return res.status(200).send({
                        status: true,
                        message: "Role changed to admin"
                    });
                } else if (user.role == "admin") {
                    user.role = "user";
                    user.save()
                    return res.status(200).send({
                        status: true,
                        message: "Role changed to user "
                    });
                }

            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        status: false,
                        message: "User not found with id " + req.body.userid
                    });
                }
                return res.status(500).send({
                    status: false,
                    message: "Error retrieving user with id " + req.body.userid
                });
            });
    }

    // function to get the count of all the verified users in record
    async verifiedUserNumber(req, res) {
        User.find({ isVerified: true, role: "user" })
            .then(user => {
                return res.status(200).send({
                    status: true,
                    count: user.length
                });
            })
            .catch(err => {
                console.log("error1")
                return res.status(500).send({
                    status: false,
                    message: "there is no user record found"

                })
            })
    }

    // function to get the count of all users in record
    async totalUserNumber(req, res) {
        User.find({ role: "user" })
            .then(user => {
                return res.status(200).send({
                    status: true,
                    count: user.length
                });
            })

    }
    // function to get the count of all logged in users in record
    async loggedinUserNumber(req, res) {
        User.find({ isLoggedIn: true, role: "user" })
            .then(user => {
                return res.status(200).send({
                    status: true,
                    count: user.length
                });
            })
            .catch(err => {

                return res.status(500).send({
                    status: false,
                    message: "there is no logged in user or user record found"

                })
            })
    }

    // function to get the count of all the verified admins in record
    async verifiedAdminNumber(req, res) {
        User.find({ isVerified: true, role: "admin" })
            .then(user => {
                return res.status(200).send({
                    status: true,
                    count: user.length
                });
            })
            .catch(err => {
                console.log("error1")
                return res.status(500).send({
                    status: false,
                    message: "there is no admin record found"

                })
            })
    }
    // function to get the count of all admins in record
    async totalAdminNumber(req, res) {
        User.find({ role: "admin" })
            .then(user => {
                return res.status(200).send({
                    status: true,
                    count: user.length
                });
            })

    }
    // function to get the count of all logged in admins in record
    async loggedinAdminNumber(req, res) {
        User.find({ isLoggedIn: true, role: "admin" })
            .then(user => {
                return res.status(200).send({
                    status: true,
                    count: user.length
                });
            })
            .catch(err => {

                return res.status(500).send({
                    status: false,
                    message: "there is no logged in admin or admin record found"

                })
            })
    }

    
 // function to search the user record with key word name
    async fetchUser(req, res) {               
        let { searchKey } = req.body
        let resultArray = await User.find({ "name": { $regex: searchKey },"role": { $regex:"user"} },{"name":1})
        if (resultArray!='')
        {
        return res.status(200).send({
            status: true,
            message: resultArray
        })
        }
        else {
            return res.status(200).send({
                status: false,
                message: "no record found"
            })
        }
    }

     // function to search the admin record with key word name
    async fetchAdmin(req, res) {               
        let { searchKey } = req.body
        let resultArray = await User.find({ "name": { $regex: searchKey },"role": { $regex:"^admin"} },{"name":1})
        if (resultArray!='')
        {
        return res.status(200).send({
            status: true,
            message: resultArray
        })
        }
        else {
            return res.status(200).send({
                status: false,
                message: "no record found"
            })
        }
    }
    // function to delete the admin from record 
    async deleteAdmin(req, res) {
        let { adminid } = req.body
        User.findByIdAndDelete(adminid)
            .then(user => {
                return res.status(200).send({
                    status: true,
                    message: " admin record deleted"
                })
            })
            .catch(err => {
                return res.status(500).send({
                    status: false,
                    message: "An error occured"

                })

            })
    }
}

module.exports = new SuperAdminController();
