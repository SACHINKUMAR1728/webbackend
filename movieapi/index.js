import express from "express"; // Import express
import axios from "axios"; // Import axios
import bodyParser from "body-parser"; // Import body-parser

const app = express(); // Create express app
const PORT = 3000;  // Port 3000 is used for development as well as production
const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZDliODgwMzIwN2EyNGIxODBhZWZhM2IxODVmNDJmOCIsInN1YiI6IjY1MzIzZjBhNmQ5ZmU4MDEzOGNhOTRhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4sRxOpo1rNhfvpDoyiDqe3R6ENY-FTS9Iuy-UN3ZqVo'
    }
  }; // Options for axios request
app.use(express.static("public")); // Use static files
app.use(bodyParser.urlencoded({ extended: true })); // Use body-parser
app.set("view engine", "ejs"); // Set view engine to ejs
app.get("/", async(req,res) => {
    try {
      const response = await axios.request(options); // Make a request to the API
      console.log(response.data);
      res.render("index.ejs",{content: response.data.results[Math.floor(Math.random() * 10)]}); // Render the data to the index.ejs file
        
    } catch (error) {
        res.render("index.ejs",{content: error}); // Render the error to the index.ejs file
        
    }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`); // Log that the server is running
});