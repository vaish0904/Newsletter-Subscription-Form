// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request=require("request");
const app=express();
const https=require("https");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
const firstName=req.body.fName;
const lastName=req.body.lName;
const email=req.body.email;
const data={
  members: [
    {
      email_address : email,
      status :"subscribed",
      merge_fields:{
        FNAME:firstName,
        LNAME:lastName
      }
    }
  ]
};
const jsonData=JSON.stringify(data);
const url="https://us6.api.mailchimp.com/3.0/lists/ff8cbb45e1";
const options={
  method:"POST",
  auth:"Vaishnavi1:a214d0bc9a6a88e2f207d828b9c0e5d9-us6"
};
const request = https.request(url,options,function(response){
  if(response.statusCode==200){
    res.sendFile(__dirname+"/success.html");
  }
  else{
    res.sendFile(__dirname+"/failure.html");
  }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    });
});
request.write(jsonData);
request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/");
});
app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000.");
});
