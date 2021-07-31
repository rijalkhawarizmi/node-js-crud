const pool = require("../../config/database")

module.exports = {
    createProduct: (data, image1,image2,image3,image4, callback) => {
        pool.query(
            "INSERT INTO product(productName,price,category,product_Image_First,product_Image_Second,product_Image_Third,product_Image_Fourth,description,dimension,weight,material,finishing,discount)values(?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [
                data.productName,
                data.price,
                data.category,
                image1,
                image2,
                image3,
                image4,
                data.description,
                data.dimension,
                data.weight,
                data.material,
                data.finishing,
                data.discount
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results)
            }
        )
    },

    fetchProduct: (paginate, callback) => {
        const limit = paginate.limit;
        const page = paginate.page
        const category = paginate.category
        const offset = (page - 1) * limit;

        if (!paginate.category) {
            pool.query(
                "select * from product limit ?  offset ?",
                [limit, offset],

                (error, results, fields) => {
                    if (error) {
                        return callback(error);
                    }

                    return callback(null, results);
                }
            )
        } else {
            pool.query(
                "select * from product where category=? limit ?  offset ?",
                [category, limit, offset],

                (error, results, fields) => {
                    if (error) {
                        return callback(error);
                    }
                    return callback(null, results);
                }
            )

        }
    },

}