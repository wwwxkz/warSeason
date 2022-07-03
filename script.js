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
        this.troops += parseInt(add);
    }
    removeTrops(remove) {
        this.troops -= remove;
    }
    reassignTrops(reassign, who) {
        if (reassign < this.troops) {
            this.removeTrops(reassign);
            who.addTrops(reassign);
            return {
                status: true,
                message: ''
            }
        }
        return {
            status: false,
            message: 'You do not have that many'
        }
    }
    atack(who) {
        if (this.troops > 1) {
            let found = false;
            Object.keys(this.borders).forEach(key => {
                if (who == this.borders[key] && who.owner != this.owner) {
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
                    found = true;
                }
            });
            if (found != true) {
                return {
                    status: false,
                    message: 'This country is not a border of yours or it is your territorty'
                }
            }
        }
        else {
            return {
                status: false,
                message: 'You can not atack with just one troop'
            }
        }
        return {
            status: true,
            message: ''
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
        this.troops = 5;
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
        players.forEach(player => {
            player.troops += 5;
        });
        //this.verifyWin(players, countries);
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
            if (key == (parseInt(lkey) + parseInt(quotient))) {
                lkey = key;
                if (pkey + 1 != this.players.length) {
                    pkey += 1;
                }
            }
            randomCountries[key].setOwner(this.players[pkey]);
            randomCountries[key].setColor(this.players[pkey].color);
        });
    }
}

