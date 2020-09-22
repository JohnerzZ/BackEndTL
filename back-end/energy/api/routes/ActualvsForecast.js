const express = require('express');
const router = express.Router();
var mysql = require('mysql');
const querystring = require('querystring');
const {Parser} = require('json2csv');
var userauth = require('./UserAuth')
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "loco4217",
  database: "energymarket"
});

//des ti paizei me to https. 
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /ActualTotalLoad'
    });
});

router.post('/', (req, res, next) => {
    const ActualTotalLoad = {
        name: req.body.name,
        price: req.body.price  //change itttttttttttttttt
    }
    res.status(200).json({
        message: 'Handling POST requests to /ActualTotalLoad',
        createdActualTotalLoad: ActualTotalLoad
    });
});
router.get('/:AreaName/:Resolution/date/:datee', userauth, (req, res, next) => {
    var AreaName = req.params.AreaName;
    var Resolution = req.params.Resolution;
    var date = req.params.datee;
    var year = date.substring(0,4);
    var month = date.substring(5,7);
    var day = date.substring(8,10)
    let format = req.query.format;
  var sql = "SELECT 'entso-e' AS Source, 'ActualTotalLoad' AS Dataset, AreaName, AreaTypeCodeText AS AreaTypeCode, MapCodeText AS MapCode, ResolutionCodeText AS ResolutionCode, Year, Month, Day, DateTime AS DateTimeUTC, TotalLoadValue AS ActualTotalLoadValue, UpdateTime AS UpdateTimeUTC FROM actualtotalload INNER JOIN areatypecode on actualtotalload.AreaTypeCodeId = areatypecode.Id INNER JOIN mapcode on actualtotalload.MapCodeId = mapcode.Id INNER JOIN resolutioncode on actualtotalload.ResolutionCodeId = resolutioncode.Id WHERE AreaName=? AND ResolutionCodeText=? AND Year=? AND Month=? AND Day=?";
  con.query(sql, [AreaName, Resolution, year, month, day], function (err, result, fields) {
    if (err) throw err;
    if (format !== 'undefined' && format) {
        if (format == 'json') {
            res.status(200).json({
        result
         })
            res.end();
        }
        else if (format == 'csv') {
            const fields = ['Source', 'Dataset', 'AreaName', 'AreaTypeCode', 'MapCode', 'ResolutionCode', 'Year', 'Month', 'Day', 'DateTimeUTC', 'ActualTotalLoadValue', 'UpdateTimeUTC'];
            const json2csvParser = new Parser({ fields });
            const csv = json2csvParser.parse(result);
            res.send(Buffer.from(csv));
            res.end();
        }
        else {
            res.status(400).json({
                message: 'Incorrect format'
            })
            res.end();
        }
    }
    else
    {
        res.status(200).json({
        result
         })
        res.end();
    }
  });
});
router.get('/:AreaName/:Resolution/month/:datee',userauth, (req, res, next) => {
    var AreaName = req.params.AreaName;
    var Resolution = req.params.Resolution;
    var date = req.params.datee;
    var year = date.substring(0,4);
    var month = date.substring(5,7);
    let format = req.query.format;
  var sql = "SELECT 'entso-e' AS Source, 'ActualTotalLoad' AS Dataset,  AreaName, AreaTypeCodeText AS AreaTypeCode, MapCodeText AS MapCode, ResolutionCodeText AS ResolutionCode, Year, Month, Day, SUM(TotalLoadValue) AS ActualTotalLoadByDayValue FROM actualtotalload INNER JOIN areatypecode on actualtotalload.AreaTypeCodeId = areatypecode.Id INNER JOIN mapcode on actualtotalload.MapCodeId = mapcode.Id INNER JOIN resolutioncode on actualtotalload.ResolutionCodeId = resolutioncode.Id WHERE AreaName=? AND ResolutionCodeText=? AND Year=? AND Month=? GROUP BY Day ORDER BY Day";
  con.query(sql, [AreaName, Resolution, year, month], function (err, result, fields) {
    if (err) throw err;
    if (format !== 'undefined' && format) {
        if (format == 'json') {
            res.status(200).json({
        result
         })
            res.end();
        }
        else if (format == 'csv') {
            const fields = ['Source', 'Dataset', 'AreaName', 'AreaTypeCode', 'MapCode', 'ResolutionCode', 'Year', 'Month', 'Day', 'ActualTotalLoadByDayValue'];
            const json2csvParser = new Parser({ fields });
            const csv = json2csvParser.parse(result);
            res.send(Buffer.from(csv));
            res.end();
        }
        else {
            res.status(400).json({
                message: 'Incorrect format'
            })
            res.end();
        }
    }
    else
    {
        res.status(200).json({
        result
         })
        res.end();
    }
  });
});
router.get('/:AreaName/:Resolution/year/:datee',userauth, (req, res, next) => {
    var AreaName = req.params.AreaName;
    var Resolution = req.params.Resolution;
    var year = req.params.datee;
    let format = req.query.format;
  var sql = "SELECT 'entso-e' AS Source, 'ActualTotalLoad' AS Dataset, AreaName, AreaTypeCodeText AS AreaTypeCode, MapCodeText AS MapCode, ResolutionCodeText AS ResolutionCode, Year, Month, SUM(TotalLoadValue) AS ActualTotalLoadByMonthValue FROM actualtotalload INNER JOIN areatypecode on actualtotalload.AreaTypeCodeId = areatypecode.Id INNER JOIN mapcode on actualtotalload.MapCodeId = mapcode.Id INNER JOIN resolutioncode on actualtotalload.ResolutionCodeId = resolutioncode.Id WHERE AreaName=? AND ResolutionCodeText=? AND Year=? GROUP BY Month ORDER BY Month";
  con.query(sql, [AreaName, Resolution, year], function (err, result, fields) {
    if (err) throw err;
    if (format !== 'undefined' && format) {
        if (format == 'json') {
            res.status(200).json({
        result
         })
            res.end();
        }
        else if (format == 'csv') {
            const fields = ['Source', 'Dataset', 'AreaName', 'AreaTypeCode', 'MapCode', 'ResolutionCode', 'Year', 'Month', 'ActualTotalLoadByMonthValue'];
            const json2csvParser = new Parser({ fields });
            const csv = json2csvParser.parse(result);
            res.send(Buffer.from(csv));
            res.end();
        }
        else {
            res.status(400).json({
                message: 'Incorrect format'
            })
            res.end();
        }
    }
    else
    {
        res.status(200).json({
        result
         })
        res.end();
    }
  });
});


//sta import allakse th thesi toy ResolutionCodeID. Epishs kane tis syndeseis me tous pinakes kai vres pws na ta tupwneis me seira kai me resolution.
//na shmeiwthei oti tha moy dinoyn to resolution kai tha epistrefw tis grammes me resolution id pou antistoixei sto resolution name pou moy edwsan

    /*res.status(200).json({
        message: 'pete',
        year: year,
        day: day,
        month: month
    });*/


/*router.get('/:AreaName/:Timezone', (req, res, next) => {
    const id = req.params.AreaName;
    const timeid = req.params.Timezone;
    if (id == 'Greece') {
        res.status(200).json({
            message: 'You are home',
            id: id
        });
        if (timeid=='one')
        {
             res.status(200).json({
            message: 'The time is',
            timeid: timeid
        });
        }
    } else {
        res.status(200).json({
            message: 'You passed a country'
        });
    }
});*/
router.patch('/:AreaName', (req, res, next) => {
    res.status(200).json({
        message: 'Updated AreaName'
    });
});
router.delete('/:AreaName', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted AreaName'
    });
});

module.exports = router;