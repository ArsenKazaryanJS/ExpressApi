const fs = require('fs').promises
const creatPath = require('../help/creatPath')

const readHtml = (req,res,next)=>{
  fs.readFile(creatPath('pages','index.html'),'utf-8')
  .then((data) => {
    res.locals.fileHtml = data
    next()
  })
}
const readUsers = (req,res,next) => {
  fs.readFile(creatPath('db','users.json'),'utf-8')
  .then((data) => {
    const users = JSON.parse(data)
    res.locals.users = users
    next()
  })

}
function queryFilter(req,res,next){
  const {name,age,email,sort} = req.query
  const {users} = res.locals
  if(name || age  || email || sort){
       sort === 'min' && users.sort((a,b) => a.age - b.age)
       sort === 'max' && users.sort((a,b) => b.age - a.age)
      const userSearch = users.filter((user)=> user.name === name || user.age === +age || user.email === email) 
      if(userSearch.length > 0){
        res.locals.users = userSearch
      }
    }
  next()
}


module.exports = {readHtml,readUsers,queryFilter};