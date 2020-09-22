const express = require('express');
const router = express.Router();
var mysql = require('mysql');
var formidable = require('formidable');
var csvToJson = require('convert-csv-to-json');

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

router.post('/', (req, res, next) => {
   var username = req.body.username;
   var password = req.body.password;
   var quota = req.body.quota;
   var email = req.body.email;
   var apikey1 = randomStr(4,'12ab');
   var apikey2 = randomStr(4, '32dc');
   var apikey3 = randomStr(4, '54vg');
   var dash = '-';
   var apikey = apikey1.concat(dash, apikey2, dash, apikey3);
   console.log(apikey);
  if (username && password) {
    con.query('INSERT INTO users (user_name, pass_word, email, quota, apikey) VALUES (?,?,?,?,?)', [username, password, email, quota, apikey], function(error, results, fields) {
        res.status(200).json({
          message: 'User added successfuly.'
        })   
      res.end();
    });
  } else {
    res.send('Please enter Username and Password!');
    res.end();
  }
});

router.get('/:username', (req, res, next) => {
    var userName = req.params.username;
  var sql = "SELECT * FROM users where user_name = ?";
  con.query(sql, userName, function (err, result, fields) {
    if (err) throw err;
    res.status(200).json({
        result
         })
  });
});

router.put('/:username', (req, res, next) => {
    var oldusername = req.params.username;
    var newuserName = req.body.username;
    var newpassword = req.body.password;
    var newemail = req.body.email;
    var newquota = req.body.quota;
  var sql = "UPDATE users SET user_name = ?, pass_word = ?, email = ?, quota = ? WHERE user_name = ?";
  con.query(sql, [newuserName,newpassword,newemail,newquota,oldusername], function (err, result, fields) {
    if (err) throw err;
    res.status(200).json({
        result
         })
  });
});

/*
router.post('/:table', (req, res, next) => {
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
        return;
        }
        let json = csvToJson.fieldDelimiter(';') .getJsonFromCsv(files.file.path);
        for(let i=0; i<json.length;i++){
            con.query("INSERT INTO actualtotalload ( id, entity, mapcode kai ta loipa) VALUES ?", [json[i]], function(err, result, fields){
    if (err) throw err;
    });
        }
});
*/

module.exports = router;