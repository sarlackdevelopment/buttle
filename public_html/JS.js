

// 1. Залить море 12x12. При этом края-берега считаются занятыми по умолчанию. 
// 2. Решить вертикально или горизонтально стоит очередной корабль.
// 3. Для горизонтального варианта взять очередной корабль:
// 3.1. Найти положение кормы корабля - случайным образом, для этого:
// 3.1.1. Взять случайную точку на поле. Горизонталь равна i, вертикаль равна j. 
// 3.1.2. Проверить является ли она занятой.
// 3.1.3. Если является, то очистить массив ShipsId вернуться к пункту 3.1.1.
// 3.1.4. Если нет, то добавить в массив ShipsId id вида: i + "_" + j, для идентификации на поле.
// 3.1.5. Если умещаем весь корабль, то есть j равно длине корабля, тогда переход к пункту 3.
// 3.1.5. Если корабль еще не "кончился", то увеличить j на единицу, теперь j = j + 1.
// 3.1.6. Вернуться к пункту 3.1.2.


var horizontalSizeField = 12;
var verticalSizeField = 12;

var quadrants = [[]];

var ships = [
//    {
//        name: 'flagship', 
//        count: 1,
//        size: 4
//    }, 
//    {
//        name: 'cruiser', 
//        count: 2,
//        size: 3
//    }, 
//    {
//        name: 'largeBoat', 
//        count: 3,
//        size: 2
//    }, 
//    {
//        name: 'smallBoat', 
//        count: 4,
//        size: 1
//    }

    {
        name: 'cruiser', 
        count: 2,
        size: 3
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

        var quadrantsHorizontal = [];

        for (var j = 0; j <= verticalSizeField - 1; j++) {

            var node = document.createElement('div');
            
            if ((i === 0 && j === 0) || (i === 0 && j === verticalSizeField - 1) 
                || (i === horizontalSizeField - 1 && j === 0) 
                || (i === horizontalSizeField - 1 && j === verticalSizeField - 1)) {
                
                node.className = "shoreAngle";
                
                quadrantsHorizontal[j] = {
                    hasOccupied: true,
                    hasBitten: false
                }
                
            } else {
                
                var hasOccupied = false;
                
                if (i === 0 || i === horizontalSizeField - 1) {
                    node.className = "shoreHorizontal";
                    hasOccupied = true;
                } else if (j === 0 || j === verticalSizeField - 1) {
                    node.className = "shoreVertical";
                    hasOccupied = true;
                } else {
                    node.className = "emptyNode";
                }
                
                quadrantsHorizontal[j] = {
                    hasOccupied: hasOccupied,
                    hasBitten: false
                }
                
            }                         
             
            quadrants[i] = quadrantsHorizontal;
            
            node.id = i + "_" + j;
            rows.appendChild(node);

        }

    }
    
//    var stop;
//    stop = 1;

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
    //getTheFirstQuadrant(currentShip);
    createRandomShip(currentShip);
    
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









function createRandomShip(randomShip) {
    
    if (!randomShip) {
        return undefined;
    }
    
    var randomPosition = getRandomPosition();
    var shipCanCreated = false;
    var sizeShip       = randomShip.size;
    var idOfShips      = [];
    var index          = 0;    
    
    while (!shipCanCreated) {       
        
        if (randomPosition.indexCol + sizeShip >= horizontalSizeField) {            
            randomPosition = getRandomPosition();
            idOfShips      = [];                
            break;            
        }
                
        for (var i = 0; i <= sizeShip - 1; i++){
            
            var currentIndex = randomPosition.indexCol + i;
            
            if (hasOccupied(randomPosition.indexRow, currentIndex)) {                
                randomPosition = getRandomPosition();
                idOfShips      = [];                
                break;
            }
            
            idOfShips[index] = randomPosition.indexCol + '_' + currentIndex;
            index++;
            
            if (i === sizeShip - 1) {
                shipCanCreated = true;   
            }
            
        }
        
        for (var i = 0; i <= idOfShips.length - 1; i++) {
            createPartOfShipByID(idOfShips[i]);
            occupied(idOfShips[i]);                                  
        }
        
    }
    
}

function getRandomPosition() {
 
    var max = horizontalSizeField - 2;
    var min = 1;
    var indexRow = Math.floor(Math.random() * (max - min + 1)) + min;

    var max = verticalSizeField - 2;
    var min = 1;
    var indexCol = Math.floor(Math.random() * (max - min + 1)) + min;
    
    return {
        'indexRow': indexRow, 
        'indexCol': indexCol
    };
    
}

function hasOccupied(indexRow, indexCol) {
    
    if (quadrants[indexRow + 1][indexCol - 1].hasOccupied) {
        return true;
    }
    
    if (quadrants[indexRow + 1][indexCol].hasOccupied) {
        return true;
    }
    
    if (quadrants[indexRow + 1][indexCol + 1].hasOccupied) {
        return true;
    }
    
    if (quadrants[indexRow][indexCol - 1].hasOccupied) {
        return true;
    }
    
    if (quadrants[indexRow][indexCol].hasOccupied) {
        return true;
    }
    
    if (quadrants[indexRow][indexCol + 1].hasOccupied) {
        return true;
    }
    
    if (quadrants[indexRow - 1][indexCol - 1].hasOccupied) {
        return true;
    }
    
    if (quadrants[indexRow - 1][indexCol].hasOccupied) {
        return true;
    }
    
    if (quadrants[indexRow - 1][indexCol + 1].hasOccupied) {
        return true;
    }
    
    return false;

}

function occupied(id) {
    
    var partOfID    = id.split("_");
    var firstIndex  = parseInt(partOfID[0]);
    var secondIndex = parseInt(partOfID[1]);
    
    quadrants[firstIndex][secondIndex].hasOccupied = true;
    
}

