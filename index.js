const port = 3000;
const express = require("express");
const app = express();

app
  .get("/", (request, response) => {
    response.send("<h1>The sample web page is</h1>");
  })
  .listen(port, () => {
    console.log(`The application is starting at the port ${port}`);
  });
