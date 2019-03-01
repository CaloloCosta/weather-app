class UI{
  mainCard(tem,city,date,rh,min,max,icon){
    document.querySelector(".temperature").innerHTML = tem;
    document.querySelector(".container .city").innerHTML = city;
    document.querySelector(".container .date").innerHTML = `<strong>${date}</strong>`;
    document.querySelector(".container .rh").innerHTML = `<strong>Relative Humidity ${rh}%</strog>`;
    document.querySelector(".container .min").innerHTML = `<strong>min: ${min}</strong>`;
    document.querySelector(".container .max").innerHTML = `<strong>max: ${max}</strong>`;
    document.querySelector(".container .icon").setAttribute("src",`http://openweathermap.org/img/w/${icon}.png`);


  }
}
