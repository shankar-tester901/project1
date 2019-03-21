
//Note that we prefix our module name with ./. This signals to Node that it
//should not look for the module in the node_modules directory;
// if we omitted that prefix, this would fail.

var express = require('express');
var tempFortune = require('./lib/fortune.js');

var app = express();

var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));


app.set('port', process.env.PORT || 3000);

// var fortunes = [
//     "Conquer your fears or they will conquer you.", "Rivers need springs.",
//     "Do not fear what you don't know.",
//     "You will have a pleasant surprise.", "Whenever possible, keep it simple.",
//     ];


app.get('/', function(req, res) {
    // res.type('text/plain');
    // res.send('Meadowlark Travel');
    res.render('home');
})

console.log(tempFortune.getFortune());

app.get('/about', function(req, res) {
    res.render('about', { tempFortune: tempFortune.getFortune() } );
    });

    // app.get('/about', function(req, res) {
    //     res.render('about', { fortune: "shankar" } );pwd
    //     });

// In the catch- all handler, which provides our custom 404 page,
// and the 500 handler, we have to set the status code explicitly.

app.use(function(req, res) {

    // res.type('text/plain');
    // res.status(400);
    // res.send('404- Not Found');
    res.status(404);
    res.render('404');

});


app.use(function(err, req, res, next) {

    // console.err(err.stack);
    // res.type('text/plain');
    // res.status(500);
    // res.send('500 - Server Error');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function() {
    console.log('Express server started at ' + app.get('port') );

});
