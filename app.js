require("dotenv").config()
const express=require("express")
const multer=require("multer")
const userRouter = require("./api/user/user.router")
const adminRouter = require("./api/admin/admin.router")


const app=express();
function errHandler(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        res.json({
            success: 33,
            message: err.message
        })
    }
}
app.use('/image', express.static('upload/images'));
app.use('/imageProduct', express.static('upload/imageProduct'));
app.use(express.json());
app.use(errHandler);
app.use("/api/", userRouter);
app.use("/api/", adminRouter);
app.listen(process.env.APP_PORT,()=>{
    console.log('connect',process.env.APP_PORT);
})