import express from "express";
import morgan from "morgan";

const app = express();
const port = 3000;

function logger(req, res, next){
  console.log(":method ",req.method, req.url);
  next();
}

app.use(logger);
app.use(morgan(":date[web]"));
app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
