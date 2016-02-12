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


    init: function () {

        var TA = TIMELINEAPP;

        var setElements = function () {
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
        var setEvents = function () {
            TA.$dot1.mouseover(TA.dot1Animate);
            TA.$dot2.mouseover(TA.dot2Animate);
            TA.$dot3.mouseover(TA.dot3Animate);
            TA.$dot4.mouseover(TA.dot4Animate);
            TA.$dot5.mouseover(TA.dot5Animate);
            TA.$dot6.mouseover(TA.dot6Animate);


        }(); //End setEvents

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

    }


}; // END TIMELINEAPP