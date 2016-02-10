$(document).ready(function(){
    
    var volumeControlBtn = $("#volumeControlBtn");
    var rainSound = $("#rainSound");

    $("#rainSound").prop("volume", 0.2);
    
    $("#volumeControlBtn").click(function(){    
        decreaseVolume();
    });

    var decreaseVolume = function(){    
        $("#rainSound").prop("volume", 0.6);
    };

});
