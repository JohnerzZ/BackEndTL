const express = require('express');
const router = express.Router();
var mysql = require('mysql');
const querystring = require('querystring');
const {Parser} = require('json2csv');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "loco4217",
  database: "energymarket"
});

module.exports = async (req, res, next) => {
    var headerkey = req.get('X-OBSERVATORY-AUTH');
    con.query('SELECT * FROM users WHERE user_token = ?', [headerkey], function(error, results, fields) {
     if (!error) {
            if (results.length < 1) {
                res.status(401).json({
                    message: "Authintication failed, user doesn't exist",
                    status: "401"
                });
            }
            else {
            	con.query('UPDATE users SET quota = quota - 1 WHERE user_token = ?', [headerkey], function(error, results, fields){
            		con.query('SELECT * FROM users WHERE user_token = ?', [headerkey], function(error, results, fields){
            			//console.log(results[0].quota);
            			if (results[0].quota==-1) {
            			res.status(402).json({
            				message: "Sorry mate, you are out of quota.",
            				status:"402"
            			});
            		}
            		else {
            			next();
            		}
            		});
            	});
            }
        }
        else {
            return res.status(400).json({
                message: 'Bad request',
                status: '400'
            });
        }
});
}