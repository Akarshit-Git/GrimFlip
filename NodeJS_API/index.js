const mysql = require('mysql2');

const express = require('express');
var app = express();

const bodyparser = require('body-parser');
app.use(bodyparser.json());

const connection = mysql.createConnection({
    host: 'localhost', // host for connection
    port: 3306, // default port for mysql is 3306
    database: 'GrimFlip', // database from which we want to connect out node application
    user: 'root', // username of the mysql connection
    password: 'root1234' // password of the mysql connection
});

connection.connect(function (err) {
    if (err) {
        console.log(err);
        console.log("error occured while connecting");
    }
    else {
        console.log("connection created with Mysql successfully");
    }
});

app.listen(3000, () => console.log('Server running at 3000 port'));

//Get Scores Table
app.get('/scores', (req, res) => {
    connection.query('SELECT * FROM Scores', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else { console.log(err); }
    });
});

//Update Best Score
app.post('/updateScores', (req, res) => {
    let data = req.body;
    connection.query('update \`Scores\` set Best = ? where Player_ID = ?;', [data.Best, data.Player_ID], (err, rows, fields) => {
        if (!err)
        console.log('Rows affected:', rows.affectedRows);
        else { console.log(err); }
    });
});