let express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    rbook = require('./routes/rbookticket')

mongoose.connect('mongodb://localhost/theatre');

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get('/theatre/findHall', rbook.findHall);
app.post('/theatre/bookTickets', rbook.bookTickets);

let server = app.listen(3000, () => {
    let port = server.address().port;
    console.log(`Express server listening on port ${port}`);
});