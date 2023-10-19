import inquirer from "inquirer";
import ak from "fs";
import qr from "qr-image";
inquirer
    .prompt([
        {"message": "type your url: ", name:"URL"},
    ])
    .then(answers => {
        const url = answers.URL;
        ak.writeFile("url.txt", url, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
        var qr_svg = qr.image(url);
        qr_svg.pipe(ak.createWriteStream("qr_image.png"));
    })
    .catch(error => {
        console.log(error);
    });
