import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "sachin1289";
const yourPassword = "iamidiot";
const yourAPIKey = "9b53b705-a9d0-4056-a96a-7df26a7933dd";
const yourBearerToken = "1bc78911-c6fe-494a-99b7-0a309b7e5aae";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try{
    const response = await axios.get(API_URL + "/random");
    const content = response.data;
    res.render("index.ejs", { content: JSON.stringify(content) });
  }
  catch(error){
    res.status(404).send(error.message);
  }
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", async (req, res) => {
  try{
    const request  = await axios.get(API_URL + "/all?page=2", {
      auth :{
        username : yourUsername,
        password : yourPassword
      }
    });
    const data = request.data;
    console.log(data);
    res.render("index.ejs",{content : JSON.stringify(data)});
  }
  catch (error)
  {
    res.status(404).send(error.message);
  }
  
});

app.get("/apiKey",async (req, res) => {
  try {
    const request = await axios.get(API_URL + `/filter`,{
      params: {
        score : 5,
        apiKey: yourAPIKey
      },
    });
    const data = request.data;
    res.render("index.ejs", { content: JSON.stringify(data) });
  } catch (error) {
    res.status(404).send(error.message);    
  }

});

app.get("/bearerToken", async (req, res) => {
  try {
    const request = await axios.get(API_URL+`/secrets/2`, {
      headers: {
        Authorization: `Bearer ${yourBearerToken}`,
      },
    });
    const data = request.data;
    res.render("index.ejs", { content: JSON.stringify(data) });
  } catch (error) {
    
  }
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
