
const router = require("express").Router()
const notes = require("../db/notes.js")



// get
router.get("/api/notes", function(req, res){
  notes.getNotes().then(data => res.json(data)).catch(err => res.json(err))
})


router.post("/api/notes", function(req, res){
  notes.addNotes(req.body).then(data => res.json(data)).catch(err => res.json(err))
})

  
// delete notes
router.delete("/api/notes/:id", function(req, res){
  // var noteId = req.params.id
  notes.deleteNotes(req.params.id).then(() => res.json({
    // nothing to send from back end, telling browser to go ahead and delete
    ok:true
  })).catch(err => res.json(err))
})

module.exports = router