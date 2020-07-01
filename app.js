let api = '0442d6b226a383878b553f71ffb1cac7';
let button = document.getElementById('submit');
let inputCity = document.getElementById('inputValue');

let weatherIcon = document.querySelector('div#ic1.weather-icon');
let extraInfo= document.querySelector('h5.card-wind');
let descript = document.querySelector('h5.card-desc');
let tempera = document.querySelector('h2.card-temp');
let cityval = document.querySelector('h4.card-city');

let allDays = document.getElementById("forecast");
allDays.style.visibility = "hidden";

//start function
button.addEventListener('click', function (){
    fetch (`https://api.openweathermap.org/data/2.5/forecast?q=${inputCity.value}&appid=${api}&units=metric`)
        .then(function(resp) { return resp.json() })
        .then(function(data) {

    allDays.style.visibility = "visible";

    //current average temperature
    let minTemp = data["list"][0]["main"]["temp_min"];
    let maxTemp = data["list"][0]["main"]["temp_max"];

    let temp = parseInt(minTemp+maxTemp)/2;
    let description = data["list"][0]["weather"][0]["description"];
    let city = data['city']['name'];
    let wind =data["list"][0]["wind"]["speed"];
    let humi =data["list"][0]["main"]["humidity"];
    let ico =data["list"][0]["weather"][0]["icon"]

            console.log(temp);
            console.log(description);
            console.log(city);
            console.log(wind);
            console.log(ico);

            tempera.innerHTML=temp +'°c';
    descript.innerHTML=description;
    cityval.innerhtml=city;
    extraInfo.innerHTML='Wind: '+wind+' km/h '+'  - '+'  Humidity: '+humi+'%';
    weatherIcon.innerHTML='<img src="icons/'+ico+'.png"/>';

     // Day 2 to 5 temperature
     let tempDay2_div=document.querySelector('h2#tDay2.card-text');
     let tempDay3_div=document.querySelector('h2#tDay3.card-text');
     let tempDay4_div=document.querySelector('h2#tDay4.card-text');
     let tempDay5_div=document.querySelector('h2#tDay5.card-text');


     let toSlice;
     let sliced = [];
     let dateArray = [];
     let fullDay = [];
     for (i=0; i < data.list.length; i++) {
         toSlice = data.list[i].dt_txt;
-         sliced.push(toSlice.slice(0, 10));
         dateArray.push(new Date(sliced[i]).getDay());
         if (dateArray[0] === dateArray[i]) {
             fullDay.push(dateArray[i]);
         }

    let tempAllDays = [];
    for (i = 0; i < data.list.length; i++) {
             tempAllDays.push(data.list[i].main.temp);
    }
     let tempDay2 = tempAllDays.slice(fullDay.length, fullDay.length+8);
     let tempDay3 = tempAllDays.slice(fullDay.length+8, fullDay.length+16);
     let tempDay4 = tempAllDays.slice(fullDay.length+16, fullDay.length+24);
     let tempDay5 = tempAllDays.slice(fullDay.length+24, fullDay.length+31);

    function average(array) {
        return Math.round(array.reduce((a, b) => a + b) / array.length);
    }
     let avgTempDay2 = average(tempDay2);
     let avgTempDay3 = average(tempDay3);
     let avgTempDay4 = average(tempDay4);
     let avgTempDay5 = average(tempDay5);

     tempDay2_div.innerHTML= avgTempDay2.toString()+'°c';
     tempDay3_div.innerHTML= avgTempDay3.toString()+'°c';
     tempDay4_div.innerHTML= avgTempDay4.toString()+'°c';
     tempDay5_div.innerHTML= avgTempDay5.toString()+'°c';

     // Day 2 to 5 description
     let descDay2=document.querySelector('h5#cDay2.card-desc');
     let descDay3=document.querySelector('h5#cDay3.card-desc');
     let descDay4=document.querySelector('h5#cDay4.card-desc');
     let descDay5=document.querySelector('h5#cDay5.card-desc');

     let description2 = data["list"][8]["weather"][0]["description"];
     let description3 = data["list"][15]["weather"][0]["description"];
     let description4 = data["list"][22]["weather"][0]["description"];
     let description5 = data["list"][29]["weather"][0]["description"];

     descDay2.innerHTML=description2;
     descDay3.innerHTML=description3;
     descDay4.innerHTML=description4;
     descDay5.innerHTML=description5;

    //day 2 to 5 icons
    let ico2 =data["list"][8]["weather"][0]["icon"];
    let ico3 =data["list"][15]["weather"][0]["icon"];
    let ico4 =data["list"][22]["weather"][0]["icon"];
    let ico5 =data["list"][29]["weather"][0]["icon"];

    document.querySelector('div#ic2.weather-icon').innerHTML =
        '<img src="icons/'+ico2+'.png"/>';
    document.querySelector('div#ic3.weather-icon').innerHTML =
        '<img src="icons/'+ico3+'.png"/>';
    document.querySelector('div#ic4.weather-icon').innerHTML =
        '<img src="icons/'+ico4+'.png"/>';
    document.querySelector('div#ic5.weather-icon').innerHTML =
        '<img src="icons/'+ico5+'.png"/>';
        }

    //name of the days
    let d = new Date();
    let weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    weekday[7] = "sunday";


            document.querySelector('small#day2.text-muted').innerHTML=
     "Tomorrow";
    document.querySelector('small#day3.text-muted').innerHTML=
     weekday[d.getDay()+2];
    document.querySelector('small#day4.text-muted').innerHTML=
     weekday[d.getDay()+3];
    document.querySelector('small#day5.text-muted').innerHTML=
     weekday[d.getDay()+4];
})})

