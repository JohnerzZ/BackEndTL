const express = require('express');
const router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "loco4217",
  database: "energymarket"
});

function randomStr(len, arr) { 
            var ans = ''; 
            for (var i = len; i > 0; i--) { 
                ans +=  
                  arr[Math.floor(Math.random() * arr.length)]; 
            } 
            return ans; 
        } 

/*router.get('/:Pasxa', (req, res, next) => {
    var pasxa = req.params.Pasxa;
    res.status(200).json({
        message: 'Handling GET requests to /ActualvsForecast'
    });
    con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "SELECT * FROM users where userid = ?";
  con.query(sql, pasxa, function (err, result, fields) {
    if (err) throw err;
    res.status(200).json({
        result
         })
  });
});
});
*/

router.post('/', (req, res, next) => {
   var username = req.body.username;
   var password = req.body.password;
   var key1 = randomStr(4, '12ab');
   var key2 = randomStr(4, '32dc');
   var key3 = randomStr(4, '54vg');
   var dash = '-';
   var Token = key1.concat(dash, key2, dash, key3);
  if (username && password) {
    con.query('SELECT * FROM users WHERE user_name = ? AND pass_word = ?', [username, password], function(error, results, fields) {
      if (results.length > 0) {
        con.query('UPDATE users SET user_token = ? WHERE user_name = ?', [Token, username], function(error, results, fields) {
          console.log('done');
        });
        res.status(200).json({
          token: Token
        })
      }
        else {
          res.send('Incorrect Username and/or Password!');
        }     
      res.end();
    });
  } else {
    res.send('Please enter Username and Password!');
    res.end();
  }
});

module.exports = router;
