const Firm = require("../models/Firm");
const Vendor = require("../models/Vendor");
const multer = require("multer");
const path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage: storage });

const addFirm = async (req, res) => {
  try {
    const { firmName, area, category, region, offer } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const vendor = await Vendor.findById(req.vendorId);
    if (!vendor) {
      return res.status(404).json({ message: "vendor not found" });
    }

    if(vendor.firm.length >0){
      return res.status(400).json({message :"vendor can have only one firm"})
    }

    const firm = new Firm({
      firmName,
      area,
      category,
      region,
      offer,
      image,
      vendor: vendor._id,
    });

    const saveFirm = await firm.save();
   const firmId = saveFirm._id

    vendor.firm.push(saveFirm);

    await vendor.save();
    
    return res.status(200).json({ message: "firm added successfully" ,firmId });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "internal server error", details: error.message });
  }
};

const deleteFirmById = async (req,res)=>{

   try {
         const firmId = req.params.firmIdId;
         const deleteFirm = await Product.findByIdAndDelete(firmId)

        if(!deleteFirm){
          return res.status(404).json({message:"firm  not found"})
        }
   } catch (error) {
     console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
   
    
   }
}

module.exports = { addFirm: [upload.single("image"), addFirm] ,deleteFirmById};
