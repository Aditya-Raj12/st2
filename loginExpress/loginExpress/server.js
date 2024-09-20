const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

app.use(express.static("."));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const LoginData = [];

const data = JSON.parse(fs.readFileSync("./user.txt", "utf-8"));

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "./login.html"));
});

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "./dashboard.html"));
});



app.post("/login", (req, res) => {
  
  const { username, password } = req.body;
  console.log({ username, password });
 
  const filterData = data.filter((ele) => {
  
    if (ele.password === password) {
      return true;
    }

  });
  
  if (filterData.length == 0) {
    res.send("Invalid");
  } 
  else {
    if (!LoginData.includes(username)) {
      LoginData.push(username);
    }
    res.redirect("/dashboard");
    
  }
});


app.get('/user-details',(req,res)=>{
      res.json(LoginData)
})

app.listen("3000", () => {
  console.log("server started");
});
