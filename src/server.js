const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const MONGO_DB = "";
const app = express()
app.use(cors())

app.get ('/', async (req,res)=>{
    try{
        const notes = await Notes.find({})
        res.json(notes)
    }catch (error){
        console.log(error)
    }
})

