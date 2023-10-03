const mongoose = require('mongoose')
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground')
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

const sample = array => array[Math.floor(Math.random() * array.length)];
const seedDB = async ()=> {
    await Campground.deleteMany({});
    for(let i=0; i<50; i++)
    {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20)+10;
        const camp = new Campground({
            author: '6518ea7b04c5c813a6604f43',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dm8lqw9fc/image/upload/v1696341895/YelpCamp/pjinthnfaqy2y1m36ksk.jpg',
                    filename: 'YelpCamp/pjinthnfaqy2y1m36ksk'
                },
                {
                    url: 'https://res.cloudinary.com/dm8lqw9fc/image/upload/v1696342248/YelpCamp/noxxoccqfrsdxrbem7qm.jpg',
                    filename: 'YelpCamp/noxxoccqfrsdxrbem7qm'
                }
            ] 

        })
        await camp.save();
    }
}

seedDB().then( () =>{
    mongoose.connection.close();
});