class UI{
  mainCard(tem,city,date,rh,min,max,icon){
    document.getElementById("main-flex").style.display = "flex";
    document.querySelector(".temperature").innerHTML = tem;
    document.querySelector(".container .city").innerHTML = city;
    document.querySelector(".container .date").innerHTML = `<strong>${date}</strong>`;
    document.querySelector(".container .rh").innerHTML = `<strong>Relative Humidity ${rh}%</strog>`;
    document.querySelector(".container .min").innerHTML = `<strong>min: ${min}</strong>`;
    document.querySelector(".container .max").innerHTML = `<strong>max: ${max}</strong>`;
    document.querySelector(".container .icon").setAttribute("src",`http://openweathermap.org/img/w/${icon}.png`);
    this.clean();
  }

  // invalid city or city not found
  warning(type){
    let warning = document.getElementById('warning');
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
    warning.innerHTML = `<p>Please turn on geolocation, or type in the location.</p>`;
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
  }
}
