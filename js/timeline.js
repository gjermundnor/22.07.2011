$(document).ready(function () {

    TIMELINEAPP.init();

});

var TIMELINEAPP = {

    // Globale variabler
    locationChoice: 0,
    username: '',

    //HTML-objects
    $dot1: null,
    $dot2: null,
    $dot3: null,
    $dot4: null,
    $dot5: null,
    $dot6: null,
    $text: null,

    init: function(){
        TIMELINEAPP.clockEvent();
        TIMELINEAPP.outputMessages();
        TIMELINEAPP.scrollToTop();
        TIMELINEAPP.dragQuestion();
        TIMELINEAPP.colorIsland();
        TIMELINEAPP.ending();

        var TA = TIMELINEAPP;

        var setElements = function() {
            TA.$dot1 = $("#dot1");
            TA.$dot2 = $("#dot2");
            TA.$dot3 = $("#dot3");
            TA.$dot4 = $("#dot4");
            TA.$dot5 = $("#dot5");
            TA.$dot6 = $("#dot6");
            TA.$text = $(".text");

        }();

        var setEvents = function () {

            TIMELINEAPP.dotAnimate();

        }(); //End setEvents

        var clickEvent = function(){

            $('#addNameBtn').click( TIMELINEAPP.questionOne );
            $('#goNextInfoBtn').click( TIMELINEAPP.questionTwo );
            $('#startBtn').click( TIMELINEAPP.questionThree );

            $("#toTopBtn").click( TIMELINEAPP.scrollToTop );
            $("#infoBtn").click( TIMELINEAPP.showInfoBox);
            $(".closeBoxBtn").click(function(){
                TIMELINEAPP.closeIntro();
                TIMELINEAPP.closeInfoBox();
            });

        }();//END clickEvent

    }, // END init

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
      $(this).parent().fadeOut(300, function(){

        $('#checkSection').fadeIn();

      });
    },
    questionTwo: function(){
      $(this).parent().fadeOut(300, function(){

        $('#introSection').fadeIn();

      });
    },
    questionThree: function(){
      $('#questionWrap').fadeOut(300);
      $("html, body").animate({ scrollTop: 0}, 700);
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
      },
    showIntro: function(){
        $("#introSection")
            .animate({"display": "inline"})
            .fadeIn("slow");
    },
    closeIntro: function(){
        $("#introSection")
            .animate({"display": "none"})
            .fadeOut("slow");
    },
    colorIsland: function(){
      var bodyHeight = $('body').height();
      var topOffset = $(window).scrollTop();
      var persentage = 0;
      var scrollValue = 700;

      $(window).scroll(function() {
          topOffset = $(window).scrollTop();
          persentage = (topOffset / bodyHeight);

          if( scrollValue < topOffset){
            $('#redIsland').css('opacity', persentage);
            scrollValue += 700;
          }else if(topOffset < (scrollValue - 700) ){
            $('#redIsland').css('opacity', persentage);
            scrollValue -= 700;
          }
      });
    },
    ending: function(){
      $(window).scroll(function() {
        topOffset = $(window).scrollTop();
        if( topOffset > 1000) console.log(username + ' : ' + locationChoice);
      });
    },
}; // END TIMELINEAPP