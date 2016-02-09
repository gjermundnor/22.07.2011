// Mats - Hannah - Gjermund

var TIMELINEMODULE = (function(){

    // JSON-object-liste
    var messageListJSON = { "messages" : [
        {"message": "xxxx"},
        {"message": "xxyxyxyxyx"}
    ]};

    var getMessage = function(index){
        return messageListJSON.messages[index].message;
    };

    return{
        getMessage: getMessage
    }

}()); // END TIMELINEMODULE