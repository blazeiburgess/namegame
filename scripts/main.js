var wins = 0;
var losses = 0;
var timeTaken = 0;
var allTimes = [];
var persons, gameMode, startTime, endTime, clicks, doNotClick, lastClickTime;

gameMode = '';
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
  clicks = 0;
  displayPersons(selectionOfFive);
}

function displayPersons(selectionOfFive) {
  var app = $("#app");
  app.empty();
  var solutionId = selectionOfFive.indexOf(getRandomFromArray(selectionOfFive));
  doNotClick = [solutionId];
  console.log(solutionId);
  switch (gameMode) {
    case 'reverse':
      app.append('Who is this? <br /><img class="' + solutionId + '" name="' + selectionOfFive[solutionId].name + '" src="' + selectionOfFive[solutionId].url + '" /><br />')
      app.append('<div class="count">' + displayCount() + '</div><br /><br />');
      for (var i = 0; i < selectionOfFive.length; i++) {
	app.append('<div class="parent-div" align="center">(' + (i + 1) + ')<span class="pictures ' + i + '" id="' + i + '">' + selectionOfFive[i].name + '</span><img style="display: inline;" class="hidden" id="' + i + '" name="' + selectionOfFive[i].name + '" src="' + selectionOfFive[i].url + '" /></div>');
      }
      break;

    default:
      app.append('<h2>Who is ' + selectionOfFive[solutionId].name + "?");
      app.append('<div class="count">' + displayCount() + '</div>');
      for (var i = 0; i < selectionOfFive.length; i++) {
	app.append('<div class="parent-div"><span class="' + i + ' hidden">' + selectionOfFive[i].name + '</span><img style="display: inline;" class="pictures" id="' + i + '" name="' + selectionOfFive[i].name + '" src="' + selectionOfFive[i].url + '" /><br />(' + (i + 1) + ')</div>');
      }
  }

  setTimeout(function () {
    revealFaces(selectionOfFive, solutionId);
  }, 9000)
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
  console.log(isCorrect);
  if (gameMode !== 'reverse') {
    var overlay = $('span.' + userInput);
  } else {
    var overlay = $('img#' + userInput, 'span.' + userInput);
  }
  if (isCorrect) {
    endTime = getTime();
    $('.pictures').off();
    overlay.removeClass('hidden');
    overlay.addClass('correct');
    wins++;
    timeTaken = endTime - startTime;
    allTimes.push(timeTaken);
    setTimeout(main, 900);
    lastClickTime = 0;
  } else {
    overlay.removeClass('hidden');
    overlay.addClass('wrong');
    doNotClick.push(userInput);
    lastClickTime = getTime();
    losses++;
  }
  clicks++;
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

function revealFaces(selectionOfFive, solutionId) {
  var randPerson = getRandomFromArray(selectionOfFive); 
  var randPersonIndex = selectionOfFive.indexOf(randPerson);
  selectionOfFive.slice(randPersonIndex, 1);
  if (doNotClick.indexOf(randPersonIndex) < 0) { 
    doNotClick.push(randPersonIndex);
    $("#" + randPersonIndex).click();
  } 
  if (clicks < 4) {
    setTimeout(function () {
      revealFaces(selectionOfFive, solutionId);
    }, 9000);
  }
}


main();
