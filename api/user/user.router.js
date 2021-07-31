const {registerUser, login, cart}=require("./user.controller")
const router = require("express").Router();
const multer =require("multer");
const path =require("path");



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

router.post("/register",upload.single('image'),registerUser);
router.post("/login",login);
router.post("/cart",cart);


module.exports=router