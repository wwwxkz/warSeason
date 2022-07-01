# Play

### Download

You can download by clicking <a href="https://github.com/wwwxkz/warSeason/archive/refs/heads/main.zip">here</a>, then extract the .zip file, and open index.html 

You can have more information about the game by opening your browser's dev console (usually by clicking F12) and going to console option. There will be logs about all the game actions, and functions not integrated with the interface yet.

### How to play

Get your pointer over a country and you will get a popup window telling you the country owner and the troops in it, you can also see the color of this player and just  by looking in the map know which countries this player has. 

To atack you have to click in a country of your ownership, and then click in a country that changed color (usually black)

When you atack there is a Random Number Generator from 0 to 3 that will decides how much troops you will lose, and your enemy will lose in its territory

### Create your own map

Get an png or pdf image, and put in Inkscape, 
- Go to path and Trace bitmap
- Path and simplify if you want to
- Save as .svg

Go to https://svgedit.netlify.app/editor/index.html
- Open your .svg file
- Go to the svg icon in the upper right corner
- Copy your svg path and puts in https://ruibarreira.github.io/jvectormap-svg-converter/
- Change your countries names and ids
- Save and load to a .js file
- Calls the .js file with jVectorMap 

# About
### What

Risk is a strategy board game of diplomacy, conflict and conquest for two to six players. The standard version is played on a board depicting a political map of the world, divided into forty-two territories, which are grouped into six continents. Turns rotate among players who control armies of playing pieces with which they attempt to capture territories from other players, with results determined by dice rolls. Players may form and dissolve alliances during the course of the game. The goal of the game is to occupy every territory on the board and, in doing so, eliminate the other players. The game can be lengthy, requiring several hours to multiple days to finish. European versions are structured so that each player has a limited "secret mission" objective that shortens the game.
<br>
-> From wikipedia <a href="https://en.wikipedia.org/wiki/Risk_(game)">Source</a>
<br><br>
Based on Board Game "War" by Grow, widely known as "Risk" or "La Conquête du Monde"

### Why

As a group of friends was playing War in its online version, we came across many ideas and improvements to the game, here is a quick list and goals we want to address with this project:

- Team mode <br>
  When playing with 5 or 6 players we often created teams and tried to win with one goal or another, having a Team mode and just one Goal for both makes this interaction easier
  
- Alliances <br>
  Having a contract for X time of rounds is a fair and simple way to set alliances and encourage conversations   while playing the game
  
- Winning just at the end of the round <br>
  Giving players time to address an enemy wins makes the game more dynamic, as the enemy has to plan well his     last round, and the players can address the situation together as everyone knows what is about to happen
  
- More maps <br>
  World map and Roman empire are awesome, but South/North America and other regions would be even better
  
- HTML5 and Javascript ES6 <br>
  War was made in Flash, having an HTML5 and ES6 option is not just faster, but more reliable and compatible with new versions of browsers deactivating Flash
  
- Events <br>
  Wars, Tsunamis, Pandemics, and world events make the game more dynamic and fun to play as the game is never   predictable and no one has sure of winning a game

- Connections problems <br>
  Whenever someone lost connection and the round passes, the troops got from the round are never placed in a country and it gets lost in the next round. Saving it for the next round does not alter the gameplay and makes the reconnection process less painful

Previously named as mextWar <br>
MEXT comes from Monbukagakusho, a Japanese scholarships that brought everyone together
<br>
-> It is interesting, check it out <a href="https://en.wikipedia.org/wiki/Monbukagakusho_Scholarship">here</a>

### How

- Frontend
  - CSS
  - Javascript
  - <a href="https://jvectormap.com/">jVectorMap</a>
    
- Backend 
  - Javascript
- Server / Client
  - Gathering options

### Dev Progress

- [ ] Events
- [ ] Troops by round
- [ ] Cards
- [ ] Turn time
- [ ] Turn steps description
- [ ] Turn steps to interface
- [ ] Player and total troops to interface
- [ ] Use player color instead of both player and country
- [ ] Atack as long as you can
- [ ] Server / Client
