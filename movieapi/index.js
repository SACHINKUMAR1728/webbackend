import express, { response } from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;  
const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZDliODgwMzIwN2EyNGIxODBhZWZhM2IxODVmNDJmOCIsInN1YiI6IjY1MzIzZjBhNmQ5ZmU4MDEzOGNhOTRhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4sRxOpo1rNhfvpDoyiDqe3R6ENY-FTS9Iuy-UN3ZqVo'
    }
  };
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", async(req,res) => {
    try {
        const reponse  =  await axios.get(url,options);
        // reponse.json();
        console.log(response.data);
        res.render("index.ejs",{content: JSON.parse(reponse.data)});
        
    } catch (error) {
        res.render("index.ejs",{content: error});
        
    }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});