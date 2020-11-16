const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantData = require('./restaurant.json')
const seedRestaurant = restaurantData.results

mongoose.connect('mongodb://localhost/restaurant-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error !')
})
db.once('open', () => {
  console.log('mongodb connected !')
  seedRestaurant.forEach((restaurant) => {
    Restaurant.create({
      name: restaurant.name,
      name_en: restaurant.name_en,
      category: restaurant.category,
      image: restaurant.image,
      location: restaurant.location,
      phone: restaurant.phone,
      google_map: restaurant.google_map,
      rating: restaurant.rating,
      description: restaurant.description,
    })
  })
  console.log('done')
})
