var wins = 0;
var losses = 0;
var persons, gameMode;

function main() {
  $.getJSON('http://api.namegame.willowtreemobile.com/', function(result) { 
    if (persons === undefined) {
      persons = result
      makePersonsFromJSON(persons);
    } else {
      makePersonsFromJSON(persons);
    }
  });
}

function makePersonsFromJSON(personsArray) {
  var selectionOfFive = [];
  var usedIndexes = [];
  for (var i = 0; i < 5; i++) {
    var randPerson = getRandomFromArray(personsArray);
    if (selectionOfFive.indexOf(randPerson) >= 0) {
      i--;
    } else {
      selectionOfFive.push(randPerson);
    }
  }
  displayPersons(selectionOfFive);
}

function displayPersons(selectionOfFive) {
  var app = $("#app");
  app.empty();
  var solutionId = selectionOfFive.indexOf(getRandomFromArray(selectionOfFive));
  console.log(solutionId);
  app.append('<h2>Who is ' + selectionOfFive[solutionId].name + "?"); 
  for (var i = 0; i < selectionOfFive.length; i++) {
    app.append('<div class="parent-div"><span class="' + i + ' hidden">' + selectionOfFive[i].name + '</span><img style="display: inline;" class="pictures" id="' + i + '" name="' + selectionOfFive[i].name + '" src="' + selectionOfFive[i].url + '" /><br />(' + (i + 1) + ')</div>');
  }
  getUserInput(solutionId);
}

function getUserInput(solutionId) {
  var userInput;
  $('.pictures').click(function(event) {
    $(this).off();
    userInput = this.id;
    handleUserInput(userInput == solutionId, userInput);
  });
  $(document).on('keydown', function (e) {
    switch (e.keyCode) {
      case 49:
      case 97:
	$('#0').click();
	break;

      case 50:
      case 98:
	$('#1').click();
	break;

      case 51:
      case 99:
	$('#2').click();
	break;

      case 52:
      case 100:
	$('#3').click();
	break;

      case 53:
      case 101:
	$('#4').click();
	break;

      default:
	console.log(e.keyCode + ' key pressed');

    }
  });
}

function handleUserInput(isCorrect, userInput) {
  var overlay = $('span.' + userInput);
  if (isCorrect) {
    $('.pictures').off();
    overlay.removeClass('hidden');
    overlay.addClass('correct');
    setTimeout(main, 900);
    wins++;
  } else {
    overlay.removeClass('hidden');
    overlay.addClass('wrong');
    losses++;
  }
}

function getRandomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

main();
