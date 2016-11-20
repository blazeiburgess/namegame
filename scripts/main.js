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
  console.log(selectionOfFive);
}

function getRandomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

main();
