var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

router.get("/", function(req, res) {
	burger.all(function(data) {
		var burgerObject = {
			burgers: data
		};
		console.log(burgerObject);
		res.render("index", burgerObject);

	});

});

router.post("/api/burgers", function(req, res) {
	burger.insertOne([
	"burger_name", "devoured"
	], [
		req.body.burger_name, req.body.devoured
	], function(result) {
		res.json({	id: result.insertId });
		res.end();

	});
});

router.put("/api/burgers/:id", function(req, res) {
	var condition = "id = " + req.params.id;

	console.log("condition", condition);

	burger.updateOne({
		devoured: req.body.devoured
	}, condition, function(result) {
		if (result.changedRows == 0) {
			return res.status(404).end();

		} else {
			res.status(200).end();
		}
	});
});

router.delete("/api/burgers/:id", function(req, res) {
	var condition = "id = " + req.params.id;

	burger.deleteOne(condition, function(result) {
		if (result.affectedRows == 0) {
			return res.status(404).end();
		} else {
			res.status(200).end();
		}
	});
});




module.exports = router;