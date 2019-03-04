class Request{
  constructor(){
     this.key = "d850d2105f7747e173559bf224f7c2f8";
  }
  async getData(city){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.key}&units=imperial`;
    const response = await fetch(url);
    const data = await response.json();
    let obj = {
      main: data.main,
      temp: data.weather,
      mes: data.sys,
      name: data.name
    };
    return obj;
  }

  // get data by lat and lon
  async getDataByLatLon(lat,lon){
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${this.key}&units=imperial`;
    const response = await fetch(url);
    const data = await response.json();
    let obj = {
      main: data.main,
      temp: data.weather,
      mes: data.sys,
      name: data.name
    };
    return obj;

  }

}
