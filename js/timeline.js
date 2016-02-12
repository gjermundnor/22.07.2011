$(document).ready(function () {

    TIMELINEAPP.init();

});

var TIMELINEAPP = {

    // Globale variabler

    //HTML-objects
    $dot1: null,
    $dot2: null,
    $dot3: null,
    $dot4: null,
    $dot5: null,
    $dot6: null,
    $dot1Txt: null,
    $dot2Txt: null,
    $dot3Txt: null,
    $dot4Txt: null,
    $dot5Txt: null,
    $dot6Txt: null,

    init: function(){
        TIMELINEAPP.clockEvent();
        TIMELINEAPP.outputMessages();
        TIMELINEAPP.scrollToTop();
        TIMELINEAPP.dragQuestion();
        
        var TA = TIMELINEAPP;
        
        var setElements = function() {
            TA.$dot1 = $("#dot1");
            TA.$dot2 = $("#dot2");
            TA.$dot3 = $("#dot3");
            TA.$dot4 = $("#dot4");
            TA.$dot5 = $("#dot5");
            TA.$dot6 = $("#dot6");
            TA.$dot1Txt = $("#dot1Txt");
            TA.$dot1Txt = $("#dot2Txt");
            TA.$dot1Txt = $("#dot3Txt");
            TA.$dot1Txt = $("#dot4Txt");
            TA.$dot1Txt = $("#dot5Txt");
            TA.$dot1Txt = $("#dot6Txt");
        }();

        var clickEvent = function(){
            
            $('#addNameBtn').click( TIMELINEAPP.questionOne );
            $('#goNextBtn').click( TIMELINEAPP.questionTwo );
            $('#goNextInfoBtn').click( TIMELINEAPP.questionThree );
            $("#toTopBtn").click( TIMELINEAPP.scrollToTop );
            $("#infoBtn").click( TIMELINEAPP.showInfoBox);
            $("#closeInfoBoxBtn").click( TIMELINEAPP.closeInfoBox);

        }();//END clickEvent
 
        var setEvents = function() {
            TA.$dot1.mouseover(TA.dot1Animate);
            TA.$dot2.mouseover(TA.dot2Animate);
            TA.$dot3.mouseover(TA.dot3Animate);
            TA.$dot4.mouseover(TA.dot4Animate);
            TA.$dot5.mouseover(TA.dot5Animate);
            TA.$dot6.mouseover(TA.dot6Animate);

        }();//END setEvents

    }, // END init

    dot1Animate: function () {

        TIMELINEAPP.$dot1Txt.html("Tekst");

    },
    dot2Animate: function () {

        TIMELINEAPP.$dot2Txt.html("Tekst");

    },
    dot3Animate: function () {

         TIMELINEAPP.$dot3Txt.html("Tekst");

    },
    dot4Animate: function () {

          TIMELINEAPP.$dot4Txt.html("Tekst");

    },
    dot5Animate: function () {
          TIMELINEAPP.$dot5Txt.html("Tekst");

    },
    dot6Animate: function () {

        TIMELINEAPP.$dot6Txt.html("Tekst");

    },

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
    },
    questionOne: function(){
      var yourName = $('#inputNameField').val();
      $('#yourName').text(yourName);
      $(this).parent().fadeOut(300, function(){

        $('#checkSection').fadeIn();

      });
    },
    questionTwo: function(){
      $(this).parent().fadeOut(300, function(){

        $('#introSection').fadeIn();
        $(window).scroll(function() {
          scroll();
        });

      });
    },
    questionThree: function(){
      $(this).parent().fadeOut(300, function(){

        $('#infoBoxSection').fadeIn();
        $(window).scroll(function() {
          scroll();
        });

      });
    },
    dragQuestion: function(){
      $('.drop').droppable({
        tolerance: 'intersect',
        drop: function(event, ui) {
          var drop_p = $(this).offset();
          var drag_p = ui.draggable.offset();
          var left_end = drop_p.left - drag_p.left + 0;
          var top_end = drop_p.top - drag_p.top + 0;
          ui.draggable.animate({
              top: '+=' + top_end,
              left: '+=' + left_end
          });
          console.log('dragged ' + ui.draggable.attr('id') + ' onto ' + $(this).find('input').val());
        }
      });

      $('#yourName').draggable({
          revert: 'invalid',
          scroll: false,
          stack: "#yourName",
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

      function dropped(){
        alert( 'Du valgte: ' + 1 );
      }
    }
}; // END TIMELINEAPP