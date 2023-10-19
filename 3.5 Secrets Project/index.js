//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import {dirname} from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const app = express();
const _dirname = dirname(fileURLToPath(import.meta.url));
var pass = "";
var userauth = false;
app.use(bodyParser.urlencoded({extended: true}));

function getpass(res,req,next){
    pass = res.body["password"];
    if (pass == "ILoveProgramming"){
        userauth = true;
    }
    next();
}
app.use(getpass);

app.post("/check",(res,req)=>
{
    if(userauth){    
    req.sendFile(_dirname+"/public/secret.html");}
   else{
    req.sendFile(_dirname+"/public/index.html");}
});

app.get("/",(res,req)=>{
    req.sendFile(_dirname+"/public/index.html");
});
app.listen(3000,()=>{
    console.log("Listening on port: 3000");
});
