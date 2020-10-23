// way to get functionality of express into the route file (instead of app)
const router = require("express").Router()
const path = require("path");



router.get("/notes", function(req, res){
  res.sendFile(path.join(__dirname, "../public/notes.html"))
})

router.get("*", function(req, res){
  res.sendFile(path.join(__dirname, "../public/index.html"))
})

module.exports = router