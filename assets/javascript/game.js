$(document).ready(function(){
	"use strict";

	var heroChosen = false;
	var heroDead = true;
	var enemyChosen = false;
	var enemyDead = true;

	var heroName;
	var heroHealth;

	var enemyName;
	var enemyHealth;

	var defeatedEnemy = 0;

	

	$(".characters").on("click", function(){
		if (!heroChosen) {
			heroChosen = true;
			heroDead = false;

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
		if (heroChosen && !heroDead && !enemyChosen && enemyDead) {
			enemyChosen = true;
			enemyDead = false;

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
			

			$("." + enemyName + "Health").html(enemyHealth);

			$("#" + enemyName + "Battle").removeClass("hidden");
			revealActions();
			$("#heroAction").empty();

			$("#enemyAction").html("Your Hero is waiting for your orders.");

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
		if(!heroDead && !enemyDead){
			var heroAttack = randAttackBlock();
		
			$("#heroAction").html(heroName + " attacked for " + heroAttack + " points of damage.");
			
			var enemyAction = enemyAttackBlock();
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

			if(heroHealth > 0 && enemyHealth <= 0 && defeatedEnemy < 3){
				enemyLost();
			} else if (heroHealth <= 0){
				heroLost();
			}

			if (heroHealth > 0 && enemyHealth <= 0 && defeatedEnemy === 3){
				$("#heroAction").html("You have defeated everyone standing in your way. You rule the galaxy.");
				$("#enemyAction").empty();
			}


		}
	});

	$("#block").on("click", function(){
		if(!heroDead && !enemyDead){
			var heroBlock = randAttackBlock();
			
			$("#heroAction").html(heroName + " blocked reducing damage by " + heroBlock);
			var enemyAction = enemyAttackBlock();
			if (enemyAction === 1){
				var enemyAttack = randAttackBlock();
				$("#enemyAction").html(enemyName + " attacked for " + enemyAttack + " points of damage.");

				if (enemyAttack > heroBlock){
					heroHealth -= (enemyAttack - heroBlock);
				}
				
			} else {
				$("#enemyAction").html("Both characters blocked. Nothing happened.");
				$("#heroAction").empty();
			}
		}
	})

	function enemyLost(){
		$("#heroAction").html("You have defeated your opponent. Select your next enemy.");
		// clears results
		$("#enemyAction").empty();
		$("#" + enemyName + "Battle").addClass("hidden");
		enemyChosen = false;
		enemyDead = true;
		defeatedEnemy++;
	}

	function heroLost(){
		heroDead = true;
		$("#heroAction").html("You were defeated. The galaxy is in chaos..");
		// clears results
		$("#enemyAction").empty();
	}

	

})
