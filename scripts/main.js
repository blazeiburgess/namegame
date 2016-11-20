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
}

function getRandomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

main();
