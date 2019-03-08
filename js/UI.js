class UI{
  mainCard(tem,city,date,rh,min,max,icon,description){
    let box = document.getElementById('box-container');
    box.style.display = "flex";
    document.getElementById('warning').style.display = "none";
    document.getElementById("main-flex").style.display = "flex";
    document.querySelector(".temperature").innerHTML = tem;
    document.querySelector(".container .city").innerHTML = city;
    document.querySelector(".container .date").innerHTML = `<strong>${date}</strong>`;
    document.querySelector(".container .rh").innerHTML = `<strong>Relative Humidity ${rh}%</strog>`;
    document.querySelector(".container .min").innerHTML = `<strong>min: ${min}</strong>`;
    document.querySelector(".container .max").innerHTML = `<strong>max: ${max}</strong>`;
    document.querySelector(".container .icon").setAttribute("src",`http://openweathermap.org/img/w/${icon}.png`);
    document.querySelector(".container .description").innerHTML = description;
    this.clean();
  }

  // forecast
  forecast(celcius,f,min,max,day,icon){
    let child = document.createElement('div');
    child.classList = "box div-style";
    child.innerHTML = `
      <img src="http://openweathermap.org/img/w/${icon}.png">
      <h2 class="day">${day}</h2>
      <h2>${celcius}ºC | ${f}ºF</h2>
      <p><strong>min: ${min}</strong></p>
      <p><strong>max: ${max}</strong></p>


    `;
    document.getElementById('t3').style.display = 'block';
    document.getElementById('box-container').appendChild(child);
  }
  // invalid city or city not found
  warning(type){
    let warning = document.getElementById('warning');
    warning.style.background = "red";
    warning.style.color = "#fff";
    warning.style.display = "block";
    if(type == "invalidCity"){
      warning.innerHTML = `<p>Please Enter a Valid City!</p>`;
    }
    else if(type == "cityNotFound"){
      warning.innerHTML = `<p>Oops... City not found!</p>`;
    }
    setTimeout(() => {
    warning.style.display = "none";
  }, 2000);
  this.clean();
  }

  // turn on geolocation
  turnGeoLocation(){
    let warning = document.getElementById('warning');
    warning.style.display = "block";
    warning.innerHTML = `
    <p>Please turn on geolocation, and refresh the page.</p>
    <p>Or type in the location.</p>
    `;
    warning.style.background = "#68bcff";
    warning.style.color = "#fff";
  }
  // clean the form
  clean(){
    document.querySelector("input").value = '';
  }

  // loader getting current location
  loader(){
    loader.style.display = "block";
  }
  // remove loader
  removeLoader(){
    loader.style.display = "none";
  }

  // clean the screen
  cleanScreen(){
    document.getElementById("main-flex").style.display = "none";
    document.getElementById('warning').style.display = "none";
    document.getElementById('box-container').innerHTML = '';
    document.getElementById('t3').style.display = 'none';
  }
}
