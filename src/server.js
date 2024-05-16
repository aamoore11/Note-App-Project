const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

const MONGO_DB = "";
const app = express()

app.use(cors())
app.use(bodyParser.json());

app.get ('/', async (req,res)=>{
    try{
        const notes = await Notes.find({})
        res.json(notes)
    }catch (error){
        console.log(error)
    }
})




const PORT = process.env.PORT || 5000;


app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/notesdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define note schema and model using Mongoose
const noteSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String,
  date: Date
});

const Note = mongoose.model('Note', noteSchema);

// Define API endpoints
app.get('/api/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/notes', async (req, res) => {
  try {
    const { title, category, description, date } = req.body;
    const newNote = new Note({ title, category, description, date });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Other CRUD endpoints (update, delete) can be added similarly

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
