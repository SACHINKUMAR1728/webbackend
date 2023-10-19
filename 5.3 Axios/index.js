import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    console.log(result);
    res.render("index.ejs", { recipe: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  console.log(req.body);
  const type = req.body.type;
  const participants = req.body.participants;
  try {
    const response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`);
    const result = response.data[0];
    res.render("index.ejs", { recipe: result });
  } catch (error) {
    console.log("Failed to make request:", error.message);
    res.render("index.ejs");
    error: error.message;
  }

});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
