class Country {
    constructor(name) {
        this.name = name;
        this.troops = 1;
    }
    setBorders(borders) {
        this.borders = borders
    }
    setOwner(player) {
        this.owner = player;
    }
    borders() {
        return this.borders;
    }
    status() {
        return this.troops;
    }
    setTrops(set) {
        this.troops = set;
    }
    addTrops(add) {
        this.troops += add;
    }
    removeTrops(remove) {
        this.troops -= remove;
    }
    atack(who) {
        if (this.troops > 1) {
            Object.keys(this.borders).forEach(key => {
                if (who == this.borders[key].name) {
                    this.removeTrops(this.rng());
                    if (this.status() <= 0) {
                        this.borders[key].setTrops(1);
                    }
                    if (this.status() >= 2) {
                        this.borders[key].removeTrops(this.rng());
                        if (this.borders[key].status() <= 0) {
                            this.borders[key].setTrops(1);
                            this.removeTrops(1);
                            this.borders[key].setOwner(this.owner);
                        }    
                    }
                }
            });    
        } 
        else {
            console.log('You can not atack with just one troop')
        } 
    }
    rng() {
        return Math.floor(Math.random() * 4); 
    }
}

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
        return this.goals[Math.floor(Math.random() * 10)];
    }
}

class Rounds {
    constructor() {
        this.round = 0;
    }
    nextRound() {
        this.round += 1;
        this.verifyWin();
    }
    verifyWin() {
        // Loop thorgh users and verify if someone won,
        // Checks win just at the end of the round
        console.log('Won');
        this.wonScreen();
    }
    wonScreen() {
        this.restartGame();
        return;
    }
    restartGame() {
        // Verifies if everyone clicked before starting a new game
        return;
    }
}

class Menu {
    // Get map instead of countries
    constructor(countries) {
        this.countries = countries;
        this.getCountries();
    }
    getCountries() {
        Object.keys(this.countries).forEach(key => {
            console.log(key, '- Use country ->', this.countries[key]);
        });
    }
    status(id) {
        console.log(this.countries[id].status());
    }
    addTrops(id, add) {
        this.countries[id].addTrops(add);
    }
    removeTrops(id, remove) {
        this.countries[id].addTrops(remove);
    }
    atack(id, who) {
        this.countries[id].atack(who);
    }
}

class Game {
    constructor() {
    }
}

new Game();

// Set countries basic atributes
const argentina = new Country('Argentina');
const peru = new Country('Peru');
const brasil = new Country('Brasil');
const colombia = new Country('Colombia');
argentina.setBorders([brasil, peru]);
peru.setBorders([argentina, brasil, colombia]);
brasil.setBorders([argentina, peru, colombia]);
colombia.setBorders([peru, brasil]);
// Set players and relates to countries
const p1 = new Player('wwwxkz');
const p2 = new Player('klaus');
argentina.setOwner(p2);
peru.setOwner(p2);
brasil.setOwner(p1);
colombia.setOwner(p1);
// Set countries list and opens menu
const countries = [argentina, brasil, peru, colombia];
const menu = new Menu(countries);
