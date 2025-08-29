const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const vendorRoutes = require('./routes/vendorRoutes');
const bodyparser = require('body-parser');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');
const path =require('path');
const cors =require('cors');


const app = express();

const PORT =  process.env.PORT || 5000;

dotEnv.config();
//middleware
app.use(cors())
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conntected Succesfully"))
  .catch((err) => console.log(err));

   app.use(bodyparser.json());
   app.use('/vendor',vendorRoutes);
   app.use('/firm',firmRoutes)
   app.use('/product',productRoutes);
   //app.use('/uploads',express.static('uploads'))

//    // serve uploaded images
 app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.listen(PORT, () => {
//   console.log(`server started and running at ${PORT}`);
// });

app.listen(5000, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));

app.get("/", (req, res) => {
  res.send("<h1> welcome to the Home Page");
});
