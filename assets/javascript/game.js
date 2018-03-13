$(document).ready(function(){
	"use strict";

	var heroChosen = false;
	var heroDead = true;
	var enemyChosen = false;
	var enemyDead = true;
	var defeatedEnemy = 0;
	var heroName;
	var heroHealth;
	var enemyName;
	var enemyHealth;
	
	// reveals all buttons
	function revealActions(){
		$("#heroActions").removeClass("hidden");
		$("#results").removeClass("hidden");
		$("#reset").removeClass("hidden");
	}

	// hides all buttons
	function hideActions(){
		$("#heroActions").addClass("hidden");
		$("#results").addClass("hidden");
		$("#reset").addClass("hidden");
	}

	// attack and block random number generator
	function randAttackBlock(){
		return Math.floor(Math.random() * 35);
	}

	// decides if enemy will attack or block
	function enemyAttackBlock(){
		return Math.floor(Math.random() * 2);
	}

	// player selects a new enemy
	function enemyLost(){
		$("#heroAction").html("You have defeated your opponent. Select your next enemy.");
		// clears results
		$("#enemyAction").empty();
		$("#" + enemyName + "Battle").addClass("hidden");
		enemyChosen = false;
		enemyDead = true;
		defeatedEnemy++;
	}

	// player is notified that they lost
	function heroLost(){
		heroDead = true;
		$("#heroAction").html("You were defeated. The galaxy is in chaos..");
		// clears results
		$("#enemyAction").empty();
	}

	function gameReset(){
		// hides everything except the hero selection
		$("#heroActions").addClass("hidden");
		$(".enemyVer").addClass("hidden");
		hideActions();
		$("#" + heroName + "Hero").addClass("hidden");
		$("#" + enemyName + "Battle").addClass("hidden");
		$("#heroSelect").removeClass("hidden");
		$(".gameSection").addClass("hidden");

		// resets variables 
		heroChosen = false;
		heroDead = true;
		enemyChosen = false;
		enemyDead = true;
		heroName = "";
		heroHealth = 0;
		enemyName = "";
		enemyHealth = 0;
		defeatedEnemy = 0;
	}

	// user selects their hero
	$(".characters").on("click", function(){
		if (!heroChosen) {
			heroChosen = true;
			heroDead = false;

			// collects selected hero information
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

			// shows the rest of the game section
			$(".enemyVer").removeClass("hidden");
			$("#" + heroName + "Enemy").addClass("hidden");
			$(".gameSection").removeClass("hidden");
			$("#heroSelect").addClass("hidden");
		}
	});

	// user selects a character to fight
	$(".enemyVer").on("click", function(){
		if (heroChosen && !heroDead && !enemyChosen && enemyDead) {
			enemyChosen = true;
			enemyDead = false;

			// collects selected enemy information
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

			// shows enemy character and action buttons
			$("#" + enemyName + "Battle").removeClass("hidden");
			revealActions();

			// adds instructional text
			$("#heroAction").empty();
			$("#enemyAction").html("Your Hero is waiting for your orders.");
		}
	});

	$("#attack").on("click", function(){
		if(!heroDead && !enemyDead){
			
			// shows player attack damage
			var heroAttack = randAttackBlock();
			$("#heroAction").html(heroName + " attacked for " + heroAttack + " points of damage.");
			
			var enemyAction = enemyAttackBlock();

			// enemy attacks
			if (enemyAction === 1){
				var enemyAttack = randAttackBlock();
				heroHealth -= enemyAttack;
				enemyHealth -= heroAttack;

				// shows enemy attack damage 
				$("#enemyAction").html(enemyName + " attacked for " + enemyAttack + " points of damage.");
				//updates hero health
				$("." + heroName + "Health").html(heroHealth);

			// enemy defends	
			} else {
				var enemyBlock = randAttackBlock();
				$("#enemyAction").html(enemyName + " blocked reducing damage by " + enemyBlock);
				// if hero attack is greater than enemy block reduce enemy health
				if (heroAttack > enemyBlock){
					enemyHealth -= (heroAttack - enemyBlock);
				}
			}

			// updates enemy health
			$("." + enemyName + "Health").html(enemyHealth);

			// if hero defeats an enemy, select a new one
			if(heroHealth > 0 && enemyHealth <= 0 && defeatedEnemy < 3){
				enemyLost();

			// if hero loses all health, player losses	
			} else if (heroHealth <= 0){
				heroLost();
			}

			// if player defeats all enemies, player wins
			if (heroHealth > 0 && enemyHealth <= 0 && defeatedEnemy === 3){
				$("#heroAction").html("You have defeated everyone standing in your way. You rule the galaxy.");
				$("#enemyAction").empty();
			}
		}
	});

	$("#block").on("click", function(){
		if(!heroDead && !enemyDead){
			// generates hero block
			var heroBlock = randAttackBlock();
			$("#heroAction").html(heroName + " blocked reducing damage by " + heroBlock);

			var enemyAction = enemyAttackBlock();

			// enemy attacks
			if (enemyAction === 1){
				// if enemy attack is greater than hero block, hero loses health
				var enemyAttack = randAttackBlock();
				$("#enemyAction").html(enemyName + " attacked for " + enemyAttack + " points of damage.");
				if (enemyAttack > heroBlock){
					heroHealth -= (enemyAttack - heroBlock);
				}
				
			// if both characters block, nothing happens	
			} else {
				$("#enemyAction").html("Both characters blocked. Nothing happened.");
				$("#heroAction").empty();
			}
		}
	});

	// resets the game
	$("#reset").on("click", function(){
		gameReset();
	});
	
})