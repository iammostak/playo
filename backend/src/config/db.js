const mongoose = require("mongoose");

require("dotenv").config();
const url = process.env.URL;

const Connect = () => {
   return mongoose.connect(url);
};

module.exports = Connect;
