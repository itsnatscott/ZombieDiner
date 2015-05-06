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
			document.getElementById("entree").className = "cat";
			document.getElementById("snack").className = "cat";
			document.getElementById("bev").className = "cat";
			this.model.set({name: newName,
				price: newPrice,
				image_url : newImage,
				descript: newDescript});
			showAll();
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
			console.log(dish.attributes.image_url);
			dishes.append(new DishView({
				model: dish,
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
		catField.val("");
		showAll();
	}

});
//categories

$("#snack").click(function(){
	// $(".detailpic").attr('src','images/snack.jpg')
	document.getElementById("detpic").className = "snack";
	$(".itemList").parent().fadeOut();;
	$("#snack").toggleClass("cat2")
	document.getElementById("entree").className = "cat";
	document.getElementById("bev").className = "cat";
	$(".itemList.1").parent().fadeIn();
	
});
$("#entree").click(function(){
	// $(".detailpic").attr('src','images/entree.jpg')
	document.getElementById("detpic").className = "entree";
	// $(".detail").switchClass("entree").fadeIn();
	$(".itemList").parent().fadeOut();;
	$("#entree").toggleClass("cat2");
	document.getElementById("snack").className = "cat";
	document.getElementById("bev").className = "cat";
	$(".itemList.2").parent().fadeIn();
});	
$("#bev").click(function(){
	// $(".detailpic").attr('src','images/bartender.jpg').fadeIn();
	document.getElementById("detpic").className = "bev";
	// $(".detail").switchClass("bev").fadeIn();
	$(".itemList").parent().fadeOut();
	$("#bev").toggleClass("cat2");
	document.getElementById("snack").className = "cat";
	document.getElementById("entree").className = "cat";
	$(".itemList.3").parent().fadeIn();

});	
$( "#addItemB" ).dblclick(function(){
	console.log("clicked"),
	$("#addItemField").toggleClass("hidden");
});
showAll = function(){
	document.getElementById("snack").className = "cat";
	document.getElementById("entree").className = "cat";
	document.getElementById("bev").className = "cat";
	document.getElementById("addItemField").className = "hidden";
	$(".detailpic").attr('src','images/diner.jpg');
	$(".itemList").parent().fadeIn();
}


new DishesView({
	collection: entrees
});
new CreateDishView({
	collection: entrees
})
});