const { createProduct, fetchProduct } = require("./admin.service")


module.exports = {
    insertProduct: (req, res) => {
        const body = req.body;
        // const image = `http://localhost:3000/image/${req.file.filename}`;
        let data = [];
        req.files.forEach(element => {

            data.push(element.filename)


        });
        let image1=`http://localhost:3000/image/${data[0]}`;
        let image2=`http://localhost:3000/image/${data[1]}`;
        let image3=`http://localhost:3000/image/${data[2]}`;
        let image4=`http://localhost:3000/image/${data[3]}`;
        
        createProduct(body, image1, image2, image3, image4, (err, results) => {
            if (err) {
                return res.json({
                    message: err
                })
            }
            return res.json({
                value: 1,
                results: results
            })
        })

    },

    getProduct: (req, res) => {
        let paginate = req.body;

        fetchProduct(paginate, (err, results) => {

            if (err) {
                console.log(err);
                return;
            }

            if (!results) {
                return res.json({
                    success: 0,
                    message: "not found"
                })
            }
            if (!results.length) {
                return res.json({
                    message: "nama ini tidak ada"
                })
            } else {
                return res.json({
                    success: "success",
                    page_count: results.length,
                    page: paginate.page,
                    message: results

                })
            }

        })
    },

}