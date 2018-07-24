
var horizontalSizeField = 10;
var verticalSizeField = 10;

var quadrants = [[]];

var ships = [
    {
        name: 'flagship', 
        count: 1,
        size: 4
    }, 
    {
        name: 'cruiser', 
        count: 2,
        size: 3
    }, 
    {
        name: 'largeBoat', 
        count: 3,
        size: 2
    }, 
    {
        name: 'smallBoat', 
        count: 4,
        size: 1
    }
];

function createField() {

    var columns = document.createElement('div');
    columns.className = "columns";
    document.body.appendChild(columns);

    for (var i = 0; i <= horizontalSizeField - 1; i++) {

        var rows = document.createElement('div');
        rows.className = "rows";
        columns.appendChild(rows);

        for (var j = 0; j <= verticalSizeField - 1; j++) {

            var node = document.createElement('div');
            node.className = "emptyNode";
            node.id = i + "_" + j;
            rows.appendChild(node);

            quadrants[i, j] = {
                HereTheShip: false,
                hasBitten: false
            };

        }

    }

}

function position() {
    
//    var currentShip = popShip();
//    
//    if (!currentShip) {
//        alert('Закончились корабли!');
//    } else {
//        alert(currentShip.name);
//    }
    var currentShip = popShip();
    getTheFirstQuadrant(currentShip);
    
}

function popShip() {
    
    if (ships.length === 0) {
        return false;
    }
    
    var min = 0;
    var max = ships.length - 1;
    
    var randomShip = getRandomShip(min, max);
    randomShip.count = randomShip.count - 1;
    
    if (randomShip.count === 0) {
        
        var deleteIndex = ships.indexOf(randomShip);
        ships.splice(deleteIndex, 1);

    }
    
    return randomShip;
    
}

function getRandomShip(min, max) {
    
    var numberShip = Math.floor(Math.random() * (max - min + 1)) + min;
    return ships[numberShip];
    
}

function moorShip(id) {
    
    createPartOfShipByID(id);
    
}

function createPartOfShipByID(id) {
    
    var quadrant = document.getElementById(id);
    quadrant.className = 'partShip';
    
}

function getDirection() {
    return Math.random() ? 'horizontal' : 'vertical';
}

function getTheFirstQuadrant(currentShip) {
    
    //var sizeOfShip = currentShip.size; 
    var indexOfSternHorizontal = Math.floor(Math.random() * horizontalSizeField);
    var indexOfSternVertical = Math.floor(Math.random() * verticalSizeField);
    var idOfStern = indexOfSternHorizontal + '_' + indexOfSternVertical;
    
    moorShip(idOfStern);
    
    //quadrants[indexOfSternHorizontal][indexOfSternVertical].HereTheShip = true;
    
}

function creationByHorizontalIsPossible(indexOfSternHorizontal, indexOfSternVertical, shipSize) {
   
    if (indexOfSternHorizontal + shipSize + 1 > horizontalSizeField) {
        return false;
    }
    ;
    if (indexOfSternVertical === 0) {
        if (quadrants[indexOfSternHorizontal][indexOfSternVertical + 1].HereTheShip) {
            return false;
        }
        ;
        if (quadrants[indexOfSternHorizontal + 1][indexOfSternVertical].HereTheShip) {
            return false;
        }
        ;
        if (quadrants[indexOfSternHorizontal + 1][indexOfSternVertical + 1].HereTheShip) {
            return false;
        }
        ;
    }
    ;
    if (indexOfSternVertical === verticalSizeField) {
        if (quadrants[indexOfSternHorizontal][indexOfSternVertical - 1].HereTheShip) {
            return false;
        }
        ;
        if (quadrants[indexOfSternHorizontal + 1][indexOfSternVertical].HereTheShip) {
            return false;
        }
        ;
        if (quadrants[indexOfSternHorizontal + 1][indexOfSternVertical + 1].HereTheShip) {
            return false;
        }
        ;
    }

}



