import express from "express";
import jwt from "jsonwebtoken"

const app = express();
const port = 3000;
const posts = [
    {
        username: "sachin",
        title: "post 1"
    },
    {
        username: "satyam",
        title: "post 2"
    }
]
app.get("/",(req,res ) =>{
        res.json(posts);
});

app.post("/login",(req,res)=>{
    const username = req.body.username;
    const user = { name: username};
    const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken});


})


app.listen(port,()=>{
    console.log("server running on port 3000");
});