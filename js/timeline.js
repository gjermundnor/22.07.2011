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
        TIMELINEAPP.outputMessages();
        TIMELINEAPP.scrollTopOnClick();
        TIMELINEAPP.dragQuestion();
        TIMELINEAPP.colorIsland();
        TIMELINEAPP.scrollTopOnClick();
        TIMELINEAPP.rainSound();
        
        var setEvents = function () {

            TIMELINEAPP.dotAnimate();

        }();//END setEvents

        var clickEvent = function(){

            $('#addNameBtn').click( TIMELINEAPP.questionOne );
            $('#goNextInfoBtn').click( TIMELINEAPP.questionTwo );
            $('#startBtn').click( TIMELINEAPP.questionThree );
            $("#toTopBtn").click( TIMELINEAPP.scrollTop );
            $("#infoBtn").click( TIMELINEAPP.showInfoBox );
            $("#closeBoxBtn").click( TIMELINEAPP.closeInfoBox );
            $('#newStart').click( TIMELINEAPP.newStart );

        }();//END clickEvent

    }, // END init
    checkOffset: function(){
      $(window).scroll(function(){
        TIMELINEAPP.scrollOffset = $(window).scrollTop();
        TIMELINEAPP.scrollTopOnClick();
        TIMELINEAPP.rainSound();
        TIMELINEAPP.colorIsland();
        TIMELINEAPP.setTimer();
      }); // END scroll
    },

    rainSound: function(){
        if (TIMELINEAPP.scrollOffset > 200) {
            $("#rainSound").prop("volume", 0.9);
        } else if (TIMELINEAPP.scrollOffset > 100) {
            $("#rainSound").prop("volume", 0.5);
        } else {
            $("#rainSound").prop("volume", 0.1);
        }
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
    setTimer: function(){
      var TA = TIMELINEAPP;
      var startHoure = 15, startMinute = 50; // Starttid
      var endHoure = 19, endMinute = 20; // Sluttid
      var currentHoure = 0, currentMinute = 0; // Tid på gitt punkt
      var minutesTotal = 210; // Totalt antall minuttermellom start og slutt
      var startPixel = 6288, endPixel = 34717; // Start og sluttpunkt
      var pixelAmount = endPixel - startPixel; // Antall piklser mellom start og slutt
      var scrollOffset = TA.scrollOffset - startPixel;

      var scrollPercent = (scrollOffset / pixelAmount).toFixed(3); // Hvor mange prosent som er scrollet
      var totalMinutesScrolled = (scrollPercent * minutesTotal).toFixed(0); // Antall minutter scrollet, basert på prosent
      var houresScrolled = Math.floor(totalMinutesScrolled / 60); // Runder ned til nermeste heltall
      var minutesScrolled = (totalMinutesScrolled - (60 * houresScrolled)); // Minuttene som er igjen
      var minutesOverflow = startMinute + minutesScrolled - 60; // Finner om det er for mange minutter eller ikke

      if( minutesOverflow >= 0) houresScrolled++; currentMinute = minutesOverflow; // Hvis positiv overflow, legg til en time
      if( minutesOverflow < 0) currentMinute = startMinute + minutesScrolled; // Hvis negative, legg på antall minutter på starttiden

      currentHoure = startHoure + houresScrolled;

      if(currentMinute < 10) zero = '0'; // Sjekker om det skal legges til 0 eller ikke
      else zero = '';

      $('#clock').text(currentHoure + ':'+ zero + currentMinute); // Printer ut klokken

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
      if (TIMELINEAPP.scrollOffset > 4000) {
        $("#toTopBtn").stop().css({"opacity": "1", "pointer-events": "auto"});
      } else {
          $("#toTopBtn").stop().css({"opacity": "0", "pointer-events": "none"});
      }
    },
    scrollTop: function(){
        $("html, body").animate({scrollTop: 0}, 700);
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