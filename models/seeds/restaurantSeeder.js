const Restaurant = require('../restaurant')
const restaurantData = require('./restaurant.json')
const seedRestaurant = restaurantData.results

const db = mongoose.connection
db.once('open', () => {
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
