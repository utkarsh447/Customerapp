var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
const expressValidator = require('express-validator');
var mongojs = require('mongojs');
var ObjectId = mongojs.ObjectId;

var app = express();
var db = mongojs('customerapp', ['users'])

//global vars
app.use(function(req, res, next){
	res.locals.errors = null;
	next();
});

//Validator Middleware
app.use(expressValidator());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

var user = [{
	first : "Joe",
	last : "daffoe",
	bol : "fas"
},
{
	first : "coe",
	last : "dagesffoe",
	bol : "fgsdas"
},
{
	first : "hoe",
	last : "dfaffgseoe",
	bol : "fashds"
}];

app.get('/', function(req, res){
	db.users.find(function(err,docs){
		res.render('index',{
			title: 'Customers',
			user: docs,
		});
	})
});

app.post('/user/add', function(req,res){
	console.log('Form Submitted');
	/*console.log(req.body.first);*/
	req.checkBody('first', 'Forstname').notEmpty();
	req.checkBody('last', 'lostname').notEmpty();
	req.checkBody('bol', 'boiname').notEmpty();

	var errors = req.validationErrors();

	if(errors){		
		res.render('index',{
			title: 'Customers',
			user: user,
			errors: errors,
		});
	}

	else {
			
		var newUser = {
			first : req.body.first,
			last : req.body.last,
			bol : req.body.bol,
		}

		//console.log(newUser);	
		db.users.insert(newUser,function(err, result){
			//TODO: INITIALLY res WAS NOT WORKING, 
			//CHANGED IT TO RESULT, IT WORKED
			if(err){
				console.log(err)
			}
			
			res.redirect('/');
		});
	}
});


app.delete('/user/delete/:id', function(req, res){
	//console.log(req.params.id);
	db.users.remove({_id: ObjectId(req.params.id)}, function(err, result){
		if(err){
			console.log(err);
		}
		res.redirect('/');
	})
})

app.listen(3000,function(){
	console.log("listening");
});
