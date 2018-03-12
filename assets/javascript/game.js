$(document).ready(function(){
	"use strict";

	var heroChosen = false;
	var enemyChosen = false;
	var enemyDead = true;

	$(".characters").on("click", function(){
		if (!heroChosen) {
			heroChosen = true;

			var heroName = $(this).data("val");
			$("#" + heroName + "Hero").removeClass("hidden");

			$(".enemyVer").removeClass("hidden");
			$("#" + heroName + "Enemy").addClass("hidden");

			$("#heroSelect").addClass("hidden");
		}
	});

	$(".enemyVer").on("click", function(){
		if (heroChosen && !enemyChosen && enemyDead) {
			enemyChosen = true;

			var enemyName = $(this).data("val");
			console.log(enemyName);
			$("#" + enemyName + "Enemy").addClass("hidden");

			$("#" + enemyName + "Battle").removeClass("hidden");

		}
	})
})
