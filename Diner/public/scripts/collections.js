var DishesCollection = Backbone.Collection.extend({
	model: Dish,
	url: '/dishes'

});

var entrees = new DishesCollection();
entrees.fetch();
