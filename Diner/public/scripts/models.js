var Dish = Backbone.Model.extend({
	urlRoot: '/dishes',
	initialize: function(){
		console.log("doing the dishes");
	},
	defaults: {
		name:"Default Brains",
		image_url:"images/brain.jpg",
		price:"$11",
		descript:"served on a plate with parsley",
		category_id:2
	}
});