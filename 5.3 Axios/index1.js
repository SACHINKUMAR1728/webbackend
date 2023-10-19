import express from "express";
import https from "node:https";
import bodyParser from "body-parser";
const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    const options = {
        hostname: 'bored-api.appbrewery.com',
        path: '/random',
        method: 'GET',
    };
    const request = https.request(options, (response) => {
        console.log('statusCode: ', response.statusCode)
        let data = " ";
        response.on("data", (chunk) => {
            data += chunk;
        });
        response.on("end", () => {
            try {
                const result = JSON.parse(data);
                // console.log(result);
                res.render("index.ejs", { recipe: result });
            } catch (error) {
                console.log("Failed to parse response :", error);
                res.render("index.ejs", {
                    error: error.message,
                });
            }
        });
    });
    request.on("error", (error) => {
        console.log("Failed to fetch data :", error);
    });
    request.end();
});

app.post("/", (req, res) => {
    const type = req.body.type;
    const participants = req.body.participants;
    const options = {
        hostname: 'bored-api.appbrewery.com',
        path: `/filter?type=${type}&participants=${participants}`,
        method: 'GET',
    };
    const request = https.request(options, (response) => {
        console.log('statusCode: ', response.statusCode)
        let data = " ";
        response.on("data", (chunk) => {
            data += chunk;
        });
        console.log(data);
        response.on("end", () => {
            try {
                const result = JSON.parse(data)[0];
                // console.log(result);
                res.render("index.ejs", { recipe: result });
            } catch (error) {
                console.log("Failed to parse response :", error);
            }
        });
    });
    request.on("error", (error) => {
        console.log("Failed to fetch data :", error);
    });
    request.end();
});

app.listen(3000, () => {
    console.log("server is running on port 3000");
});