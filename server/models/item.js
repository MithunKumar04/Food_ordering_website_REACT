const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const userModel = mongoose.model("user", userSchema);
const resSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const ResModel = mongoose.model("Restaurant", resSchema);
const itemSchema = new mongoose.Schema({
  ResName: String,
  itname: String,
  imgurl: {
    type: String,
    default: "DishName",
  },
  price: Number,
  ratings: Number,
  description: String,
});
const itemModel = mongoose.model("item", itemSchema);
const cartSchema = new mongoose.Schema({
  RestName: String,
  CustName: String,
  Dish: String,
  price: Number,
});
const cartModel = mongoose.model("My cart", cartSchema);
const orderSchema = new mongoose.Schema({
  RestName: String,
  CustName: String,
  Dishes: [String],
  Time: String,
  Total: Number,
});
const orderModel = mongoose.model("My order", orderSchema);
module.exports = { userModel, ResModel, itemModel, cartModel, orderModel };
