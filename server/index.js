const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const {
  userModel,
  ResModel,
  itemModel,
  cartModel,
  orderModel,
} = require("./models/item.js");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const url = process.env.MONGO_URL;
mongoose.connect(url);

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  ResModel.findOne({ email: email }).then((user) => {
    if (user) res.json("User Aleady Exist");
    else {
      ResModel.create(req.body)
        .then((items) => res.json(items))
        .catch((error) => res.json(error));
    }
  });
});
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  ResModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) res.json(user);
      else res.json("Incorrect password");
    } else {
      res.json("User doesnot exist");
    }
  });
});

app.post("/registeruser", (req, res) => {
  const { name, email, password } = req.body;
  userModel.findOne({ email: email }).then((user) => {
    if (user) res.json("User Aleady Exist");
    else {
      userModel
        .create(req.body)
        .then((items) => res.json(items))
        .catch((error) => res.json(error));
    }
  });
});
app.post("/loginuser", (req, res) => {
  const { email, password } = req.body;
  userModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) res.json(user);
      else res.json("Incorrect password");
    } else {
      res.json("User doesnot exist");
    }
  });
});

app.get("/homeuser/:name", async (req, res) => {
  try {
    console.log("dumeel");
    const users = await ResModel.find(); // Using async/await instead of callback
    res.json(users); // Send users as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/restaurant/:name1/:name", async (req, res) => {
  console.log("correct");
  const restaurantName = req.params.name;
  console.log(restaurantName);
  const restaurant = await itemModel.find(); // Hypothetical function
  if (restaurant) {
    res.json(restaurant);
  } else {
    res.status(404).send("Restaurant not found");
  }
});

app.get("/user/:name/cart", async (req, res) => {
  console.log("Started");
  const restaurant = await cartModel.find();
  const items = await itemModel.find(); // Hypothetical function
  if (restaurant) {
    res.json(restaurant);
  } else {
    res.status(404).send("Restaurant not found");
  }
});
app.get("/user/:name/order", async (req, res) => {
  console.log("Started");
  const restaurant = await orderModel.find();
  const items = await itemModel.find(); // Hypothetical function
  if (restaurant) {
    res.json(restaurant);
  } else {
    res.status(404).send("Restaurant not found");
  }
});

app.delete("/user/:name/cart/:id", async (req, res) => {
  console.log("Deleted");
  const restaurant = await cartModel.deleteOne({ _id: req.params.id }); // Hypothetical function
  console.log(req.body.id);
  if (restaurant) {
    res.json(restaurant);
  } else {
    res.status(404).send("Restaurant not found");
  }
});

app.delete("/user/:name/cart", async (req, res) => {
  console.log("Deleted");
  const restaurant = await cartModel.deleteMany({}); // Hypothetical function

  if (restaurant) {
    res.json(restaurant);
  } else {
    res.status(404).send("Restaurant not found");
  }
});

app.post("/user/:name/cart", async (req, res) => {
  console.log(req.body);
  orderModel
    .create(req.body)
    .then((items) => res.json(items))
    .catch((error) => res.json(error));
});

app.post("/restaurant/:name1/:name", async (req, res) => {
  console.log(req.body);
  cartModel
    .create(req.body)
    .then((items) => res.json("Data Added"))
    .catch((error) => res.json(error));
});

app.get("/homeres/:name", async (req, res) => {
  const restaurantName = req.params.name;
  // Fetch the restaurant details from your database using the name
  const restaurant = await ResModel.findOne({ name: restaurantName }); // Hypothetical function
  if (restaurant) {
    res.json(restaurant);
  } else {
    res.status(404).send("Restaurant not found");
  }
});

app.get("/listitem/:name", async (req, res) => {
  const restaurantName = req.params.name;
  console.log(restaurantName);
  const restaurant = await itemModel.find(); // Hypothetical function
  if (restaurant) {
    res.json(restaurant);
  } else {
    res.status(404).send("Restaurant not found");
  }
});

app.get("/orders/:name", async (req, res) => {
  const restaurantName = req.params.name;
  console.log(restaurantName);
  const restaurant = await orderModel.find(); // Hypothetical function
  console.log("what");
  if (restaurant) {
    res.json(restaurant);
  } else {
    res.status(404).send("Restaurant not found");
  }
});

app.delete("/orders/:name/:id", async (req, res) => {
  console.log("Deleted");
  const restaurant = await orderModel.deleteOne({ _id: req.params.id }); // Hypothetical function
  console.log(req.body.id);
  if (restaurant) {
    res.json(restaurant);
  } else {
    res.status(404).send("Restaurant not found");
  }
});

app.post("/additem", (req, res) => {
  console.log(req.body);
  itemModel
    .create(req.body)
    .then((items) => res.json(items))
    .catch((error) => res.json(error));
});

app.listen(process.env.PORT || 3000, () => {
  console.log("app is running");
});
