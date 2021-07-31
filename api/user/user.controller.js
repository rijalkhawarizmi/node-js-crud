const { createUser, getUsersByEmail, addCart } = require("./user.service")
const { sign } = require("jsonwebtoken")
const { genSaltSync, hashSync, compareSync } = require("bcrypt")


module.exports = {
    registerUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        const image = `http://localhost:3000/image/${req.file.filename}`;
        createUser(body, image, (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: err
                })
            }
            results.password = undefined;
            const jsontoken = sign({ result: results }, "qwe1234", {
                expiresIn: "1h"
            });
            return res.status(200).json({
                success: 1,
                data: results,
                token: jsontoken,
            });
        })
    },

    login: (req, res) => {
        const body = req.body;
        getUsersByEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }

            if (!results) {
                return res.json({
                    success: 0,
                    data: "Invalid pass or password"
                });
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsontoken = sign({ result: results }, "qwe1234", {
                    expiresIn: "1h"
                });

                if (results.role == "admin") {
                    return res.json({
                        success: 1,
                        message: "admin successfully",
                        token: jsontoken,
                        result:results
                    });
                }
                return res.json({
                    success: 1,
                    message: "login successfully",
                    token: jsontoken,
                    result:results
                });
            } else {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
        });
    },


    cart: (req, res) => {
        let body = req.body;

        addCart(body, (err, results) => {

            if (err) {
                return res.json({
                    success: 0,
                    message: err,
                })
            }
            return res.json({
                success: 1,
                message: results

            })


        })
    },

}