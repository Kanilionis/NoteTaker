const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3333;
const apiroutes = require("./routes/apiroutes")
const htmlroutes = require("./routes/htmlroutes")

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// server looks here first
app.use(express.static("public"))

app.use(apiroutes)
app.use(htmlroutes)

app.listen(PORT, () => console.log(`listening on port: ${PORT}`))





