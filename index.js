const express = require("express");
const app = express();
const { readHtml, readUsers,queryFilter } = require("./middleware/readFile");
const {checkCase,checkEmail,createUser} = require('./middleware/postFile')
const port = 3000;
app.use(express.json());

app.get("/", readHtml, (req, res) => {
  const {fileHtml} = res.locals
  res.set({ "content-type":"text/html" }).status(200).send(fileHtml);
});
app.get("/users", [readUsers,queryFilter], (req, res) => {
  const { users } = res.locals;
  res.status(200).set({ "content-type":"application/json" }).json(users);
});

app.post("/users",[checkCase,readUsers,checkEmail,createUser], (req, res) => {
  res.status(200).send('successfully created User')
});

app.listen(port, (err) => !err && console.log(`Server is Run ${port} Port`));
