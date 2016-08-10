var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var shopList = require('./shop-list');
shopList.initProductList(2);

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function (req, res) {
	console.time('get');
	res.render('index', { products: shopList.getProducts() });  
	console.timeEnd('get');
});

app.post('/add', function(req, res) {
	console.time('add');
	shopList.addProduct(req.body.product);
	res.render('index', { products: shopList.getProducts() });   
	console.timeEnd('add');
});

app.post('/delete', function(req, res) {
	console.time('delete');
	shopList.deleteProduct(req.body.id);
	res.render('index', { products: shopList.getProducts() });
	console.timeEnd('delete');
});

app.post('/reset', function(req, res) {
	console.time('reset');
	shopList.resetProducts();
	res.render('index', { products: shopList.getProducts() });  
	console.timeEnd('reset');
});

app.listen(3000, function () {
	console.log('Shoplist app listening on port 3000!');
});

