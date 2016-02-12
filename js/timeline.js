$(document).ready(function(){

    TIMELINEAPP.init();

});

var TIMELINEAPP = {

    // Globale variabler

    // Globale HTML-objekter

    init: function(){
        TIMELINEAPP.clockEvent();
        TIMELINEAPP.outputMessages();
        TIMELINEAPP.scrollToTop();
        
        var clickEvent = function(){
            
            $('#addNameBtn').click( TIMELINEAPP.questionOne );
            $('#goNextBtn').click( TIMELINEAPP.questionTwo );
            $("#toTopBtn").click( TIMELINEAPP.scrollToTop );
            $("#infoBtn").click( TIMELINEAPP.showInfoBox);
            $("#closeInfoBoxBtn").click( TIMELINEAPP.closeInfoBox);
        }();
    }, // END init

    clockEvent: function(){
          var scrollValue = 464.9; // Må legge til høyden fra toppen til der tiden skal begynne
          var houres = 15;
          var minutes = 34;
          var zero = '';

          $(window).bind('scroll', function() {
            var scrollOffset = $(window).scrollTop(); // Avstand fra toppen

            if( scrollOffset > scrollValue){
              minutes++;
              if( minutes > 59){ minutes = 0; houres++; }
              checkZero(minutes);
              printClock(houres, zero, minutes);

              scrollValue += 464.9; // 42302 / 91 //// Høyde delt på minutter
            }else if( scrollOffset < (scrollValue - 464.9) ){
              minutes--;
              if( minutes < 0){ minutes = 59; houres--; }
              checkZero(minutes);
              printClock(houres, zero, minutes);
              scrollValue -= 464.9;
            } // END bind scroll event

          }); // END scroll

          function printClock(houres, zero, minutes){
            $('#clock').text(houres + ':'+ zero + minutes);
          }

          function checkZero(minutes){
            if(minutes < 10) zero = '0';
            else zero = '';
          }
    },
    outputMessages: function(){
      var message = TIMELINEMODULE.getMessage(0).message;
      var message2 = TIMELINEMODULE.getMessage(0).person;
      console.log(message);
      console.log(message2);
    },
    questionOne: function(){
      $(this).parent().fadeOut(300, function(){

        $('#checkSection').fadeIn();

      });
    },
    questionTwo: function(){
      $(this).parent().fadeOut(300, function(){

        $('#infoBoxSection').fadeIn();

      });
    },
    scrollToTop: function(){
    $(window).scroll(function() {
        if ($(window).scrollTop() > 300) {
            $("#toTopBtn")
                .animate({"opacity": "1"});
        } else {
            $("#toTopBtn").animate({"opacity": "0"});
        }
    });
    $("#toTopBtn").click(function(){
        $("html, body").animate(
            {
                scrollTop: 0
            }, 700);
        return false;
    }); 
    },
    showInfoBox: function(){
        $("#infoBoxSection")
            .animate({"display": "inline"})
            .fadeIn("slow");
    },
    closeInfoBox: function(){
        $("#infoBoxSection")
            .animate({"display": "none"})
            .fadeOut("slow");
    }
}; // END TIMELINEAPP