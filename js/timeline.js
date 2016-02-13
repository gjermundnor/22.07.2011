$(document).ready(function () {

    TIMELINEAPP.init();

});

var TIMELINEAPP = {

    // Globale variabler
    locationChoice: '0',
    username: '',
    scrollOffset: 0,
    islandScrollValue: 700,

    //HTML-objects
    $dot1: null,
    $dot2: null,
    $dot3: null,
    $dot4: null,
    $dot5: null,
    $dot6: null,
    $text: null,
    $bodyHeight: null,

    init: function(){

        var TA = TIMELINEAPP;

        var setElements = function() {
            TA.$dot1 = $("#dot1");
            TA.$dot2 = $("#dot2");
            TA.$dot3 = $("#dot3");
            TA.$dot4 = $("#dot4");
            TA.$dot5 = $("#dot5");
            TA.$dot6 = $("#dot6");
            TA.$text = $(".text");
            TA.$bodyHeight = $('body').height();

        }();//END setElements

        TIMELINEAPP.checkOffset();
        TIMELINEAPP.clockEvent();
        TIMELINEAPP.outputMessages();
        TIMELINEAPP.scrollTopOnClick();
        TIMELINEAPP.dragQuestion();
        TIMELINEAPP.colorIsland();

        var setEvents = function () {

            TIMELINEAPP.dotAnimate();

        }();//END setEvents

        var clickEvent = function(){

            $('#addNameBtn').click( TIMELINEAPP.questionOne );
            $('#goNextInfoBtn').click( TIMELINEAPP.questionTwo );
            $('#startBtn').click( TIMELINEAPP.questionThree );
            $("#toTopBtn").click( TIMELINEAPP.scrollToTop );
            $("#infoBtn").click( TIMELINEAPP.showInfoBox );
            $("#closeBoxBtn").click( TIMELINEAPP.closeInfoBox );
            $('#newStart').click( TIMELINEAPP.newStart );

        }();//END clickEvent

    }, // END init
    checkOffset: function(){
      $(window).scroll(function(){
        TIMELINEAPP.scrollOffset = $(window).scrollTop();

        TIMELINEAPP.scrollTopOnClick();
        TIMELINEAPP.colorIsland();
      }); // END scroll
    },


    dotAnimate: function () {

        $(".dot").hover(function(){
           $(this)
               .siblings(".text")
                .stop()
               .animate({"opacity": "1"});
        }, function(){
            $(this)
               .siblings(".text")
                .stop()
               .animate({"opacity": "0"});
        });
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
      username = yourName;
      var that = $(this);
      TIMELINEAPP.fadeInOutNextQuestion(that);
    },
    questionTwo: function(){
      var that = $(this);
      TIMELINEAPP.fadeInOutNextQuestion(that);
    },
    questionThree: function(){
      $('#questionWrap').fadeOut(300);
      $('#introSection').fadeOut(300);
      $("html, body").animate({ scrollTop: 0}, 700);
      //TIMELINEAPP.ending();
    },
    fadeInOutNextQuestion: function(that){
      that.parent().fadeOut(300, function(){
        $(this).next().fadeIn();
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
          //console.log('dragged ' + ui.draggable.attr('id') + ' onto ' + $(this).find('input').val());
          locationChoice = $(this).find('input').val();
        }
      });

      $('#yourName').draggable({
          revert: 'invalid',
          scroll: false,
          stack: "#yourName",
      });
    },
    scrollTopOnClick: function(){
      if (TIMELINEAPP.scrollOffset > 300) {
        $("#toTopBtn").button(
            {
                icons: {primary: "ui-icon-caret-1-n"}
            }
        );
        $("#toTopBtn").animate({"opacity": "1"});
      } else {
          $("#toTopBtn").animate({"opacity": "0"});
      }
      $("#toTopBtn").click(function(){
          TIMELINEAPP.scrollTop();
      });
    },
    scrollTop: function(){
      $("html, body").animate({ scrollTop: 0 }, 700);
    },
    showInfoBox: function(){
        $("#infoBoxSection").fadeIn(300);
    },
    closeInfoBox: function(){
        $("#infoBoxSection").fadeOut(300);
    },
    colorIsland: function(){
      var TA = TIMELINEAPP;
      var persentage = (TA.scrollOffset / TA.$bodyHeight);

      if( TA.islandScrollValue < TA.scrollOffset){
        $('#redIsland').css('opacity', persentage);
        TA.islandScrollValue += 700;
      }else if(TA.scrollOffset < (TA.islandScrollValue - 700) ){
        $('#redIsland').css('opacity', persentage);
        TA.islandScrollValue -= 700;
      }
    },
    ending: function(){
      $('#endSection').fadeIn();
      $('#endSectionText').append(
        "<h1>Hei " + username + ", du har nå fått et innblikk i hvordan menneskene på Utøya opplevde sitasjonen, den 22. juli 2011.</h1>"
        );
      if(locationChoice == 'annet'){
        $('#endSectionText').append(
        "<h3>Heldigvis var du et " + locationChoice + " sted og ble ikke direkte berørt av hendelsen.</h3>"
        );
      }else{
        $('#endSectionText').append(
        "<h3>Siden du befant deg på " + locationChoice + " denne dagen, håper vi du ikke ble fysisk skadet og at hverdagen din går som normalt.</h3>"
        );
      }
    },
    newStart: function(){
      location.reload(true)
    }
}; // END TIMELINEAPP