const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

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

app.use(cors({
    origin: 'http://localhost:5173'
}));
// Set up CORS headers
app.use((req, res, next) => {
   // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Origin', 'https://lazykelp.onrender.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Define a route that retrieves all wave forecasts from the database
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



// Start the server
app.listen(3000, () => console.log('Server started on port 3000'));
