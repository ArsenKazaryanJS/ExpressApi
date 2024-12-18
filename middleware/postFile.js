const fs = require('fs').promises
const creatPath = require('../help/creatPath')



const checkCase = (req,res,next)=>{
const {name,age,email} = req.body
if(typeof age === 'number' && name.trim() && String(age).trim() && email.trim()){
    next()
}else {
    res.status(400).json({ error: 'Invalid input: name, age, and email are required.'});
}

}

const checkEmail = (req,res,next) => {
     const {email} = req.body
     const {users} = res.locals
     
    if(users.some((user) => user.email === email )){
        res.status(200).json({error: "Ays email ov ogtater arten grancvac e."})
    }else{
        next()       
    }     
}

const createUser = (req,res,next) => {
    const addId = {...req.body, id:new Date().getTime()}
    res.locals.users.push(addId)
    fs.writeFile(creatPath('db','users.json'),JSON.stringify( res.locals.users))
    next()
}


module.exports = {checkCase,checkEmail,createUser}