var express = require('express');
var app = express();
var mongoose= require('mongoose');

var options = { server: { socketOptions: {connectTimeoutMS: 30000 } }};
mongoose.connect('mongodb://cokodev:keepcool@ds227035.mlab.com:27035/cokodev',options, function(err) {
    console.log(err);
});

var UserSchema = mongoose.Schema({
    username: String,
    firstname: String,
    lastname: String,
    email: String,
    password: String
});

var UserModel = mongoose.model('Users', UserSchema);

app.use(express.static('public'));
app.set('view engine', 'ejs');

var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

//Pour les sessions
app.use(session({
  secret: 'a4f8071f-c873-4447-8ee2',
  resave: false,
  saveUninitialized: false,
 })
);

//Afficher la page d'accueil
app.get('/', function (req, res) {
    res.render('index');
});

app.post('/signup', function (req, res) {
    var user = new UserModel ({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    });

    if (req.query.username && req.query.firstname && req.query.lastname && req.query.email && req.query.password) {
        user.save(function (error, user) {
            console.log("user",user);
            console.log("error",error);

            req.session.tokenId = user.id;
            req.session.isLog = true;
              res.send('signed');
        });
    }
    else {
         console.log("not BDD error");
        res.send('Not registered');

    }
    //res.render('index');
    //res.send('you sign');
});

app.listen(8080, function () {
    console.log("Server listening on port 8080");
});