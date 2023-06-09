const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Define a schema for the wave forecast object
const objectSchema = new mongoose.Schema({
    dayDate: String,
    hour: String,
    ratings: Array,
    swell: String,
    link: String,
    fourStarBool: Boolean,
    fiveStarBool: Boolean,
    spot: String
},{collection: 'surfReport'});

// Define a model based on the schema
const ObjectModel = mongoose.model('Object', objectSchema);

// Connect to the MongoDB database
mongoose.connect('mongodb+srv://ronan:2YY7K3a1gL3IQXMy@nollendorf.5bqfxjb.mongodb.net/favven?retryWrites=true&w=majority', { useNewUrlParser: true });

app.use(cors());
// Set up CORS headers
app.use((req, res, next) => {
   // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Define a route th
// at retrieves all wave forecasts from the database
app.get('/wave-forecasts', async (req, res) => {
    console.log("https request called")
    try {
        const waveForecasts = await ObjectModel.find();
        res.json(waveForecasts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});


app.use(express.static(path.join(__dirname, 'dist')));
//app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'dist', 'index.html')));
app.get('*', (req, res, next) => {
    if (req.path.match(/\..*/)) {
        // If the request has a file extension, let the static middleware handle it
        next();
    } else {
        // Otherwise, serve the index.html file
        res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    }
});// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));