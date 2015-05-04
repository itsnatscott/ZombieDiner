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
			this.model.set({name: newName,
				price: newPrice,
				image_url : newImage,
				descript: newDescript});
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
		console.log("rerendered")
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
		catField.val("");

	}

});
//categories
$("#snack").click(function(){
	console.log("snax!")
	$("#snack").toggleClass("cat2");
	document.getElementById("entree").className = "cat";
	document.getElementById("bev").className = "cat";
});
$("#entree").click(function(){
	console.log("trees!")
	$("#entree").toggleClass("cat2");
	document.getElementById("snack").className = "cat";
	document.getElementById("bev").className = "cat";
	new DishesView({
	collection: entrees});
	$(".itemList.1").unwrap().remove();
	$(".itemList.3").unwrap().remove();
});	
$("#bev").click(function(){
	console.log("dranx!")
	$("#bev").toggleClass("cat2");
	document.getElementById("snack").className = "cat";
	document.getElementById("entree").className = "cat";
	new DishesView({
	collection: entrees});
	$(".itemList.2").unwrap().remove();;
	$(".itemList.1").unwrap().remove();
	
});	
//Blow up picture
$(".menuitem").click(function(){
	console.log("click")
	$(".menuitem").toggleClass("hidden")
});
//toggle add item fields
$( "#addItemB" ).click(function(){
		console.log("clicked"),
		$("#addItemField").toggleClass("hidden");
});


new DishesView({
	collection: entrees
});
new CreateDishView({
	collection: entrees
})
});