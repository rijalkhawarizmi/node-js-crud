const pool = require("../../config/database")

module.exports = {
    createUser: (data, image, callback) => {
        pool.query(
            "INSERT INTO register(role,name,email,password,image,address,phone)values(?,?,?,?,?,?,?)",
            [
                data.role,
                data.name,
                data.email,
                data.password,
                image,
                data.address,
                data.phone
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results)
            }
        )
    },

    getUsersByEmail: (email, callback) => {
        pool.query(
            "select * from register where email=?",
            [email],
            (error, results, fields) => {
                console.log(results);
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        )

    },

    addCart: (data, callback) => {
        pool.query(
            "INSERT INTO cart (email,productName,dimension,weight,material,finishing,product_Image_First,product_Image_Second,product_Image_Third,product_Image_Fourth,price,discount,description)values(?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [
                data.email,
                data.productName,
                data.dimension,
                data.weight,
                data.material,
                data.finishing,
                data.product_Image_First,
                data.product_Image_Second,
                data.product_Image_Third,
                data.product_Image_Fourth,
                data.price,
                data.discount,
                data.description,
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results)

            }
        )
    },


}