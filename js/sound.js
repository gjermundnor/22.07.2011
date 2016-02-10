$(document).ready(function(){
    
    var volumeControlBtn = $("#volumeControlBtn");
    var rainSound = $("#rainSound");

    rainSound.prop("volume", 0.2);
    
    volumeControlBtn.click(function(){    
        rainSound.prop("volume", 0.6);
    });

    volumeControlTwoBtn.click(function(){    
        rainSound.prop("volume", 1);
    });

});
