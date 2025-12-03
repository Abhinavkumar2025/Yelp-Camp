const cities = require('./cities');
const {places,descriptors} = require('./seedHelpers')
const mongoose = require('mongoose');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console,"Connection Error:"));
db.once("open", ()=> {
    console.log("Database Connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDb = async() => {
    await Campground.deleteMany({});
    for(let i = 0;i<50;i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price= Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6912a86a24e86e8c6277b0c8',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti ex aliquam nisi delectus corporis, numquam commodi beatae voluptatum adipisci, accusantium fugiat esse deleniti facilis rerum nobis error, hic odio maxime!',
            price: price,
            images:[
                {
                    url: 'https://res.cloudinary.com/dcsmb5nrw/image/upload/v1763519145/YelpCamp/cucjv7i0arnfmfk9qkqa.png',
                    filename: 'YelpCamp/cucjv7i0arnfmfk9qkqa'

                }
            ]
        })
        await camp.save();
    }
}
seedDb().then(() => {
    mongoose.connection.close()
})