// Countries and maps basic logic
class Country {
    constructor(name, borders) {
        this.name = name;
        this.borders = borders
        this.troops = 0;
    }
    atack() {
        return this.borders;
    }
    status() {
        return this.troops;
    }
    addTrops(add) {
        this.troops += add;
    }
    removeTrops(remove) {
        this.troops -= remove;
    }
}

// Declare all countries and create map
const argentina = new Country('Argentina', ['Brasil', 'Peru']);
const brasil = new Country('Brasil', ['Argentina', 'Peru', 'Colombia']);
const peru = new Country('Peru', ['Argentina', 'Brasil', 'Colombia']);
const colombia = new Country('Colombia', ['Peru', 'Brasil']);

// Get country atributes and actions

// Argentina
console.log(argentina.name);
console.log(argentina.atack());
// Brasil
console.log(brasil.name);
console.log(brasil.atack());
// Peru
console.log(peru.name);
console.log(peru.atack());
// Colombia
console.log(colombia.name);
console.log(colombia.atack());

// Some add and remove troops for testing
argentina.addTrops(20);
argentina.removeTrops(5);
console.log(argentina.status());

brasil.addTrops(15);
brasil.removeTrops(2);
console.log(brasil.status());

peru.addTrops(55);
peru.removeTrops(24);
console.log(peru.status());


colombia.addTrops(22);
colombia.removeTrops(10);
console.log(colombia.status());

// User and goals basic logic
class Player {
    constructor(name) {
        this.name = name;
        this.goal = this.randomGoal();
    }
    randomGoal () {
        this.goals = [
            'Goal 1',
            'Goal 2',
            'Goal 3',
            'Goal 4',
            'Goal 5',
            'Goal 6',
            'Goal 7',
            'Goal 8',
            'Goal 9',
            'Goal 10',
        ]
        console.log(this.goals[Math.floor(Math.random() * 10)]);
    }
}

let p1 = new Player('wwwxkz');