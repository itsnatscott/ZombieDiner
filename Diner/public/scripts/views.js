$(document).ready(function() {
	var DishView = Backbone.View.extend({
		tagName: 'div class="itemBox"',
		template: _.template($("#dishTemplate").html()),
		events:{
			"click button.addItemButton": "addItem"},
		
		////Button functions
		addItem: function(){
			this.$(".addItemField").show();
			this.$(".addItemButton").hide();
		}
		////////RENDER THE PAGE
		render: function() {
			this.$el.html(this.template({
				dish: this.model.toJSON()
			}));
			return this;
		}
	});

	var DishesView = Backbone.View.extend({
		el: "ul#dishesList",
		initialize: function(){
			this.listenTo(this.collection, "sync remove", this.render);
		},


		render: function() {
			var dishes = this.$el;
			dishes.html("");
			console.log(this)
			this.collection.each(function(dish) {
					dishes.append(new DishView({
						model: dish
					}).render().$el);
				});
			return this;
		}
	});





	new DishesView({
		collection: entrees
	});
});