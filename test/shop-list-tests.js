var shopList = require('../shop-list');
var chai = require('chai');

describe('addProduct', function() {
	it('добавляет продукт', function() {
		var products = shopList.getProducts();
		var productLength = products.length;
		var newProductId = shopList.addProduct('Продукт');		
		var newProductLength = products.length;
		var addedProduct = shopList.getProductById(newProductId);
		var res = (productLength + 1 === newProductLength && addedProduct.id === newProductId);
		chai.assert.equal(res, true);
	});

	it ('выбрасывает exception, при неверных параметрах', function() {
		chai.assert.throw(function() { shopList.addProduct(); }, Error);
	});
});

describe('deleteProduct', function() {
	it('удаляет продукт', function() {  		
		var newProductId = shopList.addProduct('Продукт');				
		var productLength = shopList.getProducts().length;
		shopList.deleteProduct(newProductId);
		var newProductLength = shopList.getProducts().length;

		var result = shopList.getProducts().filter(function(p) {
			return p.id === newProductId; 
		});

		var res = (productLength - 1 === newProductLength && result.length === 0);
		chai.assert.equal(res, true);
	});

	it ('выбрасывает exception, при неверных параметрах', function() {
		shopList.resetProducts();
		chai.assert.throw(function() { shopList.deleteProduct(1); }, Error);
	});
});

describe('initProductList', function() {
	it('инициализирует список первоначальными данными', function() {  
		var count = 5;	
		shopList.resetProducts();	
		shopList.initProductList(count);				
		var productLength = shopList.getProducts().length;
		
		var res = (count === productLength);
		chai.assert.equal(res, true);
	});

	it ('выбрасывает exception, при неверных параметрах', function() {
		shopList.resetProducts();
		chai.assert.throw(function() { shopList.initProductList(); }, Error);
		chai.assert.throw(function() { shopList.initProductList(-2); }, Error);
	});
});

describe('getProductById', function() {
	it('возвращает продукт с заданным идентификатором', function() {  
		var newProductId = shopList.addProduct('Продукт');
		var returnedProduct = shopList.getProductById(newProductId);
		var res = (newProductId === returnedProduct.id);
		chai.assert.equal(res, true);
	});

	it ('выбрасывает exception, при неверных параметрах', function() {  		
		chai.assert.throw(function() { shopList.getProductById(); }, Error);
		chai.assert.throw(function() { shopList.getProductById(-2); }, Error);
	});
	it ('выбрасывает exception, если продукт не существует', function() {
		shopList.resetProducts();
		chai.assert.throw(function() { shopList.getProductById(2); }, Error);  		
	});
});

describe('getProducts', function() {
	it('возвращает список продуктов', function() {  
		shopList.resetProducts();
		var initialProductCount = shopList.getProducts().length;	
		shopList.addProduct('Продукт 1');
		shopList.addProduct('Продукт 2');
		var productCount = shopList.getProducts().length;			
		var res = (initialProductCount === 0 && productCount === 2);
		chai.assert.equal(res, true);
	});
});

describe('resetProducts', function() {
	it('очищает список продуктов', function() {  
		shopList.resetProducts();	 	
		var productCount = shopList.getProducts().length;			
		var res = (productCount === 0);
		chai.assert.equal(res, true);
	});
});

