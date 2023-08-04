const express = require('express');
const path = require('path')
const mongoose = require('mongoose')
const Campground = require('./models/campground')
const {transcode} = require('buffer');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {useNewUrlParser: true,})
    .then(() => {
        console.log("CONNECTION OPEN!!")
    })
    .catch(err => {
        console.log("OH NO ERROR!!")
        console.log(err)
    })
    
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=> {
    console.log("Database Connected");
})

const app = express();
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/makecampground', async(req, res) => {
    const camp = new Campground({title: 'My backyard', description: 'cheap camping'});
    await camp.save();
    res.send(camp)
})

app.listen(3000, () => {
    console.log("Serving on port 3000")
})