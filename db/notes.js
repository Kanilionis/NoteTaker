const fs = require("fs")
const util = require("util")
var id = 1
const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)


class Notes {
  readNotes(){
   return readFileAsync("db/db.json", "utf8")
  }
  writeNotes(data){
    return writeFileAsync("db/db.json", JSON.stringify(data))
  }
  getNotes(){
    return this.readNotes().then(data => {
      let addedNotes;
      try{
        addedNotes = [].concat(JSON.parse(data))
      }
      catch(err){
        console.log(err)
        // if error, will show empty array
        addedNotes = []
      }
      return addedNotes
    })
  }
  // data is the note we want to add
  addNotes(data){
    // want to target title and text specifically within the data
    const { title, text } = data
    if(title === null || text === null){
      throw new Error("title and text cannot be blank")
    }
    const completedNote = { title, text, id:id++}
    // adding completed note to end of note json
    return this.getNotes().then(data => [...data, completedNote]).then(data => this.writeNotes(data)).then(() => completedNote) // return completed note
    // new data will overwrite json with new notes
  }
  deleteNotes(id){
    return this.getNotes().then(data => data.filter(note => note.id != id)).then(data => this.writeNotes(data)) // grabbing everything else (other than the specified id), and overwriting old notes with new notes minus the specified id
  }
}
// generated as something new each time you start your server
module.exports = new Notes()
