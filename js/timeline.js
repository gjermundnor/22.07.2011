$(document).ready(function(){

    TIMELINEAPP.init();

});

var TIMELINEAPP = {

    // Globale variabler

    // Globale HTML-objekter

    init: function(){
        TIMELINEAPP.clockEvent();
        TIMELINEAPP.outputMessages();
        TIMELINEAPP.dragQuestion();

        var clickEvent = function(){

          $('#addNameBtn').click( TIMELINEAPP.questionOne );
          $('#goNextBtn').click( TIMELINEAPP.questionTwo );

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
      var yourName = $('#inputNameField').val();
      $('#yourName').text(yourName);
      $(this).parent().fadeOut(300, function(){

        $('#checkSection').fadeIn();

      });
    },
    questionTwo: function(){
      $(this).parent().fadeOut(300, function(){

        $('#infoBoxSection').fadeIn();

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

      function dropped(){
        alert( 'Du valgte: ' + 1 );
      }
    }

}; // END TIMELINEAPP