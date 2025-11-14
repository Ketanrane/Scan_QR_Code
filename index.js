/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from "inquirer";
import fs from "fs";
import qr from "qr-image";

inquirer
  .prompt([
    {
      type: "input",
      name: "url",
      message: "Enter the URL to generate QR code:",
    },
  ])
  .then((answers) => {
    const url = answers.url;

    // Generate QR Code
    const qr_png = qr.image(url, { type: "png" });
    qr_png.pipe(fs.createWriteStream("qr_img.png"));

    // Save URL in text file
    fs.writeFile("URL.txt", url, (err) => {
      if (err) throw err;
      console.log("QR code generated and URL saved to URL.txt");
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
