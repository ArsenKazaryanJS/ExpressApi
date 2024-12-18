const path = require("path");

const creatPath = (...arg) =>{
    const newPath = __dirname.replace('\help','')
return  path.join(newPath, arg.join(",").replaceAll(",", "/"))}


module.exports = creatPath;

