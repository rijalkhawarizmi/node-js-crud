const router=require("express").Router()
const multer =require("multer");
const path =require("path");
const { insertProduct,getProduct} = require("./admin.controller");

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload=multer({
    storage:storage,
    limits:{
        fileSize:10000000000
    }
})



router.post("/createproduct",upload.any('imageProduct'),insertProduct);
router.post("/product",getProduct);


module.exports=router;