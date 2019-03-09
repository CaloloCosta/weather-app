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
      console.log(data);
      let t = `${celsius(data.main.temp)} ºC | ${Math.floor(data.main.temp)} ºF`;
      let min = `${celsius(data.main.temp_min)} ºC | ${Math.floor(data.main.temp_min,0)} ºF`;
      let max = `${celsius(data.main.temp_max)} ºC | ${Math.floor(data.main.temp_max,0)} ºF`;
      ui.mainCard(t,`${data.name}, ${data.mes.country}`,date(),data.main.humidity,min,max,data.temp[0].icon,data.temp[0].description);
      r.forecast(city).then(
        d =>{

          for(let i = 7; i <= 21; i +=7){
            let day = new Date(d[i].dt_txt).getDay();
            let min = `${celsius(d[i].main.temp_min)} ºC | ${Math.floor(d[i].main.temp_min)} ºF`;
            let max = `${celsius(d[i].main.temp_max)} ºc | ${Math.floor(d[i].main.temp_max)} ºF`;
            ui.forecast(celsius(d[i].main.temp),Math.floor(d[i].main.temp),min,max,givenDay(day),d[i].weather[0].icon);

          }
        }
      ).catch(e => console.log(e));
      ui.removeLoader();
    }).catch((error)=>{
      ui.removeLoader();
      ui.warning("cityNotFound");
    });
  }else{
    ui.warning("invalidCity");
  }
}

// get current location
function currentLocation(){
  // check if geolocation is avalable
  if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(p =>{
      ui.loader();
      r.getDataByLatLon(Math.floor(p.coords.latitude),Math.floor(p.coords.longitude))
      .then(data => {
        let t = `${celsius(data.main.temp)} ºC | ${Math.floor(data.main.temp)} ºF`;
        let min = `${celsius(data.main.temp_min)} ºC | ${data.main.temp_min} ºF`;
        let max = `${celsius(data.main.temp_max)} ºC | ${data.main.temp_max} ºF`;
        ui.mainCard(t,`${data.name}, ${data.mes.country}`,date(),data.main.humidity,min,max,data.temp[0].icon,data.temp[0].description);
        ui.removeLoader();
        r.forecastLatLon(Math.floor(p.coords.latitude),Math.floor(p.coords.longitude))
        .then(d =>{
          for(let i = 7; i <= 21; i +=7){
            let day = new Date(d[i].dt_txt).getDay();
            let min = `${celsius(d[i].main.temp_min)} ºC | ${Math.floor(d[i].main.temp_min)} ºF`;
            let max = `${celsius(d[i].main.temp_max)} ºC | ${Math.floor(d[i].main.temp_max)} ºF`;
            ui.forecast(celsius(d[i].main.temp),Math.floor(d[i].main.temp),min,max,givenDay(day),d[i].weather[0].icon);
          }
        });
      }).catch((error)=>{
        ui.warning("cityNotFound");
      });
    }, e =>{
      ui.turnGeoLocation();
    });
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
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let d = new Date;
    const date = `${days[d.getDay()]} | ${m[d.getMonth()]} ${d.getDate()}`;
    return date;
  }
// given days
function givenDay(d){
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  return days[d];

}
