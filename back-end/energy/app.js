const express = require('express');
const app = express();
const morgan = require('morgan/');
const bodyParser = require('body-parser');

const ActualTotalLoadRoutes = require('./api/routes/ActualTotalLoad')
const AGPTRoutes = require('./api/routes/AggregatedGenerationPerType')
const DATLFRoutes = require('./api/routes/DayAheadTotalLoadForecast')
const ActualvsForecastRoutes = require('./api/routes/ActualvsForecast')
const usersRoutes = require('./api/routes/Login')
const userslogoutroutes = require('./api/routes/Logout')
const adminsRoutes = require('./api/routes/Users')
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "*");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


app.use('/energy/api/ActualTotalLoad', ActualTotalLoadRoutes);
app.use('/energy/api/AggregatedGenerationPerType', AGPTRoutes);
app.use('/energy/api/DayAheadTotalLoadForecast', DATLFRoutes);
app.use('/energy/api/ActualvsForecast', ActualvsForecastRoutes);
app.use('/energy/api/Login', usersRoutes);
app.use('/energy/api/Logout', userslogoutroutes);
app.use('/energy/api/Admin/users', adminsRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});



module.exports = app;