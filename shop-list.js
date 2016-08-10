module.exports = shopList();

function shopList () {
	var products = [];
	var id = 0;

	return {
		addProduct: addProduct,
		deleteProduct: deleteProduct,
		getProducts: getProducts,
		getProductById: getProductById,
		resetProducts: resetProducts,
		initProductList: initProductList
	};

	function initProductList (count) {
		if (count === undefined || count < 1) {
			throw new Error('Не указано количество продуктов');
		}

		for (var i = 0 ; i < count; i++) {			
			var product = {
				id: id++,
				productName: 'Продукт ' + i
			};
			products.push(product);
		}
	}

	function addProduct (productName) {
		if (productName === undefined || productName.length === 0) {
			throw new Error('Не указано название продукта');
		}

		var product = {
			id: id++,
			productName: productName
		};
		products.push(product);
		return product.id;
	}

	function deleteProduct (productId) {
		var isDeleted;
		for (var i = 0 ; i <products.length; i++) {			
			if(products[i].id == productId) {
				products.splice(i, 1);
				isDeleted = true;
			}
		}

		if (!isDeleted) {
			throw new Error('Данного продукта не существует в списке');
		}
	}

	function getProductById (id) {
		if (id === undefined || id < 0) {
			throw new Error('Неверно указан идентификатор продукта');
		}

		var result = products.filter(function(p) {
			return p.id === id; 
		});
		if (result.length === 1) {
			return result[0];
		}
		throw new Error('Продукт не найден');
	}

	function getProducts () {
		return products;
	}

	function resetProducts () {
		products = [];
	}
}