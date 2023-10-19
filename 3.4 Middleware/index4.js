import express from "express";
import { dirname } from "path"; 
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const app = express();
var k ="";

app.use(bodyParser.urlencoded({extended:true}));

const __dirname = dirname(fileURLToPath(import.meta.url));

function namegenerator(req,res,next){
  // console.log(req.body)
  k = req.body["street"]+req.body["pet"]
  next()
}

const port = 3000;
app.use(namegenerator);
app.post("/submit", (req, res) => {
  res.send(`<h1>Hey, I got you</h1>`);
  res.send(`<h1>Form Submitted ${k}</h1>`);
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
