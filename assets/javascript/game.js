$(document).ready(function(){
	"use strict";

	var heroChosen = false;
	var enemyChosen = false;
	var enemyDead = true;

	var heroName;
	var heroHealth;

	var enemyName;
	var enemyHealth;

	$(".characters").on("click", function(){
		if (!heroChosen) {
			heroChosen = true;

			heroName = $(this).data("val");
			$("#" + heroName + "Hero").removeClass("hidden");

			if (heroName === "luke"){
				heroHealth = 350;
			} else if (heroName === "obi"){
				heroHealth = 400;
			} else if (heroName === "maul"){
				heroHealth = 500;
			} else {
				heroHealth = 450;
			}
			$("." + heroName + "Health").html(heroHealth);

			$(".enemyVer").removeClass("hidden");
			$("#" + heroName + "Enemy").addClass("hidden");

			$("#heroSelect").addClass("hidden");
		}
	});

	$(".enemyVer").on("click", function(){
		if (heroChosen && !enemyChosen && enemyDead) {
			enemyChosen = true;

			enemyName = $(this).data("val");
			
			$("#" + enemyName + "Enemy").addClass("hidden");

			if (enemyName === "luke"){
				enemyHealth = 350;
			} else if (enemyName === "obi"){
				enemyHealth = 400;
			} else if (enemyName === "maul"){
				enemyHealth = 500;
			} else {
				enemyHealth = 450;
			}
			console.log(enemyHealth);
			console.log(enemyName);
			// DOM wont take enemyHealth changes
			$("." + enemyName + "Health").html(enemyHealth);
			console.log($("#" + enemyName + "Health"))

			$("#" + enemyName + "Battle").removeClass("hidden");
			revealActions();

		}
	})

	function revealActions(){
		$("#heroActions").removeClass("hidden");
		$("#results").removeClass("hidden");
	}

	function hideActions(){
		$("#heroActions").addClass("hidden");
		("#results").addClass("hidden");
	}

	function randAttackBlock(){
		return Math.floor(Math.random() * 35);
	}

	function enemyAttackBlock(){
		return Math.floor(Math.random() * 2);
	}

	$("#attack").on("click", function(){
		var heroAttack = randAttackBlock();
		var enemyAction = enemyAttackBlock();
		$("#heroAction").html(heroName + " attacked for " + heroAttack + " points of damage.");

		if (enemyAction === 1){
			var enemyAttack = randAttackBlock();
			$("#enemyAction").html(enemyName + " attacked for " + enemyAttack + " points of damage.");

			heroHealth -= enemyAttack;
			enemyHealth -= heroAttack;
			$("." + heroName + "Health").html(heroHealth);
			

		} else {
			var enemyBlock = randAttackBlock();
			$("#enemyAction").html(enemyName + " blocked reducing damage by " + enemyBlock);
			if (heroAttack > enemyBlock){
				enemyHealth -= (heroAttack - enemyBlock);
			}
			

		}
		$("." + enemyName + "Health").html(enemyHealth);

	})
})
