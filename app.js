var express    = require("express");
var app        = express();
var bodyParser = require("body-parser");
var mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

var campgroundSchema = new mongoose.Schema({
	name:String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground",campgroundSchema);

// Campground.create(
// {name:"salmon creek",  image:"https://pixabay.com/get/57e8d1454b56ae14f1dc84609620367d1c3ed9e04e507440742a73d69f44c4_340.jpg"
// 	},function(err,campground){
// 		if(err){
// 			console.log(err);
// 		}else{	
// 			console.log("Newly Created Camp");
// 			console.log(campground);
// 		}
// })

// var campgrounds =[
// 		{name:"salmon creek",  image:"https://pixabay.com/get/57e8d1454b56ae14f1dc84609620367d1c3ed9e04e507440742a73d69f44c4_340.jpg"},
// 		{name:"Granite Hill",  image:"https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e507440742a73d69f44c4_340.jpg"},
// 		{name:"Mountain Goat", image:"https://pixabay.com/get/52e8d4444255ae14f1dc84609620367d1c3ed9e04e507440742a73d69f44c4_340.jpg"},
// 		{name:"salmon creek",  image:"https://pixabay.com/get/57e8d1454b56ae14f1dc84609620367d1c3ed9e04e507440742a73d69f44c4_340.jpg"},
// 		{name:"Granite Hill",  image:"https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e507440742a73d69f44c4_340.jpg"},
// 		{name:"Mountain Goat", image:"https://pixabay.com/get/52e8d4444255ae14f1dc84609620367d1c3ed9e04e507440742a73d69f44c4_340.jpg"},
// 		{name:"salmon creek",  image:"https://pixabay.com/get/57e8d1454b56ae14f1dc84609620367d1c3ed9e04e507440742a73d69f44c4_340.jpg"},
// 		{name:"Granite Hill",  image:"https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e507440742a73d69f44c4_340.jpg"},
// 		{name:"Mountain Goat", image:"https://pixabay.com/get/52e8d4444255ae14f1dc84609620367d1c3ed9e04e507440742a73d69f44c4_340.jpg"},
// 	]

app.get("/",function(req,res){
	res.render("home");
});

//INDEX
app.get("/campgrounds",function(req,res){
	
	// res.render("campgrounds",{campgrounds:campgrounds});
	Campground.find({},function(err,allcampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("index",{campgrounds: allcampgrounds});
		}
	})
});

//NEW
app.get("/campgrounds/new",(req,res) => {
	res.render("new");
})

//CREATE
app.post("/campgrounds",function(req,res){ //follows REST conventions
	//getting data from form
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image:image, description: desc};
	
	Campground.create(newCampground,function(err,newlyAdded){
		if(err){
			console.log(err)
		}else{
			console.log("added Campground");
			// res.redirect("/campgrounds");
		}
	})
	
	// campgrounds.push(newCampground);
	
	//redirecting to campgrounds page;
	res.redirect("/campgrounds");
})

//SHOW
app.get("/campgrounds/:id",function(req,res){
	//find the campground with provided ID
	Campground.findById(req.params.id, function(err,foundCampground){
		if(err){
			console.log(err);
		}else{
			res.render("show",{campground: foundCampground});
		}
	})

})

app.listen(process.env.port ||3000, process.env.IP , function(){
	console.log("YelpCamp Server Started!");
})