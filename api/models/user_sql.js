const connection = require('./db_connection');
const bcrypt = require('bcrypt');


module.exports.test = function () {
    connection.query('SELECT * FROM `user`  ', function (error, results, fields) {
        if (error) throw error;
        if (results) {
            console.log("------------------------>");
            console.log(results);
        }
        // connected!
    });
};

module.exports.create_new_user = function (name, email, password, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            // Store hash in your password DB.
            if (err) throw err;
            if (hash) {
                connection.query('INSERT INTO user SET ?', {
                    name: name,
                    email: email,
                    password: hash
                }, function (error, results, fields) {
                    if (error) throw error;
                    callback(error, results);
                    //console.log("INSERT data to user table --> ",results);
                });
            }

        });
    });
};
module.exports.findByMail = function (email, callback) {
    connection.query('SELECT * FROM `user` WHERE `email` = ?', [email], function (error, user_obj, fields) {
        callback(error,user_obj);
        // error will be an Error if one occurred during the query
        // results will contain the results of the query
        // fields will contain information about the returned results fields (if any)
    });

};
module.exports.passwordCheck=function (Plane_Password,hash_Password,callback) {

    bcrypt.compare(Plane_Password, hash_Password, function(err, res) {
        callback(null,res);
    });
};

module.exports.findUserById=function (UserId,callback) {
    connection.query('SELECT * FROM `user` WHERE `id` = ?', [UserId], function (error, user_obj, fields) {
        callback(error,user_obj);
        // error will be an Error if one occurred during the query
        // results will contain the results of the query
        // fields will contain information about the returned results fields (if any)
    });
};