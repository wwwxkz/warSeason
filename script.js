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
    setColor(color) {
        this.color = color;
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
                            this.borders[key].setColor(this.color);
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
    randomGoal() {
        let goals = [
            'Conquer 2 countries',
            'Defeat enemy with color N',
        ]
        return goals[Math.floor(Math.random() * 10)];
    }
    setColor(color) {
        this.color = color;
    }
}

class Round {
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
    constructor(countries, players) {
        this.countries = countries;
        this.players = players;
        this.setPlayersColor();
        this.setCountriesOwner();
        this.getCountries();
    }
    getCountries() {
        Object.keys(this.countries).forEach(key => {
            //console.log(key, '- Use country ->', this.countries[key]);
            console.log(key, '- Use country ->', this.countries[key].name);
            console.log(key, '- Use country ->', this.countries[key].owner);
            console.log(key, '- Use country ->', this.countries[key].troops);
        });
    }
    setPlayersColor() {
        let colors = [
            '#FFFACD',
            '#B22222',
            '#FF7F50',
            '#F0F8FF',
            '#000000',
            '#0000FF',
            '#808080',
            '#FF69B4',
            '#800080',
            '#FF0000',
        ]
        const randomly = () => Math.random() - 0.5;
        let randomColors = [].concat(colors).sort(randomly);
        Object.keys(this.players).forEach(key => {
            this.players[key].setColor(randomColors[key]);
        })
    }
    // Map func
    setCountriesOwner() {
        let quotient = Math.floor(this.countries.length / this.players.length);
        let remainder = this.countries.length % this.players.length;
        let pkey = 0;
        let lkey = 0;
        const randomly = () => Math.random() - 0.5;
        let randomCountries = [].concat(this.countries).sort(randomly);
        Object.keys(randomCountries).forEach(key => {
            if (this.players.length == pkey) {
                quotient = remainder;
            }
            if (key == lkey + quotient) {
                lkey = key;
                pkey += 1;
            }
            randomCountries[key].setOwner(this.players[pkey]);
            randomCountries[key].setColor(this.players[pkey].color);
        });
    }
    status(id) {
        console.log(this.countries[id].status());
    }
}

class Game {
    constructor() {
        const argentina = new Country('Argentina');
        const peru = new Country('Peru');
        const brasil = new Country('Brasil');
        const colombia = new Country('Colombia');
        argentina.setBorders([brasil, peru]);
        peru.setBorders([argentina, brasil, colombia]);
        brasil.setBorders([argentina, peru, colombia]);
        colombia.setBorders([peru, brasil]);
        const p1 = new Player('wwwxkz');
        const p2 = new Player('klaus');
        const players = [p1, p2];
        this.players = players;
        const countries = [argentina, brasil, peru, colombia];
        this.countries = countries;

        this.menu = new Menu(countries, players);

        this.round = new Round();

        this.turn();
    }
    turn() {
        this.players.forEach(player => {
            let countryInput = prompt(player.name + " - Add N trops to which Country?");
            this.countries.forEach(country => {
                if (country.name == countryInput) {
                    if (country.owner == player) {
                        let amount = prompt(player.name + " - How many?");
                        country.addTrops(parseInt(amount));
                    }
                }
            });
            countryInput = prompt(player.name + " - With which country you want to atack?");
            let who = prompt(player.name + " - Which you want to atack?");
            this.countries.forEach(country => {
                if (country.name == countryInput) {
                    if (country.owner == player) {
                        country.atack(who);
                    }
                }
            });
            this.menu.getCountries()
        });
        this.round.nextRound();
    }
}

const game = new Game()