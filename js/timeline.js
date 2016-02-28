$(document).ready(function () {

  TIMELINEAPP.scrollTop(); // Gjør at siden starter på toppen
  TIMELINEAPP.init();

});

var TIMELINEAPP = {

  // Globale variabler
  locationChoice: '0', // Valget av sted
  username: '', // Navnet til brukeren
  scrollOffset: 0, // Avstand fra toppen
  islandScrollValue: 700, // Avstand fra toppen nå første island-event kjører
  effects: true, // Lydeffekter
  locked: false, // Om låsen er åpen eller lukket
  runOnce: false,

  //Globale HTML-objects
  $dot1: null,
  $dot2: null,
  $dot3: null,
  $dot4: null,
  $dot5: null,
  $dot6: null,
  $text: null,
  $lockDots: null,
  $openDots: null,
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
          TA.$lockDots = $("#lockDots");
          TA.$bodyHeight = $('body').height();

      }();//END setElements

     var setEvents = function () {

        TIMELINEAPP.checkOffset();
        TIMELINEAPP.scrollTopOnClick();
        TIMELINEAPP.dragQuestion();
        TIMELINEAPP.colorIsland();
        TIMELINEAPP.scrollTopOnClick();
        TIMELINEAPP.soundEffects();
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
        $("#lockDots").click( TIMELINEAPP.openDots);
        $('#volumeBtn').click( TIMELINEAPP.muteSounds );
        $('#muteVolumeBtn').click( TIMELINEAPP.unmuteSounds );

      }();//END clickEvent

    }, // END init

    //Funksjon med boolean som skifter låseikon ved klikk og endrer opacity på teksten
    openDots: function() {

        if(TIMELINEAPP.locked){
            $("#lockDots").attr("src", "images/l%C3%A5s_lukket.png");

            $(".text").css({"opacity": "0"});
           TIMELINEAPP.locked = false;
            $(".dots").css("pointer-events", "auto");
        }else{ // False
            $("#lockDots").attr("src", "images/l%C3%A5s_%C3%A5pen.png");

            $(".text").css({"opacity": "1"});
           TIMELINEAPP.locked = true;
            $(".dots").css("pointer-events", "none");
        }

  }, // END openDots

  checkOffset: function(){
    // Kaller på visse funkjsoner on scroll
    $(window).scroll(function(){

      TIMELINEAPP.scrollOffset = $(window).scrollTop(); // Endrer verdien til offset-variablen
      TIMELINEAPP.scrollTopOnClick(); // Mulighet for å scrolle til toppen
      if( TIMELINEAPP.effects == true ) TIMELINEAPP.soundEffects(); // Lydeffekter
      TIMELINEAPP.colorIsland(); // Gir øya farge
      TIMELINEAPP.setTimer(); // Setter klokka
      TIMELINEAPP.showMessages(); // Viser meldinger

    }); // END scroll

  }, // END checkOffset

  //Funksjon med boolean som skifter låseikon ved klikk og endrer opacity på teksten
  openDots: function() {

    if(TIMELINEAPP.locked){ // Hvis låsen er åpen
      $("#lockDots").attr("src", "images/l%C3%A5s_lukket.png");
      $(".text").css({"opacity": "0"});
      TIMELINEAPP.locked = false;
      $(".dots").css("pointer-events", "auto");

    }else{ // Hvis låsen er lukket
      $("#lockDots").attr("src", "images/l%C3%A5s_%C3%A5pen.png");
      $(".text").css({"opacity": "1"});
      TIMELINEAPP.locked = true;
      $(".dots").css("pointer-events", "none");
    } // END if

  }, // END opendots

  rainSound: function(){

      if (TIMELINEAPP.scrollOffset > 200) $("#rainSound").prop("volume", 0.9);
      else if (TIMELINEAPP.scrollOffset > 100) $("#rainSound").prop("volume", 0.5);
      else $("#rainSound").prop("volume", 0.1);

  }, // END rainSound

  //Funksjon som viser sibling teksten til prikk som blir hovret
  dotAnimate: function () {

    $(".dot").hover(function(){ // Mouseover
      $(this)
        .siblings(".text")
        .stop()
        .animate({"opacity": "1"});

    }, function(){ // Mouseout
      $(this)
        .siblings(".text")
        .stop()
        .animate({"opacity": "0"});
    }); // END hover

  }, //End dotAnimate

  // Regner ut klokka basert på prosent skrollet mellom possisjon x og y
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

  }, // END setTimer - klokke

  questionOne: function(){

    var yourName = $('#inputNameField').val();
    $('#yourName').text(yourName);
    TIMELINEAPP.username = yourName;
    var that = $(this);
    if(yourName.length > 1){
      TIMELINEAPP.fadeInOutNextQuestion(that);
      $('.error-output').text('');
    } else $('.error-output').text('Navnet må bestå av 2 eller flere bokstaver.')

  },

  questionTwo: function(){

    var that = $(this);
    if(TIMELINEAPP.locationChoice != '0'){
      $('.error-output').text('');
      TIMELINEAPP.fadeInOutNextQuestion(that);
    } else $('.error-output').text('Vennligst dra navnet ditt til en av boksene.');

  },

  questionThree: function(){

    $('#questionWrap').fadeOut(300);
    $('#introSection').fadeOut(300);
    $("html, body").animate({ scrollTop: 0}, 700);

  },

  fadeInOutNextQuestion: function(that){

    that.parent().fadeOut(300, function(){
      $(this).next().fadeIn();
    });

  },

  dragQuestion: function(){

    $('.drop').droppable({ // Jquery UI
      tolerance: 'intersect',
      drop: function(event, ui) { // Registrer fra hvor og til når du slipper.
        var dropPos = $(this).offset();
        var dragPos = ui.draggable.offset();
        var leftEnd = dropPos.left - dragPos.left + 0;
        var topEnd = dropPos.top - dragPos.top + 0;
        ui.draggable.animate({
            top: '+=' + topEnd,
            left: '+=' + leftEnd
        });
        TIMELINEAPP.locationChoice = $(this).find('input').val(); // Finner verdien til valget til brukeren
      }

    }); // END droppable

    $('#yourName').draggable({ // boksen brukeren skal dra
        revert: 'invalid',
        scroll: false,
        stack: "#yourName",
    });

  }, // END dragQuestion

  scrollTopOnClick: function(){
    // Mulig å klikke etter scrollet 4000px
    if (TIMELINEAPP.scrollOffset > 4000) {
      $("#toTopBtn").stop().css({"opacity": "1", "pointer-events": "auto"});
    } else {
        $("#toTopBtn").stop().css({"opacity": "0", "pointer-events": "none"});
    }

  }, // END scrollTopOnClick

  scrollTop: function(){
      $("html, body").animate({scrollTop: 0}, 700); // Skrller til toppen
  },

  showInfoBox: function(){
      $("#infoBoxSection").fadeIn(300); // informasjonsboks
  },

  closeInfoBox: function(){
      $("#infoBoxSection").fadeOut(300); // Lukker informasjonsboksen
  },

  colorIsland: function(){ // Farger øya gradvis rød

    var TA = TIMELINEAPP;
    var persentage = (TA.scrollOffset / TA.$bodyHeight); // Regner ut prosent

    if( TA.islandScrollValue < TA.scrollOffset){
      $('#redIsland').css('opacity', persentage);
      TA.islandScrollValue += 700;
    }else if(TA.scrollOffset < (TA.islandScrollValue - 700) ){
      $('#redIsland').css('opacity', persentage);
      TA.islandScrollValue -= 700;
    }

  }, // END colorIsland

  soundEffects: function(){

      if (TIMELINEAPP.scrollOffset >= 20588){ //17:36
          $("#rainSound").prop({"volume": 0.0});
          $("#waveSound").prop({"volume": 0.5});
      }else if (TIMELINEAPP.scrollOffset >= 18534){ //17:21
          $("#rainSound").prop({"volume": 0.4});
          $("#volume2").css({"opacity": 1});
      }else{
          $("#waveSound").prop({"volume": 0});
      }
  }, // END soundEffects

  muteSounds: function(){

    TIMELINEAPP.effects = false;

    $("#volumeBtn").css({"display": "none"});
    $("#muteVolumeBtn").css({"display": "block"});

    $("#volume1").fadeOut();
    $("#volume2").fadeOut();

    $("#rainSound").prop({"volume": 0.0});
    $("#waveSound").prop({"volume": 0.0});

  }, // END muteSounds

  unmuteSounds: function(){

    TIMELINEAPP.effects = true;
    $("#volumeBtn").css({"display": "block"});
    $("#muteVolumeBtn").css({"display": "none"});
    $("#volume1").fadeIn();
    $("#rainSound").prop({"volume": 0.2});

  }, // END unmuteSounds

  showMessages: function(){

    var clock = $('#clock').html();

    // Når de og de meldingene skal vises
    if( clock == '15:59' || clock == '16:00' || clock == '16:01' ) lightUp(0);
    else if( clock == '16:03' || clock == '16:04' || clock == '16:05' ) lightUp(1);
    else if( clock == '16:29' || clock == '16:30' || clock == '16:31' ) lightUp(2);
    else if( clock == '16:55' || clock == '16:56' || clock == '16:57' ) lightUp(3);
    else if( clock == '17:19' || clock == '17:20' || clock == '17:21' ) lightUp(4);
    else if( clock == '17:23') lightUp(5);
    else if( clock == '17:24') lightUp(6);
    else if( clock == '17:25') lightUp(7);
    else if( clock == '17:28') lightUp(8);
    else if( clock == '17:32') lightUp(9);
    else if( clock == '17:35') lightUp(10);
    else if( clock == '17:37') lightUp(11);
    else if( clock == '17:42') lightUp(12);
    else if( clock == '17:43') lightUp(13);
    else if( clock == '17:44') lightUp(14);
    else if( clock == '17:45') lightUp(15);
    else if( clock == '17:48') lightUp(16);
    else if( clock == '17:51') lightUp(17);
    else if( clock == '18:01' || clock == '18:02' || clock == '18:03' ) lightUp(18);
    else if( clock == '18:04') lightUp(19);
    else if( clock == '18:09') lightUp(20);
    else if( clock == '18:11') lightUp(21);
    else if( clock == '18:14') lightUp(22);
    else if( clock == '18:25' || clock == '18:26' || clock == '18:27' ) lightUp(23);
    else if( clock == '18:32' || clock == '18:33' || clock == '18:34' ) lightUp(24);
    else if( clock == '19:20' || clock == '19:21') TIMELINEAPP.ending();
    else removeEffects();

    function lightUp(x){ // Tar i mot en verdi og sender videre

      $('#showTxtBtn').css({'pointer-events': 'auto', 'animation-name': 'lightUp'});

      var clicked = false;
      $('#showTxtBtn').on('click', function(){
        if(clicked){
          $('#messages').text("");
          clicked = false;
        } else{
          setText(x);
          clicked = true;
        }

      });

    }; // End lightbulb

    function removeEffects(){ // Fjerner lyseffekten

      $('#messages').text("");
      $('#showTxtBtn').removeAttr('style');
      $('#showTxtBtn').css('pointer-events', 'none');

    }; // End removeEffects

    function setText(x){ // Finner tekten og skriver den ut

      $('#messages')
        .text("")
        .append('<h2>' + TIMELINEMODULE.getMessage(x).event + '</h2>')
        .append('<h3>' + TIMELINEMODULE.getMessage(x).message + '</h3>')
        .append('<h4>' + TIMELINEMODULE.getMessage(x).person + '</h4>')

    }; // End setText

  }, // END setText

  ending: function(){
    var TA = TIMELINEAPP;
    if( TA.runOnce == true) return false;
    $('#endSection').fadeIn();
    $("body").css("overflow", "hidden");

    $('#endSectionText').append(
      "<h1>Hei " + TA.username + ", du har nå fått et innblikk i hvordan menneskene på Utøya opplevde sitasjonen, den 22. juli 2011.</h1>"
      );
    if(TA.locationChoice == 'annet'){
      $('#endSectionText').append(
      "<h3>Heldigvis var du et " + TA.locationChoice + " sted og ble ikke direkte berørt av hendelsen.</h3>"
      );
    }else{
      $('#endSectionText').append(
      "<h3>Siden du befant deg på " + TA.locationChoice + " denne dagen, håper vi du ikke ble fysisk skadet og at hverdagen din går som normalt.</h3>"
      );
    }

    TA.runOnce = true;
  }, // END ending

  newStart: function(){
    location.reload(true); // Reloader siden
  } // END newStart

}; // END TIMELINEAPP