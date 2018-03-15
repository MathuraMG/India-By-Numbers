var myMap;
var mapCanvas;
var mapLocations = [];
var mappa = new Mappa('Leaflet');
var options = {
  lat: 20,
  lng: 80,
  zoom: 5,
  style: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
}
var battlesUrl = "https://raw.githubusercontent.com/MathuraMG/indian-history/master/battles.json";
var battles = [];
var filteredBattles = [];
var selectedBattle ;

function preload() {
  loadJSON(battlesUrl, gotData);
}

function setup(){
  console.log('inside mapsetup');
  mapCanvas = createCanvas(window.innerWidth*0.7,window.innerHeight*0.8);
  mapCanvas.parent('myContainer');
  myMap = mappa.tileMap(options);
  myMap.overlay(mapCanvas)
  fill(200, 100, 100);
  // Only redraw the point when the map change and not every frame.
  myMap.onChange(drawPoint);
}

// We moved everything to this custom function that
// will be trigger only when the map moves
function drawPoint(){
  clear();
  selectAll(".locations").forEach(location => location.hide());
  if(selectedBattle) {
    console.log("Selected : " + selectedBattle);
    getYearOfBattle();
  }
  filteredBattles = filterData(document.getElementById("yearSlider").value);
    if(selectedBattle===filteredBattles[j].name) {
      mapLocations[filteredBattles[j].id].updateDetails(filteredBattles[j].name,filteredBattles[j].dates, filteredBattles[j].war, filteredBattles[j].link);
    }
    if(filteredBattles[j].coord[0]) {
      var temp = myMap.latLngToPixel(filteredBattles[j].coord[0], filteredBattles[j].coord[1]);
      mapLocations[filteredBattles[j].id].updateLocation(temp.x,temp.y);
      mapLocations[filteredBattles[j].id].drawLocation();
    }
  }
}

function gotData(data) {
  for(var i =0; i<data.length;i++) {
    battles.push(data[i]);
    //make a constructor for all the map points
    mapLocations.push(new mapLocation(i,data[i].coord[0], data[i].coord[1], data[i].year, data[i].name, data[i].dates, data[i].war, data[i].link));
  }
}

function filterData(year) {
  return mapLocations.filter(battle => parseInt(battle.year)==year);
}

class mapLocation {
  constructor(id,x,y,year,name,dates,war,link) {
    this.id = id;
    this.coord = [x, y];
    this.year = year;
    this.name = name;
    this.dates = dates;
    this.war = war;
    this.link = link;
    this.mapButton = createButton(this.name);
    this.mapButton.hide();
    this.mapButton.mousePressed(() => this.updateDetails(this.name, this.dates, this.war, this.link));
    this.mapButton.id("location"+this.id);
    this.mapButton.class("locations");
  }
  updateLocation(posx, posy) {
    this.posx = posx;
    this.posy = posy;
  }
  drawLocation() {
    fill("#b54848");
    rect(this.posx, this.posy, 20, 20);
    this.mapButton.show();
    this.mapButton.position(this.posx+ mapCanvas.elt.getBoundingClientRect().x, this.posy +mapCanvas.elt.getBoundingClientRect().y);
  }
  updateDetails(name,dates, war, link) {
    select(".battle").show();
    select(".battle__name").html(name);
    select(".battle__war").html(war);
    select(".battle__dates").html(dates);
    select(".battle__link").attribute("href",link);
  }
}

function getYearOfBattle() {
  mapLocations.forEach(function(battle) {
    if(battle.name === selectedBattle) {
      console.log(battle.year);
      $('#yearSlider').val(battle.year);
      return battle.year;
    }
  })
}
