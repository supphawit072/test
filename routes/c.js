'use strict';
const express = require('express');
const crypto = require('crypto');
const cRoute = express.Router();
const connection = require('../db');

cRoute.post('/api/books', function (req, res, next) {
    let mypass = crypto.createHash('md5').update(req.body.password).digest("hex");
    connection.execute(`INSERT INTO orders (order_id,customer_name,product,quantity,order_date,	status) VALUES (?, ?, ?, ?, ?, ?);`,
        [req.body.order_id, req.body.customer_name, req.body.product, req.body.quantity,req.body.order_date,req.body.status,mypass,])
        .then(() => {
            console.log('ok');
            res.status(201).send("Insert Successfully");
        }).catch((err) => {
            console.log(err);
            res.end();
        });
});

cRoute.get('/api/books ', function (req, res, next) {
    connection.execute('SELECT * FROM users_epy')
        .then((result) => {
            var rawData = result[0];
            res.send(JSON.stringify(rawData));
            //res.send(rawData);
        }).catch((err) => {
            console.log(err);
            res.end();
        });
});

cRoute.post('/check', function (req, res, next) {
    let mypass = crypto.createHash('md5').update(req.body.password).digest("hex");
    connection.execute('SELECT * FROM users_epy WHERE username=? AND password=?;',
        [req.body.username, mypass]).then((result) => {
            var data = result[0];
            if (data.length === 0) {
                res.sendStatus(400);
            }
            else {
                res.sendStatus(200);
            }
        }).catch((err) => {
            console.log(err);
            res.sendStatus(404);
        });
});

cRoute.use('/', function (req, res, next) {
    res.sendStatus(404);
});

module.exports = cRoute;