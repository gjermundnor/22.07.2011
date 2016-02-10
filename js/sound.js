$(document).ready(function(){
    
    var volumeControlBtn = $("#volumeControlBtn");
    var rainSound = $("#rainSound");

    var setEvents = function(){
        $("#volumeControlBtn").on("click", function(){       
            rainSound.decreaseVolume();
        });
    };/*--end setEvents*/

    var decreaseVolume = function(){
            alert();     
            rainSound.volume = 0.2;
    };

});
