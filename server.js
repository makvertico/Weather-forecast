$(document).ready(function(){
    //try to get location
    getLocation()

    $('#submitLocation').click(function(){

        //get value from input field
        var city = $("#city").val();
        console.log(city)
        //check not empty
        if (city != ''){
            $.ajax({
                url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&APPID=5a45b85a56b225ec775ca77b1dcd855a",                
                type: "GET",
                dataType: "jsonp",
                success: function(data){
                    console.log(data);
                    console.log(data.main);
                    console.log(data.main);
                    console.log(data.main.temp);
                    console.log(data.weather[0].icon)
                    console.log(data.weather[0].main);                    
                    var information = show(data);
                    var information2 = addInfo(data);
                    var information3 = Temp(data); 
                    $("#show").html(information);
                    $("#Additional_Information").html(information2);
                    $("#Temperature").html(information3);
                    if(data.weather[0].main == "Rain"){
                        document.getElementById("weather_background").className= "Rain" ;
                        console.log("done")
                    }
                    if(data.main.temp < 15){
                        document.getElementById("weather_background").className= "very_cold" ;
                    }                    
                    if(data.main.temp > 15){
                        document.getElementById("weather_background").className= "normal_cold" ;
                    }
                    if(data.main.temp > 25){
                        document.getElementById("weather_background").className= "normal" ;
                    }
                    if(data.main.temp > 35){
                        document.getElementById("weather_background").className= "Hot" ;
                    }
                    if(data.weather[0].main == "Rain"){
                        document.getElementById("weather_background").className= "Rain" ;
                        console.log("done")
                    }                    
                    // else{
                    //     document.getElementById("weather_background").className= "weather" ;
                    // }
                    
                } ,
                complete: function(xhr, textStatus) {
                    console.log(xhr.status);
                    if(xhr.status == 404){
                        var information = show(404);                        
                        var information2 = addInfo(404);
                        var information3 = Temp(404); 
                        $("#show").html(information);
                        $("#Additional_Information").html(information2);
                        $("#Temperature").html(information3);
                    }
                }               
            });

        }else{
            $('#error').html('Field cannot be empty');
        }

    });
})


var today = new Date();
var day = today.toString().substring(0,15);

function show(data){
    if(data == 404 ){
        return "<h3 class='degree_container_error'>oh No!! please enter correct input</h3>"
    }
    else{
        var myico = data.weather[0].icon;
        console.log(myico); 

        return "<h3 class='degree_container'>"
        + data.main.temp + "° " +  
        "<span class='date'>"+ "<span class='city_Name'>"+data.name+"</span>"+ "<span>" + day + "</span>" +"</span>"
        + "<span class='weather_type'>" + 
        "<span class='weather_type-name'> "+ data.weather[0].main +"</span>" +
        "<img src="+'./image/icons/weather_'+myico+'.png'+">" +
        "</span>" +
        "</h3>"; 
    }     
}

function addInfo(data){
    if(data == 404 ){
        return null;
    }
    else{
        return "<div>"+
            "<h3 class='info_container'>"+ "<span class='info_container-name'> Humidity </span>" + "<span class='info_container-details'>"+ data.main.humidity +" % </span>" +"</h3>" +
            "<h3 class='info_container'>"+ "<span class='info_container-name'> Wind </span>" + "<span class='info_container-details'>"+ data.wind.speed +" m/s </span>" +"</h3>" +
            "<h3 class='info_container'>"+ "<span class='info_container-name'> Pressure </span>" + "<span class='info_container-details'>"+ data.main.pressure +" hpa </span>" +"</h3>"
        +"</div>" ;
    }    
    
}
function Temp(data){
    if(data == 404 ){
        return null;
    }
    else{
        return "<div>"+
            "<h3 class='info_container'>"+ "<span class='info_container-name'> Feels like </span>" + "<span class='info_container-details'>"+ data.main.feels_like+" °C </span>" +"</h3>" +
            "<h3 class='info_container'>"+ "<span class='info_container-name'> Maximum </span>" + "<span class='info_container-details'>"+data.main.temp_max +" °C </span>" +"</h3>" +
            "<h3 class='info_container'>"+ "<span class='info_container-name'> Minimum </span>" + "<span class='info_container-details'>"+data.main.temp_min +" °C </span>" +"</h3>"
        +"</div>" ;
    }
    
}

//Get location
var x = document.getElementById("show");
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  
  function showPosition(position) {

    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&appid=5a45b85a56b225ec775ca77b1dcd855a&units=metric",                
        type: "GET",
        dataType: "jsonp",
        success: function(data){                             
            var information = show(data);
            var information2 = addInfo(data);
            var information3 = Temp(data); 
            $("#show").html(information);
            $("#Additional_Information").html(information2);
            $("#Temperature").html(information3); 
        } ,
        complete: function(xhr, textStatus) {
            console.log(xhr.status);
            if(xhr.status == 404){
                var information = show(404);                        
                var information2 = addInfo(404);
                var information3 = Temp(404); 
                $("#show").html(information);
                $("#Additional_Information").html(information2);
                $("#Temperature").html(information3);
            }
        }               
    });
    //API request
    //api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
    //api.openweathermap.org/data/2.5/weather?lat=position.coords.latitudelon=position.coords.longitude&appid=5a45b85a56b225ec775ca77b1dcd855a
  }