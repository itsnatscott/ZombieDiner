$(document).ready(function() {
	var DishView = Backbone.View.extend({
		tagName: 'div class="itemBox"',
		template: _.template($("#dishTemplate").html()),
		events:{
			"click button.dishDelete": "deleteDish"
		},
		
		////Button functions
		addItem: function(){
			this.$("#addItemField").show();
			this.$(".addItemButton").hide();
		},
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
			this.collection.each(function(dish) {
				dishes.append(new DishView({
					model: dish
				}).render().$el);
			});
			return this;
		}
	});

	var CreateDishView = Backbone.View.extend({
		el: "#addItemField",
		events:{"click button#dishAdd": "createDish"},
		createDish: function() {
			var nameField = this.$("#newDishName");
			var priceField = this.$("#newDishPrice");
			var descriptField = this.$("#newDishDescript");
			var imageField = this.$("#newDishImage");
			var catField = this.$("#newDishCat");
			var name = nameField.val();
			var price = priceField.val();
			var descript = descriptField.val();
			var image = imageField.val();
			var cat = catField.val();
			console.log(price,descript,image,cat);

			this.collection.create({
				name: name,
				price: price,
				image_url : image,
				descript: descript,
				category_id: cat
			});
			nameField.val("");
			priceField.val("");
			descriptField.val("");
			imageField.val("");
			catField.val("1");

		}

	});





	new DishesView({
		collection: entrees
	});
	new CreateDishView({
		collection: entrees
	})
});