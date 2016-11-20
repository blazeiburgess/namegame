var wins = 0;
var losses = 0;
var timeTaken = 0;
var allTimes = [];
var persons, gameMode, startTime, endTime;

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
    if (gameMode == 'matts') {
      var randPerson = getRandomFromArray(personsArray.filter(getMatts));
    } else {
      var randPerson = getRandomFromArray(personsArray);
    }
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
  app.append('<div class="count">' + displayCount() + '</div>');
  for (var i = 0; i < selectionOfFive.length; i++) {
    app.append('<div class="parent-div"><span class="' + i + ' hidden">' + selectionOfFive[i].name + '</span><img style="display: inline;" class="pictures" id="' + i + '" name="' + selectionOfFive[i].name + '" src="' + selectionOfFive[i].url + '" /><br />(' + (i + 1) + ')</div>');
  }
  startTime = getTime();
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
    endTime = getTime();
    $('.pictures').off();
    overlay.removeClass('hidden');
    overlay.addClass('correct');
    wins++;
    timeTaken = endTime - startTime;
    allTimes.push(timeTaken);
    setTimeout(main, 900);
  } else {
    overlay.removeClass('hidden');
    overlay.addClass('wrong');
    losses++;
  }
  $('.count').html(displayCount());
}

function getRandomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getTime() {
  return new Date().getTime() / 1000;
}

function averageTime() {
  if (allTimes.length > 0) {
    var sum = 0;
    for (var i = 0; i < allTimes.length; i++) {
      sum += allTimes[i]
    }
    return Math.floor(sum / allTimes.length);
  } else {
    return 0
  }
}

function displayCount() {
  return '<br /><span class="wins">Wins: ' + wins + '</span><span class="losses">Losses: ' + losses + '</span><span>Time taken to get last answer (seconds): '+ Math.floor(timeTaken) + '</span>' + '<span>Average time taken (seconds): ' + averageTime() +  '<br />';
}

function getMatts (person) {
  return person.name.indexOf('Mat') == 0;
}


main();
