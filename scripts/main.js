function main() {
  $.getJSON('http://api.namegame.willowtreemobile.com/', function(result) { 
    makePersonsFromJSON(result);
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
}

function handleUserInput(isCorrect, userInput) {
  var overlay = $('span.' + userInput);
  if (isCorrect) {
    $('.pictures').off();
    overlay.removeClass('hidden');
    overlay.addClass('correct');
    setTimeout(main, 9000);
  } else {
    overlay.removeClass('hidden');
    overlay.addClass('wrong');
  }
}

function getRandomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

main();
