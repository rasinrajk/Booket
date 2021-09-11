/**
* Model for Users and credentials
* @author Sulfikar,Rasinraj
*/


//Authorization with JWT 
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const role=require('../middleware/role');


const auth = async(req, res, next) => {
    let token = req.headers.authorization
    if (!token)   {
        return res.status(401).send({
            status:false,
            message:'Access Denied: send authorization token'
        })
    }
    else {
    token = token.split(' ');   
    try {
        
        const data = jwt.verify(token[1], process.env.JWT_KEY)
        
        if(data)
        {
            const user = await User.findOne({ _id: data._id, 'tokens.token': token })
            if (user){
                if(role[data.role].find(function(url){ 
                
                    return url==req.originalUrl})){
                   
                            // req.user = data
                            req.user = user
                            req.token = token
                        next()
            }
        else {
            
                return res.status(401).send({
                    status:false,
                    message:'Access Denied: You dont have correct privilege to perform this operation'
                })
            
        }

            }
            else throw new Error()
        }
        else{
            throw new Error()
        }
    }
    catch (error) {
        console.log(error)
        res.status(401).send({ status:false,error:error, message: 'Not  authorized to access this resource' })
    }
}
    
    // try {
    //     console.log("user:",data._id)
    //     const user = await User.findOne({ _id: data._id, 'tokens.token': token })
    //     console.log(user)
    //     if (!user) {
          
    //         throw new Error()
    //     }
    //     if(role[data.role].find(function(url){ 
    //         console.log("inside data role url")
    //         return url==req.originalUrl})){
           
    //                 req.user = data
    //                 req.user = user
    //                 req.token = token
    //             next()
    // } else {
    //     return res.status(401).send({
    //         status:false,
    //         message:'Access Denied: You dont have correct privilege to perform this operation'
    //     })
    // }
    // } catch (error) {
    //     res.status(401).send({ status:false,error:error, message: 'Not authorized to access this resource' })
    // }

}
module.exports = auth;