function buildMaps(selectMap) {
    if (selectMap == 1) {
        // War World
        //  - North America
        const mx = new Country('México', 'MX');
        const ca = new Country('Califórnia', 'CA');
        const ny = new Country('Nova York', 'NY');
        const lb = new Country('Labrador', 'LB');
        const va = new Country('Vancouver', 'VA');
        const ot = new Country('Ottawa', 'OT');
        const mk = new Country('Mackenzie', 'MK');
        const ak = new Country('Alaska', 'AK');
        const gr = new Country('Groelândia', 'GR');
        //  - South America
        const ar = new Country('Argentina', 'AR');
        const br = new Country('Brasil', 'BR');
        const co = new Country('Colombia', 'CO');
        const pe = new Country('Peru', 'PE');
        //  - Europe
        const is = new Country('Islândia', 'IS');
        const ig = new Country('Inglaterra', 'IG');
        const fr = new Country('França', 'FR');
        const al = new Country('Alemanha', 'AL');
        const po = new Country('Polônia', 'PO');
        const ms = new Country('Moscou', 'MS');
        const sc = new Country('Suécia', 'SC');
        //  - Africa
        const ag = new Country('Argélia', 'AG');
        const eg = new Country('Egíto', 'EG');
        const su = new Country('Sudão', 'SU');
        const cg = new Country('Congo', 'CG');
        const as = new Country('África do Sul', 'AS');
        const mg = new Country('Madagascar', 'MG');
        //  - Asia
        const sb = new Country('Sibéria', 'SB');
        const vd = new Country('Vladvostok', 'VD');
        const cn = new Country('China', 'CN');
        const jp = new Country('Japão', 'JP');
        const vi = new Country('Vietnã', 'VI');
        const id = new Country('Índia', 'ID');
        const om = new Country('Oriente Médio', 'OM');
        const aa = new Country('Aral', 'AA');
        const ok = new Country('Omsk', 'OK');
        const dd = new Country('Dudinka', 'DD');
        const mo = new Country('Mongolia', 'MO');
        const tc = new Country('Tchita', 'TC');
        //  - Australis
        const au = new Country('Austrália', 'AU');
        const sm = new Country('Sumatra', 'sm');
        const bo = new Country('Borneo', 'BO');
        const ng = new Country('Nova Guiné', 'NG');
        //  - North America
        mx.setBorders([co, ca, ny]);
        ca.setBorders([ny, mx, va, ot]);
        ny.setBorders([lb, ot, mx, ca]);
        lb.setBorders([gr, ot, ny]);
        va.setBorders([ca, ot, mk, ak]);
        ot.setBorders([ca, ny, lb, mk, va]);
        mk.setBorders([ot, va, ak, gr]);
        ak.setBorders([va, mk, vd]);
        gr.setBorders([lb, is, mk]);
        //  - South America
        ar.setBorders([br, pe]);
        br.setBorders([pe, ar, co, ag]);
        co.setBorders([br, pe, mx]);
        pe.setBorders([br, pe, ca]);
        //  - Europe
        is.setBorders([gr, ig]);
        ig.setBorders([is, fr, al, sc]);
        fr.setBorders([ag, al, po, ig]);
        al.setBorders([fr, po, ig]);
        po.setBorders([fr, al, ms,  eg, om]);
        ms.setBorders([sc, po, om, ok, aa]);
        sc.setBorders([mo, ig]);
        //  - Africa
        ag.setBorders([fr, eg, su, cg, br]);
        eg.setBorders([ag, su, po, om, fr]);
        su.setBorders([eg, ag, cg, mg]);
        cg.setBorders([su, ag, as]);
        as.setBorders([mg, cg, su]);
        mg.setBorders([su, as]);
        //  - Asia
        sb.setBorders([vd, dd, tc]);
        vd.setBorders([sb, tc, cn, jp, ak]);
        cn.setBorders([mo, jp, vd, vi, id, aa, ok]);
        jp.setBorders([cn, vd]);
        vi.setBorders([cn, id]);
        id.setBorders([cn, vi, aa, om]);
        ok.setBorders([ms, aa, dd, cn, mo]);
        aa.setBorders([ok, ms, cn, om, id]);
        om.setBorders([id, aa, ms, eg, po]);
        dd.setBorders([ok, mo, tc, sb]);
        mo.setBorders([cn, tc, ok, dd]);
        tc.setBorders([dd, mo, sb, vd, cn]);
        //  - Australis
        au.setBorders([sm, bo, ng]);
        sm.setBorders([id, au]);
        bo.setBorders([vi, au, ng]);
        ng.setBorders([au, bo]);
        //
        return [
            // North America
            mx, ca, ny, lb, va, ot, mk, ak, gr,
            // South America
            ar, br, co, pe,
            // Europe
            is, ig, fr, al, po, ms, sc,
            // Africa
            ag, eg, su, cg, as, mg,
            // Asia
            sb, vd, cn, jp, vi, id, om, aa, ok, dd, mo, tc,
            // Australis
            au, sm, bo, ng
        ];
    }
    if (selectMap == 2) {
        // Risk World
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
        //  - South America
        const co = new Country('Colombia', 'CO');
        const ar = new Country('Argentina', 'AR');
        const br = new Country('Brazil', 'BR');
        const pe = new Country('Peru', 'PE');
        //  - Europe
        const uk = new Country('Ukraine', 'UK');
        const sc = new Country('Scandinavia', 'SC');
        const ne = new Country('Northern Europe', 'NE');
        const se = new Country('Southern Europe', 'SE');
        const we = new Country('Western Europe', 'WE');
        const gb = new Country('Great Britain', 'GB');
        const il = new Country('Iceland', 'IL');
        //  - Africa
        const na = new Country('North Africa', 'NA');
        const eg = new Country('Egypt', 'EG');
        const cg = new Country('Congo', 'CG');
        const ea = new Country('East Africa', 'EA');
        const sa = new Country('South Africa', 'SA');
        const mg = new Country('Madagascar', 'MG');
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
        //  - Australis
        const wa = new Country('Western Australia', 'WA');
        const eas = new Country('Eastern Australia', 'EAS');
        const is = new Country('Indonesia', 'IS');
        const ng = new Country('New Guinea', 'NG');
        //  - North America
        ca.setBorders([wus, eus, co]);
        wus.setBorders([ab, eus, ca, on]);
        eus.setBorders([wus, on, ca, qc]);
        qc.setBorders([eus, on]);
        on.setBorders([eus, qc, wus, ab, nwt]);
        ab.setBorders([on, wus, nwt, ak]);
        ak.setBorders([ab, nwt, kc]);
        nwt.setBorders([ak, ab, on]);
        gl.setBorders([qc, on, nwt, il]);
        //  - South America
        co.setBorders([br, pe, ca]);
        ar.setBorders([br, pe]);
        br.setBorders([ar, co, pe, na]);
        pe.setBorders([br, ar, co]);
        //  - Europe
        uk.setBorders([ne, sc, se, me, af, ur]);
        sc.setBorders([uk, il, ne, gb]);
        ne.setBorders([se, we, gb, sc, uk]);
        se.setBorders([we, ne, uk, me, eg, na]);
        we.setBorders([se, ne, gb]);
        gb.setBorders([il, we, sc, ne]);
        il.setBorders([gb, sc, gl]);
        //  - Africa
        na.setBorders([eg, cg, ea, se, br, we]);
        eg.setBorders([na, ea, me, se]);
        cg.setBorders([na, ea, sa]);
        ea.setBorders([cg, sa, na, eg, mg]);
        sa.setBorders([cg, ea, mg]);
        mg.setBorders([sa, ea]);
        //  - Asia
        sb.setBorders([ur, cn, mo, ir, yk]);
        ur.setBorders([sb, cn, af, uk]);
        af.setBorders([id, me, ur, cn, uk]);
        yk.setBorders([kc, ir, sb]);
        kc.setBorders([yk, ir, mo, jp, ak]);
        ir.setBorders([mo, kc, yk, sb]);
        mo.setBorders([kc, ir, cn, sb, jp]);
        jp.setBorders([mo, kc]);
        cn.setBorders([mo, sb, ur, af, id, sm]);
        id.setBorders([cn, sm, af, me]);
        me.setBorders([af, id, eg, se, uk]);
        sm.setBorders([cn, id, is]);
        //  - Australis
        wa.setBorders([eas, is, ng]);
        eas.setBorders([ng, wa]);
        is.setBorders([wa, ng, sm]);
        ng.setBorders([is, eas, wa]);
        //
        return [
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
    }

    
}

class Game {
    constructor() {
        const p1 = new Player('wwwxkz');
        const p2 = new Player('klaus');
        const p3 = new Player('alon');
        const p4 = new Player('ket');
        const p5 = new Player('ramon');
        this.players = [p1, p2, p3, p4, p5];;
        this.selectMap(this.turn, this.players);          
    }
    selectMap(turn, players) {
        var map = ['war-world', 1];
        $("#map").append(`
        <div id="map-menu-popup">
            <div>Select Map</div>
            <div id="map-menu-popup-select">
                <div id="map-menu-popup-select-map-1">
                    <img src="" alt="War"/>              
                </div> &nbsp &nbsp
                <div id="map-menu-popup-select-map-2">
                    <img src="" alt="Risk"/>
                </div>
            </div>
            <div id="map-menu-popup-select-ready">Ready</div>
            <div id="map-menu-popup-select-exit">Exit</div>
        </div>
        `);
        $("#map-menu-popup-select-map-1").click(function () {
            map = ['war-world', 1];
        })
        $("#map-menu-popup-select-map-2").click(function () {
            map = ['risk-world', 2];
        })
        $("#map-menu-popup-select-ready").click(async function () {
            this.countries = buildMaps(map[1]);
            this.map = new Map(this.countries, players);
            this.round = new Round();
            $("#map-menu-popup").detach("");
            turn(this.countries, this.round, players, map[0]);
        })
        $("#map-menu-popup-select-exit").click(function () {
            $("#map-menu-popup").detach("");
        })
    }
    turn(countries, round, players, map) {
        var turn = 0;
        var localMap = map;
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
            var fromCountry = '';
            var map = new jvm.Map({
                map: localMap,
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
                onRegionLabelShow: function (e, el, code) {
                    countries.forEach(country => {
                        if (country.code == code) {
                            el.html(el.html() + country.status());
                        }
                    });
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
                            if (turn == 1) {
                                if (clicked == 1 && fromCountry == country) {
                                    map.clearSelectedRegions()
                                    var resetClicked = 0;
                                }
                                if (clicked != 1 || fromCountry == '') {
                                    country.borders.forEach(borderCountry => {
                                        if (borderCountry.owner != country.owner) {
                                            map.regions[code].element.config.style.selected.fill = "#808080";
                                            map.setSelectedRegions(code);
                                            map.regions[borderCountry.code].element.config.style.selected.fill = "#E5E5E5";
                                            map.setSelectedRegions(borderCountry.code);
                                        }
                                    });
                                    clicked = 1;
                                    fromCountry = country;
                                }
                                if (fromCountry != '') {
                                    if (fromCountry != country && fromCountry != '') {
                                        const { status, message } = fromCountry.atack(country);
                                        if (status == true) {
                                            let json = {}
                                            countries.forEach(country => {
                                                json[country.code] = country.color;
                                            });
                                            owner = json;
                                            map.series.regions[0].setValues(owner);
                                            $("text[data-code=" + country.code + "]").text(country.status());
                                            $("text[data-code=" + fromCountry.code + "]").text(fromCountry.status());
                                            map.clearSelectedRegions()
                                            resetClicked = 0;
                                        } if (status == false) {
                                            $("#map").append(`
                                            <div id="map-menu-popup">
                                                <div id="map-menu-popup-add"><a>` + message + `</a></div>                                            
                                                <div id="map-menu-popup-add-exit">Exit</div>
                                            </div>
                                            `);
                                            $("#map-menu-popup-add-exit").click(function () {
                                                resetClicked = 0;
                                                $("#map-menu-popup").detach("");
                                            })
                                        }
                                    }
                                }
                                if (resetClicked == 0) {
                                    fromCountry = '';
                                    clicked = 0;
                                }
                            }
                            if (turn == 0) {
                                $("#map").append(`
                                <div id="map-menu-popup">
                                    <div id="map-menu-popup-add">Add to ` + country.name + `</div>
                                    <div id="map-menu-popup-max">Up to ` + country.owner.troops + `</div>
                                    <div>
                                        <input type="number" name="map-menu-popup-add-input">
                                    </div>
                                    <div id="map-menu-popup-add-add">Add</div>
                                    <div id="map-menu-popup-add-exit">Exit</div>
                                </div>
                                `);
                                $("#map-menu-popup-add-add").click(function () {
                                    let troops = $("input[type=number][name=map-menu-popup-add-input]").val()
                                    if (troops <= 0) {
                                        troops = 0;
                                    }
                                    if (troops <= country.owner.troops) {
                                        country.addTrops(parseInt(troops));
                                        country.owner.troops -= troops;
                                        $("text[data-code=" + country.code + "]").text(country.status());
                                        $("#map-menu-popup").detach("");
                                    } else {
                                        $("#map-menu-popup").append(`
                                            <div id="map-menu-popup-add">You do not have that many</div>                                
                                        `);
                                    }
                                })
                                $("#map-menu-popup-add-exit").click(function () {
                                    $("#map-menu-popup").detach("");
                                })
                            }
                            if (turn == 3) {
                                if (clicked == 1 && fromCountry == country) {
                                    map.clearSelectedRegions()
                                    var resetClicked = 0;
                                }
                                if (clicked != 1 || fromCountry == '') {
                                    country.borders.forEach(borderCountry => {
                                        if (borderCountry.owner == country.owner) {
                                            map.regions[code].element.config.style.selected.fill = "#808080";
                                            map.setSelectedRegions(code);
                                            map.regions[borderCountry.code].element.config.style.selected.fill = "#E5E5E5";
                                            map.setSelectedRegions(borderCountry.code);
                                        }
                                    });
                                    clicked = 1;
                                    fromCountry = country;
                                }
                                if (fromCountry != '') {
                                    if (fromCountry != country) {
                                        var fromCountryLocal = fromCountry;
                                        $("#map").append(`
                                        <div id="map-menu-popup">
                                            <div id="map-menu-popup-reassing">Reassing to ` + country.name + `</div>
                                            <div>
                                                <input type="number" name="map-menu-popup-reassing-input">
                                            </div>
                                            <div id="map-menu-popup-reassing-reassing">Reassing</div>
                                            <div id="map-menu-popup-reassing-exit">Exit</div>
                                        </div>
                                        `);
                                        $("#map-menu-popup-reassing-reassing").click(function () {
                                            let troops = $("input[type=number][name=map-menu-popup-reassing-input]").val()
                                            const { status, message } = fromCountryLocal.reassignTrops(troops, country);
                                            if (status == true) {
                                                $("text[data-code=" + country.code + "]").text(country.status());
                                                $("text[data-code=" + fromCountryLocal.code + "]").text(fromCountryLocal.status());
                                                map.clearSelectedRegions()
                                                $("#map-menu-popup").detach("");
                                            }
                                            if (status == false) {
                                                $("#map-menu-popup").append(`
                                                 <div id="map-menu-popup-add"><a>` + message + `</a></div>                                            
                                                `);
                                            }
                                        })
                                        $("#map-menu-popup-reassing-exit").click(function () {
                                            map.clearSelectedRegions()
                                            $("#map-menu-popup").detach("");
                                        })
                                        resetClicked = 0;
                                    }
                                }
                                if (resetClicked == 0) {
                                    fromCountry = '';
                                    clicked = 0;
                                }
                            }
                        }
                    });
                }
            });
        });
        $("#map").append(`
        <div id="map-menu">
            <div id="map-menu-add"><a>Add</a></div>
            <div id="map-menu-atack"><a>Atack</a></div>
            <div id="map-menu-reassign"><a>Reassign</a></div>
            <div id="map-menu-end"><a>End</a></div>
        </div>
        `);
        $("#map-menu-add").click(function () {
            //$("#map-menu").html("");
            turn = 0;
            $("#map-menu-reassign").removeClass('active');
            $("#map-menu-atack").removeClass('active');
            $("#map-menu-end").removeClass('active');
            $("#map-menu-add").addClass('active');
        });
        $("#map-menu-atack").click(function () {
            //$("#map-menu").html("");
            turn = 1;
            $("#map-menu-add").removeClass('active');
            $("#map-menu-reassign").removeClass('active');
            $("#map-menu-end").removeClass('active');
            $("#map-menu-atack").addClass('active');
        });
        $("#map-menu-reassign").click(function () {
            //$("#map-menu").html("");
            turn = 3;
            $("#map-menu-add").removeClass('active');
            $("#map-menu-atack").removeClass('active');
            $("#map-menu-end").removeClass('active');
            $("#map-menu-reassign").addClass('active');
        });
        $("#map-menu-end").click(function () {
            round.nextRound(players, countries);
            $("#map-menu-add").removeClass('active');
            $("#map-menu-atack").removeClass('active');
            $("#map-menu-reassign").removeClass('active');
            $("#map-menu-end").addClass('active');

        });
        $("#map").append(`
        <div id="map-players">
            <div id="map-players-player-1">Player 1</div>
            <div id="map-players-player-2">Player 2</div>
            <div id="map-players-player-3">Player 3</div>
        </div>
        `);
        $("#map").append(`
        <div id="map-settings">
            <div id="map-settings-button">Settings</div>
        </div>
        `);
        $("#map").append(`
        <div id="map-player">
            <div id="map-player-total-troops">Total troops</div>
            <div id="map-player-territories">Territories</div>
            <div id="map-player-cards">Cards</div>
        </div>
        `);
    }
}

const game = new Game()