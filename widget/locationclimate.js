$(document).ready(function() {  

    var latitude;
    var longitude;
    function success(position) 
    {    
        var s = document.querySelector('#status');
        if (s.className == 'success') 
        {
            return;
        }
        s.innerHTML = "";
        s.className = 'Success';
        var mapcanvas = document.createElement('div');
        mapcanvas.id = 'mapcanvas';
        mapcanvas.style.height = (($('#box-members').height())) + "px";
        mapcanvas.style.width = (($('#box-members').width()) - 2) + "px";
        document.querySelector('#map').appendChild(mapcanvas);
        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var myOptions = {
            zoom: 15,
            center: latlng,
            mapTypeControl: false,
            navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("mapcanvas"), myOptions);
        var marker = new google.maps.Marker({
            position: latlng, 
            map: map, 
            title:"You are here!"
        });
        $.cookie("MyLat", position.coords.latitude); // Storing latitude value
        $.cookie("MyLon", position.coords.longitude); // Storing longitude value
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        console.log("http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&lang=pt&units=metric&appid=452d88ad415c8f174b51d20d51edb0d6");
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&lang=pt&units=metric&appid=452d88ad415c8f174b51d20d51edb0d6"
        }).then(function(data) {

            $('cidade').append(data.name);
            $('temperatura').append(data.main.temp);
            $('descricao').append(data.weather.description);
            $('umidade').append(data.main.humidity);

            console.log(data);
            return data;
        });


    }
    function error(msg) 
    {
        var s = document.querySelector('#status');
        s.innerHTML = typeof msg == 'string' ? msg : "failed";
        s.className = 'Fail';
    }
    if (navigator.geolocation) 
    {
        navigator.geolocation.getCurrentPosition(success, error);
    } 
    else
    {
        error('Not supported'); //HTML Support
    }
    
    $("#check").click(function()
                  {
                      var lat = $.cookie("MyLat");
                      var lon = $.cookie("MyLon");
                      alert('Sua Latitude é: '+lat + '\n' +'Sua Longitude é: '+lon);
                      
                  });
});



