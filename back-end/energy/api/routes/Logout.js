const express = require('express');
const router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "loco4217",
  database: "energymarket"
});

/*router.get('/:Pasxa', (req, res, next) => {
    var pasxa = req.params.Pasxa;
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
  res.status(200).json({
    
  })
});

module.exports = router;