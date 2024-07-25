const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
let difficulty = 0;
let foundHat = false;
let cordX = 0;
let cordY = 0;

function buildMap(arr) {
    const map = [];
    arr.forEach(element => {
        const mapSection = element.join('');
        map.push(mapSection)
    });
    console.log(map.join("\n"));
}

function keepInYBounds(arr) {
    if (cordY > (arr.length - 1)) {
        cordY = arr.length - 1;
        console.log(`Yes, I kept cord Y at ${cordY}`);
    } else if (cordY < 0) {
        cordY = 0;
        console.log(`Yes, I kept cord Y at ${cordY}`);
    }
}

function keepInXBounds(arr) {
    if (cordX > (arr[cordY].length - 1)) {
        cordX = arr[cordY].length - 1;
    } else if (cordX < 0) {
        cordX = 0;
    }
}

function checkForStuff(arr) {
    if(arr[cordY][cordX] === "O") {
        console.log("Oh no! You fell on da hole!");
        foundHat = true;
    } else if (arr[cordY][cordX] === "^") {
        foundHat = true;
        console.log("YAYYYY YOU FOUND THE HAT \n This game will selfdestruct in:");
        setTimeout(() => {
            console.log("3...");
        }, 1000);
        setTimeout(() => {
            console.log("2...");
        }, 2000);
        setTimeout(() => {
            console.log("1...");
        }, 3000);
    }
}

function selectDifficulty(str) {
    if (str === "easy") {
        difficulty = 4;
    } else if (str === "medium") {
        difficulty = 3;
    } else if (str === "hard") {
        difficulty = 2;
    } else if (str === "imposible") {
        difficulty = 1;
    }
}

function generateChunk(size) {
    let chunk = [];
    for (let i = 0; i < size; i++) {
        let mapGenerator = Math.floor(Math.random() * difficulty);
        if (mapGenerator === 0) {
            chunk.push(hole);
        } else {
            chunk.push(fieldCharacter);
        }
    }
    return chunk
}

function generateMap(func, height, size) {
    let newField = [];
    for (i = 0; i < height; i++) {
        newField.push(func(size));
    }
    console.log(newField.join("\n"));
    return newField;
}

selectDifficulty("imposible")
generateMap(generateChunk, 8, 30);

class Field {
    constructor(arr) {
        this._arr = arr;
    }

    movement(input) {
        switch (input) {
            case "d":
                cordX++
                this.movePlayer();
                this.printField();
                break;
            case "a":
                cordX--;
                this.movePlayer();
                this.printField();
                break;
            case "w":
                cordY--;
                this.movePlayer();
                this.printField();
                break;
            case "s":
                cordY++;
                this.movePlayer();
                this.printField();
                break;
            case "h":
                console.log("Use the keys WASD to move through the map, press ENTER to send your movement");
                break;
            case "q" :
                console.log("You pressed Q quiting game");
                break;
            case "p":
                this.movePlayer();
                this.printField();
                break;
            default:
                console.log("Thats not a movement key. Press H if you need help")
        }
    }

    movePlayer() {
        let map = this._arr;
        if (cordY >= 0 && cordY <= (map.length - 1) && cordX >= 0 && cordX <= (map[cordY].length - 1)) {
            checkForStuff(map);
            map[cordY].splice(cordX, 1, "*");
            return map;
        } else {
            console.log("YOU ARE RUNNING OUT OF BOUNDS!!!");
            keepInYBounds(map);
            keepInXBounds(map);
        }
    }

    generateField(width, height, difficulty) {
        selectDifficulty(difficulty);
        generateMap(generateChunk(width), height)
    }

    printField() {
        buildMap(this._arr);
    }
}

const myField = new Field([
    ['*', '░', 'O', '░', '░', 'O', 'O', '░', '░', '░'],
    ['░', 'O', 'O', '░', '░', 'O', '░', '░', 'O', '░'],
    ['░', '░', '░', 'O', 'O', '░', '░', '░', '░', '░'],
    ['O', '░', '░', 'O', 'O', '░', 'O', '░', '░', '░'],
    ['O', 'O', '░', 'O', '░', '░', 'O', '░', 'O', '░'],
    ['O', '░', '░', '░', '░', 'O', '^', '░', '░', '░'],
    ['░', 'O', '░', 'O', '░', '░', 'O', 'O', '░', '░'],
    ['░', 'O', 'O', '░', '░', '░', '░', '░', 'O', '░'],
  ]);

// console.log("Press H for Help")
// myField.printField();
// while (foundHat === false) {
//     const gamePrompt = prompt("Which direction would you like to move? \n");
//     myField.movement(gamePrompt);
//     if (gamePrompt === "q") {
//         foundHat = true;
//         console.clear;
//     }
// }

/*
Check for holes
Change the player position
Check if we found the hat
Keep the player inside the world
*/
