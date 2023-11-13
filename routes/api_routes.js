const Router = require('express').Router()
const path = require('path')
const fs = require('fs')
const uuid = require('uuid')

const fromDB = () => {
    const db = path.join(__dirname, '../db/db.json')
    const dbData = fs.readFileSync(db, 'utf-8')
    return JSON.parse(dbData)
    
}

const toDB = (data) => {
    const db = path.join(__dirname, '../db/db.json')
    fs.writeFileSync(db, JSON.stringify(data, null, 2), 'utf-8')
}

Router.get('/notes', (req, res) => {
    const notes = fromDB()
    res.json(notes)
})

Router.post('/notes', (req, res) => {
    const newNote = req.body
    newNote.id = uuid.v4()
    const notes = fromDB()
    notes.push(newNote)
    toDB(notes)
    res.json(newNote)
})

Router.delete('/notes/:id', (req, res) => {
    const deleteNote = req.params.id
    const notes = fromDB()
    const deleteID = notes.findIndex(obj => obj.id === deleteNote)
    if (deleteID !== -1) {
        notes.splice(deleteID, 1)
    }
    toDB(notes)
    res.json(notes)

})

module.exports = Router