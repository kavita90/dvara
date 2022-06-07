const bodyParser = require('body-parser');

var mysql = require('mysql');

const express = require('express'); // Importing express module

const app = express(); // Creating an express object

const port = 8000; // Setting an port for this application

var cors = require('cors');

app.use(
	bodyParser.urlencoded({
		extended: false
	})
);

app.use(express.json());
var con = mysql.createConnection({
	host: 'localhost',
	database: 'dvara',
	user: 'root',
	password: ''
});

con.connect(function(err) {
	if (err) throw err;
	console.log('Connected!');
});

con.query('SELECT * FROM users', function(error, results) {
	if (error) throw error;
	results.forEach((result) => {		
	});
	;
});

app.use(cors());

app.get('/', function(req, res) {
	res.send('we are at the root route of our server');
});

app.get('/users', function(req, res) {
	con.query('SELECT * FROM users', function(error, results) {
		if (error) throw error;
		res.send({total: results.length})
	});
	
});

app.post('/userid', function(req, res) {
	const ph = req.body.phone_number;
	con.query('SELECT * FROM users where phone_number =? ',[ph], function(error, results) {
		if (error) throw error;	
		res.send({
			status: 200,
			msg: "success",
			output : results
		});
	});
});

app.post('/userdetails', function(req, res) {
      con.query('INSERT INTO users( `name`, `phone_number`) VALUES (?,?)', [ req.body.name, req.body.phone ], function(
		error,result		
	) {
		if (error) throw error;
        res.send({
			status: 200,
			inserted: req.body
		});
	});
});

// Starting server using listen function
app.listen(port, function(err) {
	if (err) {
		console.log('Error while starting server');
	} else {
		console.log('Server has been started at ' + port);
	}
});
