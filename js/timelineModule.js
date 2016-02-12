// Mats - Hannah - Gjermund

var TIMELINEMODULE = (function(){

    // JSON-object-liste
    var messageListJSON = { "messages" : [
        {
            "event": "Dette skjedde",
            "message": "medlingern her",
            "person": "- Lise "
        },
        {
            "event": "",
            "message": "MEdlign heeer",
            "person": "- Andreas "
        }
    ]};

    var getMessage = function(x){
        return messageListJSON.messages[x];
    };

    return{
        getMessage: getMessage
    }

}()); // END TIMELINEMODULE