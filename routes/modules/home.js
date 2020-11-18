const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const sorting = req.query.sorting
  switch (sorting) {
    case '_id-asc':
      return Restaurant.find()
        .lean()
        .sort({ _id: 'asc' })
        .then((restaurants) => res.render('index', { restaurants }))
        .catch((error) => console.log(error))
    case '_id-desc':
      return Restaurant.find()
        .lean()
        .sort({ _id: 'desc' })
        .then((restaurants) => res.render('index', { restaurants }))
        .catch((error) => console.log(error))
    case 'category':
      return Restaurant.find()
        .lean()
        .sort({ category: 'asc' })
        .then((restaurants) => res.render('index', { restaurants }))
        .catch((error) => console.log(error))
    default:
      return Restaurant.find()
        .lean()
        .then((restaurants) => res.render('index', { restaurants }))
        .catch((error) => console.log(error))
  }
})

module.exports = router
