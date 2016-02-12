$(document).ready(function(){

    TIMELINEAPP.init();

});

var TIMELINEAPP = {

    // Globale variabler

    // Globale HTML-objekter

    init: function(){
        TIMELINEAPP.clockEvent();
    }, // END init

    clockEvent: function(){
          var scrollValue = 100;
          var houres = 15;
          var minutes = 50;
          var zero = '';

          $(window).bind('scroll', function() {
            var scrollOffset = $(window).scrollTop();
            if( scrollOffset > scrollValue){
              minutes++;
              if( minutes > 59){ minutes = 0; houres++; }
              checkZero(minutes);
              printClock(houres, zero, minutes);

              scrollValue += 100;
            }else if( scrollOffset < (scrollValue - 100) ){
              minutes--;
              if( minutes < 0){ minutes = 59; houres--; }
              checkZero(minutes);
              printClock(houres, zero, minutes);
              scrollValue -= 100;
            }

          }); // END scroll

          function printClock(houres, zero, minutes){
            $('#clock').text(houres + ':'+ zero + minutes);
          }

          function checkZero(minutes){
            if(minutes < 10) zero = '0';
            else zero = '';
          }
    }

}; // END TIMELINEAPP