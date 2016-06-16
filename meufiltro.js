angular.module("listaTelefonica").filter('meuFiltro', function() {
	
	return function(item) {
		return item.toUpperCase();
	};
});
		