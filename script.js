class Country {
    constructor(name, code) {
        this.name = name;
        this.code = code;
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
            'Conquer 3 countries',
            'Conquer 24 countries',
            'Conquer the world',
        ]
        return goals[Math.floor(Math.random() * 3)];
    }
    setColor(color) {
        this.color = color;
    }
}

class Round {
    constructor() {
        this.round = 0;
    }
    nextRound(players, countries) {
        this.round += 1;
        this.verifyWin(players, countries);
    }
    verifyWin(players, countries) {
        // Conquer 3 countries
        // Conquer 24 countries
        let countriesNumber = 0;
        // Conquer the world
        let world = 0;
        players.forEach(player => {
            if (player.goal == 'Conquer 3 countries') {
                countries.forEach(country => {
                    if (country.owner == player) {
                        countriesNumber += 1;
                    }
                    else {
                        world = 1;
                    }
                });
                if (countriesNumber == 3 || world == 0) {
                    this.wonScreen(player);
                }
            }
            if (player.goal == 'Conquer 24 countries') {
                countries.forEach(country => {
                    if (country.owner == player) {
                        countries += 1;
                    }
                    else {
                        world = 1;
                    }
                });
                if (countries == 24 || world == 0) {
                    this.wonScreen(player);
                } 
            }
            if (player.goal == 'Conquer the world') {
                countries.forEach(country => {
                    if (country.owner != player) {
                        world = 1;
                    }
                });
                if (world == 0) {
                    this.wonScreen(player);
                } 
            }
        });
    }
    wonScreen(player) {
        console.log(player, ' Won');
        this.restartGame();
        return;
    }
    restartGame() {
        // Verifies if everyone clicked before starting a new game
        throw new Error("Restarting");
        return;
    }
}

class Map {
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
            console.log(key, '- Country name ->', this.countries[key].name);
            console.log('# Country owner ->', this.countries[key].owner);
            console.log('# Country troops ->', this.countries[key].troops);
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

// South America
const py = new Country('Paraguay', 'PY');
const co = new Country('Colombia', 'CO');
const ve = new Country('Venezuela', 'VE'); // Algeria
const cl = new Country('Chile', 'CL');
const sr = new Country('Suriname', 'SR');
const bo = new Country('Bolivia', 'BO');
const ec = new Country('Ecuador', 'EC');
const ar = new Country('Argentina', 'AR');
const gy = new Country('Guyana', 'GY');
const br = new Country('Brazil', 'BR');
const pe = new Country('Peru', 'PE');
const uy = new Country('Uruguay', 'UY');
const fk = new Country('Falkland Is.', 'FK');
py.setBorders([ar, bo, br]);
co.setBorders([ec, pe, br, ve]);
ve.setBorders([co, br, gy]);
cl.setBorders([ar, bo, pe]);
sr.setBorders([gy, bo, br]);
bo.setBorders([ar, pe, br, cl, py]);
ec.setBorders([pe, co]);
ar.setBorders([uy, py, br, cl, bo]);
gy.setBorders([br, sr, ve]);
br.setBorders([uy, ar, py, bo, pe, co, ve, gy, sr]);
pe.setBorders([cl, bo, br, ec, co]);
uy.setBorders([br, ar]);
fk.setBorders([ar]);
const southAmerica = [py, co, ve, cl, sr, bo, ec, ar, gy, br, pe, uy, fk];

// North America
// const mexico = new Country('Mexico');
// const california = new Country('California');
// const newYork = new Country('New York');
// const labrador = new Country('Labrador');
// const ottawa = new Country('Ottawa');
// const vancouver = new Country('Vancouver');
// const mackenzie = new Country('Mackenzie');
// const alaska = new Country('Alaska');
// const greenland = new Country('Greenland');
// mexico.setBorders([california, newYork]); // Colombia
// california.setBorders([newYork, ottawa, vancouver, mexico]);
// newYork.setBorders([ottawa, california, mexico, labrador]);
// labrador.setBorders([ottawa, newYork, greenland]);
// ottawa.setBorders([newYork, california, labrador, vancouver, mackenzie]);
// vancouver.setBorders([ottawa, california, mackenzie, alaska]);
// mackenzie.setBorders([alaska, vancouver]);
// alaska.setBorders([mackenzie, vancouver]); // Vladivostok
// greenland.setBorders([mackenzie, labrador]); // Iceland
// const northAmerica = [mexico, california, newYork, labrador, ottawa, vancouver, mackenzie, alaska, greenland];

class Game {
    constructor() {
        // Comming -> add plays by IP
        const p1 = new Player('wwwxkz');
        const p2 = new Player('klaus');
        const players = [p1, p2];
        this.players = players;
        // Use southAmerica map
        this.countries = southAmerica;
        this.map = new Map(southAmerica, players);
        // Start game
        this.round = new Round();
        this.turn(this.countries);
    }
    turn(countries) {
        $(function () {
            var owner = {
                "AR": 1,
                "CL": 1,
                "UY": 1,
                "BR": 1,
            };
            $('#map').vectorMap({
                map: 'south_america_mill',
                series: {
                    regions: [{
                        values: owner,
                        scale: [
                            '#E6EA72', 
                            '#0071A4',
                            '#197796',
                            '#6bc1c4',
                            '#cdd100',
                            '#db5360',
                            '#bf3fff',
                            '#efae6e',
                            '#24b59c',
                            '#e567ce',
                        ],
                        attribute: 'fill',
                    }]
                },
                onRegionTipShow: function(e, el, code){
                    countries.forEach(country => {
                        if (country.code == code) {
                            el.html(el.html()+' (Owner - '+ country.owner.name +')');
                        }
                    });
                },
                onRegionClick: function (event, code) {
                    countries.forEach(country => {
                        if (country.code == code) {
                            console.log('Country: ', country.name);
                            console.log('Code: ', country.code);
                            console.log('Troops: ', country.status());
                            console.log(country.name, '- Can atack countries in black');
                        }
                    });
                    alert(code);
                }
            });
        });    
        //this.round.nextRound(this.players, this.countries);
    }
}

const game = new Game()