const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Restaurant = require("./models/restaurant");
const app = express();
const port = 3000;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//連線資料庫
mongoose.connect("mongodb://localhost/restaurant-list", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error !");
});
db.once("open", () => {
  console.log("mongodb connected !");
});

//route setting
//index
app.get("/", (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => console.log(error));
});
//瀏覽一筆
app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render("show", { restaurant }))
    .catch((error) => console.log(error));
});

//app.get("/search", (req, res) => {
//const keyword = req.query.keyword;
//const restaurants = restaurantList.results.filter((restaurant) => {
//return (
//  restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
//   restaurant.category.toLowerCase().includes(keyword.toLowerCase())
// );
// });
// res.render("index", { restaurants: restaurants, keyword: keyword });
//});

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
