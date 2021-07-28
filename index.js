const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,  //  process.env.MONGO_URL
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

mongoose.connection.on('connected', () => {
  console.log("Mongoose is Connected!");
})

mongoose.connection.on('error', function (err) {
  if (err) throw err;
});

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);


// app.get("/users", (req, res) => {
//   res.send("welcome to user page");
// })

// localhost:8800
app.listen(8800, () => {
  console.log("backend server is running!")
})
