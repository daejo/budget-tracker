const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://budget:JTntnnsCILtHJ1CA@cluster0-shard-00-00.5srma.mongodb.net:27017,cluster0-shard-00-01.5srma.mongodb.net:27017,cluster0-shard-00-02.5srma.mongodb.net:27017/budget?ssl=true&replicaSet=atlas-sbs2rx-shard-0&authSource=admin&retryWrites=true";

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});