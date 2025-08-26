
const path = require('path');
const Product = require('../models/Product');
const multer = require('multer');
const Firm = require('../models/Firm')

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage: storage });


const addProduct = async(req,res)=>{
    try {
         const {productName ,price, category,bestseller ,description} = req.body;
          const image = req.file ? req.file.filename : undefined;

          const firmId = req.params.firmId;
          const firm = await Firm.findById(firmId);

          if(!firm){
            return res.status(404).json({error:"no firm found"})
          }

          const product = new Product ({
            productName ,price, category,bestseller ,description,image,firm:firm._id
          })
          const savedProduct = await product.save();
          firm.products.push(savedProduct);
          await firm.save();
          res.status(200).json({savedProduct});
    } catch (error) {
         console.error(error);
    res.status(500).json({ meassage: "Internal server error" });
        
    }
}

const getProductByFirm = async(req ,res)=>{
   try {
     const firmId = req.params.firmId;
     const firm = await Firm.findById(firmId)

     if(!firm){
      return res.status(400).json({error:"no firm found"});
     }
     const resturantName = firm.firmName;
     const products = await Product.find({firm:firmId});

     res.status(200).json({resturantName , products});
   } catch (error) {
   console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
   }
}
const deleteProductById = async (req,res)=>{

   try {
         const productId = req.params.productId;
         const deleteProduct = await Product.findByIdAndDelete(productId)

        if(!deleteProduct){
          return res.status(404).json({message:"product  not found"})
        }
   } catch (error) {
     console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
   
    
   }
}

module.exports = {addProduct:[upload.single('image'),addProduct],getProductByFirm,deleteProductById};