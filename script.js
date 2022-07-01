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
        throw new Error("Restarting");
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
            return this.countries[key];
        });
    }
    setPlayersColor() {
        let colors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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

// Word
//  - North America
const ca = new Country('Central America', 'CA');
const wus = new Country('Western United States', 'WUS');
const eus = new Country('Eastern United States', 'EUS');
const qc = new Country('Quebec', 'QC');
const on = new Country('Ontario', 'ON');
const ab = new Country('Alberta', 'AB');
const ak = new Country('Alaska', 'AK');
const nwt = new Country('North West Territory', 'NWT');
const gl = new Country('Greenland', 'GL');
ca.setBorders([wus, eus]);
wus.setBorders([ab, eus, ca, on]);
eus.setBorders([wus, on, ca, qc]);
qc.setBorders([eus, on]);
on.setBorders([eus, qc, wus, ab, nwt]);
ab.setBorders([on, wus, nwt, ak]);
ak.setBorders([ab, nwt]); // More
nwt.setBorders([ak, ab, on]);
gl.setBorders([qc, on, nwt]); // More
//  - South America
const co = new Country('Colombia', 'CO');
const ar = new Country('Argentina', 'AR');
const br = new Country('Brazil', 'BR');
const pe = new Country('Peru', 'PE');
co.setBorders([br, pe]);
ar.setBorders([br, pe]);
br.setBorders([ar, co, pe]); // More
pe.setBorders([br, ar, co]);
//  - Europe
const uk = new Country('Ukraine', 'UK');
const sc = new Country('Scandinavia', 'SC');
const ne = new Country('Northern Europe', 'NE');
const se = new Country('Southern Europe', 'SE');
const we = new Country('Western Europe', 'WE');
const gb = new Country('Great Britain', 'GB');
const il = new Country('Iceland', 'IL');
uk.setBorders([ne, sc, se]); // More
sc.setBorders([uk, il, ne, gb]);
ne.setBorders([se, we, gb, sc, uk]);
se.setBorders([we, ne, uk]); // More
we.setBorders([se, ne, gb]);
gb.setBorders([il, we, sc, ne]);
il.setBorders([gb, sc]);
//  - Africa
const na = new Country('North Africa', 'NA');
const eg = new Country('Egypt', 'EG');
const cg = new Country('Congo', 'CG');
const ea = new Country('East Africa', 'EA');
const sa = new Country('South Africa', 'SA');
const mg = new Country('Madagascar', 'MG');
na.setBorders([eg, cg, ea]); // More
eg.setBorders([na, ea]); // More
cg.setBorders([na, ea, sa]);
ea.setBorders([cg, sa, na, eg]);
sa.setBorders([cg, ea]);
mg.setBorders([sa, ea]);
//  - Asia
const sb = new Country('Siberia', 'SB');
const ur = new Country('Ural', 'UR');
const af = new Country('Afghanistan', 'AF');
const yk = new Country('Yakutsk', 'YK');
const kc = new Country('Kamchatka', 'KC');
const ir = new Country('Irkutsk', 'IR');
const mo = new Country('Mongolia', 'MO');
const jp = new Country('Japan', 'JP');
const cn = new Country('China', 'CN');
const id = new Country('India', 'ID');
const me = new Country('Middle East', 'ME');
const sm = new Country('Siam', 'SM');
// Fix
sb.setBorders([br, pe]);
ur.setBorders([br, pe]);
af.setBorders([ar, co, pe]);
yk.setBorders([br, ar, co]);
kc.setBorders([br, pe]);
ir.setBorders([ar, co, pe]);
mo.setBorders([ar, co, pe]);
jp.setBorders([br, ar, co]);
cn.setBorders([br, pe]);
id.setBorders([ar, co, pe]);
me.setBorders([br, pe]);
sm.setBorders([ar, co, pe]);
//  - Australis
const wa = new Country('Western Australia', 'WA');
const eas = new Country('Eastern Australia', 'EAS');
const is = new Country('Indonesia', 'IS');
const ng = new Country('New Guinea', 'NG');
wa.setBorders([eas, is, ng]);
eas.setBorders([ng, wa]);
is.setBorders([wa, ng]); // More
ng.setBorders([is, eas, wa]);
//
const world = [
    // North America
    ca, wus, eus, qc, on, ab, ak, nwt, gl,
    // South America
    co, ar, br, pe,
    // Europe
    uk, sc, ne, se, we, gb, il,
    // Africa
    na, eg, cg, ea, sa, mg,
    // Asia
    sb, ur, af, yk, kc, ir, mo, jp, cn, id, me, sm,
    // Australis
    wa, eas, is, ng
];


class Game {
    constructor() {
        const p1 = new Player('wwwxkz');
        const p2 = new Player('klaus');
        const players = [p1, p2];
        this.players = players;
        this.countries = world;
        this.map = new Map(world, players);
        this.round = new Round();
        this.turn(this.countries);
    }
    turn(countries) {
        $(function () {
            function owner() {
                let json = {}
                countries.forEach(country => {
                    json[country.code] = country.color;
                });
                return json;
            }
            owner = owner();
            var clicked = 0;
            var map = new jvm.Map({
                map: 'world',
                container: $('#map'),
                series: {
                    regions: [{
                        scale: {
                            '1': '#E6EA72',
                            '2': '#0071A4',
                            '3': '#197796',
                            '4': '#6bc1c4',
                            '5': '#cdd100',
                            '6': '#db5360',
                            '7': '#bf3fff',
                            '8': '#efae6e',
                            '9': '#24b59c',
                            '10': '#e567ce',
                        },
                        attribute: 'fill',
                        values: owner,
                    }]
                },
                regionLabelStyle: {
                    initial: {
                        fill: '#B90E32'
                    },
                    hover: {
                        fill: 'black'
                    }
                },
                labels: {
                    regions: {
                        render: function (code) {
                            let status;
                            countries.forEach(country => {
                                if (country.code == code) {
                                    status = country.status();
                                }
                            });
                            return status;
                        }
                    }
                },
                onRegionTipShow: function (e, el, code) {
                    countries.forEach(country => {
                        if (country.code == code) {
                            el.html(el.html() + ' (' + country.owner.name + ' - ' + country.status() + ')');
                        }
                    });
                },
                onRegionClick: function (event, code) {
                    countries.forEach(country => {
                        if (country.code == code) {
                            if (clicked == 1) {
                                map.clearSelectedRegions()
                                clicked = 0;
                            } else {
                                country.borders.forEach(borderCountry => {
                                    if (borderCountry.owner != country.owner) {                               
                                        map.regions[code].element.config.style.selected.fill = "#808080";
                                        map.setSelectedRegions(code);
                                        map.regions[borderCountry.code].element.config.style.selected.fill = "#E5E5E5";
                                        map.setSelectedRegions(borderCountry.code);
                                    }
                                });
                                clicked = 1;
                            }
                        }
                    });
                }
            });
        });
        //this.round.nextRound(this.players, this.countries);
    }
}

const game = new Game()