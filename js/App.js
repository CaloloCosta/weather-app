const r = new Request;
const ui = new UI;

window.addEventListener('load',currentLocation);
// event listners
document.getElementById("form").addEventListener('submit',
(e)=>{
  e.preventDefault();
  const city = document.querySelector("input").value;
  requestInfo(city);
});

// request info
function requestInfo(city){
  if(/^[a-zA-Z]/.test(city)){
    ui.cleanScreen();
    ui.loader();
    r.getData(city).then(data => {
      console.log(parseFloat(data.main.temp));
      let t = `${celsius(data.main.temp)} ºC | ${data.main.temp} ºF`;
      let min = `${celsius(data.main.temp_min)} ºC | ${data.main.temp_min} ºF`;
      let max = `${celsius(data.main.temp_max)} ºC | ${data.main.temp_max} ºF`;
      ui.mainCard(t,`${data.name}, ${data.mes.country}`,date(),data.main.humidity,min,max,data.temp[0].icon);
      ui.removeLoader();
    }).catch((error)=>{
      ui.warning("cityNotFound")
    });
  }else{
    ui.warning("invalidCity");
  }
}

// get current location
function currentLocation(){
  // check if geolocation is avalable
  if("geolocation" in navigator){
    ui.loader();
    navigator.geolocation.getCurrentPosition(p =>{
      r.getDataByLatLon(Math.floor(p.coords.latitude),Math.floor(p.coords.longitude))
      .then(data => {
        console.log(parseFloat(data.main.temp));
        let t = `${celsius(data.main.temp)} ºC | ${data.main.temp} ºF`;
        let min = `${celsius(data.main.temp_min)} ºC | ${data.main.temp_min} ºF`;
        let max = `${celsius(data.main.temp_max)} ºC | ${data.main.temp_max} ºF`;
        ui.mainCard(t,`${data.name}, ${data.mes.country}`,date(),data.main.humidity,min,max,data.temp[0].icon);
        ui.removeLoader();
      }).catch((error)=>{
        ui.warning("cityNotFound");
      });
    });

  }
  else{
    ui.turnGeoLocation();
  }

}

// convert to celcius
  function celsius(n){
    const c = (parseFloat(n)-32)*(5/9);
    return Math.floor(c,0);
  }
// get the date
  function date(){
    const m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday'];
    let d = new Date;
    const date = `${days[d.getDay()]} | ${m[d.getMonth()]} ${d.getDate()}`;
    return date;
  }
