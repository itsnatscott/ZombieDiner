$(document).ready(function() {
	var DishView = Backbone.View.extend({
		tagName: 'div class="itemBox"',
		template: _.template($("#dishTemplate").html()),
		events:{
			"click button#dishDelete": "deleteDish",
			"click button#dishEdit": "editDish",
			"click button#updateButton": "updateDish"
		},
		
		////Button functions 				
		updateDish: function(){
			var newName = this.$("#newName"+ this.model.id).val();
			var newPrice = this.$("#newPrice"+ this.model.id).val();
			var newImage = this.$("#newImage"+ this.model.id).val();
			var newDescript = this.$("#newDescript"+ this.model.id).val();
			var newCat = this.$("newCat"+ this.model.id).val();
			this.model.set({name: newName,
				price: newPrice,
				image_url : newImage,
				descript: newDescript,
				category_id: newCat});
			this.model.save();
		},

		editDish: function(){
			this.$(".itemList").hide();
			this.$(".editList").show();
		},

		deleteDish: function(){
			this.model.destroy();
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
	events:{"click button#dishAdd": "createDish",
	"click button#addItemB": "addItemField"	},
	addItemField: function(){
		console.log("clicked")
		$("#addItemField").toggleClass("hidden");
	},

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